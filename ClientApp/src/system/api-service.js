var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'whatwg-fetch';
import { RSAA } from 'redux-api-middleware';
export class Api {
    constructor() {
        this.baseUrl = undefined;
        this.mockBaseUrl = undefined;
        this.privateApiDomain = undefined;
        this.permissions = {
            unauthorisedEndpoints: [],
        };
    }
    setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl;
    }
    setMockBaseUrl(mockBaseUrl) {
        this.mockBaseUrl = mockBaseUrl;
    }
    setPrivateApiDomain(privateApiDomain) {
        this.privateApiDomain = privateApiDomain;
    }
    setPermissions(permissions) {
        this.permissions = permissions;
    }
    get(actionType, endpoint, options) {
        const fullEndpointUri = this.buildEndpoint(endpoint, options);
        return this.isAllowed('GET', fullEndpointUri) ? {
            [RSAA]: {
                endpoint: fullEndpointUri,
                method: 'GET',
                types: this.buildTypes(actionType),
                headers: this.buildHeaders(null, options),
                credentials: 'same-origin'
            }
        } : this.getPermissionFailureAction(actionType);
    }
    post(actionType, endpoint, payload, options) {
        const fullEndpointUri = this.buildEndpoint(endpoint, options);
        return this.isAllowed('POST', fullEndpointUri) ? {
            [RSAA]: {
                endpoint: fullEndpointUri,
                method: 'POST',
                body: JSON.stringify(payload),
                types: this.buildTypes(actionType),
                headers: this.buildHeaders({ 'Content-Type': 'application/json' }, options),
                credentials: 'same-origin'
            },
        } : this.getPermissionFailureAction(actionType);
    }
    postMultipart(actionType, endpoint, binary, data, options) {
        const form = new FormData();
        form.append('binary', binary);
        form.append('data', JSON.stringify(data) || '');
        const fullEndpointUri = this.buildEndpoint(endpoint, options);
        return this.isAllowed('POST', fullEndpointUri) ? {
            [RSAA]: {
                endpoint: fullEndpointUri,
                method: 'POST',
                body: form,
                types: this.buildTypes(actionType),
                headers: this.buildHeaders(null, options),
                credentials: 'same-origin'
            },
        } : this.getPermissionFailureAction(actionType);
    }
    put(actionType, endpoint, payload, options) {
        const fullEndpointUri = this.buildEndpoint(endpoint, options);
        return this.isAllowed('PUT', fullEndpointUri) ? {
            [RSAA]: {
                endpoint: fullEndpointUri,
                method: 'PUT',
                body: JSON.stringify(payload),
                types: this.buildTypes(actionType),
                headers: this.buildHeaders({ 'Content-Type': 'application/json' }, options),
                credentials: 'same-origin'
            },
        } : this.getPermissionFailureAction(actionType);
    }
    patch(actionType, endpoint, payload, options) {
        const fullEndpointUri = this.buildEndpoint(endpoint, options);
        return this.isAllowed('PATCH', fullEndpointUri) ? {
            [RSAA]: {
                endpoint: fullEndpointUri,
                method: 'PATCH',
                body: JSON.stringify(payload),
                types: this.buildTypes(actionType),
                headers: this.buildHeaders({ 'Content-Type': 'application/json' }, options),
                credentials: 'same-origin'
            },
        } : this.getPermissionFailureAction(actionType);
    }
    delete(actionType, endpoint, options) {
        const fullEndpointUri = this.buildEndpoint(endpoint, options);
        return this.isAllowed('DELETE', fullEndpointUri) ? {
            [RSAA]: {
                endpoint: fullEndpointUri,
                method: 'DELETE',
                types: this.buildTypes(actionType),
                headers: this.buildHeaders(null, options),
                credentials: 'same-origin'
            }
        } : this.getPermissionFailureAction(actionType);
    }
    crossDomain(actionType, method, endpoint, payload) {
        return {
            [RSAA]: {
                endpoint: endpoint,
                method: method,
                body: payload ? JSON.stringify(payload) : null,
                types: this.buildTypes(actionType),
                headers: this.buildHeaders(null),
                credentials: 'same-origin'
            },
        };
    }
    buildEndpoint(endpoint, options = { useMockApi: false, isPrivateEndpoint: false }) {
        const isPrivateEndpoint = typeof (options) === "boolean" ? false : options.isPrivateEndpoint || false;
        const useMockApi = typeof (options) === "boolean" ? options : options.useMockApi || false;
        let actualBaseUrl = (useMockApi) ? this.mockBaseUrl : this.baseUrl;
        if (isPrivateEndpoint && this.privateApiDomain && actualBaseUrl) {
            actualBaseUrl = actualBaseUrl.replace(this.privateApiDomain, `private/${this.privateApiDomain}`);
        }
        return (actualBaseUrl) ? `${actualBaseUrl}${endpoint}` : endpoint;
    }
    buildHeaders(headers, options = { useMockApi: false }) {
        const useMockApi = typeof (options) === "boolean" ? options : options.useMockApi || false;
        if (!headers) {
            headers = {};
        }
        if (this.impersonationEnabled(useMockApi)) {
            headers.authorization = 'Bearer ' + localStorage.getItem('accessToken');
        }
        return headers;
    }
    buildTypes(actionType) {
        return [
            {
                type: actionType + "_REQUEST",
                payload: function (action) {
                    return JSON.parse(action[RSAA].body);
                },
            },
            {
                type: `${actionType}_SUCCESS`,
                meta: function (action, state, res) {
                    const location = res.headers.get('Location');
                    if (location) {
                        return {
                            headers: {
                                location,
                            }
                        };
                    }
                    ;
                    return null;
                },
            },
            `${actionType}_FAILURE`
        ];
    }
    getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.impersonationEnabled()) {
                    const accessToken = localStorage.getItem('accessToken');
                    const accessTokenExpiration = new Date(localStorage.getItem('accessTokenExpiration') || '');
                    if (!accessToken || new Date() >= accessTokenExpiration) {
                        const response = yield fetch('/sso/idp/connect/token', {
                            method: 'POST',
                            body: `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials&scope=${CLIENT_SCOPES}`,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                        });
                        if (response.ok) {
                            const json = yield response.json();
                            if (json) {
                                const now = new Date();
                                now.setSeconds(now.getSeconds() + json.expires_in);
                                localStorage.setItem('accessToken', json.access_token);
                                localStorage.setItem('accessTokenExpiration', now.toString());
                            }
                        }
                        else {
                            console.log(`Access Token request ended with: (${response.status}) ${response.statusText}`);
                        }
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    impersonationEnabled(useMockApi = false) {
        if (process && process.env && process.env.NODE_ENV === 'dev' && useMockApi === false) {
            if (CLIENT_ID && CLIENT_SECRET && CLIENT_SCOPES) {
                return true;
            }
        }
        return false;
    }
    isAllowed(requestedMethod, requestedEndpoint) {
        const matchingUnauthorisedEndpoints = (this.permissions && this.permissions.unauthorisedEndpoints) ?
            this.permissions.unauthorisedEndpoints.filter((endpoint) => endpoint.methods.some((method) => method === requestedMethod) &&
                `${this.baseUrl}${requestedEndpoint}`.replace(/^\/|\/$/g, '').match(endpoint.uri))
            : []; //toDo: do we want a console error if permissions are undefined/null?
        return matchingUnauthorisedEndpoints.length === 0;
    }
    getPermissionFailureAction(actionType) {
        return {
            type: `${actionType}_FAILURE`,
            meta: 'Permissions failure requesting selected action.'
        };
    }
}
export default new Api();

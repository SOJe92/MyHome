import 'whatwg-fetch';
import { RSAA } from 'redux-api-middleware';

// var __awaiter: any = (this && this.__awaiter) || function (thisArg: any, _arguments: any, P: any, generator: any) {
//     return new (P || (P = Promise))(function (resolve: any, reject: any) {
//         function fulfilled(value: any) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value: any) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result: any) { result.done ? resolve(result.value) : new P(function (resolve: any) { resolve(result.value); }).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };
class Api {
    constructor() {
        this.permissions = {
            unauthorisedEndpoints: [],
        };
    }
    
    baseUrl: any = undefined
    mockBaseUrl: any = undefined
    privateApiDomain: any = undefined
    permissions: any = undefined

    setBaseUrl(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    setMockBaseUrl(mockBaseUrl: string) {
        this.mockBaseUrl = mockBaseUrl;
    }
    setPrivateApiDomain(privateApiDomain: any) {
        this.privateApiDomain = privateApiDomain;
    }
    setPermissions(permissions: any) {
        this.permissions = permissions;
    }
    get(actionType: string, endpoint: string, options: any = {}) {
        const fullEndpointUri = this.buildEndpoint(endpoint, options);
        return {
            [RSAA]: {
                endpoint: fullEndpointUri,
                method: 'GET',
                types: this.buildTypes(actionType),
                headers: this.buildHeaders(null, options),
                credentials: 'same-origin'
            }
        };
    }
    post(actionType: string, endpoint: string, payload: any, options: any) {
        const fullEndpointUri = this.buildEndpoint(endpoint, options);
        return {
            [RSAA]: {
                endpoint: fullEndpointUri,
                method: 'POST',
                body: JSON.stringify(payload),
                types: this.buildTypes(actionType),
                headers: this.buildHeaders({ 'Content-Type': 'application/json' }, options),
                credentials: 'same-origin'
            },
        };
    }
    postMultipart(actionType: string, endpoint: string, binary: any, data: any, options: any) {
        const form = new FormData();
        form.append('binary', binary);
        form.append('data', JSON.stringify(data) || '');
        const fullEndpointUri = this.buildEndpoint(endpoint, options);
        return {
            [RSAA]: {
                endpoint: fullEndpointUri,
                method: 'POST',
                body: form,
                types: this.buildTypes(actionType),
                headers: this.buildHeaders(null, options),
                credentials: 'same-origin'
            },
        }
    }
    put(actionType: string, endpoint: string, payload: any, options: any) {
        const fullEndpointUri = this.buildEndpoint(endpoint, options);
        return {
            [RSAA]: {
                endpoint: fullEndpointUri,
                method: 'PUT',
                body: JSON.stringify(payload),
                types: this.buildTypes(actionType),
                headers: this.buildHeaders({ 'Content-Type': 'application/json' }, options),
                credentials: 'same-origin'
            },
        }
    }
    patch(actionType: string, endpoint: string, payload: any, options: any) {
        const fullEndpointUri = this.buildEndpoint(endpoint, options);
        return {
            [RSAA]: {
                endpoint: fullEndpointUri,
                method: 'PATCH',
                body: JSON.stringify(payload),
                types: this.buildTypes(actionType),
                headers: this.buildHeaders({ 'Content-Type': 'application/json' }, options),
                credentials: 'same-origin'
            },
        }
    }
    delete(actionType: string, endpoint: string, options: any) {
        const fullEndpointUri = this.buildEndpoint(endpoint, options);
        return {
            [RSAA]: {
                endpoint: fullEndpointUri,
                method: 'DELETE',
                types: this.buildTypes(actionType),
                headers: this.buildHeaders(null, options),
                credentials: 'same-origin'
            }
        }
    }
    crossDomain(actionType: string, method: string, endpoint: string, payload: any = null) {
        return fetch(endpoint, {
                method: method,
                body: JSON.stringify(payload),
                //types: this.buildTypes(actionType),
                headers: this.buildHeaders(null),
                credentials: 'same-origin'
        });
    }
    buildEndpoint(endpoint: any, options = { useMockApi: false, isPrivateEndpoint: false }) {
        const isPrivateEndpoint = typeof (options) === "boolean" ? false : options.isPrivateEndpoint || false;
        const useMockApi = typeof (options) === "boolean" ? options : options.useMockApi || false;
        let actualBaseUrl = (useMockApi) ? this.mockBaseUrl : this.baseUrl;
        if (isPrivateEndpoint && this.privateApiDomain && actualBaseUrl) {
            actualBaseUrl = actualBaseUrl.replace(this.privateApiDomain, `private/${this.privateApiDomain}`);
        }
        return (actualBaseUrl) ? `${actualBaseUrl}${endpoint}` : endpoint;
    }
    buildHeaders(headers: any, options = { useMockApi: false }) {
        const useMockApi = typeof (options) === "boolean" ? options : options.useMockApi || false;
        if (!headers) {
            headers = {};
        }
        // if (this.impersonationEnabled(useMockApi)) {
        //     headers.authorization = 'Bearer ' + localStorage.getItem('accessToken');
        // }
        return headers;
    }
    buildTypes(actionType: any) {
        debugger;
        return [
            {
                type: actionType + "_REQUEST",
                payload: function (action: any) {
                    return JSON.parse(action[RSAA].body);
                },
            },
            {
                type: `${actionType}_SUCCESS`,
                meta: function (action: any, state: any, res: any) {
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
    // getAccessToken() {
    //     return __awaiter(this, void 0, void 0, function* () {
    //         try {
    //             if (this.impersonationEnabled()) {
    //                 const accessToken = localStorage.getItem('accessToken');
    //                 const accessTokenExpiration = new Date(localStorage.getItem('accessTokenExpiration') || '');
    //                 if (!accessToken || new Date() >= accessTokenExpiration) {
    //                     const response = yield fetch('/sso/idp/connect/token', {
    //                         method: 'POST',
    //                         body: `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials&scope=${CLIENT_SCOPES}`,
    //                         headers: {
    //                             'Content-Type': 'application/x-www-form-urlencoded',
    //                         },
    //                     });
    //                     if (response.ok) {
    //                         const json = yield response.json();
    //                         if (json) {
    //                             const now = new Date();
    //                             now.setSeconds(now.getSeconds() + json.expires_in);
    //                             localStorage.setItem('accessToken', json.access_token);
    //                             localStorage.setItem('accessTokenExpiration', now.toString());
    //                         }
    //                     }
    //                     else {
    //                         console.log(`Access Token request ended with: (${response.status}) ${response.statusText}`);
    //                     }
    //                 }
    //             }
    //         }
    //         catch (error) {
    //             console.log(error);
    //         }
    //     });
    // }
    // impersonationEnabled(useMockApi = false) {
    //     if (process && process.env && process.env.NODE_ENV === 'dev' && useMockApi === false) {
    //         if (CLIENT_ID && CLIENT_SECRET && CLIENT_SCOPES) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }
    isAllowed(requestedMethod: any, requestedEndpoint: any) {
        const matchingUnauthorisedEndpoints = (this.permissions && this.permissions.unauthorisedEndpoints) ?
            this.permissions.unauthorisedEndpoints.filter((endpoint: any) => endpoint.methods.some((method: any) => method === requestedMethod) &&
                `${this.baseUrl}${requestedEndpoint}`.replace(/^\/|\/$/g, '').match(endpoint.uri))
            : []; //toDo: do we want a console error if permissions are undefined/null?
        return matchingUnauthorisedEndpoints.length === 0;
    }
    getPermissionFailureAction(actionType: any) {
        return {
            type: `${actionType}_FAILURE`,
            meta: 'Permissions failure requesting selected action.'
        };
    }
}
export default new Api();
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("whatwg-fetch");
var redux_api_middleware_1 = require("redux-api-middleware");
// var __awaiter: any = (this && this.__awaiter) || function (thisArg: any, _arguments: any, P: any, generator: any) {
//     return new (P || (P = Promise))(function (resolve: any, reject: any) {
//         function fulfilled(value: any) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value: any) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result: any) { result.done ? resolve(result.value) : new P(function (resolve: any) { resolve(result.value); }).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };
var Api = /** @class */ (function () {
    function Api() {
        this.baseUrl = undefined;
        this.mockBaseUrl = undefined;
        this.privateApiDomain = undefined;
        this.permissions = undefined;
        this.permissions = {
            unauthorisedEndpoints: [],
        };
    }
    Api.prototype.setBaseUrl = function (baseUrl) {
        this.baseUrl = baseUrl;
    };
    Api.prototype.setMockBaseUrl = function (mockBaseUrl) {
        this.mockBaseUrl = mockBaseUrl;
    };
    Api.prototype.setPrivateApiDomain = function (privateApiDomain) {
        this.privateApiDomain = privateApiDomain;
    };
    Api.prototype.setPermissions = function (permissions) {
        this.permissions = permissions;
    };
    Api.prototype.get = function (actionType, endpoint, options) {
        var _a;
        if (options === void 0) { options = {}; }
        var fullEndpointUri = this.buildEndpoint(endpoint, options);
        return _a = {},
            _a[redux_api_middleware_1.RSAA] = {
                endpoint: fullEndpointUri,
                method: 'GET',
                types: this.buildTypes(actionType),
                headers: this.buildHeaders(null, options),
                credentials: 'same-origin'
            },
            _a;
    };
    Api.prototype.post = function (actionType, endpoint, payload, options) {
        var _a;
        if (options === void 0) { options = {}; }
        var fullEndpointUri = this.buildEndpoint(endpoint, options);
        return _a = {},
            _a[redux_api_middleware_1.RSAA] = {
                endpoint: fullEndpointUri,
                method: 'POST',
                body: JSON.stringify(payload),
                types: this.buildTypes(actionType),
                headers: this.buildHeaders({ 'Content-Type': 'application/json' }, options),
                credentials: 'same-origin'
            },
            _a;
    };
    Api.prototype.postMultipart = function (actionType, endpoint, binary, data, options) {
        var _a;
        var form = new FormData();
        form.append('binary', binary);
        form.append('data', JSON.stringify(data) || '');
        var fullEndpointUri = this.buildEndpoint(endpoint, options);
        return _a = {},
            _a[redux_api_middleware_1.RSAA] = {
                endpoint: fullEndpointUri,
                method: 'POST',
                body: form,
                types: this.buildTypes(actionType),
                headers: this.buildHeaders(null, options),
                credentials: 'same-origin'
            },
            _a;
    };
    Api.prototype.put = function (actionType, endpoint, payload, options) {
        var _a;
        var fullEndpointUri = this.buildEndpoint(endpoint, options);
        return _a = {},
            _a[redux_api_middleware_1.RSAA] = {
                endpoint: fullEndpointUri,
                method: 'PUT',
                body: JSON.stringify(payload),
                types: this.buildTypes(actionType),
                headers: this.buildHeaders({ 'Content-Type': 'application/json' }, options),
                credentials: 'same-origin'
            },
            _a;
    };
    Api.prototype.patch = function (actionType, endpoint, payload, options) {
        var _a;
        var fullEndpointUri = this.buildEndpoint(endpoint, options);
        return _a = {},
            _a[redux_api_middleware_1.RSAA] = {
                endpoint: fullEndpointUri,
                method: 'PATCH',
                body: JSON.stringify(payload),
                types: this.buildTypes(actionType),
                headers: this.buildHeaders({ 'Content-Type': 'application/json' }, options),
                credentials: 'same-origin'
            },
            _a;
    };
    Api.prototype.delete = function (actionType, endpoint, options) {
        var _a;
        var fullEndpointUri = this.buildEndpoint(endpoint, options);
        return _a = {},
            _a[redux_api_middleware_1.RSAA] = {
                endpoint: fullEndpointUri,
                method: 'DELETE',
                types: this.buildTypes(actionType),
                headers: this.buildHeaders(null, options),
                credentials: 'same-origin'
            },
            _a;
    };
    Api.prototype.crossDomain = function (actionType, method, endpoint, payload) {
        if (payload === void 0) { payload = null; }
        return fetch(endpoint, {
            method: method,
            body: JSON.stringify(payload),
            //types: this.buildTypes(actionType),
            headers: this.buildHeaders(null),
            credentials: 'same-origin'
        });
    };
    Api.prototype.buildEndpoint = function (endpoint, options) {
        if (options === void 0) { options = { useMockApi: false, isPrivateEndpoint: false }; }
        var isPrivateEndpoint = typeof (options) === "boolean" ? false : options.isPrivateEndpoint || false;
        var useMockApi = typeof (options) === "boolean" ? options : options.useMockApi || false;
        var actualBaseUrl = (useMockApi) ? this.mockBaseUrl : this.baseUrl;
        if (isPrivateEndpoint && actualBaseUrl) {
            actualBaseUrl = "" + (this.privateApiDomain + actualBaseUrl);
        }
        return (actualBaseUrl) ? "" + actualBaseUrl + endpoint : endpoint;
    };
    Api.prototype.buildHeaders = function (headers, options) {
        if (options === void 0) { options = { useMockApi: false }; }
        var useMockApi = typeof (options) === "boolean" ? options : options.useMockApi || false;
        if (!headers) {
            headers = {};
        }
        // if (this.impersonationEnabled(useMockApi)) {
        //     headers.authorization = 'Bearer ' + localStorage.getItem('accessToken');
        // }
        return headers;
    };
    Api.prototype.buildTypes = function (actionType) {
        debugger;
        return [
            {
                type: actionType + "_REQUEST",
                payload: function (action) {
                    return JSON.parse(action[redux_api_middleware_1.RSAA].body);
                },
            },
            {
                type: actionType + "_SUCCESS",
                meta: function (action, state, res) {
                    var location = res.headers.get('Location');
                    if (location) {
                        return {
                            headers: {
                                location: location,
                            }
                        };
                    }
                    ;
                    return null;
                },
            },
            actionType + "_FAILURE"
        ];
    };
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
    Api.prototype.isAllowed = function (requestedMethod, requestedEndpoint) {
        var _this = this;
        var matchingUnauthorisedEndpoints = (this.permissions && this.permissions.unauthorisedEndpoints) ?
            this.permissions.unauthorisedEndpoints.filter(function (endpoint) { return endpoint.methods.some(function (method) { return method === requestedMethod; }) &&
                ("" + _this.baseUrl + requestedEndpoint).replace(/^\/|\/$/g, '').match(endpoint.uri); })
            : []; //toDo: do we want a console error if permissions are undefined/null?
        return matchingUnauthorisedEndpoints.length === 0;
    };
    Api.prototype.getPermissionFailureAction = function (actionType) {
        return {
            type: actionType + "_FAILURE",
            meta: 'Permissions failure requesting selected action.'
        };
    };
    return Api;
}());
exports.default = new Api();
//# sourceMappingURL=api-service.js.map
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_api_middleware_1 = require("redux-api-middleware");
var redux_thunk_1 = require("redux-thunk");
var react_router_redux_1 = require("react-router-redux");
var connected_react_router_1 = require("connected-react-router");
var history_1 = require("history");
var reducers_1 = require("../app/state/entities/reducers");
//const store: any;
var configureStore = function (initialState) {
    if (initialState === void 0) { initialState = {}; }
    var baseUrl = "/";
    var history = history_1.createBrowserHistory({ basename: baseUrl });
    var middleware = [
        redux_thunk_1.default,
        react_router_redux_1.routerMiddleware(history),
        redux_api_middleware_1.apiMiddleware,
    ];
    // In development, use the browser's Redux dev tools extension if installed
    var enhancers = [];
    var isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
    }
    var rootReducer = redux_1.combineReducers({
        router: connected_react_router_1.connectRouter(history),
        routing: react_router_redux_1.routerReducer,
        app: redux_1.combineReducers({
            entity: reducers_1.default,
        })
    });
    return redux_1.createStore(rootReducer, redux_1.compose.apply(void 0, __spreadArrays([redux_1.applyMiddleware.apply(void 0, middleware)], enhancers)));
};
exports.default = configureStore;
// import * as Redux from 'redux';
// import ImmutableStateMiddleware from 'redux-immutable-state-invariant';
// import * as ReduxPromise from 'redux-promise';
// import * as ReduxThunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import appReducer from '../app/state/app/reducers'
// import entityReducer from '../app/state/entities/reducers'
// const middleware: any = [
//     ReduxThunk.default,
//     ReduxPromise,
// ];
// if (process.env.NODE_ENV !== 'production') {
//     // provides a safety net for developers by checking for state mutations
//     middleware.push(ImmutableStateMiddleware());
//     // provides warnings to developers when an action is seemingly unhandled
//     //middleware.push(UnhandledActionMiddleware());
// }
// const rootEnhancer: any = composeWithDevTools(Redux.applyMiddleware(...middleware));
// export default function configureStore() {
//     debugger;
//     const reducer = () => undefined;
//     const store: any = Redux.createStore(
//         reducer,
//         rootEnhancer
//     );
//     return store;
// }
//# sourceMappingURL=store.js.map
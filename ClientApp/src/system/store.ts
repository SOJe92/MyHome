import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history';
import app from '../app/state/app/reducers'
import entity from '../app/state/entities/reducers'

declare var window: any;

//const store: any;

const configureStore = (initialState: any = {}) => {
    const baseUrl = `/`;
    const history = createBrowserHistory({ basename: baseUrl });
    const middleware: any = [
        thunk,
        routerMiddleware(history),
        apiMiddleware,
    ];

    // In development, use the browser's Redux dev tools extension if installed
    const enhancers: any = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
    }

    const rootReducer = combineReducers({
        router: connectRouter(history),
        routing: routerReducer,
        app: combineReducers({
            entity,
        })
    });

    return createStore(
        rootReducer,
        compose(applyMiddleware(...middleware), ...enhancers),
    );
}

export default configureStore;

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

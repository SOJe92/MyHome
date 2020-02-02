import * as Redux from 'redux';
import { apiMiddleware as ReduxApiMiddleware } from 'redux-api-middleware';
import ImmutableStateMiddleware from 'redux-immutable-state-invariant';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import UnhandledActionMiddleware from 'redux-unhandled-action';
const middleware = [
    ReduxThunk,
    ReduxPromise,
    ReduxApiMiddleware,
];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(ImmutableStateMiddleware());
    middleware.push(UnhandledActionMiddleware());
}
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || Redux.compose;
const enhancer = composeEnhancers(Redux.applyMiddleware(...middleware));
const reducer = () => undefined;
export default Redux.createStore(reducer, enhancer);
//# sourceMappingURL=store.js.map
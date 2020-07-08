import { handleActions } from 'redux-actions';
import ActionTypes from '../../action-types';
export const initialState = {};
export default handleActions({
    [`${ActionTypes.app.user.current.fetch}_REQUEST`]: (state) => {
        return Object.assign(Object.assign({}, state), { overview: {
                isFetching: true,
            } });
    },
}, initialState);
//# sourceMappingURL=reducers.js.map
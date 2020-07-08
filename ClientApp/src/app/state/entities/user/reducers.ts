import { handleActions } from 'redux-actions';
import ActionTypes from '../../action-types';

export const initialState = {
    id: 0,
    name: '',
}

export default handleActions({
    //[ActionTypes.app.user.current.fetch]: (state: any) => {
    //    return {
    //        ...state,
    //        name: 'test',
    //        isFetching: true,
    //    };
    //},
    [`${ActionTypes.app.user.current.read}_REQUEST`]: (state: any) => {
        debugger;
        return {
            ...state,
            isFetching: true,
        };
    },
    [`${ActionTypes.app.user.current.read}_SUCCESS`]: (state: any) => {
        debugger;
        return {
            ...state,
            name: 'test',
            isFetching: false,
        };
    },
    [`${ActionTypes.app.user.current.read}_FAILURE`]: (state: any) => {
        debugger;
        return {
            ...state,
            isFetching: false,
        };
    },
}, initialState);
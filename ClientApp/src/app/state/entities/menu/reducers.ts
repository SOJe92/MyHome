import { handleActions } from 'redux-actions';
import ActionTypes from '../../action-types';

export const initialState = {
    isCompleted: false,
    isFetching: false,
    isSaved: false,
    items: [],
    menu: {
        data: null,
    }
}

export default handleActions({
    [`${ActionTypes.entities.menu.read}_REQUEST`]: (state: any) => {
        return {
            ...state,
            isFetching: true,
        };
    },
    [`${ActionTypes.entities.menu.read}_SUCCESS`]: (state: any, action: any) => {
        return {
            ...state,
            isFetching: false,
            items: action.payload,
        };
    },
    [`${ActionTypes.entities.menu.read}_FAILURE`]: (state: any) => {
        return {
            ...state,
            isFetching: false,
        };
    },
}, initialState);
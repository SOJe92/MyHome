import { handleActions } from 'redux-actions';
import ActionTypes from '../../action-types';

export const initialState = {
    isAdding: false,
    isCompleted: false,
    isFetching: false,
    isSaved: false,
    items: null,
    menu: {
        data: null,
    }
}

export default handleActions({
    [ActionTypes.app.menu.add]: (state: any, action: any) => {
        return {
            ...state,
            isAdding: true,
        };
    },
    [ActionTypes.app.menu.reset]:(state:any) => {
        return initialState
    },
    [`${ActionTypes.app.menu.create}_REQUEST`]: (state: any) => {
        return {
            ...state,
            isFetching: true,
        };
    },
    [`${ActionTypes.app.menu.create}_SUCCESS`]: (state: any, action: any) => {
        return {
            ...state,
            isFetching: false,
            isSaved: true,
        };
    },
    [`${ActionTypes.app.menu.create}_FAILURE`]: (state: any) => {
        return {
            ...state,
            isFetching: false,
        };
    },
}, initialState);
import { handleActions } from 'redux-actions';
import ActionTypes from '../../action-types';

export const initialState = {
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
        debugger;
        return {
            ...state,
            menu: action
        };
    },
    [`${ActionTypes.app.menu.read}_REQUEST`]: (state: any) => {
        return {
            ...state,
            isFetching: true,
        };
    },
    [`${ActionTypes.app.menu.read}_SUCCESS`]: (state: any, action: any) => {
        debugger;
        return {
            ...state,
            isFetching: false,
            menu: action,
        };
    },
    [`${ActionTypes.app.menu.read}_FAILURE`]: (state: any) => {
        return {
            ...state,
            isFetching: false,
        };
    },
    [`${ActionTypes.app.menu.create}_REQUEST`]: (state: any) => {
        return {
            ...state,
            isFetching: true,
        };
    },
    [`${ActionTypes.app.menu.create}_SUCCESS`]: (state: any, action: any) => {
        debugger;
        return {
            ...state,
            isCompleted: true,
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
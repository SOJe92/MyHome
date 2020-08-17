import { handleActions } from 'redux-actions';
import ActionTypes from '../../action-types';

export const initialState = {
    current: null,
    form: {
        infoMessage: 'Use the form below to register your information to access extended features.',
        infoType: 'info',
    },
    isFetching: false,
    isSaved: false,
    data: null,
}

export default handleActions({
    [`${ActionTypes.app.user.current.create}_REQUEST`]: (state: any) => {
        return {
            ...state,
            isFetching: true,
        };
    },
    [`${ActionTypes.app.user.current.create}_SUCCESS`]: (state: any, action: any) => {
        return {
            ...state,
            current: action.payload,
            isFetching: false,
        };
    },
    [`${ActionTypes.app.user.current.create}_FAILURE`]: (state: any) => {
        return {
            ...state,
            isFetching: false,
        };
    },
    [ActionTypes.app.user.current.set]: (state: any, action: any) => {
       return {
           ...state,
           data: {
               ...action.payload
            },
       };
    },
}, initialState);
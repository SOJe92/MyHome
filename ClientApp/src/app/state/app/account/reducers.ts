import { handleActions } from 'redux-actions';
import ActionTypes from '../../action-types';

export const initialState = {
    show: false,
}

export default handleActions({
    [ActionTypes.app.account.overview.show]: (state: any) => {
       return {
           ...state,
           show: true,
       };
    },
    [ActionTypes.app.account.overview.hide]: (state: any) => {
       return {
           ...state,
           show: false,
       };
    },
}, initialState);
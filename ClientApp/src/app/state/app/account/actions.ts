import ActionTypes from '../../action-types';
import { apiService } from '../../../../system/system';
import { createAction } from 'redux-actions';
import { debug } from 'console';

export const actions = {
    hideOverview: createAction(ActionTypes.app.account.overview.hide),
    showOverview: createAction(ActionTypes.app.account.overview.show),
    register: (registrationDetails: any) => async (dispatch: any) => {
        return await dispatch(apiService.post(ActionTypes.app.user.current.create, `user/create`, registrationDetails));
    },
    login: (loginDetails: any) =>  (dispatch: any) => {
        return dispatch(apiService.get(ActionTypes.app.user.current.read, `user`, loginDetails))  ;
    },
    set: createAction(ActionTypes.app.user.current.set, (formData: any) => (formData)),
};

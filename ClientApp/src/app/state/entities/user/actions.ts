import ActionTypes from '../../action-types';
import { apiService } from '../../../../system/system'
import { createAction } from 'redux-actions';

export const actions = {
    //fetchCurrentUser: createAction(ActionTypes.app.user.current.fetch)
    fetchCurrentUser: (id: number) => async (dispatch: any, getState: any) => {
        return await dispatch(apiService.get(null, ActionTypes.app.user.current.fetch, `user`));
    }
};

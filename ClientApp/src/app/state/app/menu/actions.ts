import ActionTypes from '../../action-types';
import { apiService } from '../../../../system/system'
import { createAction } from 'redux-actions';

export default {
    addMenu: createAction(ActionTypes.app.menu.add),
    addMenuItem: createAction(ActionTypes.app.menu.item.add),
    createMenu: (menu: any) => { return apiService.post(ActionTypes.app.menu.create, `menu`, menu) },
    createMenuItem: (menuItem: any) => async (dispatch: any) => {
        return await dispatch(apiService.post(ActionTypes.app.menu.create, `menuItem`, menuItem));
    },
    set: createAction(ActionTypes.app.menu.set, (formData: any) => (formData)),
};

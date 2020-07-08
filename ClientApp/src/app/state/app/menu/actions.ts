import ActionTypes from '../../action-types';
import { apiService } from '../../../../system/system'
import { createAction } from 'redux-actions';

export const actions = {
    addMenu: createAction(ActionTypes.app.menu.add),
    addMenuItem: createAction(ActionTypes.app.menu.item.add),
    createMenu: (menu: any) => { return apiService.post(ActionTypes.app.menu.create, `menu`, menu) },
    createMenuItem: (menuItem: any) => async (dispatch: any) => {
        return await dispatch(apiService.post(ActionTypes.app.menu.create, `menuItem`, menuItem));
    },
    fetchMenus: () => async (dispatch: any) => {
        return await dispatch(apiService.get(ActionTypes.entities.menu.read, 'menu', { isPrivateEndpoint: true }));
    },
    fetchMenu: (id: number) => async (dispatch: any) => {
        return await dispatch(apiService.get(ActionTypes.app.menu.read, `menu${id}`));
    },
    fetchMenuItem: (id: number) => async (dispatch: any) => {
        return await dispatch(apiService.get(ActionTypes.app.menu.item.read, `menuItem${id}`));
    },
};

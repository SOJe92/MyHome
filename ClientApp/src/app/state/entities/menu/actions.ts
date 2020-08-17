import ActionTypes from '../../action-types';
import { apiService } from '../../../../system/system'
import { createAction } from 'redux-actions';

export default {
    fetchMenus: () => (dispatch: any) => {
        return dispatch(apiService.get(ActionTypes.entities.menu.read, 'menu'));
    },
    fetchMenuItem: (id: number) => (dispatch: any) => {
        return dispatch(apiService.get(ActionTypes.entities.menu.item.read, `menuItem${id}`));
    },
};

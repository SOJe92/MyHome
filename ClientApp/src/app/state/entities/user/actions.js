import ActionTypes from '../../action-types';
import { apiService } from '../../../../system/system';
export default {
    fetchCurrentUser: (id) => apiService.get(ActionTypes.app.user.current.fetch, 'GET', `/api/private/user/${id}`),
};
//# sourceMappingURL=actions.js.map 
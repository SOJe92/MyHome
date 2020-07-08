import * as Redux from 'redux';
import account from './account/reducers';
import menu from './menu/reducers';
import user from './user/reducers';

export default Redux.combineReducers({
    account,
    menu,
    user,
});
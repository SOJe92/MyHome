import * as Redux from 'redux';
import menu from './menu/reducers';
import user from './user/reducers';

export default Redux.combineReducers({
    menu,
    user,
});
import * as Redux from 'redux';
import user from './user/reducers'

export default Redux.combineReducers({
    user,
});
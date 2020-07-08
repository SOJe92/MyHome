"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require("redux-actions");
var action_types_1 = require("../../action-types");
exports.initialState = {
    id: 0,
    name: '',
};
exports.default = redux_actions_1.handleActions((_a = {},
    //[ActionTypes.app.user.current.fetch]: (state: any) => {
    //    return {
    //        ...state,
    //        name: 'test',
    //        isFetching: true,
    //    };
    //},
    _a[action_types_1.default.app.user.current.fetch + "_REQUEST"] = function (state) {
        debugger;
        return __assign(__assign({}, state), { isFetching: true });
    },
    _a[action_types_1.default.app.user.current.fetch + "_SUCCESS"] = function (state) {
        debugger;
        return __assign(__assign({}, state), { name: 'test', isFetching: false });
    },
    _a[action_types_1.default.app.user.current.fetch + "_FAILURE"] = function (state) {
        debugger;
        return __assign(__assign({}, state), { isFetching: false });
    },
    _a), exports.initialState);
//# sourceMappingURL=reducers.js.map
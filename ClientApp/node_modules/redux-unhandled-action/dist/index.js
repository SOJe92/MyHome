"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reduxUnhandledAction;

var _defaultErrorHandler = require("./default-error-handler");

var _defaultErrorHandler2 = _interopRequireDefault(_defaultErrorHandler);

var _lodash = require("lodash.isplainobject");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reduxUnhandledAction() {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _defaultErrorHandler2.default;

    return function (_ref) {
        var getState = _ref.getState;
        return function (next) {
            return function (action) {
                if ((0, _lodash2.default)(action) && typeof action.type !== "undefined") {
                    var prevState = getState();
                    var result = next(action);
                    var nextState = getState();
                    if (prevState === nextState) {
                        callback(action);
                    }
                    return result;
                }
                return next(action);
            };
        };
    };
}
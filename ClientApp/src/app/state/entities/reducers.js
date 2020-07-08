"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Redux = require("redux");
var reducers_1 = require("./user/reducers");
exports.default = Redux.combineReducers({
    user: reducers_1.default,
});
//# sourceMappingURL=reducers.js.map
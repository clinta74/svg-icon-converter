"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mustache_1 = __importDefault(require("mustache"));
var TsTemplate = "const {{iconName}} = {\n  height: {{ height }},\n  width: {{ width }},\n  paths: {{ paths }}\n};";
var template = mustache_1["default"].parse(TsTemplate);
exports.render = function (view) {
    var output = mustache_1["default"].render(TsTemplate, view);
    // console.log('Output: ', output);
    return output;
};
//# sourceMappingURL=generate-icon.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mustache_1 = __importDefault(require("mustache"));
var TsTemplate = "export const {{iconName}} = {\n  height: {{ height }},\n  width: {{ width }},\n  paths: [\n    {{#paths}}\n    `{{.}}`,\n    {{/paths}}\n  ]\n};";
exports.render = function (view) {
    return mustache_1["default"].render(TsTemplate, view);
};
//# sourceMappingURL=generate-icon.js.map
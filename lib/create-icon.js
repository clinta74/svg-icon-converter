"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var lodash_1 = require("lodash");
var case_1 = __importDefault(require("case"));
var find_paths_1 = require("./find-paths");
exports.createIcon = function (svg, filename) {
    var viewbox = lodash_1.get(svg, 'viewbox', '0 0 10 10').split(' ');
    var height = svg['height'] || (Number(viewbox[3]) - Number(viewbox[1]));
    var width = svg['width'] || (Number(viewbox[2]) - Number(viewbox[0]));
    var paths = find_paths_1.findPaths(svg);
    var baseFilename = path_1["default"].parse(filename).name;
    var icon = {
        iconName: case_1["default"].pascal(baseFilename),
        height: height,
        width: width,
        paths: paths
    };
    return icon;
};
//# sourceMappingURL=create-icon.js.map
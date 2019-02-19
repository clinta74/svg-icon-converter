"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var fast_glob_1 = __importDefault(require("fast-glob"));
var fs_1 = __importDefault(require("fs"));
var xml_objects_1 = __importDefault(require("xml-objects"));
var lodash_1 = require("lodash");
var case_1 = __importDefault(require("case"));
var generate_icon_1 = require("./generate-icon");
var getSourceFolderStream = function (_a) {
    var sourceFolder = _a.sourceFolder, _b = _a.extension, extension = _b === void 0 ? 'svg' : _b;
    return fast_glob_1["default"].stream([sourceFolder + "/**/*." + extension]);
};
function parseSVG(filename) {
    var file = path_1["default"].resolve(filename);
    fs_1["default"].createReadStream(file)
        .pipe(xml_objects_1["default"]({ explicitRoot: false, explicitArray: false, mergeAttrs: true, normalizeTags: true }))
        .on('data', function (svg) { return createIcon(svg, filename); })
        .on('error', console.error);
}
var mapPath = function (paths) {
    return Array.isArray(paths) ? paths.slice() : [paths];
};
function findPaths(svg) {
    var paths = [];
    if (svg['path']) {
        paths = paths.concat(mapPath(svg['path']).map(function (p) { return p.d; }));
    }
    if (svg['g'] && svg['g']['path']) {
        paths = paths.concat(mapPath(svg['g']['path']).map(function (p) { return p.d; }));
    }
    return paths;
}
function createIcon(svg, filename) {
    var viewbox = lodash_1.get(svg, 'viewbox', '0 0 10 10').split(' ');
    var height = svg['height'] || (Number(viewbox[3]) - Number(viewbox[1]));
    var width = svg['width'] || (Number(viewbox[2]) - Number(viewbox[0]));
    var paths = findPaths(svg);
    var baseFilename = path_1["default"].parse(filename).name;
    var icon = {
        iconName: case_1["default"].pascal(baseFilename),
        height: height,
        width: width,
        paths: paths
    };
    console.log('Icon: ', filename);
    console.log('Data: ', generate_icon_1.render(icon));
}
function convert(params) {
    getSourceFolderStream(params)
        .on('data', function (filename) {
        parseSVG(filename);
    })
        .on('error', console.error);
}
exports.convert = convert;
//# sourceMappingURL=scan-folder.js.map
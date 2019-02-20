"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var fast_glob_1 = __importDefault(require("fast-glob"));
var fs_1 = __importDefault(require("fs"));
var xml_objects_1 = __importDefault(require("xml-objects"));
var create_icon_1 = require("./create-icon");
var generate_icon_1 = require("./generate-icon");
var getSourceFolderStream = function (_a) {
    var sourceFolder = _a.sourceFolder, _b = _a.extension, extension = _b === void 0 ? 'svg' : _b;
    return fast_glob_1["default"].stream([sourceFolder + "/**/*." + extension]);
};
var parseSVG = function (filename, outputFolder) {
    var file = path_1["default"].resolve(filename);
    fs_1["default"].createReadStream(file)
        .pipe(xml_objects_1["default"]({ explicitRoot: false, explicitArray: false, mergeAttrs: true, normalizeTags: true }))
        .on('data', function (svg) {
        var icon = generate_icon_1.render(create_icon_1.createIcon(svg, filename));
        var outputFilename = path_1["default"].resolve(outputFolder, path_1["default"].parse(filename).name + ".js");
        console.log('Output Filename: ', outputFilename);
        fs_1["default"].mkdir(outputFolder, { recursive: true }, function (error) {
            if (error)
                throw error;
            var outStream = fs_1["default"].createWriteStream(outputFilename);
            outStream.on('error', console.error);
            outStream.write(icon);
            outStream.end();
        });
    })
        .on('error', console.error);
};
exports.convert = function (params) {
    getSourceFolderStream(params)
        .on('data', function (filename) {
        parseSVG(filename, params.outputFolder);
    })
        .on('error', console.error);
};
//# sourceMappingURL=scan-folder.js.map
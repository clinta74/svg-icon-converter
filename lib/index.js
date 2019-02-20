"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var commander_1 = __importDefault(require("commander"));
var scan_folder_1 = require("./scan-folder");
var path_1 = __importDefault(require("path"));
commander_1["default"]
    .version(process.version, '-v, --vesrion')
    .option('-s, --source-folder <sourceFolder>', 'Source folder of SVGs')
    .option('-o, --output-folder <outputFolder>', 'Output folder to save icons.')
    .option('-l, --libray-name <libraryName', 'Name of export const for library file.')
    .parse(process.argv);
if (commander_1["default"].sourceFolder) {
    var sourceFolder = commander_1["default"].sourceFolder;
    var outputFolder = commander_1["default"].outputFolder || path_1["default"].resolve(sourceFolder + "/output");
    var libraryName = commander_1["default"].libraryName || 'IconLibrary';
    scan_folder_1.convert({
        sourceFolder: sourceFolder,
        outputFolder: outputFolder,
        libraryName: libraryName
    });
}
//# sourceMappingURL=index.js.map
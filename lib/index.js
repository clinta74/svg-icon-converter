"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var commander_1 = __importDefault(require("commander"));
var scan_folder_1 = require("./scan-folder");
commander_1["default"]
    .version(process.version, '-v, --vesrion')
    .option('-s, --source-folder <sourceFolder>', 'Source folder of SVGs')
    .parse(process.argv);
if (commander_1["default"].sourceFolder) {
    var sourceFolder = commander_1["default"].sourceFolder;
    scan_folder_1.convert({
        sourceFolder: sourceFolder
    });
}
//# sourceMappingURL=index.js.map
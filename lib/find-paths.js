"use strict";
exports.__esModule = true;
var mapPath = function (paths) {
    return Array.isArray(paths) ? paths.slice() : [paths];
};
exports.findPaths = function (svg) {
    var paths = [];
    if (svg['path']) {
        paths = paths.concat(mapPath(svg['path']).map(function (p) { return p.d; }));
    }
    if (svg['g'] && svg['g']['path']) {
        paths = paths.concat(mapPath(svg['g']['path']).map(function (p) { return p.d; }));
    }
    return paths;
};
//# sourceMappingURL=find-paths.js.map
var extend = require("extend");

function isString(value) {
    return typeof value == "string";
}

function isObject(value) {
    return typeof value == "object";
}

function deepFind(obj, path) {
    var paths = path.split("."), current = obj, i;
    
    for (i = 0; i < paths.length; ++i) {
        if (current[paths[i]] == undefined) {
            return undefined;
        } else {
            current = current[paths[i]];
        }
    }
    
    return current;
}

function processConfig(rootNode, currentNode) {
    var regex = /\$\(([a-zA-Z0-9.]+)\)/g;
    var match;
    Object.getOwnPropertyNames(currentNode).forEach(function (nodeProperty) {
        var nodeValue = currentNode[nodeProperty];
        
        if (isObject(nodeValue)) {
            processConfig(rootNode, nodeValue);
            return;
        }
        
        if (!isString(nodeValue)) {
            return;
        }
        
        while ((match = regex.exec(nodeValue))) {
            var matchValue = deepFind(rootNode, match[1]);
            if (!isString(matchValue)) {
                continue;
            }
            nodeValue = currentNode[nodeProperty] = nodeValue.replace(match[0], matchValue);
        }
    });
}

module.exports = function (configSource) {
    "use strict";
    
    var config = isString(configSource) ? require(configSource) : extend(true, {}, configSource);
    processConfig(config, config);
    return config;
}
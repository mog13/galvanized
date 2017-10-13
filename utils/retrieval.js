/*
* TODO: Function that takes a node key as argument, reads through
* nodes.json and gets configuration depending on device OS object.
*/

const nodeConfig = require('../config/nodes.json');

let getConfig = function(node){

    // Traverse node configuration file, assigning nodeName to root of key.
    for (let nodeName in nodeConfig){
        if(nodeName === node) {
            let nodeInfo = nodeConfig[nodeName];
            let ip = nodeInfo.ip;
            let username = nodeInfo.username;
            let password = nodeInfo.password;
            let os = nodeInfo.os;
        }
    }
};

module.exports = getConfig;
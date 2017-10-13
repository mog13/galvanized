/*
* TODO: Function that takes a node key as argument, reads through
* nodes.json and gets configuration depending on device OS object.
*/

const Client = require('ssh2').Client;

const nodeConfig = require('../config/nodes.json');
const osCommands = require('../config/os.json');

let buildNodeConfig = function(node){

    // Traverse node configuration file, assigning nodeName to root of key.
    for (var nodeName in nodeConfig){
        if (nodeName === node) {
            var nodeInfo = nodeConfig[nodeName];
            var ip = nodeInfo.ip;
            var username = nodeInfo.username;
            var password = nodeInfo.password;
            var os = nodeInfo.os;
            var port = nodeInfo.port;
        }
    }

    // Get apprioriate comand for the determined OS
    // TODO: Break this out into a seperate function

    for (var osType in osCommands){
        if (osType === os){
            var command = osCommands[osType].command;
        }
    }

    getConfigConnect(ip, username, password, command).then(function(response, reject){
        // Do something with returned configuration
    })
};

let getConfigConnect = function(ip, username, password, command){
    return new Promise(function(resolve, reject){
        var conn = new Client();
        conn.on('ready', function () {
            conn.exec(command, function (err, stream) {
                if (err) throw err;
                stream.on('close', function (code, signal) {
                    console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                    conn.end();
                }).on('data', function (data) {
                    console.log('STDOUT: ' + data);
                }).stderr.on('data', function (data) {
                    console.log('STDERR: ' + data);
                });
            });
        }).connect({
            host: ip,
            port: port || 22,
            username: username,
            password: password
        });
        resolve(data);
    })
};

buildNodeConfig("exampleNode");
module.exports = buildNodeConfig;
/**
 Filename: wifibox.js
 //AppLamp.nl led light API: wifi box UDP socket, command sender
 © AppLamp.nl: you can share,modify and use this code (commercially) as long as you
 keep the referer "AppLamp.nl led light API" in the file header.
 
 
 Usage in Node JS:
     //load this wifi box class
     var WifiBoxModule = require('wifibox.js');
     var byteCommand = require('commands.js');
     //create instance with wifi box ip and port
     var box = new WifiBoxModule("192.168.1.100", 50000);
     //send a command ( see commands.js )
     box.command(byteCommand.bulb.color.hue(180));
     box.command(byteCommand.bulb.white.allOn());
 **/
 
var http = require('http');
var dgram = require('dgram');
 
var WifiBox = function (ip, port) {
    this.client = dgram.createSocket('udp4');
    const default_ip = '192.168.1.100';
    const default_port = 50000;
    this.ip = (ip != undefined && ip.length > 6) ? ip : default_ip;
    this.port = (port != undefined && port > 0) ? port : default_port;
 
};
 
 
WifiBox.prototype.command = function (threeByteArray) {
    var buffer = new Buffer(threeByteArray);
    this.client.send(buffer
        , 0
        , buffer.length
        , this.port
        , this.ip
        , function (err, bytes) {
            if (err) {
                console.log("udp error:" + err);
                throw err;
            } else {
                console.log('bytes send: ' + [threeByteArray[0], threeByteArray[1], threeByteArray[2]])
            }
        }
    );
}
 
WifiBox.prototype.toString = function () {
    return 'WifiBox: { ip:' + this.ip + ':' + this.port + '}';
};
 
 
module.exports = WifiBox;

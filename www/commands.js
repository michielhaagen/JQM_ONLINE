/**
Filename: commands.js
//AppLamp.nl led light API: wifi box byte commands
© AppLamp.nl: you can share,modify and use this code (commercially) as long as you
keep the referer "AppLamp.nl led light API" in the file header.
 
// The functions in this file will return the appropriate hex commands as 3 byte array
// to send to an UDP-socket towards WIFI BOX-IP:50000 (see wifibox.js)
 
//Usage in Node JS:
var byteCommand = require('commands.js');
//example turn all white bulbs on:
byteCommand.bulb.white.allOn();
//set the hue of a color bulb to yellow
byteCommand.bulb.color.hue(128);
**/

var ColorCmd = function () {
};
/* hue range is 0 to 255 */
ColorCmd.prototype.hue = function (decimal) {
    var hex = decimal.toString(16);
    hex = (hex.length < 2) ? '0x0' + hex : '0x' + hex;
    return [0x20, hex, 0x55];
};
ColorCmd.prototype.off = function () {
    return [0x21, 0x00, 0x55];
};
ColorCmd.prototype.on = function () {
    return [0x22, 0x00, 0x55];
};
ColorCmd.prototype.brightUp = function () {
    return [0x23, 0x00, 0x55];
};
ColorCmd.prototype.brightDown = function () {
    return [0x24, 0x00, 0x55];
};
ColorCmd.prototype.speedUp = function () {
    return [0x25, 0x00, 0x55];
};
ColorCmd.prototype.speedDown = function () {
    return [0x26, 0x00, 0x55];
};
ColorCmd.prototype.effectUp = function () {
    return [0x27, 0x00, 0x55];
};
ColorCmd.prototype.effectDown = function () {
    return [0x28, 0x00, 0x55];
};


var WhiteCmd = function () {
};
WhiteCmd.prototype.allOn = function () {
    return [0x35, 0x00, 0x55];
};
WhiteCmd.prototype.allOff = function () {
    return [0x39, 0x00, 0x55];
};
WhiteCmd.prototype.brightUp = function () {
    return [0x3c, 0x00, 0x55];
};
WhiteCmd.prototype.brightDown = function () {
    return [0x34, 0x00, 0x55];
};
WhiteCmd.prototype.warmer = function () {
    return [0x3E, 0x00, 0x55];
};
WhiteCmd.prototype.cooler = function () {
    return [0x3F, 0x00, 0x55];
};
/* call with `index` 0 to 3 (four zones) */
WhiteCmd.prototype.zoneOn = function (index) {
    return [[0x38, 0x3D, 0x37, 0x32][index], 0x00, 0x55];
};
WhiteCmd.prototype.zoneOff = function (index) {
    return [[0x3B, 0x33, 0x3A, 0x36][index], 0x00, 0x55];
};
WhiteCmd.prototype.zoneNightMode = function (index) {
    return [[0x3B, 0x33, 0x3A, 0x36][index], 0x00, 0x55];
};

WhiteCmd.prototype.on_1 = function () {
    return this.zoneOn(0)
};
WhiteCmd.prototype.on_2 = function () {
    return this.zoneOn(1)
};
WhiteCmd.prototype.on_3 = function () {
    return this.zoneOn(2)
};
WhiteCmd.prototype.on_4 = function () {
    return this.zoneOn(3)
};

WhiteCmd.prototype.off_1 = function () {
    return this.zoneOff(0)
};
WhiteCmd.prototype.off_2 = function () {
    return this.zoneOff(1)
};
WhiteCmd.prototype.off_3 = function () {
    return this.zoneOff(2)
};
WhiteCmd.prototype.off_4 = function () {
    return this.zoneOff(3)
};

WhiteCmd.prototype.nightMode_1 = function () {
    return this.zoneOff(0)
};
WhiteCmd.prototype.nightMode_2 = function () {
    return this.zoneOff(1)
};
WhiteCmd.prototype.nightMode_3 = function () {
    return this.zoneOff(2)
};
WhiteCmd.prototype.nightMode_4 = function () {
    return this.zoneOff(3)
};

module.exports.bulb = { color: new ColorCmd(), white: new WhiteCmd() };

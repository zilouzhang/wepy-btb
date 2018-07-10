'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SdkVersion = exports.WxVersion = exports.ScreenHeight = exports.ScreenWidth = exports.sysInfo = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sysInfo = exports.sysInfo = _wepy2.default.getSystemInfoSync();
// 设备信息
var ScreenWidth = exports.ScreenWidth = sysInfo.screenWidth;
var ScreenHeight = exports.ScreenHeight = sysInfo.screenHeight;
var WxVersion = exports.WxVersion = sysInfo.version;
var SdkVersion = exports.SdkVersion = sysInfo.SDKVersion;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldmljZS5qcyJdLCJuYW1lcyI6WyJzeXNJbmZvIiwid2VweSIsImdldFN5c3RlbUluZm9TeW5jIiwiU2NyZWVuV2lkdGgiLCJzY3JlZW5XaWR0aCIsIlNjcmVlbkhlaWdodCIsInNjcmVlbkhlaWdodCIsIld4VmVyc2lvbiIsInZlcnNpb24iLCJTZGtWZXJzaW9uIiwiU0RLVmVyc2lvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOzs7Ozs7QUFDTyxJQUFNQSw0QkFBVUMsZUFBS0MsaUJBQUwsRUFBaEI7QUFGUDtBQUdPLElBQU1DLG9DQUFjSCxRQUFRSSxXQUE1QjtBQUNBLElBQU1DLHNDQUFlTCxRQUFRTSxZQUE3QjtBQUNBLElBQU1DLGdDQUFZUCxRQUFRUSxPQUExQjtBQUNBLElBQU1DLGtDQUFhVCxRQUFRVSxVQUEzQiIsImZpbGUiOiJkZXZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vIOiuvuWkh+S/oeaBr1xuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5leHBvcnQgY29uc3Qgc3lzSW5mbyA9IHdlcHkuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbmV4cG9ydCBjb25zdCBTY3JlZW5XaWR0aCA9IHN5c0luZm8uc2NyZWVuV2lkdGg7XG5leHBvcnQgY29uc3QgU2NyZWVuSGVpZ2h0ID0gc3lzSW5mby5zY3JlZW5IZWlnaHQ7XG5leHBvcnQgY29uc3QgV3hWZXJzaW9uID0gc3lzSW5mby52ZXJzaW9uO1xuZXhwb3J0IGNvbnN0IFNka1ZlcnNpb24gPSBzeXNJbmZvLlNES1ZlcnNpb247Il19
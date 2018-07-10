'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStorage = exports.setStorage = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Expire = 7 * 24 * 3600;

// set storage
var setStorage = exports.setStorage = function setStorage(key, value) {
  var currentTime = Math.floor(new Date().getTime() / 1000);
  var expire = currentTime + Expire;
  try {
    _wepy2.default.setStorageSync(key, {
      expire: expire,
      value: value
    });
    return true;
  } catch (e) {
    console.log('当前设备不支持该方法');
    return false;
  }
};

// get storage
var getStorage = exports.getStorage = function getStorage(key) {
  try {
    var currentTime = Math.floor(new Date().getTime() / 1000);
    var data = _wepy2.default.getStorageSync(key);
    if (data && data.expire && currentTime < data.expire) {
      return data.value;
    }
    _wepy2.default.removeStorageSync(key);
    return null;
  } catch (e) {
    console.log('当前设备不支持该方法');
    return null;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3JhZ2UuanMiXSwibmFtZXMiOlsiRXhwaXJlIiwic2V0U3RvcmFnZSIsImtleSIsInZhbHVlIiwiY3VycmVudFRpbWUiLCJNYXRoIiwiZmxvb3IiLCJEYXRlIiwiZ2V0VGltZSIsImV4cGlyZSIsIndlcHkiLCJzZXRTdG9yYWdlU3luYyIsImUiLCJjb25zb2xlIiwibG9nIiwiZ2V0U3RvcmFnZSIsImRhdGEiLCJnZXRTdG9yYWdlU3luYyIsInJlbW92ZVN0b3JhZ2VTeW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU1BLFNBQVMsSUFBSSxFQUFKLEdBQVMsSUFBeEI7O0FBRUE7QUFDTyxJQUFNQyxrQ0FBYSxTQUFiQSxVQUFhLENBQUNDLEdBQUQsRUFBTUMsS0FBTixFQUFnQjtBQUN4QyxNQUFJQyxjQUFjQyxLQUFLQyxLQUFMLENBQVcsSUFBSUMsSUFBSixHQUFXQyxPQUFYLEtBQXVCLElBQWxDLENBQWxCO0FBQ0EsTUFBSUMsU0FBU0wsY0FBY0osTUFBM0I7QUFDQSxNQUFJO0FBQ0ZVLG1CQUFLQyxjQUFMLENBQW9CVCxHQUFwQixFQUF5QjtBQUN2Qk8sb0JBRHVCO0FBRXZCTjtBQUZ1QixLQUF6QjtBQUlBLFdBQU8sSUFBUDtBQUNELEdBTkQsQ0FNRSxPQUFPUyxDQUFQLEVBQVU7QUFDVkMsWUFBUUMsR0FBUixDQUFZLFlBQVo7QUFDQSxXQUFPLEtBQVA7QUFDRDtBQUNGLENBYk07O0FBZVA7QUFDTyxJQUFNQyxrQ0FBYSxTQUFiQSxVQUFhLENBQUNiLEdBQUQsRUFBUztBQUNqQyxNQUFJO0FBQ0YsUUFBSUUsY0FBY0MsS0FBS0MsS0FBTCxDQUFXLElBQUlDLElBQUosR0FBV0MsT0FBWCxLQUF1QixJQUFsQyxDQUFsQjtBQUNBLFFBQUlRLE9BQU9OLGVBQUtPLGNBQUwsQ0FBb0JmLEdBQXBCLENBQVg7QUFDQSxRQUFJYyxRQUFRQSxLQUFLUCxNQUFiLElBQXVCTCxjQUFjWSxLQUFLUCxNQUE5QyxFQUFzRDtBQUNwRCxhQUFPTyxLQUFLYixLQUFaO0FBQ0Q7QUFDRE8sbUJBQUtRLGlCQUFMLENBQXVCaEIsR0FBdkI7QUFDQSxXQUFPLElBQVA7QUFDRCxHQVJELENBUUUsT0FBT1UsQ0FBUCxFQUFVO0FBQ1ZDLFlBQVFDLEdBQVIsQ0FBWSxZQUFaO0FBQ0EsV0FBTyxJQUFQO0FBQ0Q7QUFDRixDQWJNIiwiZmlsZSI6InN0b3JhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuY29uc3QgRXhwaXJlID0gNyAqIDI0ICogMzYwMDtcblxuLy8gc2V0IHN0b3JhZ2VcbmV4cG9ydCBjb25zdCBzZXRTdG9yYWdlID0gKGtleSwgdmFsdWUpID0+IHtcbiAgbGV0IGN1cnJlbnRUaW1lID0gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xuICBsZXQgZXhwaXJlID0gY3VycmVudFRpbWUgKyBFeHBpcmU7XG4gIHRyeSB7XG4gICAgd2VweS5zZXRTdG9yYWdlU3luYyhrZXksIHtcbiAgICAgIGV4cGlyZSxcbiAgICAgIHZhbHVlXG4gICAgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZygn5b2T5YmN6K6+5aSH5LiN5pSv5oyB6K+l5pa55rOVJyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8vIGdldCBzdG9yYWdlXG5leHBvcnQgY29uc3QgZ2V0U3RvcmFnZSA9IChrZXkpID0+IHtcbiAgdHJ5IHtcbiAgICBsZXQgY3VycmVudFRpbWUgPSBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG4gICAgbGV0IGRhdGEgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKGtleSk7XG4gICAgaWYgKGRhdGEgJiYgZGF0YS5leHBpcmUgJiYgY3VycmVudFRpbWUgPCBkYXRhLmV4cGlyZSkge1xuICAgICAgcmV0dXJuIGRhdGEudmFsdWU7XG4gICAgfVxuICAgIHdlcHkucmVtb3ZlU3RvcmFnZVN5bmMoa2V5KTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKCflvZPliY3orr7lpIfkuI3mlK/mjIHor6Xmlrnms5UnKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufSJdfQ==
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = exports.post = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var post = exports.post = function post(url, params) {
  if (url) {
    return new Promise(function (resolve, reject) {
      _wepy2.default.request({
        url: url,
        method: 'post',
        data: _extends({}, params)
      }).then(function (res) {
        if (res.statusCode === 200 && res.data && res.data.code && res.data.code === 1000) {
          resolve(res.data.data);
        } else {
          reject(res.data.msg);
        }
      }).catch(function (err) {
        reject('请求失败');
      });
    });
  }
};

var get = exports.get = function get(url, params) {
  if (url) {
    return new Promise(function (resolve, reject) {
      _wepy2.default.request({
        url: url,
        method: 'get',
        data: _extends({}, params)
      }).then(function (res) {
        if (res.statusCode === 200 && res.data && res.data.code && res.data.code === 1000) {
          resolve(res.data.data);
        } else {
          reject(res.data.msg);
        }
      }).catch(function (err) {
        reject('请求失败');
      });
    });
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcXVlc3QuanMiXSwibmFtZXMiOlsicG9zdCIsInVybCIsInBhcmFtcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid2VweSIsInJlcXVlc3QiLCJtZXRob2QiLCJkYXRhIiwidGhlbiIsInJlcyIsInN0YXR1c0NvZGUiLCJjb2RlIiwibXNnIiwiY2F0Y2giLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFTyxJQUFNQSxzQkFBTyxTQUFQQSxJQUFPLENBQUNDLEdBQUQsRUFBTUMsTUFBTixFQUFpQjtBQUNuQyxNQUFJRCxHQUFKLEVBQVM7QUFDUCxXQUFPLElBQUlFLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLHFCQUFLQyxPQUFMLENBQWE7QUFDWE4sZ0JBRFc7QUFFWE8sZ0JBQVEsTUFGRztBQUdYQywyQkFDS1AsTUFETDtBQUhXLE9BQWIsRUFNR1EsSUFOSCxDQU1RLGVBQU87QUFDYixZQUFJQyxJQUFJQyxVQUFKLEtBQW1CLEdBQW5CLElBQTBCRCxJQUFJRixJQUE5QixJQUFzQ0UsSUFBSUYsSUFBSixDQUFTSSxJQUEvQyxJQUF1REYsSUFBSUYsSUFBSixDQUFTSSxJQUFULEtBQWtCLElBQTdFLEVBQW1GO0FBQ2pGVCxrQkFBUU8sSUFBSUYsSUFBSixDQUFTQSxJQUFqQjtBQUNELFNBRkQsTUFFTztBQUNMSixpQkFBT00sSUFBSUYsSUFBSixDQUFTSyxHQUFoQjtBQUNEO0FBQ0YsT0FaRCxFQVlHQyxLQVpILENBWVMsZUFBTztBQUNkVixlQUFPLE1BQVA7QUFDRCxPQWREO0FBZUQsS0FoQk0sQ0FBUDtBQWlCRDtBQUNGLENBcEJNOztBQXNCQSxJQUFNVyxvQkFBTSxTQUFOQSxHQUFNLENBQUNmLEdBQUQsRUFBTUMsTUFBTixFQUFpQjtBQUNsQyxNQUFJRCxHQUFKLEVBQVM7QUFDUCxXQUFPLElBQUlFLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLHFCQUFLQyxPQUFMLENBQWE7QUFDWE4sZ0JBRFc7QUFFWE8sZ0JBQVEsS0FGRztBQUdYQywyQkFDS1AsTUFETDtBQUhXLE9BQWIsRUFNR1EsSUFOSCxDQU1RLGVBQU87QUFDYixZQUFJQyxJQUFJQyxVQUFKLEtBQW1CLEdBQW5CLElBQTBCRCxJQUFJRixJQUE5QixJQUFzQ0UsSUFBSUYsSUFBSixDQUFTSSxJQUEvQyxJQUF1REYsSUFBSUYsSUFBSixDQUFTSSxJQUFULEtBQWtCLElBQTdFLEVBQW1GO0FBQ2pGVCxrQkFBUU8sSUFBSUYsSUFBSixDQUFTQSxJQUFqQjtBQUNELFNBRkQsTUFFTztBQUNMSixpQkFBT00sSUFBSUYsSUFBSixDQUFTSyxHQUFoQjtBQUNEO0FBQ0YsT0FaRCxFQVlHQyxLQVpILENBWVMsZUFBTztBQUNkVixlQUFPLE1BQVA7QUFDRCxPQWREO0FBZUQsS0FoQk0sQ0FBUDtBQWlCRDtBQUNGLENBcEJNIiwiZmlsZSI6InJlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xuXG5leHBvcnQgY29uc3QgcG9zdCA9ICh1cmwsIHBhcmFtcykgPT4ge1xuICBpZiAodXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgIHVybCxcbiAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAuLi5wYXJhbXNcbiAgICAgICAgfVxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCAmJiByZXMuZGF0YSAmJiByZXMuZGF0YS5jb2RlICYmIHJlcy5kYXRhLmNvZGUgPT09IDEwMDApIHtcbiAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhLmRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChyZXMuZGF0YS5tc2cpO1xuICAgICAgICB9XG4gICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICByZWplY3QoJ+ivt+axguWksei0pScpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXQgPSAodXJsLCBwYXJhbXMpID0+IHtcbiAgaWYgKHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICB1cmwsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAuLi5wYXJhbXNcbiAgICAgICAgfVxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCAmJiByZXMuZGF0YSAmJiByZXMuZGF0YS5jb2RlICYmIHJlcy5kYXRhLmNvZGUgPT09IDEwMDApIHtcbiAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhLmRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChyZXMuZGF0YS5tc2cpO1xuICAgICAgICB9XG4gICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICByZWplY3QoJ+ivt+axguWksei0pScpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn0iXX0=
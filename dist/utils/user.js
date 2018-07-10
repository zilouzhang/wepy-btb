'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWxCode = exports.isLogin = undefined;

var _config = require('./../config.js');

var _request = require('./request.js');

var _storage = require('./storage.js');

// 判断是否登录
var isLogin = exports.isLogin = function isLogin() {
  var data = (0, _storage.getStorage)('userInfo') || null;
  if (data) {
    return true;
  }
  return false;
};

// get wx login code
var getWxCode = exports.getWxCode = function getWxCode() {
  var userInfo = (0, _storage.getStorage)('userInfo');
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function success(res) {
        (0, _request.post)(_config.Host + 'login/getWxSessinKeyByCode', {
          code: res.code || ''
        }).then(function (res) {
          (0, _request.post)(_config.Host + 'login/index', {
            sessionKey: res.session_key,
            encryptedData: userInfo.encryptedData,
            iv: userInfo.iv
          }).then(function (data) {
            resolve(data);
          }).catch(function (err) {
            reject(err);
          });
        }).catch(function (err) {
          reject(err);
        });
      },
      fail: function fail() {
        reject('获取登录信息失败');
      }
    });
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiaXNMb2dpbiIsImRhdGEiLCJnZXRXeENvZGUiLCJ1c2VySW5mbyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid3giLCJsb2dpbiIsInN1Y2Nlc3MiLCJIb3N0IiwiY29kZSIsInJlcyIsInRoZW4iLCJzZXNzaW9uS2V5Iiwic2Vzc2lvbl9rZXkiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJjYXRjaCIsImVyciIsImZhaWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFLQTtBQUNPLElBQU1BLDRCQUFVLFNBQVZBLE9BQVUsR0FBTTtBQUMzQixNQUFJQyxPQUFPLHlCQUFXLFVBQVgsS0FBMEIsSUFBckM7QUFDQSxNQUFJQSxJQUFKLEVBQVU7QUFDUixXQUFPLElBQVA7QUFDRDtBQUNELFNBQU8sS0FBUDtBQUNELENBTk07O0FBUVA7QUFDTyxJQUFNQyxnQ0FBWSxTQUFaQSxTQUFZLEdBQU07QUFDN0IsTUFBSUMsV0FBVyx5QkFBVyxVQUFYLENBQWY7QUFDQSxTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLE9BQUdDLEtBQUgsQ0FBUztBQUNQQyxlQUFTLHNCQUFPO0FBQ2QsMkJBQVFDLFlBQVIsaUNBQTBDO0FBQ3hDQyxnQkFBTUMsSUFBSUQsSUFBSixJQUFZO0FBRHNCLFNBQTFDLEVBRUdFLElBRkgsQ0FFUSxlQUFPO0FBQ2IsNkJBQVFILFlBQVIsa0JBQTJCO0FBQ3pCSSx3QkFBWUYsSUFBSUcsV0FEUztBQUV6QkMsMkJBQWViLFNBQVNhLGFBRkM7QUFHekJDLGdCQUFJZCxTQUFTYztBQUhZLFdBQTNCLEVBSUdKLElBSkgsQ0FJUSxnQkFBUTtBQUNkUixvQkFBUUosSUFBUjtBQUNELFdBTkQsRUFNR2lCLEtBTkgsQ0FNUyxlQUFPO0FBQ2RaLG1CQUFPYSxHQUFQO0FBQ0QsV0FSRDtBQVNELFNBWkQsRUFZR0QsS0FaSCxDQVlTLGVBQU87QUFDZFosaUJBQU9hLEdBQVA7QUFDRCxTQWREO0FBZUQsT0FqQk07QUFrQlBDLFlBQU0sZ0JBQU07QUFDVmQsZUFBTyxVQUFQO0FBQ0Q7QUFwQk0sS0FBVDtBQXNCRCxHQXZCTSxDQUFQO0FBd0JELENBMUJNIiwiZmlsZSI6InVzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIb3N0IH0gZnJvbSAnY29uZmlnJztcbmltcG9ydCB7IHBvc3QgfSBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgZ2V0U3RvcmFnZSxcbiAgc2V0U3RvcmFnZVxufSBmcm9tICcuL3N0b3JhZ2UnO1xuXG4vLyDliKTmlq3mmK/lkKbnmbvlvZVcbmV4cG9ydCBjb25zdCBpc0xvZ2luID0gKCkgPT4ge1xuICBsZXQgZGF0YSA9IGdldFN0b3JhZ2UoJ3VzZXJJbmZvJykgfHwgbnVsbDtcbiAgaWYgKGRhdGEpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vLyBnZXQgd3ggbG9naW4gY29kZVxuZXhwb3J0IGNvbnN0IGdldFd4Q29kZSA9ICgpID0+IHtcbiAgbGV0IHVzZXJJbmZvID0gZ2V0U3RvcmFnZSgndXNlckluZm8nKTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3eC5sb2dpbih7XG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICBwb3N0KGAke0hvc3R9bG9naW4vZ2V0V3hTZXNzaW5LZXlCeUNvZGVgLCB7XG4gICAgICAgICAgY29kZTogcmVzLmNvZGUgfHwgJydcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgIHBvc3QoYCR7SG9zdH1sb2dpbi9pbmRleGAsIHtcbiAgICAgICAgICAgIHNlc3Npb25LZXk6IHJlcy5zZXNzaW9uX2tleSxcbiAgICAgICAgICAgIGVuY3J5cHRlZERhdGE6IHVzZXJJbmZvLmVuY3J5cHRlZERhdGEsXG4gICAgICAgICAgICBpdjogdXNlckluZm8uaXZcbiAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgcmVqZWN0KCfojrflj5bnmbvlvZXkv6Hmga/lpLHotKUnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59OyJdfQ==
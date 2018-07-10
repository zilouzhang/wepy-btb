'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SaveNetPic = function (_wepy$mixin) {
  _inherits(SaveNetPic, _wepy$mixin);

  function SaveNetPic() {
    _classCallCheck(this, SaveNetPic);

    return _possibleConstructorReturn(this, (SaveNetPic.__proto__ || Object.getPrototypeOf(SaveNetPic)).apply(this, arguments));
  }

  _createClass(SaveNetPic, [{
    key: 'saveNetPic',

    // 缓存网络图片以供画图使用
    value: function saveNetPic(key, value) {
      return new Promise(function (resolve, reject) {
        wx.getImageInfo({
          src: value,
          success: function success(res) {
            (0, _utils.setStorage)(key, res.path);
            resolve(res.path);
          },
          fail: function fail() {
            reject(value);
          }
        });
      });
    }
  }]);

  return SaveNetPic;
}(_wepy2.default.mixin);

exports.default = SaveNetPic;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhdmVOZXRQaWMuanMiXSwibmFtZXMiOlsiU2F2ZU5ldFBpYyIsImtleSIsInZhbHVlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ3eCIsImdldEltYWdlSW5mbyIsInNyYyIsInN1Y2Nlc3MiLCJyZXMiLCJwYXRoIiwiZmFpbCIsIndlcHkiLCJtaXhpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsVTs7Ozs7Ozs7Ozs7O0FBQ25COytCQUNXQyxHLEVBQUtDLEssRUFBTztBQUNyQixhQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLFdBQUdDLFlBQUgsQ0FBZ0I7QUFDZEMsZUFBS04sS0FEUztBQUVkTyxtQkFBUyxzQkFBTztBQUNkLG1DQUFXUixHQUFYLEVBQWdCUyxJQUFJQyxJQUFwQjtBQUNBUCxvQkFBUU0sSUFBSUMsSUFBWjtBQUNELFdBTGE7QUFNZEMsZ0JBQU0sZ0JBQU07QUFDVlAsbUJBQU9ILEtBQVA7QUFDRDtBQVJhLFNBQWhCO0FBVUQsT0FYTSxDQUFQO0FBWUQ7Ozs7RUFmcUNXLGVBQUtDLEs7O2tCQUF4QmQsVSIsImZpbGUiOiJzYXZlTmV0UGljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyBzZXRTdG9yYWdlIH0gZnJvbSAndXRpbHMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2F2ZU5ldFBpYyBleHRlbmRzIHdlcHkubWl4aW4ge1xuICAvLyDnvJPlrZjnvZHnu5zlm77niYfku6XkvpvnlLvlm77kvb/nlKhcbiAgc2F2ZU5ldFBpYyhrZXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHd4LmdldEltYWdlSW5mbyh7XG4gICAgICAgIHNyYzogdmFsdWUsXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgc2V0U3RvcmFnZShrZXksIHJlcy5wYXRoKTtcbiAgICAgICAgICByZXNvbHZlKHJlcy5wYXRoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICAgIHJlamVjdCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59Il19
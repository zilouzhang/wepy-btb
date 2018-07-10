'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { Host } from 'config';


var LoginAction = function (_wepy$component) {
  _inherits(LoginAction, _wepy$component);

  function LoginAction() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LoginAction);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LoginAction.__proto__ || Object.getPrototypeOf(LoginAction)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      show: {
        type: Boolean,
        twoWay: true
      }
    }, _this.methods = {
      getUserInfo: function getUserInfo(e) {
        var detail = e.detail;

        detail = detail || {};
        var _detail = detail,
            signature = _detail.signature,
            userInfo = _detail.userInfo,
            encryptedData = _detail.encryptedData,
            iv = _detail.iv;

        userInfo = userInfo || {};
        signature = signature || '';
        userInfo.signature = signature;
        userInfo.encryptedData = encryptedData;
        userInfo.iv = iv;
        var res = (0, _utils.setStorage)('userInfo', userInfo);
        if (res) {
          this.show = false;
          this.$apply();
          this.$parent.userInfo = userInfo;
          this.$parent.$apply();
          // 登录
          (0, _utils.getWxCode)().then(function (res) {
            console.log(res);
          }).catch(function (err) {
            console.log(err);
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return LoginAction;
}(_wepy2.default.component);

exports.default = LoginAction;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLWFjdGlvbi5qcyJdLCJuYW1lcyI6WyJMb2dpbkFjdGlvbiIsInByb3BzIiwic2hvdyIsInR5cGUiLCJCb29sZWFuIiwidHdvV2F5IiwibWV0aG9kcyIsImdldFVzZXJJbmZvIiwiZSIsImRldGFpbCIsInNpZ25hdHVyZSIsInVzZXJJbmZvIiwiZW5jcnlwdGVkRGF0YSIsIml2IiwicmVzIiwiJGFwcGx5IiwiJHBhcmVudCIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwiY2F0Y2giLCJlcnIiLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7O0FBREE7OztJQUVxQkEsVzs7Ozs7Ozs7Ozs7Ozs7Z01BQ25CQyxLLEdBQVE7QUFDTkMsWUFBTTtBQUNKQyxjQUFNQyxPQURGO0FBRUpDLGdCQUFRO0FBRko7QUFEQSxLLFFBTVJDLE8sR0FBVTtBQUNSQyxpQkFEUSx1QkFDSUMsQ0FESixFQUNPO0FBQUEsWUFDUEMsTUFETyxHQUNJRCxDQURKLENBQ1BDLE1BRE87O0FBRWJBLGlCQUFTQSxVQUFVLEVBQW5CO0FBRmEsc0JBR29DQSxNQUhwQztBQUFBLFlBR1BDLFNBSE8sV0FHUEEsU0FITztBQUFBLFlBR0lDLFFBSEosV0FHSUEsUUFISjtBQUFBLFlBR2NDLGFBSGQsV0FHY0EsYUFIZDtBQUFBLFlBRzZCQyxFQUg3QixXQUc2QkEsRUFIN0I7O0FBSWJGLG1CQUFXQSxZQUFZLEVBQXZCO0FBQ0FELG9CQUFZQSxhQUFhLEVBQXpCO0FBQ0FDLGlCQUFTRCxTQUFULEdBQXFCQSxTQUFyQjtBQUNBQyxpQkFBU0MsYUFBVCxHQUF5QkEsYUFBekI7QUFDQUQsaUJBQVNFLEVBQVQsR0FBY0EsRUFBZDtBQUNBLFlBQUlDLE1BQU0sdUJBQVcsVUFBWCxFQUF1QkgsUUFBdkIsQ0FBVjtBQUNBLFlBQUlHLEdBQUosRUFBUztBQUNQLGVBQUtaLElBQUwsR0FBWSxLQUFaO0FBQ0EsZUFBS2EsTUFBTDtBQUNBLGVBQUtDLE9BQUwsQ0FBYUwsUUFBYixHQUF3QkEsUUFBeEI7QUFDQSxlQUFLSyxPQUFMLENBQWFELE1BQWI7QUFDQTtBQUNBLGtDQUNHRSxJQURILENBQ1EsZUFBTztBQUNYQyxvQkFBUUMsR0FBUixDQUFZTCxHQUFaO0FBQ0QsV0FISCxFQUlHTSxLQUpILENBSVMsZUFBTztBQUNaRixvQkFBUUMsR0FBUixDQUFZRSxHQUFaO0FBQ0QsV0FOSDtBQU9EO0FBQ0Y7QUF6Qk8sSzs7OztFQVA2QkMsZUFBS0MsUzs7a0JBQXpCdkIsVyIsImZpbGUiOiJsb2dpbi1hY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuLy8gaW1wb3J0IHsgSG9zdCB9IGZyb20gJ2NvbmZpZyc7XG5pbXBvcnQgeyBzZXRTdG9yYWdlLCBnZXRXeENvZGUgfSBmcm9tICd1dGlscyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpbkFjdGlvbiBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgc2hvdzoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHR3b1dheTogdHJ1ZVxuICAgIH1cbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICBnZXRVc2VySW5mbyhlKSB7XG4gICAgICBsZXQgeyBkZXRhaWwgfSA9IGU7XG4gICAgICBkZXRhaWwgPSBkZXRhaWwgfHwge307XG4gICAgICBsZXQgeyBzaWduYXR1cmUsIHVzZXJJbmZvLCBlbmNyeXB0ZWREYXRhLCBpdiB9ID0gZGV0YWlsO1xuICAgICAgdXNlckluZm8gPSB1c2VySW5mbyB8fCB7fTtcbiAgICAgIHNpZ25hdHVyZSA9IHNpZ25hdHVyZSB8fCAnJztcbiAgICAgIHVzZXJJbmZvLnNpZ25hdHVyZSA9IHNpZ25hdHVyZTtcbiAgICAgIHVzZXJJbmZvLmVuY3J5cHRlZERhdGEgPSBlbmNyeXB0ZWREYXRhO1xuICAgICAgdXNlckluZm8uaXYgPSBpdjtcbiAgICAgIGxldCByZXMgPSBzZXRTdG9yYWdlKCd1c2VySW5mbycsIHVzZXJJbmZvKTtcbiAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgdGhpcy5zaG93ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIHRoaXMuJHBhcmVudC51c2VySW5mbyA9IHVzZXJJbmZvO1xuICAgICAgICB0aGlzLiRwYXJlbnQuJGFwcGx5KCk7XG4gICAgICAgIC8vIOeZu+W9lVxuICAgICAgICBnZXRXeENvZGUoKVxuICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbiJdfQ==
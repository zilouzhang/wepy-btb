'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _loginAction = require('./../../components/login-action.js');

var _loginAction2 = _interopRequireDefault(_loginAction);

var _utils = require('./../../utils/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserCenter = function (_wepy$page) {
  _inherits(UserCenter, _wepy$page);

  function UserCenter() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, UserCenter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UserCenter.__proto__ || Object.getPrototypeOf(UserCenter)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '个人中心'
    }, _this.$repeat = {}, _this.$props = { "login": { "xmlns:v-bind": "", "v-bind:show.sync": "showLogin" } }, _this.$events = {}, _this.components = {
      login: _loginAction2.default
    }, _this.data = {
      showLogin: false,
      userInfo: {}
    }, _this.state = {
      share: {
        share_title: '',
        share_des: '',
        share_image: ''
      }
    }, _this.methods = {
      toUrl: function toUrl(e) {
        var url = e.currentTarget.dataset.url;
        _wepy2.default.navigateTo({
          url: '/pages/' + url
        });
      },
      onShareAppMessage: function onShareAppMessage(res) {
        if (res.from === 'button') {
          return {
            title: '花生精彩播报',
            desc: '关注我就有好事花生',
            path: '/pages/index',
            imageUrl: '/images/share.jpeg',
            success: function success() {}
          };
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(UserCenter, [{
    key: 'onShow',
    value: function onShow() {
      this.userInfo = (0, _utils.getStorage)('userInfo') || {};
      if (!this.userInfo.nickName || this.userInfo.nickName === '') {
        this.showLogin = true;
      } else {
        this.showLogin = false;
      }
      this.$apply();
    }
  }]);

  return UserCenter;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(UserCenter , 'pages/user/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIlVzZXJDZW50ZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwibG9naW4iLCJMb2dpbkFjdGlvbiIsImRhdGEiLCJzaG93TG9naW4iLCJ1c2VySW5mbyIsInN0YXRlIiwic2hhcmUiLCJzaGFyZV90aXRsZSIsInNoYXJlX2RlcyIsInNoYXJlX2ltYWdlIiwibWV0aG9kcyIsInRvVXJsIiwiZSIsInVybCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwid2VweSIsIm5hdmlnYXRlVG8iLCJvblNoYXJlQXBwTWVzc2FnZSIsInJlcyIsImZyb20iLCJ0aXRsZSIsImRlc2MiLCJwYXRoIiwiaW1hZ2VVcmwiLCJzdWNjZXNzIiwibmlja05hbWUiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLFU7Ozs7Ozs7Ozs7Ozs7OzhMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLFNBQVEsRUFBQyxnQkFBZSxFQUFoQixFQUFtQixvQkFBbUIsV0FBdEMsRUFBVCxFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQyxhQUFPQztBQURHLEssUUFHWkMsSSxHQUFPO0FBQ0xDLGlCQUFXLEtBRE47QUFFTEMsZ0JBQVU7QUFGTCxLLFFBSVBDLEssR0FBUTtBQUNOQyxhQUFPO0FBQ0xDLHFCQUFhLEVBRFI7QUFFTEMsbUJBQVcsRUFGTjtBQUdMQyxxQkFBYTtBQUhSO0FBREQsSyxRQU9SQyxPLEdBQVU7QUFDUkMsV0FEUSxpQkFDRkMsQ0FERSxFQUNDO0FBQ1AsWUFBSUMsTUFBTUQsRUFBRUUsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JGLEdBQWxDO0FBQ0FHLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RKLDJCQUFlQTtBQURELFNBQWhCO0FBR0QsT0FOTztBQU9SSyx1QkFQUSw2QkFPVUMsR0FQVixFQU9lO0FBQ3JCLFlBQUlBLElBQUlDLElBQUosS0FBYSxRQUFqQixFQUEyQjtBQUN6QixpQkFBTztBQUNMQyxtQkFBTyxRQURGO0FBRUxDLGtCQUFNLFdBRkQ7QUFHTEMsa0JBQU0sY0FIRDtBQUlMQyxzQkFBVSxvQkFKTDtBQUtMQyxxQkFBUyxtQkFBVyxDQUFFO0FBTGpCLFdBQVA7QUFPRDtBQUNGO0FBakJPLEs7Ozs7OzZCQW1CRDtBQUNQLFdBQUtyQixRQUFMLEdBQWdCLHVCQUFXLFVBQVgsS0FBMEIsRUFBMUM7QUFDQSxVQUFJLENBQUMsS0FBS0EsUUFBTCxDQUFjc0IsUUFBZixJQUEyQixLQUFLdEIsUUFBTCxDQUFjc0IsUUFBZCxLQUEyQixFQUExRCxFQUE4RDtBQUM1RCxhQUFLdkIsU0FBTCxHQUFpQixJQUFqQjtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUtBLFNBQUwsR0FBaUIsS0FBakI7QUFDRDtBQUNELFdBQUt3QixNQUFMO0FBQ0Q7Ozs7RUFoRHFDWCxlQUFLWSxJOztrQkFBeEJuQyxVIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBMb2dpbkFjdGlvbiBmcm9tICdjb21wb25lbnRzL2xvZ2luLWFjdGlvbic7XG5pbXBvcnQgeyBnZXRTdG9yYWdlIH0gZnJvbSAndXRpbHMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckNlbnRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Liq5Lq65Lit5b+DJ1xuICB9O1xuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wibG9naW5cIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnNob3cuc3luY1wiOlwic2hvd0xvZ2luXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBsb2dpbjogTG9naW5BY3Rpb25cbiAgfTtcbiAgZGF0YSA9IHtcbiAgICBzaG93TG9naW46IGZhbHNlLFxuICAgIHVzZXJJbmZvOiB7fVxuICB9O1xuICBzdGF0ZSA9IHtcbiAgICBzaGFyZToge1xuICAgICAgc2hhcmVfdGl0bGU6ICcnLFxuICAgICAgc2hhcmVfZGVzOiAnJyxcbiAgICAgIHNoYXJlX2ltYWdlOiAnJ1xuICAgIH1cbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICB0b1VybChlKSB7XG4gICAgICBsZXQgdXJsID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsO1xuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgL3BhZ2VzLyR7dXJsfWBcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgICBpZiAocmVzLmZyb20gPT09ICdidXR0b24nKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGl0bGU6ICfoirHnlJ/nsr7lvanmkq3miqUnLFxuICAgICAgICAgIGRlc2M6ICflhbPms6jmiJHlsLHmnInlpb3kuovoirHnlJ8nLFxuICAgICAgICAgIHBhdGg6ICcvcGFnZXMvaW5kZXgnLFxuICAgICAgICAgIGltYWdlVXJsOiAnL2ltYWdlcy9zaGFyZS5qcGVnJyxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpIHt9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBvblNob3coKSB7XG4gICAgdGhpcy51c2VySW5mbyA9IGdldFN0b3JhZ2UoJ3VzZXJJbmZvJykgfHwge307XG4gICAgaWYgKCF0aGlzLnVzZXJJbmZvLm5pY2tOYW1lIHx8IHRoaXMudXNlckluZm8ubmlja05hbWUgPT09ICcnKSB7XG4gICAgICB0aGlzLnNob3dMb2dpbiA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvd0xvZ2luID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuJGFwcGx5KCk7XG4gIH1cbn1cbiJdfQ==
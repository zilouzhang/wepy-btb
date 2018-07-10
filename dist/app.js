'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/index', 'pages/excits/index', 'pages/detail/index', 'pages/canvas/index', 'pages/user/index', 'pages/user/about'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      },
      tabBar: {
        selectedColor: '#222222',
        list: [{
          pagePath: 'pages/index',
          text: '首页',
          selectedIconPath: 'images/default-active.png',
          iconPath: 'images/default.png'
        }, {
          pagePath: 'pages/excits/index',
          text: '精彩内容',
          selectedIconPath: 'images/excits-active.png',
          iconPath: 'images/excits.png'
        }, {
          pagePath: 'pages/user/index',
          text: '我的',
          selectedIconPath: 'images/user-active.png',
          iconPath: 'images/user.png'
        }]
      }
    };
    _this.globalData = {
      userInfo: null
    };

    _this.use('promisify');
    _this.use('requestfix');
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {}
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJzZWxlY3RlZENvbG9yIiwibGlzdCIsInBhZ2VQYXRoIiwidGV4dCIsInNlbGVjdGVkSWNvblBhdGgiLCJpY29uUGF0aCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsInVzZSIsIndlcHkiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUErQ0Usc0JBQWM7QUFBQTs7QUFBQTs7QUFBQSxVQTVDZEEsTUE0Q2MsR0E1Q0w7QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxvQkFGSyxFQUdMLG9CQUhLLEVBSUwsb0JBSkssRUFLTCxrQkFMSyxFQU1MLGtCQU5LLENBREE7QUFTUEMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsTUFGeEI7QUFHTkMsZ0NBQXdCLFFBSGxCO0FBSU5DLGdDQUF3QjtBQUpsQixPQVREO0FBZVBDLGNBQVE7QUFDTkMsdUJBQWUsU0FEVDtBQUVOQyxjQUFNLENBQ0o7QUFDRUMsb0JBQVUsYUFEWjtBQUVFQyxnQkFBTSxJQUZSO0FBR0VDLDRCQUFrQiwyQkFIcEI7QUFJRUMsb0JBQVU7QUFKWixTQURJLEVBT0o7QUFDRUgsb0JBQVUsb0JBRFo7QUFFRUMsZ0JBQU0sTUFGUjtBQUdFQyw0QkFBa0IsMEJBSHBCO0FBSUVDLG9CQUFVO0FBSlosU0FQSSxFQWFKO0FBQ0VILG9CQUFVLGtCQURaO0FBRUVDLGdCQUFNLElBRlI7QUFHRUMsNEJBQWtCLHdCQUhwQjtBQUlFQyxvQkFBVTtBQUpaLFNBYkk7QUFGQTtBQWZELEtBNENLO0FBQUEsVUFKZEMsVUFJYyxHQUpEO0FBQ1hDLGdCQUFVO0FBREMsS0FJQzs7QUFFWixVQUFLQyxHQUFMLENBQVMsV0FBVDtBQUNBLFVBQUtBLEdBQUwsQ0FBUyxZQUFUO0FBSFk7QUFJYjs7OzsrQkFFVSxDQUFFOzs7O0VBbkRjQyxlQUFLQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgY29uZmlnID0ge1xuICAgIHBhZ2VzOiBbXG4gICAgICAncGFnZXMvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL2V4Y2l0cy9pbmRleCcsXG4gICAgICAncGFnZXMvZGV0YWlsL2luZGV4JyxcbiAgICAgICdwYWdlcy9jYW52YXMvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL3VzZXIvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL3VzZXIvYWJvdXQnXG4gICAgXSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcbiAgICB9LFxuICAgIHRhYkJhcjoge1xuICAgICAgc2VsZWN0ZWRDb2xvcjogJyMyMjIyMjInLFxuICAgICAgbGlzdDogW1xuICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9pbmRleCcsXG4gICAgICAgICAgdGV4dDogJ+mmlumhtScsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlcy9kZWZhdWx0LWFjdGl2ZS5wbmcnLFxuICAgICAgICAgIGljb25QYXRoOiAnaW1hZ2VzL2RlZmF1bHQucG5nJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9leGNpdHMvaW5kZXgnLFxuICAgICAgICAgIHRleHQ6ICfnsr7lvanlhoXlrrknLFxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZXMvZXhjaXRzLWFjdGl2ZS5wbmcnLFxuICAgICAgICAgIGljb25QYXRoOiAnaW1hZ2VzL2V4Y2l0cy5wbmcnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL3VzZXIvaW5kZXgnLFxuICAgICAgICAgIHRleHQ6ICfmiJHnmoQnLFxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZXMvdXNlci1hY3RpdmUucG5nJyxcbiAgICAgICAgICBpY29uUGF0aDogJ2ltYWdlcy91c2VyLnBuZydcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfTtcblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnVzZSgncHJvbWlzaWZ5Jyk7XG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKTtcbiAgfVxuXG4gIG9uTGF1bmNoKCkge31cbn1cbiJdfQ==
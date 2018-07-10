'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _config = require('./../../config.js');

var _utils = require('./../../utils/index.js');

var _wxParse = require('./../../wxParse/wxParse.js');

var _wxParse2 = _interopRequireDefault(_wxParse);

var _loading = require('./../../components/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _toast = require('./../../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _saveNetPic = require('./../../mixins/saveNetPic.js');

var _saveNetPic2 = _interopRequireDefault(_saveNetPic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// components

// mixin


var Detail = function (_wepy$page) {
  _inherits(Detail, _wepy$page);

  function Detail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Detail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Detail.__proto__ || Object.getPrototypeOf(Detail)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      id: '0', // 文章id
      banner: '',
      bannerHeight: '0rpx', // banner高度
      bannerCanvasWidth: Math.floor(650 * _utils.ScreenWidth / 750),
      title: '',
      timer: '',
      desc: '', // 文章概要
      htmlParserTpl: {},
      qrcode: ''
    }, _this.components = {
      toast: _toast2.default,
      loading: _loading2.default
    }, _this.methods = {
      resizeBanner: function resizeBanner(e) {
        // 调整 banner 图片高度
        var detail = e.detail;

        detail = detail || {};
        var _detail = detail,
            height = _detail.height,
            width = _detail.width;

        var ratio = this.bannerCanvasWidth / width;
        var bannerCanvasHeight = height * ratio;
        this.bannerHeight = height / width * 750 + 'rpx';
        this.$apply();
        (0, _utils.setStorage)('bannerCanvasHeight', bannerCanvasHeight);
      },
      getUserInfo: function getUserInfo(e) {
        var _this2 = this;

        if ((0, _utils.isLogin)()) {
          this.getDetailQrcode();
          return false;
        }
        var detail = e.detail;

        detail = detail || {};
        var _detail2 = detail,
            signature = _detail2.signature,
            userInfo = _detail2.userInfo,
            encryptedData = _detail2.encryptedData,
            iv = _detail2.iv;

        userInfo = userInfo || {};
        signature = signature || '';
        userInfo.signature = signature;
        userInfo.encryptedData = encryptedData;
        userInfo.iv = iv;
        var res = (0, _utils.setStorage)('userInfo', userInfo);
        if (res) {
          // 登录
          (0, _utils.getWxCode)().then(function (res) {
            _this2.getDetailQrcode();
          }).catch(function () {
            _wepy2.default.showToast({
              title: '获取信息失败, 请重试',
              icon: 'none'
            });
          });
        }
      }
    }, _this.mixins = [_saveNetPic2.default], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Detail, [{
    key: 'getDetailQrcode',

    // 获取当前文章的二维码图片
    value: function getDetailQrcode() {
      var _this3 = this;

      _wepy2.default.showLoading({
        title: '正在加载...'
      });
      // 获取文章二维码
      (0, _utils.post)(_config.Host + 'login/getWxcode', {
        page: 'pages/detail/index',
        scene: encodeURIComponent(this.id),
        width: 105
      }).then(function (qrcode) {
        _wepy2.default.hideLoading();
        _this3.saveNetPic('qrcode', qrcode).then(function (res) {
          _wepy2.default.navigateTo({
            url: '/pages/canvas/index'
          });
        });
      }).catch(function (err) {
        _wepy2.default.showToast({
          title: err || '获取信息失败, 请重试',
          icon: 'none'
        });
      });
    }
    // 获取文章数据

  }, {
    key: 'getInit',
    value: function getInit(id) {
      var _this4 = this;

      this.$invoke('loading', 'showAction', true);
      (0, _utils.get)(_config.Host + 'detail/info', {
        aid: id
      }).then(function (res) {
        var img = res.img,
            title = res.title,
            time = res.time,
            desc = res.desc,
            content = res.content;

        _this4.id = id;
        _this4.banner = img || '';
        _this4.title = title || '';
        _this4.timer = time || '';
        _this4.desc = desc || '';
        _wepy2.default.setNavigationBarTitle({
          title: title
        });
        _wxParse2.default.wxParse('htmlParserName', 'html', content, _this4, 0);
        _this4.$apply();
        // save pic
        _this4.saveNetPic('banner', img).then(function () {
          (0, _utils.setStorage)('desc', desc);
        }).catch(function (err) {
          console.log(err);
        });
        _this4.$invoke('loading', 'showAction', false);
      }).catch(function (err) {
        _this4.$invoke('toast', 'show', err);
        _this4.$invoke('loading', 'showAction', false);
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(e) {
      // console.log(e);
      var id = e.id,
          scene = e.scene;

      if (scene) {
        this.getInit(scene);
      } else {
        this.getInit(id);
      }
    }
  }]);

  return Detail;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Detail , 'pages/detail/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkRldGFpbCIsImRhdGEiLCJpZCIsImJhbm5lciIsImJhbm5lckhlaWdodCIsImJhbm5lckNhbnZhc1dpZHRoIiwiTWF0aCIsImZsb29yIiwiU2NyZWVuV2lkdGgiLCJ0aXRsZSIsInRpbWVyIiwiZGVzYyIsImh0bWxQYXJzZXJUcGwiLCJxcmNvZGUiLCJjb21wb25lbnRzIiwidG9hc3QiLCJUb2FzdCIsImxvYWRpbmciLCJMb2FkaW5nIiwibWV0aG9kcyIsInJlc2l6ZUJhbm5lciIsImUiLCJkZXRhaWwiLCJoZWlnaHQiLCJ3aWR0aCIsInJhdGlvIiwiYmFubmVyQ2FudmFzSGVpZ2h0IiwiJGFwcGx5IiwiZ2V0VXNlckluZm8iLCJnZXREZXRhaWxRcmNvZGUiLCJzaWduYXR1cmUiLCJ1c2VySW5mbyIsImVuY3J5cHRlZERhdGEiLCJpdiIsInJlcyIsInRoZW4iLCJjYXRjaCIsIndlcHkiLCJzaG93VG9hc3QiLCJpY29uIiwibWl4aW5zIiwiU2F2ZU5ldFBpYyIsInNob3dMb2FkaW5nIiwiSG9zdCIsInBhZ2UiLCJzY2VuZSIsImVuY29kZVVSSUNvbXBvbmVudCIsImhpZGVMb2FkaW5nIiwic2F2ZU5ldFBpYyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJlcnIiLCIkaW52b2tlIiwiYWlkIiwiaW1nIiwidGltZSIsImNvbnRlbnQiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJXeFBhcnNlIiwid3hQYXJzZSIsImNvbnNvbGUiLCJsb2ciLCJnZXRJbml0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7OztBQUpBOztBQUdBOzs7SUFHcUJBLE07Ozs7Ozs7Ozs7Ozs7O3NMQUNuQkMsSSxHQUFPO0FBQ0xDLFVBQUksR0FEQyxFQUNJO0FBQ1RDLGNBQVEsRUFGSDtBQUdMQyxvQkFBYyxNQUhULEVBR2lCO0FBQ3RCQyx5QkFBbUJDLEtB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Q0EsZUFBS0MsT0FBTCxDQUFhLFNBQWIsRUFBd0IsWUFBeEIsRUFBc0MsS0FBdEM7QUFDRCxPQTVCSDtBQTZCRDs7OzJCQUNNL0IsQyxFQUFHO0FBQ1I7QUFEUSxVQUVGbkIsRUFGRSxHQUVZbUIsQ0FGWixDQUVGbkIsRUFGRTtBQUFBLFVBRUUyQyxLQUZGLEdBRVl4QixDQUZaLENBRUV3QixLQUZGOztBQUdSLFVBQUlBLEtBQUosRUFBVztBQUNULGFBQUtpQixPQUFMLENBQWFqQixLQUFiO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBS2lCLE9BQUwsQ0FBYTVELEVBQWI7QUFDRDtBQUNGOzs7O0VBN0hpQ21DLGVBQUtPLEk7O2tCQUFwQjVDLE0iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgSG9zdCB9IGZyb20gJ2NvbmZpZyc7XG5pbXBvcnQgeyBpc0xvZ2luLCBnZXQsIHBvc3QsIGdldFd4Q29kZSwgc2V0U3RvcmFnZSwgU2NyZWVuV2lkdGggfSBmcm9tICd1dGlscyc7XG5pbXBvcnQgV3hQYXJzZSBmcm9tICd3eFBhcnNlL3d4UGFyc2UnO1xuLy8gY29tcG9uZW50c1xuaW1wb3J0IExvYWRpbmcgZnJvbSAnY29tcG9uZW50cy9sb2FkaW5nJztcbmltcG9ydCBUb2FzdCBmcm9tICdjb21wb25lbnRzL3RvYXN0Jztcbi8vIG1peGluXG5pbXBvcnQgU2F2ZU5ldFBpYyBmcm9tICdtaXhpbnMvc2F2ZU5ldFBpYyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGRhdGEgPSB7XG4gICAgaWQ6ICcwJywgLy8g5paH56ugaWRcbiAgICBiYW5uZXI6ICcnLFxuICAgIGJhbm5lckhlaWdodDogJzBycHgnLCAvLyBiYW5uZXLpq5jluqZcbiAgICBiYW5uZXJDYW52YXNXaWR0aDogTWF0aC5mbG9vcig2NTAgKiBTY3JlZW5XaWR0aCAvIDc1MCksXG4gICAgdGl0bGU6ICcnLFxuICAgIHRpbWVyOiAnJyxcbiAgICBkZXNjOiAnJywgLy8g5paH56ug5qaC6KaBXG4gICAgaHRtbFBhcnNlclRwbDoge30sXG4gICAgcXJjb2RlOiAnJ1xuICB9O1xuICBjb21wb25lbnRzID0ge1xuICAgIHRvYXN0OiBUb2FzdCxcbiAgICBsb2FkaW5nOiBMb2FkaW5nXG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgcmVzaXplQmFubmVyKGUpIHtcbiAgICAgIC8vIOiwg+aVtCBiYW5uZXIg5Zu+54mH6auY5bqmXG4gICAgICBsZXQgeyBkZXRhaWwgfSA9IGU7XG4gICAgICBkZXRhaWwgPSBkZXRhaWwgfHwge307XG4gICAgICBsZXQgeyBoZWlnaHQsIHdpZHRoIH0gPSBkZXRhaWw7XG4gICAgICBsZXQgcmF0aW8gPSB0aGlzLmJhbm5lckNhbnZhc1dpZHRoIC8gd2lkdGg7XG4gICAgICBsZXQgYmFubmVyQ2FudmFzSGVpZ2h0ID0gaGVpZ2h0ICogcmF0aW87XG4gICAgICB0aGlzLmJhbm5lckhlaWdodCA9IGAke2hlaWdodCAvIHdpZHRoICogNzUwfXJweGA7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgc2V0U3RvcmFnZSgnYmFubmVyQ2FudmFzSGVpZ2h0JywgYmFubmVyQ2FudmFzSGVpZ2h0KTtcbiAgICB9LFxuICAgIGdldFVzZXJJbmZvKGUpIHtcbiAgICAgIGlmIChpc0xvZ2luKCkpIHtcbiAgICAgICAgdGhpcy5nZXREZXRhaWxRcmNvZGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgbGV0IHsgZGV0YWlsIH0gPSBlO1xuICAgICAgZGV0YWlsID0gZGV0YWlsIHx8IHt9O1xuICAgICAgbGV0IHsgc2lnbmF0dXJlLCB1c2VySW5mbywgZW5jcnlwdGVkRGF0YSwgaXYgfSA9IGRldGFpbDtcbiAgICAgIHVzZXJJbmZvID0gdXNlckluZm8gfHwge307XG4gICAgICBzaWduYXR1cmUgPSBzaWduYXR1cmUgfHwgJyc7XG4gICAgICB1c2VySW5mby5zaWduYXR1cmUgPSBzaWduYXR1cmU7XG4gICAgICB1c2VySW5mby5lbmNyeXB0ZWREYXRhID0gZW5jcnlwdGVkRGF0YTtcbiAgICAgIHVzZXJJbmZvLml2ID0gaXY7XG4gICAgICBsZXQgcmVzID0gc2V0U3RvcmFnZSgndXNlckluZm8nLCB1c2VySW5mbyk7XG4gICAgICBpZiAocmVzKSB7XG4gICAgICAgIC8vIOeZu+W9lVxuICAgICAgICBnZXRXeENvZGUoKVxuICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLmdldERldGFpbFFyY29kZSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfojrflj5bkv6Hmga/lpLHotKUsIOivt+mHjeivlScsXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBtaXhpbnMgPSBbU2F2ZU5ldFBpY107XG4gIC8vIOiOt+WPluW9k+WJjeaWh+eroOeahOS6jOe7tOeggeWbvueJh1xuICBnZXREZXRhaWxRcmNvZGUoKSB7XG4gICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICB0aXRsZTogJ+ato+WcqOWKoOi9vS4uLidcbiAgICB9KTtcbiAgICAvLyDojrflj5bmlofnq6Dkuoznu7TnoIFcbiAgICBwb3N0KGAke0hvc3R9bG9naW4vZ2V0V3hjb2RlYCwge1xuICAgICAgcGFnZTogJ3BhZ2VzL2RldGFpbC9pbmRleCcsXG4gICAgICBzY2VuZTogZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuaWQpLFxuICAgICAgd2lkdGg6IDEwNVxuICAgIH0pXG4gICAgICAudGhlbihxcmNvZGUgPT4ge1xuICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgIHRoaXMuc2F2ZU5ldFBpYygncXJjb2RlJywgcXJjb2RlKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy9wYWdlcy9jYW52YXMvaW5kZXgnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6IGVyciB8fCAn6I635Y+W5L+h5oGv5aSx6LSlLCDor7fph43or5UnLFxuICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG4gIC8vIOiOt+WPluaWh+eroOaVsOaNrlxuICBnZXRJbml0KGlkKSB7XG4gICAgdGhpcy4kaW52b2tlKCdsb2FkaW5nJywgJ3Nob3dBY3Rpb24nLCB0cnVlKTtcbiAgICBnZXQoYCR7SG9zdH1kZXRhaWwvaW5mb2AsIHtcbiAgICAgIGFpZDogaWRcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgbGV0IHsgaW1nLCB0aXRsZSwgdGltZSwgZGVzYywgY29udGVudCB9ID0gcmVzO1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMuYmFubmVyID0gaW1nIHx8ICcnO1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGUgfHwgJyc7XG4gICAgICAgIHRoaXMudGltZXIgPSB0aW1lIHx8ICcnO1xuICAgICAgICB0aGlzLmRlc2MgPSBkZXNjIHx8ICcnO1xuICAgICAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICAgICAgdGl0bGU6IHRpdGxlXG4gICAgICAgIH0pO1xuICAgICAgICBXeFBhcnNlLnd4UGFyc2UoJ2h0bWxQYXJzZXJOYW1lJywgJ2h0bWwnLCBjb250ZW50LCB0aGlzLCAwKTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgLy8gc2F2ZSBwaWNcbiAgICAgICAgdGhpcy5zYXZlTmV0UGljKCdiYW5uZXInLCBpbWcpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgc2V0U3RvcmFnZSgnZGVzYycsIGRlc2MpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRpbnZva2UoJ2xvYWRpbmcnLCAnc2hvd0FjdGlvbicsIGZhbHNlKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93JywgZXJyKTtcbiAgICAgICAgdGhpcy4kaW52b2tlKCdsb2FkaW5nJywgJ3Nob3dBY3Rpb24nLCBmYWxzZSk7XG4gICAgICB9KTtcbiAgfVxuICBvbkxvYWQoZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKGUpO1xuICAgIGxldCB7IGlkLCBzY2VuZSB9ID0gZTtcbiAgICBpZiAoc2NlbmUpIHtcbiAgICAgIHRoaXMuZ2V0SW5pdChzY2VuZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ2V0SW5pdChpZCk7XG4gICAgfVxuICB9XG59XG4iXX0=
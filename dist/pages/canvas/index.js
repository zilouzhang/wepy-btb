'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../../utils/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DetailCanvas = function (_wepy$page) {
  _inherits(DetailCanvas, _wepy$page);

  function DetailCanvas() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DetailCanvas);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DetailCanvas.__proto__ || Object.getPrototypeOf(DetailCanvas)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: ''
    }, _this.data = {
      headerWidth: Math.floor(650 * _utils.ScreenWidth / 750),
      footerHeight: Math.floor(418 * _utils.ScreenWidth / 750),
      footerWidth: Math.floor(650 * _utils.ScreenWidth / 750),
      textHeight: Math.floor(300 * _utils.ScreenWidth / 750),
      qrcodeWidth: Math.floor(210 * _utils.ScreenWidth / 750),
      qrcodeOffsetLeft: Math.floor(650 * _utils.ScreenWidth / 750) - (Math.floor(210 * _utils.ScreenWidth / 750) + Math.floor(28 * _utils.ScreenWidth / 750)),
      canvasHeight: Math.floor(393 * _utils.ScreenWidth / 750) + Math.floor(300 * _utils.ScreenWidth / 750) + Math.floor(250 * _utils.ScreenWidth / 750)
    }, _this.methods = {
      savePic: function savePic() {
        // 保存图片
        wx.canvasToTempFilePath({
          canvasId: 'ds',
          success: function success(res) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function success() {
                _wepy2.default.showToast({
                  title: '图片保存成功',
                  icon: 'success'
                });
              },
              fail: function fail() {
                _wepy2.default.showToast({
                  title: '图片保存失败',
                  icon: 'none'
                });
              }
            });
          },
          fail: function fail() {
            _wepy2.default.showToast({
              title: '图片加载失败',
              icon: 'none'
            });
          }
        });
      },
      cancel: function cancel() {
        // 返回上一页
        _wepy2.default.navigateBack({
          delta: 1
        });
      },
      touchStart: function touchStart() {
        // 阻止 canvas 被拖动
        return false;
      },
      touchMove: function touchMove() {
        // 阻止 canvas 被拖动
        return false;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DetailCanvas, [{
    key: 'getSuCai',

    // 获取画图素材
    value: function getSuCai() {
      var desc = (0, _utils.getStorage)('desc');
      var headPic = (0, _utils.getStorage)('banner');
      var qrcode = (0, _utils.getStorage)('qrcode');
      var bannerCanvasHeight = (0, _utils.getStorage)('bannerCanvasHeight');
      this.drawImage(desc, qrcode, headPic, bannerCanvasHeight);
    }
    // 画图

  }, {
    key: 'drawImage',
    value: function drawImage(desc, qrcode, headPic, headHeight) {
      var ctx = _wepy2.default.createCanvasContext('ds', this);
      ctx.setFillStyle('white');
      ctx.fillRect(0, 0, this.headerWidth, this.canvasHeight);
      ctx.draw();
      ctx.save();
      ctx.drawImage(headPic, 0, 0, this.headerWidth, headHeight);
      ctx.save();
      // draw text
      this.drawText(ctx, desc, headHeight);
      ctx.drawImage('/images/detail/footer.png', 0, this.canvasHeight - this.footerHeight, this.footerWidth, this.footerHeight);
      ctx.save();
      ctx.drawImage(qrcode, this.qrcodeOffsetLeft, this.canvasHeight - (this.qrcodeWidth + 5), this.qrcodeWidth, this.qrcodeWidth);
      ctx.save();
      ctx.draw(true);
    }
    // 画文本

  }, {
    key: 'drawText',
    value: function drawText(ctx, desc, headHeight) {
      var textArrays = desc.split('');
      var temp = '';
      var row = [];
      var textOffsetLeft = Math.floor(28 * _utils.ScreenWidth / 750);
      var limitWidth = Math.floor(650 * _utils.ScreenWidth / 750) - (textOffsetLeft * 2 + 10);
      var textStartOffsetTop = headHeight + Math.floor(20 * _utils.ScreenWidth / 750);
      ctx.font = '14px sans-serif';
      ctx.setFillStyle('#000000');
      textArrays.forEach(function (item) {
        if (ctx.measureText(temp).width > limitWidth) {
          row.push(temp);
          temp = '';
        }
        temp += item;
      });
      if (temp) {
        row.push(temp);
      }
      row.forEach(function (item, index) {
        ctx.fillText(item, textOffsetLeft, textStartOffsetTop + (index + 1) * 20);
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.getSuCai();
    }
  }]);

  return DetailCanvas;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(DetailCanvas , 'pages/canvas/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkRldGFpbENhbnZhcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiaGVhZGVyV2lkdGgiLCJNYXRoIiwiZmxvb3IiLCJTY3JlZW5XaWR0aCIsImZvb3RlckhlaWdodCIsImZvb3RlcldpZHRoIiwidGV4dEhlaWdodCIsInFyY29kZVdpZHRoIiwicXJjb2RlT2Zmc2V0TGVmdCIsImNhbnZhc0hlaWdodCIsIm1ldGhvZHMiLCJzYXZlUGljIiwid3giLCJjYW52YXNUb1RlbXBGaWxlUGF0aCIsImNhbnZhc0lkIiwic3VjY2VzcyIsInNhdmVJbWFnZVRvUGhvdG9zQWxidW0iLCJmaWxlUGF0aCIsInJlcyIsInRlbXBGaWxlUGF0aCIsIndlcHkiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJmYWlsIiwiY2FuY2VsIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJ0b3VjaFN0YXJ0IiwidG91Y2hNb3ZlIiwiZGVzYyIsImhlYWRQaWMiLCJxcmNvZGUiLCJiYW5uZXJDYW52YXNIZWlnaHQiLCJkcmF3SW1hZ2UiLCJoZWFkSGVpZ2h0IiwiY3R4IiwiY3JlYXRlQ2FudmFzQ29udGV4dCIsInNldEZpbGxTdHlsZSIsImZpbGxSZWN0IiwiZHJhdyIsInNhdmUiLCJkcmF3VGV4dCIsInRleHRBcnJheXMiLCJzcGxpdCIsInRlbXAiLCJyb3ciLCJ0ZXh0T2Zmc2V0TGVmdCIsImxpbWl0V2lkdGgiLCJ0ZXh0U3RhcnRPZmZzZXRUb3AiLCJmb250IiwiZm9yRWFjaCIsIm1lYXN1cmVUZXh0Iiwid2lkdGgiLCJwdXNoIiwiaXRlbSIsImluZGV4IiwiZmlsbFRleHQiLCJnZXRTdUNhaSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztB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NUNGLGNBQUlRLElBQUosQ0FBU1QsSUFBVDtBQUNBQSxpQkFBTyxFQUFQO0FBQ0Q7QUFDREEsZ0JBQVFVLElBQVI7QUFDRCxPQU5EO0FBT0EsVUFBSVYsSUFBSixFQUFVO0FBQ1JDLFlBQUlRLElBQUosQ0FBU1QsSUFBVDtBQUNEO0FBQ0RDLFVBQUlLLE9BQUosQ0FBWSxVQUFDSSxJQUFELEVBQU9DLEtBQVAsRUFBaUI7QUFDM0JwQixZQUFJcUIsUUFBSixDQUFhRixJQUFiLEVBQW1CUixjQUFuQixFQUFtQ0UscUJBQXFCLENBQUNPLFFBQVEsQ0FBVCxJQUFjLEVBQXRFO0FBQ0QsT0FGRDtBQUdEOzs7NkJBQ1E7QUFDUCxXQUFLRSxRQUFMO0FBQ0Q7Ozs7RUFoSXVDdEMsZUFBS3VDLEk7O2tCQUExQi9ELFkiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgU2NyZWVuV2lkdGgsIGdldFN0b3JhZ2UgfSBmcm9tICd1dGlscyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXRhaWxDYW52YXMgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJydcbiAgfTtcbiAgZGF0YSA9IHtcbiAgICBoZWFkZXJXaWR0aDogTWF0aC5mbG9vcig2NTAgKiBTY3JlZW5XaWR0aCAvIDc1MCksXG4gICAgZm9vdGVySGVpZ2h0OiBNYXRoLmZsb29yKDQxOCAqIFNjcmVlbldpZHRoIC8gNzUwKSxcbiAgICBmb290ZXJXaWR0aDogTWF0aC5mbG9vcig2NTAgKiBTY3JlZW5XaWR0aCAvIDc1MCksXG4gICAgdGV4dEhlaWdodDogTWF0aC5mbG9vcigzMDAgKiBTY3JlZW5XaWR0aCAvIDc1MCksXG4gICAgcXJjb2RlV2lkdGg6IE1hdGguZmxvb3IoMjEwICogU2NyZWVuV2lkdGggLyA3NTApLFxuICAgIHFyY29kZU9mZnNldExlZnQ6XG4gICAgICBNYXRoLmZsb29yKDY1MCAqIFNjcmVlbldpZHRoIC8gNzUwKSAtXG4gICAgICAoTWF0aC5mbG9vcigyMTAgKiBTY3JlZW5XaWR0aCAvIDc1MCkgK1xuICAgICAgICBNYXRoLmZsb29yKDI4ICogU2NyZWVuV2lkdGggLyA3NTApKSxcbiAgICBjYW52YXNIZWlnaHQ6XG4gICAgICBNYXRoLmZsb29yKDM5MyAqIFNjcmVlbldpZHRoIC8gNzUwKSArXG4gICAgICBNYXRoLmZsb29yKDMwMCAqIFNjcmVlbldpZHRoIC8gNzUwKSArXG4gICAgICBNYXRoLmZsb29yKDI1MCAqIFNjcmVlbldpZHRoIC8gNzUwKVxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIHNhdmVQaWMoKSB7XG4gICAgICAvLyDkv53lrZjlm77niYdcbiAgICAgIHd4LmNhbnZhc1RvVGVtcEZpbGVQYXRoKHtcbiAgICAgICAgY2FudmFzSWQ6ICdkcycsXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgd3guc2F2ZUltYWdlVG9QaG90b3NBbGJ1bSh7XG4gICAgICAgICAgICBmaWxlUGF0aDogcmVzLnRlbXBGaWxlUGF0aCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5Zu+54mH5L+d5a2Y5oiQ5YqfJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcydcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICflm77niYfkv53lrZjlpLHotKUnLFxuICAgICAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn5Zu+54mH5Yqg6L295aSx6LSlJyxcbiAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGNhbmNlbCgpIHtcbiAgICAgIC8vIOi/lOWbnuS4iuS4gOmhtVxuICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICBkZWx0YTogMVxuICAgICAgfSk7XG4gICAgfSxcbiAgICB0b3VjaFN0YXJ0KCkge1xuICAgICAgLy8g6Zi75q2iIGNhbnZhcyDooqvmi5bliqhcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIHRvdWNoTW92ZSgpIHtcbiAgICAgIC8vIOmYu+atoiBjYW52YXMg6KKr5ouW5YqoXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuICAvLyDojrflj5bnlLvlm77ntKDmnZBcbiAgZ2V0U3VDYWkoKSB7XG4gICAgbGV0IGRlc2MgPSBnZXRTdG9yYWdlKCdkZXNjJyk7XG4gICAgbGV0IGhlYWRQaWMgPSBnZXRTdG9yYWdlKCdiYW5uZXInKTtcbiAgICBsZXQgcXJjb2RlID0gZ2V0U3RvcmFnZSgncXJjb2RlJyk7XG4gICAgbGV0IGJhbm5lckNhbnZhc0hlaWdodCA9IGdldFN0b3JhZ2UoJ2Jhbm5lckNhbnZhc0hlaWdodCcpO1xuICAgIHRoaXMuZHJhd0ltYWdlKGRlc2MsIHFyY29kZSwgaGVhZFBpYywgYmFubmVyQ2FudmFzSGVpZ2h0KTtcbiAgfVxuICAvLyDnlLvlm75cbiAgZHJhd0ltYWdlKGRlc2MsIHFyY29kZSwgaGVhZFBpYywgaGVhZEhlaWdodCkge1xuICAgIGNvbnN0IGN0eCA9IHdlcHkuY3JlYXRlQ2FudmFzQ29udGV4dCgnZHMnLCB0aGlzKTtcbiAgICBjdHguc2V0RmlsbFN0eWxlKCd3aGl0ZScpO1xuICAgIGN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLmhlYWRlcldpZHRoLCB0aGlzLmNhbnZhc0hlaWdodCk7XG4gICAgY3R4LmRyYXcoKTtcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5kcmF3SW1hZ2UoaGVhZFBpYywgMCwgMCwgdGhpcy5oZWFkZXJXaWR0aCwgaGVhZEhlaWdodCk7XG4gICAgY3R4LnNhdmUoKTtcbiAgICAvLyBkcmF3IHRleHRcbiAgICB0aGlzLmRyYXdUZXh0KGN0eCwgZGVzYywgaGVhZEhlaWdodCk7XG4gICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICcvaW1hZ2VzL2RldGFpbC9mb290ZXIucG5nJyxcbiAgICAgIDAsXG4gICAgICB0aGlzLmNhbnZhc0hlaWdodCAtIHRoaXMuZm9vdGVySGVpZ2h0LFxuICAgICAgdGhpcy5mb290ZXJXaWR0aCxcbiAgICAgIHRoaXMuZm9vdGVySGVpZ2h0XG4gICAgKTtcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICBxcmNvZGUsXG4gICAgICB0aGlzLnFyY29kZU9mZnNldExlZnQsXG4gICAgICB0aGlzLmNhbnZhc0hlaWdodCAtICh0aGlzLnFyY29kZVdpZHRoICsgNSksXG4gICAgICB0aGlzLnFyY29kZVdpZHRoLFxuICAgICAgdGhpcy5xcmNvZGVXaWR0aFxuICAgICk7XG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguZHJhdyh0cnVlKTtcbiAgfVxuICAvLyDnlLvmlofmnKxcbiAgZHJhd1RleHQoY3R4LCBkZXNjLCBoZWFkSGVpZ2h0KSB7XG4gICAgY29uc3QgdGV4dEFycmF5cyA9IGRlc2Muc3BsaXQoJycpO1xuICAgIGxldCB0ZW1wID0gJyc7XG4gICAgbGV0IHJvdyA9IFtdO1xuICAgIGNvbnN0IHRleHRPZmZzZXRMZWZ0ID0gTWF0aC5mbG9vcigyOCAqIFNjcmVlbldpZHRoIC8gNzUwKTtcbiAgICBjb25zdCBsaW1pdFdpZHRoID1cbiAgICAgIE1hdGguZmxvb3IoNjUwICogU2NyZWVuV2lkdGggLyA3NTApIC0gKHRleHRPZmZzZXRMZWZ0ICogMiArIDEwKTtcbiAgICBjb25zdCB0ZXh0U3RhcnRPZmZzZXRUb3AgPSBoZWFkSGVpZ2h0ICsgTWF0aC5mbG9vcigyMCAqIFNjcmVlbldpZHRoIC8gNzUwKTtcbiAgICBjdHguZm9udCA9ICcxNHB4IHNhbnMtc2VyaWYnO1xuICAgIGN0eC5zZXRGaWxsU3R5bGUoJyMwMDAwMDAnKTtcbiAgICB0ZXh0QXJyYXlzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoY3R4Lm1lYXN1cmVUZXh0KHRlbXApLndpZHRoID4gbGltaXRXaWR0aCkge1xuICAgICAgICByb3cucHVzaCh0ZW1wKTtcbiAgICAgICAgdGVtcCA9ICcnO1xuICAgICAgfVxuICAgICAgdGVtcCArPSBpdGVtO1xuICAgIH0pO1xuICAgIGlmICh0ZW1wKSB7XG4gICAgICByb3cucHVzaCh0ZW1wKTtcbiAgICB9XG4gICAgcm93LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICBjdHguZmlsbFRleHQoaXRlbSwgdGV4dE9mZnNldExlZnQsIHRleHRTdGFydE9mZnNldFRvcCArIChpbmRleCArIDEpICogMjApO1xuICAgIH0pO1xuICB9XG4gIG9uU2hvdygpIHtcbiAgICB0aGlzLmdldFN1Q2FpKCk7XG4gIH1cbn1cbiJdfQ==
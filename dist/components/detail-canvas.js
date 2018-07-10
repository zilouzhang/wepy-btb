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

var DetailCanvas = function (_wepy$component) {
  _inherits(DetailCanvas, _wepy$component);

  function DetailCanvas() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DetailCanvas);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DetailCanvas.__proto__ || Object.getPrototypeOf(DetailCanvas)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      show: false,
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
        var that = this;
        wx.canvasToTempFilePath({
          canvasId: 'ds',
          success: function success(res) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function success() {
                that.show = false;
                that.$apply();
                that.$emit('drawResult', '图片保存成功');
              },
              fail: function fail() {
                that.$emit('drawResult', '图片保存失败');
              }
            });
          },
          fail: function fail() {
            that.$emit('drawResult', '图片加载失败');
          }
        });
      },
      close: function close() {
        // 关闭分享弹窗
        this.show = false;
        this.$apply();
      },
      touchStart: function touchStart() {
        // 阻止 canvas 被拖动
        return false;
      },
      touchMove: function touchMove() {
        // 阻止 canvas 被拖动
        return false;
      }
    }, _this.events = {
      getQrcode: function getQrcode(text, headHeight) {
        _this.show = true;
        _this.$apply();
        var headPic = (0, _utils.getStorage)('banner');
        var qrcode = (0, _utils.getStorage)('qrcode');
        // console.log(headPic, qrcode);
        _this.drawImage(text, qrcode, headPic, headHeight);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DetailCanvas, [{
    key: 'drawImage',

    // 画图
    value: function drawImage(text, qrcode, headPic, headHeight) {
      var ctx = _wepy2.default.createCanvasContext('ds', this);
      ctx.setFillStyle('white');
      ctx.fillRect(0, 0, this.headerWidth, this.canvasHeight);
      ctx.draw();
      ctx.save();
      ctx.drawImage(headPic, 0, 0, this.headerWidth, headHeight);
      ctx.save();
      // draw text
      this.drawText(ctx, text, headHeight);
      ctx.drawImage('/images/detail/footer.png', 0, this.canvasHeight - this.footerHeight, this.footerWidth, this.footerHeight);
      ctx.save();
      ctx.drawImage(qrcode, this.qrcodeOffsetLeft, this.canvasHeight - (this.qrcodeWidth + 5), this.qrcodeWidth, this.qrcodeWidth);
      ctx.save();
      ctx.draw(true);
    }
    // 画文本

  }, {
    key: 'drawText',
    value: function drawText(ctx, text, headHeight) {
      var textArrays = text.split('');
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
  }]);

  return DetailCanvas;
}(_wepy2.default.component);

exports.default = DetailCanvas;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC1jYW52YXMuanMiXSwibmFtZXMiOlsiRGV0YWlsQ2FudmFzIiwiZGF0YSIsInNob3ciLCJoZWFkZXJXaWR0aCIsIk1hdGgiLCJmbG9vciIsIlNjcmVlbldpZHRoIiwiZm9vdGVySGVpZ2h0IiwiZm9vdGVyV2lkdGgiLCJ0ZXh0SGVpZ2h0IiwicXJjb2RlV2lkdGgiLCJxcmNvZGVPZmZzZXRMZWZ0IiwiY2FudmFzSGVpZ2h0IiwibWV0aG9kcyIsInNhdmVQaWMiLCJ0aGF0Iiwid3giLCJjYW52YXNUb1RlbXBGaWxlUGF0aCIsImNhbnZhc0lkIiwic3VjY2VzcyIsInNhdmVJbWFnZVRvUGhvdG9zQWxidW0iLCJmaWxlUGF0aCIsInJlcyIsInRlbXBGaWxlUGF0aCIsIiRhcHBseSIsIiRlbWl0IiwiZmFpbCIsImNsb3NlIiwidG91Y2hTdGFydCIsInRvdWNoTW92ZSIsImV2ZW50cyIsImdldFFyY29kZSIsInRleHQiLCJoZWFkSGVpZ2h0IiwiaGVhZFBpYyIsInFyY29kZSIsImRyYXdJbWFnZSIsImN0eCIsIndlcHkiLCJjcmVhdGVDYW52YXNDb250ZXh0Iiwic2V0RmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJkcmF3Iiwic2F2ZSIsImRyYXdUZXh0IiwidGV4dEFycmF5cyIsInNwbGl0IiwidGVtcCIsInJvdyIsInRleHRPZmZzZXRMZWZ0IiwibGltaXRXaWR0aCIsInRleHRTdGFydE9mZnNldFRvcCIsImZvbnQiLCJmb3JFYWNoIiwibWVhc3VyZVRleHQiLCJ3aWR0aCIsInB1c2giLCJpdGVtIiwiaW5kZXgiLCJmaWxsVGV4dCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsWTs7Ozs7Ozs7Ozs7Ozs7a01BQ25CQyxJLEdBQU87QUFDTEMsWUFBTSxLQUREO0FBRUxDLG1CQUFhQyxLQUFLQyxLQUFMLENBQVcsTUFBTUMsa0JBQU4sR0FBb0IsR0FBL0IsQ0FGUjtBQUdMQyxvQkFBY0gs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QUFDREEsZ0JBQVFVLElBQVI7QUFDRCxPQU5EO0FBT0EsVUFBSVYsSUFBSixFQUFVO0FBQ1JDLFlBQUlRLElBQUosQ0FBU1QsSUFBVDtBQUNEO0FBQ0RDLFVBQUlLLE9BQUosQ0FBWSxVQUFDSSxJQUFELEVBQU9DLEtBQVAsRUFBaUI7QUFDM0JyQixZQUFJc0IsUUFBSixDQUFhRixJQUFiLEVBQW1CUixjQUFuQixFQUFtQ0UscUJBQXFCLENBQUNPLFFBQVEsQ0FBVCxJQUFjLEVBQXRFO0FBQ0QsT0FGRDtBQUdEOzs7O0VBdEh1Q3BCLGVBQUtzQixTOztrQkFBMUI1RCxZIiwiZmlsZSI6ImRldGFpbC1jYW52YXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgU2NyZWVuV2lkdGgsIGdldFN0b3JhZ2UgfSBmcm9tICd1dGlscyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXRhaWxDYW52YXMgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIGRhdGEgPSB7XG4gICAgc2hvdzogZmFsc2UsXG4gICAgaGVhZGVyV2lkdGg6IE1hdGguZmxvb3IoNjUwICogU2NyZWVuV2lkdGggLyA3NTApLFxuICAgIGZvb3RlckhlaWdodDogTWF0aC5mbG9vcig0MTggKiBTY3JlZW5XaWR0aCAvIDc1MCksXG4gICAgZm9vdGVyV2lkdGg6IE1hdGguZmxvb3IoNjUwICogU2NyZWVuV2lkdGggLyA3NTApLFxuICAgIHRleHRIZWlnaHQ6IE1hdGguZmxvb3IoMzAwICogU2NyZWVuV2lkdGggLyA3NTApLFxuICAgIHFyY29kZVdpZHRoOiBNYXRoLmZsb29yKDIxMCAqIFNjcmVlbldpZHRoIC8gNzUwKSxcbiAgICBxcmNvZGVPZmZzZXRMZWZ0OlxuICAgICAgTWF0aC5mbG9vcig2NTAgKiBTY3JlZW5XaWR0aCAvIDc1MCkgLVxuICAgICAgKE1hdGguZmxvb3IoMjEwICogU2NyZWVuV2lkdGggLyA3NTApICtcbiAgICAgICAgTWF0aC5mbG9vcigyOCAqIFNjcmVlbldpZHRoIC8gNzUwKSksXG4gICAgY2FudmFzSGVpZ2h0OlxuICAgICAgTWF0aC5mbG9vcigzOTMgKiBTY3JlZW5XaWR0aCAvIDc1MCkgK1xuICAgICAgTWF0aC5mbG9vcigzMDAgKiBTY3JlZW5XaWR0aCAvIDc1MCkgK1xuICAgICAgTWF0aC5mbG9vcigyNTAgKiBTY3JlZW5XaWR0aCAvIDc1MClcbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICBzYXZlUGljKCkge1xuICAgICAgLy8g5L+d5a2Y5Zu+54mHXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICB3eC5jYW52YXNUb1RlbXBGaWxlUGF0aCh7XG4gICAgICAgIGNhbnZhc0lkOiAnZHMnLFxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIHd4LnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xuICAgICAgICAgICAgZmlsZVBhdGg6IHJlcy50ZW1wRmlsZVBhdGgsXG4gICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoYXQuc2hvdyA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgICAgICAgICB0aGF0LiRlbWl0KCdkcmF3UmVzdWx0JywgJ+WbvueJh+S/neWtmOaIkOWKnycpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgICAgICAgdGhhdC4kZW1pdCgnZHJhd1Jlc3VsdCcsICflm77niYfkv53lrZjlpLHotKUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICAgIHRoYXQuJGVtaXQoJ2RyYXdSZXN1bHQnLCAn5Zu+54mH5Yqg6L295aSx6LSlJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgY2xvc2UoKSB7XG4gICAgICAvLyDlhbPpl63liIbkuqvlvLnnqpdcbiAgICAgIHRoaXMuc2hvdyA9IGZhbHNlO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9LFxuICAgIHRvdWNoU3RhcnQoKSB7XG4gICAgICAvLyDpmLvmraIgY2FudmFzIOiiq+aLluWKqFxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgdG91Y2hNb3ZlKCkge1xuICAgICAgLy8g6Zi75q2iIGNhbnZhcyDooqvmi5bliqhcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG4gIGV2ZW50cyA9IHtcbiAgICBnZXRRcmNvZGU6ICh0ZXh0LCBoZWFkSGVpZ2h0KSA9PiB7XG4gICAgICB0aGlzLnNob3cgPSB0cnVlO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIGxldCBoZWFkUGljID0gZ2V0U3RvcmFnZSgnYmFubmVyJyk7XG4gICAgICBsZXQgcXJjb2RlID0gZ2V0U3RvcmFnZSgncXJjb2RlJyk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhoZWFkUGljLCBxcmNvZGUpO1xuICAgICAgdGhpcy5kcmF3SW1hZ2UodGV4dCwgcXJjb2RlLCBoZWFkUGljLCBoZWFkSGVpZ2h0KTtcbiAgICB9XG4gIH07XG4gIC8vIOeUu+WbvlxuICBkcmF3SW1hZ2UodGV4dCwgcXJjb2RlLCBoZWFkUGljLCBoZWFkSGVpZ2h0KSB7XG4gICAgY29uc3QgY3R4ID0gd2VweS5jcmVhdGVDYW52YXNDb250ZXh0KCdkcycsIHRoaXMpO1xuICAgIGN0eC5zZXRGaWxsU3R5bGUoJ3doaXRlJyk7XG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMuaGVhZGVyV2lkdGgsIHRoaXMuY2FudmFzSGVpZ2h0KTtcbiAgICBjdHguZHJhdygpO1xuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmRyYXdJbWFnZShoZWFkUGljLCAwLCAwLCB0aGlzLmhlYWRlcldpZHRoLCBoZWFkSGVpZ2h0KTtcbiAgICBjdHguc2F2ZSgpO1xuICAgIC8vIGRyYXcgdGV4dFxuICAgIHRoaXMuZHJhd1RleHQoY3R4LCB0ZXh0LCBoZWFkSGVpZ2h0KTtcbiAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgJy9pbWFnZXMvZGV0YWlsL2Zvb3Rlci5wbmcnLFxuICAgICAgMCxcbiAgICAgIHRoaXMuY2FudmFzSGVpZ2h0IC0gdGhpcy5mb290ZXJIZWlnaHQsXG4gICAgICB0aGlzLmZvb3RlcldpZHRoLFxuICAgICAgdGhpcy5mb290ZXJIZWlnaHRcbiAgICApO1xuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmRyYXdJbWFnZShcbiAgICAgIHFyY29kZSxcbiAgICAgIHRoaXMucXJjb2RlT2Zmc2V0TGVmdCxcbiAgICAgIHRoaXMuY2FudmFzSGVpZ2h0IC0gKHRoaXMucXJjb2RlV2lkdGggKyA1KSxcbiAgICAgIHRoaXMucXJjb2RlV2lkdGgsXG4gICAgICB0aGlzLnFyY29kZVdpZHRoXG4gICAgKTtcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5kcmF3KHRydWUpO1xuICB9XG4gIC8vIOeUu+aWh+acrFxuICBkcmF3VGV4dChjdHgsIHRleHQsIGhlYWRIZWlnaHQpIHtcbiAgICBjb25zdCB0ZXh0QXJyYXlzID0gdGV4dC5zcGxpdCgnJyk7XG4gICAgbGV0IHRlbXAgPSAnJztcbiAgICBsZXQgcm93ID0gW107XG4gICAgY29uc3QgdGV4dE9mZnNldExlZnQgPSBNYXRoLmZsb29yKDI4ICogU2NyZWVuV2lkdGggLyA3NTApO1xuICAgIGNvbnN0IGxpbWl0V2lkdGggPVxuICAgICAgTWF0aC5mbG9vcig2NTAgKiBTY3JlZW5XaWR0aCAvIDc1MCkgLSAodGV4dE9mZnNldExlZnQgKiAyICsgMTApO1xuICAgIGNvbnN0IHRleHRTdGFydE9mZnNldFRvcCA9IGhlYWRIZWlnaHQgKyBNYXRoLmZsb29yKDIwICogU2NyZWVuV2lkdGggLyA3NTApO1xuICAgIGN0eC5mb250ID0gJzE0cHggc2Fucy1zZXJpZic7XG4gICAgY3R4LnNldEZpbGxTdHlsZSgnIzAwMDAwMCcpO1xuICAgIHRleHRBcnJheXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChjdHgubWVhc3VyZVRleHQodGVtcCkud2lkdGggPiBsaW1pdFdpZHRoKSB7XG4gICAgICAgIHJvdy5wdXNoKHRlbXApO1xuICAgICAgICB0ZW1wID0gJyc7XG4gICAgICB9XG4gICAgICB0ZW1wICs9IGl0ZW07XG4gICAgfSk7XG4gICAgaWYgKHRlbXApIHtcbiAgICAgIHJvdy5wdXNoKHRlbXApO1xuICAgIH1cbiAgICByb3cuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIGN0eC5maWxsVGV4dChpdGVtLCB0ZXh0T2Zmc2V0TGVmdCwgdGV4dFN0YXJ0T2Zmc2V0VG9wICsgKGluZGV4ICsgMSkgKiAyMCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toast = function (_wepy$component) {
  _inherits(Toast, _wepy$component);

  function Toast() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Toast);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Toast.__proto__ || Object.getPrototypeOf(Toast)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      show: false,
      text: ''
    }, _this.methods = {
      show: function show(text) {
        if (text) {
          this.text = text;
          this.show = true;
          this.hide();
        }
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Toast, [{
    key: 'hide',
    value: function hide() {
      var _this2 = this;

      setTimeout(function () {
        _this2.show = false;
        _this2.$apply();
      }, 3000);
    }
  }]);

  return Toast;
}(_wepy2.default.component);

exports.default = Toast;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvYXN0LmpzIl0sIm5hbWVzIjpbIlRvYXN0IiwiZGF0YSIsInNob3ciLCJ0ZXh0IiwibWV0aG9kcyIsImhpZGUiLCJldmVudHMiLCJzZXRUaW1lb3V0IiwiJGFwcGx5Iiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxJLEdBQU87QUFDTEMsWUFBTSxLQUREO0FBRUxDLFlBQU07QUFGRCxLLFFBSVBDLE8sR0FBVTtBQUNSRixVQURRLGdCQUNIQyxJQURHLEVBQ0c7QUFDVCxZQUFJQSxJQUFKLEVBQVU7QUFDUixlQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQSxlQUFLRCxJQUFMLEdBQVksSUFBWjtBQUNBLGVBQUtHLElBQUw7QUFDRDtBQUNGO0FBUE8sSyxRQVNWQyxNLEdBQVMsRTs7Ozs7MkJBQ0Y7QUFBQTs7QUFDTEMsaUJBQVcsWUFBTTtBQUNmLGVBQUtMLElBQUwsR0FBWSxLQUFaO0FBQ0EsZUFBS00sTUFBTDtBQUNELE9BSEQsRUFHRyxJQUhIO0FBSUQ7Ozs7RUFwQmdDQyxlQUFLQyxTOztrQkFBbkJWLEsiLCJmaWxlIjoidG9hc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9hc3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIGRhdGEgPSB7XG4gICAgc2hvdzogZmFsc2UsXG4gICAgdGV4dDogJydcbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICBzaG93KHRleHQpIHtcbiAgICAgIGlmICh0ZXh0KSB7XG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgICAgIHRoaXMuc2hvdyA9IHRydWU7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgZXZlbnRzID0ge307XG4gIGhpZGUoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNob3cgPSBmYWxzZTtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfSwgMzAwMCk7XG4gIH1cbn1cbiJdfQ==
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

var PageMixin = function (_wepy$mixin) {
  _inherits(PageMixin, _wepy$mixin);

  function PageMixin() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PageMixin);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PageMixin.__proto__ || Object.getPrototypeOf(PageMixin)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      hasMore: true
    }, _this.methods = {
      pageScrollTo: function pageScrollTo() {
        _wepy2.default.pageScrollTo({
          scrollTop: top || 0,
          duration: duration || 300
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PageMixin, [{
    key: 'onReachBottom',
    value: function onReachBottom() {
      this.loadMore();
    }
  }, {
    key: 'loadMore',
    value: function loadMore() {
      if (!this.hasMore) {
        return false;
      }
      this.getList();
    }
  }]);

  return PageMixin;
}(_wepy2.default.mixin);

exports.default = PageMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRNb3JlLmpzIl0sIm5hbWVzIjpbIlBhZ2VNaXhpbiIsImRhdGEiLCJoYXNNb3JlIiwibWV0aG9kcyIsInBhZ2VTY3JvbGxUbyIsIndlcHkiLCJzY3JvbGxUb3AiLCJ0b3AiLCJkdXJhdGlvbiIsImxvYWRNb3JlIiwiZ2V0TGlzdCIsIm1peGluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFVbkJDLEksR0FBTztBQUNMQyxlQUFTO0FBREosSyxRQUdQQyxPLEdBQVU7QUFDUkMsa0JBRFEsMEJBQ087QUFDYkMsdUJBQUtELFlBQUwsQ0FBa0I7QUFDaEJFLHFCQUFXQyxPQUFPLENBREY7QUFFaEJDLG9CQUFVQSxZQUFZO0FBRk4sU0FBbEI7QUFJRDtBQU5PLEs7Ozs7O29DQVpNO0FBQ2QsV0FBS0MsUUFBTDtBQUNEOzs7K0JBQ1U7QUFDVCxVQUFJLENBQUMsS0FBS1AsT0FBVixFQUFtQjtBQUNqQixlQUFPLEtBQVA7QUFDRDtBQUNELFdBQUtRLE9BQUw7QUFDRDs7OztFQVRvQ0wsZUFBS00sSzs7a0JBQXZCWCxTIiwiZmlsZSI6ImxvYWRNb3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlTWl4aW4gZXh0ZW5kcyB3ZXB5Lm1peGluIHtcbiAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICB0aGlzLmxvYWRNb3JlKCk7XG4gIH1cbiAgbG9hZE1vcmUoKSB7XG4gICAgaWYgKCF0aGlzLmhhc01vcmUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5nZXRMaXN0KCk7XG4gIH1cbiAgZGF0YSA9IHtcbiAgICBoYXNNb3JlOiB0cnVlXG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgcGFnZVNjcm9sbFRvKCkge1xuICAgICAgd2VweS5wYWdlU2Nyb2xsVG8oe1xuICAgICAgICBzY3JvbGxUb3A6IHRvcCB8fCAwLFxuICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24gfHwgMzAwXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59Il19
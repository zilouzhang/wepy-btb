'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_wepy$component) {
  _inherits(Header, _wepy$component);

  function Header() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Header);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Header.__proto__ || Object.getPrototypeOf(Header)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      banner: Object,
      showDots: {
        type: Boolean,
        default: false
      },
      autoPlay: {
        type: Boolean,
        default: false
      }
    }, _this.methods = {
      resizePic: function resizePic(e) {
        var detail = e.detail,
            currentTarget = e.currentTarget;

        detail = detail || {};
        var dataset = currentTarget.dataset;
        var id = dataset.id;
        var _detail = detail,
            height = _detail.height,
            width = _detail.width;

        this.banner = this.banner.map(function (item) {
          if (item.id === id) {
            item.height = height / width * 750 + 'rpx';
          }
          return item;
        });
        this.$apply();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Header;
}(_wepy2.default.component);

exports.default = Header;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci5qcyJdLCJuYW1lcyI6WyJIZWFkZXIiLCJwcm9wcyIsImJhbm5lciIsIk9iamVjdCIsInNob3dEb3RzIiwidHlwZSIsIkJvb2xlYW4iLCJkZWZhdWx0IiwiYXV0b1BsYXkiLCJtZXRob2RzIiwicmVzaXplUGljIiwiZSIsImRldGFpbCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJoZWlnaHQiLCJ3aWR0aCIsIm1hcCIsIml0ZW0iLCIkYXBwbHkiLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsTTs7Ozs7Ozs7Ozs7Ozs7c0xBQ25CQyxLLEdBQVE7QUFDTkMsY0FBUUMsTUFERjtBQUVOQyxnQkFBVTtBQUNSQyxjQUFNQyxPQURFO0FBRVJDLGlCQUFTO0FBRkQsT0FGSjtBQU1OQyxnQkFBVTtBQUNSSCxjQUFNQyxPQURFO0FBRVJDLGlCQUFTO0FBRkQ7QUFOSixLLFFBV1JFLE8sR0FBVTtBQUNSQyxlQURRLHFCQUNFQyxDQURGLEVBQ0s7QUFBQSxZQUNMQyxNQURLLEdBQ3FCRCxDQURyQixDQUNMQyxNQURLO0FBQUEsWUFDR0MsYUFESCxHQUNxQkYsQ0FEckIsQ0FDR0UsYUFESDs7QUFFWEQsaUJBQVNBLFVBQVUsRUFBbkI7QUFGVyxZQUdMRSxPQUhLLEdBR09ELGFBSFAsQ0FHTEMsT0FISztBQUFBLFlBSUxDLEVBSkssR0FJRUQsT0FKRixDQUlMQyxFQUpLO0FBQUEsc0JBS2FILE1BTGI7QUFBQSxZQUtMSSxNQUxLLFdBS0xBLE1BTEs7QUFBQSxZQUtHQyxLQUxILFdBS0dBLEtBTEg7O0FBTVgsYUFBS2YsTUFBTCxHQUFjLEtBQUtBLE1BQUwsQ0FBWWdCLEdBQVosQ0FBZ0IsZ0JBQVE7QUFDcEMsY0FBSUMsS0FBS0osRUFBTCxLQUFZQSxFQUFoQixFQUFvQjtBQUNsQkksaUJBQUtILE1BQUwsR0FBaUJBLFNBQVNDLEtBQVQsR0FBaUIsR0FBbEM7QUFDRDtBQUNELGlCQUFPRSxJQUFQO0FBQ0QsU0FMYSxDQUFkO0FBTUEsYUFBS0MsTUFBTDtBQUNEO0FBZE8sSzs7OztFQVp3QkMsZUFBS0MsUzs7a0JBQXBCdEIsTSIsImZpbGUiOiJoZWFkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhZGVyIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICBiYW5uZXI6IE9iamVjdCxcbiAgICBzaG93RG90czoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBhdXRvUGxheToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfVxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIHJlc2l6ZVBpYyhlKSB7XG4gICAgICBsZXQgeyBkZXRhaWwsIGN1cnJlbnRUYXJnZXQgfSA9IGU7XG4gICAgICBkZXRhaWwgPSBkZXRhaWwgfHwge307XG4gICAgICBsZXQgeyBkYXRhc2V0IH0gPSBjdXJyZW50VGFyZ2V0O1xuICAgICAgbGV0IHsgaWQgfSA9IGRhdGFzZXQ7XG4gICAgICBsZXQgeyBoZWlnaHQsIHdpZHRoIH0gPSBkZXRhaWw7XG4gICAgICB0aGlzLmJhbm5lciA9IHRoaXMuYmFubmVyLm1hcChpdGVtID0+IHtcbiAgICAgICAgaWYgKGl0ZW0uaWQgPT09IGlkKSB7XG4gICAgICAgICAgaXRlbS5oZWlnaHQgPSBgJHtoZWlnaHQgLyB3aWR0aCAqIDc1MH1ycHhgO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfSk7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==
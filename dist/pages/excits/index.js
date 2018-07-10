'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _config = require('./../../config.js');

var _utils = require('./../../utils/index.js');

var _header = require('./../../components/header.js');

var _header2 = _interopRequireDefault(_header);

var _excitsLists = require('./../../components/excits-lists.js');

var _excitsLists2 = _interopRequireDefault(_excitsLists);

var _hasMoreTip = require('./../../components/has-more-tip.js');

var _hasMoreTip2 = _interopRequireDefault(_hasMoreTip);

var _toast = require('./../../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _loadMore = require('./../../mixins/loadMore.js');

var _loadMore2 = _interopRequireDefault(_loadMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// components

// mixins


var Excits = function (_wepy$page) {
  _inherits(Excits, _wepy$page);

  function Excits() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Excits);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Excits.__proto__ || Object.getPrototypeOf(Excits)).call.apply(_ref, [this].concat(args))), _this), _this.page = 1, _this.config = {
      navigationBarTitleText: '精彩内容'
    }, _this.$repeat = {}, _this.$props = { "header": { "xmlns:v-bind": "", "v-bind:banner.sync": "banner" }, "excitsLists": { "v-bind:lists.sync": "lists" }, "hasMoreTip": { "v-bind:show.sync": "hasMore" } }, _this.$events = {}, _this.components = {
      header: _header2.default,
      excitsLists: _excitsLists2.default,
      toast: _toast2.default,
      hasMoreTip: _hasMoreTip2.default
    }, _this.data = {
      page: 1,
      banner: [],
      lists: []
    }, _this.mixins = [_loadMore2.default], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Excits, [{
    key: 'getList',

    // 获取列表数据
    value: function getList() {
      var _this2 = this;

      (0, _utils.post)(_config.Host + 'excits/lists', {
        page: this.page
      }).then(function (res) {
        var banner = res.banner,
            lists = res.lists;

        banner = banner || [];
        lists = lists || [];
        var listsCache = _this2.lists;
        listsCache = listsCache.concat(lists);
        if (_this2.page === 1) {
          _this2.banner = banner;
        }
        if (res.has_more_page === 1) {
          _this2.hasMore = true;
          _this2.page += 1;
        } else {
          _this2.hasMore = false;
          _this2.page = 1;
        }
        _this2.lists = listsCache;
        _this2.$apply();
      }).catch(function (err) {
        _this2.hasMore = false;
        _this2.$apply();
        _this2.$invoke('toast', 'show', err);
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      if (this.hasMore) {
        this.getList();
      }
    }
  }]);

  return Excits;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Excits , 'pages/excits/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkV4Y2l0cyIsInBhZ2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiaGVhZGVyIiwiSGVhZGVyIiwiZXhjaXRzTGlzdHMiLCJFeGNpdHNMaXN0cyIsInRvYXN0IiwiVG9hc3QiLCJoYXNNb3JlVGlwIiwiSGFzTW9yZVRpcCIsImRhdGEiLCJiYW5uZXIiLCJsaXN0cyIsIm1peGlucyIsIkxvYWRNb3JlIiwiSG9zdCIsInRoZW4iLCJyZXMiLCJsaXN0c0NhY2hlIiwiY29uY2F0IiwiaGFzX21vcmVfcGFnZSIsImhhc01vcmUiLCIkYXBwbHkiLCJjYXRjaCIsIiRpbnZva2UiLCJlcnIiLCJnZXRMaXN0Iiwid2VweSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7OztBQU5BOztBQUtBOzs7SUFHcUJBLE07Ozs7Ozs7Ozs7Ozs7O3NMQUNuQkMsSSxHQUFPLEMsUUErQlBDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsc0JBQXFCLFFBQXhDLEVBQVYsRUFBNEQsZUFBYyxFQUFDLHFCQUFvQixPQUFyQixFQUExRSxFQUF3RyxjQUFhLEVBQUMsb0JBQW1CLFNBQXBCLEVBQXJILEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLGNBQVFDLGdCQURFO0FBRVZDLG1CQUFhQyxxQkFGSDtBQUdWQyxhQUFPQyxlQUhHO0FBSVZDLGtCQUFZQztBQUpGLEssUUFNWkMsSSxHQUFPO0FBQ0xmLFlBQU0sQ0FERDtBQUVMZ0IsY0FBUSxFQUZIO0FBR0xDLGFBQU87QUFIRixLLFFBS1BDLE0sR0FBUyxDQUFDQyxrQkFBRCxDOzs7Ozs7QUEvQ1Q7OEJBQ1U7QUFBQTs7QUFDUix1QkFBUUMsWUFBUixtQkFBNEI7QUFDMUJwQixjQUFNLEtBQUtBO0FBRGUsT0FBNUIsRUFHR3FCLElBSEgsQ0FHUSxlQUFPO0FBQUEsWUFDTEwsTUFESyxHQUNhTSxHQURiLENBQ0xOLE1BREs7QUFBQSxZQUNHQyxLQURILEdBQ2FLLEdBRGIsQ0FDR0wsS0FESDs7QUFFWEQsaUJBQVNBLFVBQVUsRUFBbkI7QUFDQUMsZ0JBQVFBLFNBQVMsRUFBakI7QUFDQSxZQUFJTSxhQUFhLE9BQUtOLEtBQXRCO0FBQ0FNLHFCQUFhQSxXQUFXQyxNQUFYLENBQWtCUCxLQUFsQixDQUFiO0FBQ0EsWUFBSSxPQUFLakIsSUFBTCxLQUFjLENBQWxCLEVBQXFCO0FBQ25CLGlCQUFLZ0IsTUFBTCxHQUFjQSxNQUFkO0FBQ0Q7QUFDRCxZQUFJTSxJQUFJRyxhQUFKLEtBQXNCLENBQTFCLEVBQTZCO0FBQzNCLGlCQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLGlCQUFLMUIsSUFBTCxJQUFhLENBQWI7QUFDRCxTQUhELE1BR087QUFDTCxpQkFBSzBCLE9BQUwsR0FBZSxLQUFmO0FBQ0EsaUJBQUsxQixJQUFMLEdBQVksQ0FBWjtBQUNEO0FBQ0QsZUFBS2lCLEtBQUwsR0FBYU0sVUFBYjtBQUNBLGVBQUtJLE1BQUw7QUFDRCxPQXJCSCxFQXNCR0MsS0F0QkgsQ0FzQlMsZUFBTztBQUNaLGVBQUtGLE9BQUwsR0FBZSxLQUFmO0FBQ0EsZUFBS0MsTUFBTDtBQUNBLGVBQUtFLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLE1BQXRCLEVBQThCQyxHQUE5QjtBQUNELE9BMUJIO0FBMkJEOzs7NkJBbUJRO0FBQ1AsVUFBSSxLQUFLSixPQUFULEVBQWtCO0FBQ2hCLGFBQUtLLE9BQUw7QUFDRDtBQUNGOzs7O0VBdERpQ0MsZUFBS2hDLEk7O2tCQUFwQkQsTSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyBIb3N0IH0gZnJvbSAnY29uZmlnJztcbmltcG9ydCB7IHBvc3QgfSBmcm9tICd1dGlscyc7XG4vLyBjb21wb25lbnRzXG5pbXBvcnQgSGVhZGVyIGZyb20gJ2NvbXBvbmVudHMvaGVhZGVyJztcbmltcG9ydCBFeGNpdHNMaXN0cyBmcm9tICdjb21wb25lbnRzL2V4Y2l0cy1saXN0cyc7XG5pbXBvcnQgSGFzTW9yZVRpcCBmcm9tICdjb21wb25lbnRzL2hhcy1tb3JlLXRpcCc7XG5pbXBvcnQgVG9hc3QgZnJvbSAnY29tcG9uZW50cy90b2FzdCc7XG4vLyBtaXhpbnNcbmltcG9ydCBMb2FkTW9yZSBmcm9tICdtaXhpbnMvbG9hZE1vcmUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeGNpdHMgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBwYWdlID0gMVxuICAvLyDojrflj5bliJfooajmlbDmja5cbiAgZ2V0TGlzdCgpIHtcbiAgICBwb3N0KGAke0hvc3R9ZXhjaXRzL2xpc3RzYCwge1xuICAgICAgcGFnZTogdGhpcy5wYWdlXG4gICAgfSlcbiAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgIGxldCB7IGJhbm5lciwgbGlzdHMgfSA9IHJlcztcbiAgICAgICAgYmFubmVyID0gYmFubmVyIHx8IFtdO1xuICAgICAgICBsaXN0cyA9IGxpc3RzIHx8IFtdO1xuICAgICAgICBsZXQgbGlzdHNDYWNoZSA9IHRoaXMubGlzdHM7XG4gICAgICAgIGxpc3RzQ2FjaGUgPSBsaXN0c0NhY2hlLmNvbmNhdChsaXN0cyk7XG4gICAgICAgIGlmICh0aGlzLnBhZ2UgPT09IDEpIHtcbiAgICAgICAgICB0aGlzLmJhbm5lciA9IGJhbm5lcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzLmhhc19tb3JlX3BhZ2UgPT09IDEpIHtcbiAgICAgICAgICB0aGlzLmhhc01vcmUgPSB0cnVlO1xuICAgICAgICAgIHRoaXMucGFnZSArPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaGFzTW9yZSA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMucGFnZSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0cyA9IGxpc3RzQ2FjaGU7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIHRoaXMuaGFzTW9yZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3cnLCBlcnIpO1xuICAgICAgfSk7XG4gIH1cbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnsr7lvanlhoXlrrknXG4gIH07XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJoZWFkZXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmJhbm5lci5zeW5jXCI6XCJiYW5uZXJcIn0sXCJleGNpdHNMaXN0c1wiOntcInYtYmluZDpsaXN0cy5zeW5jXCI6XCJsaXN0c1wifSxcImhhc01vcmVUaXBcIjp7XCJ2LWJpbmQ6c2hvdy5zeW5jXCI6XCJoYXNNb3JlXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBoZWFkZXI6IEhlYWRlcixcbiAgICBleGNpdHNMaXN0czogRXhjaXRzTGlzdHMsXG4gICAgdG9hc3Q6IFRvYXN0LFxuICAgIGhhc01vcmVUaXA6IEhhc01vcmVUaXBcbiAgfTtcbiAgZGF0YSA9IHtcbiAgICBwYWdlOiAxLFxuICAgIGJhbm5lcjogW10sXG4gICAgbGlzdHM6IFtdXG4gIH07XG4gIG1peGlucyA9IFtMb2FkTW9yZV07XG4gIG9uTG9hZCgpIHtcbiAgICBpZiAodGhpcy5oYXNNb3JlKSB7XG4gICAgICB0aGlzLmdldExpc3QoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
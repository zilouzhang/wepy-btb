'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _config = require('./../config.js');

var _utils = require('./../utils/index.js');

var _header = require('./../components/header.js');

var _header2 = _interopRequireDefault(_header);

var _homeLists = require('./../components/home-lists.js');

var _homeLists2 = _interopRequireDefault(_homeLists);

var _hasMoreTip = require('./../components/has-more-tip.js');

var _hasMoreTip2 = _interopRequireDefault(_hasMoreTip);

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _loadMore = require('./../mixins/loadMore.js');

var _loadMore2 = _interopRequireDefault(_loadMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// components

// mixins


var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '首页'
    }, _this.$repeat = {}, _this.$props = { "header": { "xmlns:v-bind": "", "v-bind:banner.sync": "banner", "v-bind:autoPlay.once": "autoPlay", "v-bind:showDots.once": "showDots" }, "homeLists": { "v-bind:lists.sync": "lists" }, "hasMoreTip": { "v-bind:show.sync": "hasMore" } }, _this.$events = {}, _this.components = {
      header: _header2.default,
      homeLists: _homeLists2.default,
      toast: _toast2.default,
      hasMoreTip: _hasMoreTip2.default
    }, _this.data = {
      showDots: true,
      autoPlay: true,
      page: 1,
      banner: [],
      hasMore: true,
      lists: []
    }, _this.mixins = [_loadMore2.default], _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'getList',

    // 获取数据
    value: function getList() {
      var _this2 = this;

      (0, _utils.post)(_config.Host + 'new/lists', {
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

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImhlYWRlciIsIkhlYWRlciIsImhvbWVMaXN0cyIsIkhvbWVMaXN0cyIsInRvYXN0IiwiVG9hc3QiLCJoYXNNb3JlVGlwIiwiSGFzTW9yZVRpcCIsImRhdGEiLCJzaG93RG90cyIsImF1dG9QbGF5IiwicGFnZSIsImJhbm5lciIsImhhc01vcmUiLCJsaXN0cyIsIm1peGlucyIsIkxvYWRNb3JlIiwibWV0aG9kcyIsImV2ZW50cyIsIkhvc3QiLCJ0aGVuIiwicmVzIiwibGlzdHNDYWNoZSIsImNvbmNhdCIsImhhc19tb3JlX3BhZ2UiLCIkYXBwbHkiLCJjYXRjaCIsIiRpbnZva2UiLCJlcnIiLCJnZXRMaXN0Iiwid2VweSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7OztBQU5BOztBQUtBOzs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQStCbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsc0JBQXFCLFFBQXhDLEVBQWlELHdCQUF1QixVQUF4RSxFQUFtRix3QkFBdUIsVUFBMUcsRUFBVixFQUFnSSxhQUFZLEVBQUMscUJBQW9CLE9BQXJCLEVBQTVJLEVBQTBLLGNBQWEsRUFBQyxvQkFBbUIsU0FBcEIsRUFBdkwsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDVkMsY0FBUUMsZ0JBREU7QUFFVkMsaUJBQVdDLG1CQUZEO0FBR1ZDLGFBQU9DLGVBSEc7QUFJVkMsa0JBQVlDO0FBSkYsSyxRQU1aQyxJLEdBQU87QUFDTEMsZ0JBQVUsSUFETDtBQUVMQyxnQkFBVSxJQUZMO0FBR0xDLFlBQU0sQ0FIRDtBQUlMQyxjQUFRLEVBSkg7QUFLTEMsZUFBUyxJQUxKO0FBTUxDLGFBQU87QUFORixLLFFBUVBDLE0sR0FBUyxDQUFDQyxrQkFBRCxDLFFBRVRDLE8sR0FBVSxFLFFBRVZDLE0sR0FBUyxFOzs7Ozs7QUF0RFQ7OEJBQ1U7QUFBQTs7QUFDUix1QkFBUUMsWUFBUixnQkFBeUI7QUFDdkJSLGNBQU0sS0FBS0E7QUFEWSxPQUF6QixFQUdHUyxJQUhILENBR1EsZUFBTztBQUFBLFlBQ0xSLE1BREssR0FDYVMsR0FEYixDQUNMVCxNQURLO0FBQUEsWUFDR0UsS0FESCxHQUNhTyxHQURiLENBQ0dQLEtBREg7O0FBRVhGLGlCQUFTQSxVQUFVLEVBQW5CO0FBQ0FFLGdCQUFRQSxTQUFTLEVBQWpCO0FBQ0EsWUFBSVEsYUFBYSxPQUFLUixLQUF0QjtBQUNBUSxxQkFBYUEsV0FBV0MsTUFBWCxDQUFrQlQsS0FBbEIsQ0FBYjtBQUNBLFlBQUksT0FBS0gsSUFBTCxLQUFjLENBQWxCLEVBQXFCO0FBQ25CLGlCQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDRDtBQUNELFlBQUlTLElBQUlHLGFBQUosS0FBc0IsQ0FBMUIsRUFBNkI7QUFDM0IsaUJBQUtYLE9BQUwsR0FBZSxJQUFmO0FBQ0EsaUJBQUtGLElBQUwsSUFBYSxDQUFiO0FBQ0QsU0FIRCxNQUdPO0FBQ0wsaUJBQUtFLE9BQUwsR0FBZSxLQUFmO0FBQ0EsaUJBQUtGLElBQUwsR0FBWSxDQUFaO0FBQ0Q7QUFDRCxlQUFLRyxLQUFMLEdBQWFRLFVBQWI7QUFDQSxlQUFLRyxNQUFMO0FBQ0QsT0FyQkgsRUFzQkdDLEtBdEJILENBc0JTLGVBQU87QUFDWixlQUFLYixPQUFMLEdBQWUsS0FBZjtBQUNBLGVBQUtZLE1BQUw7QUFDQSxlQUFLRSxPQUFMLENBQWEsT0FBYixFQUFzQixNQUF0QixFQUE4QkMsR0FBOUI7QUFDRCxPQTFCSDtBQTJCRDs7OzZCQTBCUTtBQUNQLFVBQUksS0FBS2YsT0FBVCxFQUFrQjtBQUNoQixhQUFLZ0IsT0FBTDtBQUNEO0FBQ0Y7Ozs7RUE1RGdDQyxlQUFLbkIsSTs7a0JBQW5CbEIsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyBIb3N0IH0gZnJvbSAnY29uZmlnJztcbmltcG9ydCB7IHBvc3QgfSBmcm9tICd1dGlscyc7XG4vLyBjb21wb25lbnRzXG5pbXBvcnQgSGVhZGVyIGZyb20gJ2NvbXBvbmVudHMvaGVhZGVyJztcbmltcG9ydCBIb21lTGlzdHMgZnJvbSAnY29tcG9uZW50cy9ob21lLWxpc3RzJztcbmltcG9ydCBIYXNNb3JlVGlwIGZyb20gJ2NvbXBvbmVudHMvaGFzLW1vcmUtdGlwJztcbmltcG9ydCBUb2FzdCBmcm9tICdjb21wb25lbnRzL3RvYXN0Jztcbi8vIG1peGluc1xuaW1wb3J0IExvYWRNb3JlIGZyb20gJ21peGlucy9sb2FkTW9yZSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIC8vIOiOt+WPluaVsOaNrlxuICBnZXRMaXN0KCkge1xuICAgIHBvc3QoYCR7SG9zdH1uZXcvbGlzdHNgLCB7XG4gICAgICBwYWdlOiB0aGlzLnBhZ2VcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgbGV0IHsgYmFubmVyLCBsaXN0cyB9ID0gcmVzO1xuICAgICAgICBiYW5uZXIgPSBiYW5uZXIgfHwgW107XG4gICAgICAgIGxpc3RzID0gbGlzdHMgfHwgW107XG4gICAgICAgIGxldCBsaXN0c0NhY2hlID0gdGhpcy5saXN0cztcbiAgICAgICAgbGlzdHNDYWNoZSA9IGxpc3RzQ2FjaGUuY29uY2F0KGxpc3RzKTtcbiAgICAgICAgaWYgKHRoaXMucGFnZSA9PT0gMSkge1xuICAgICAgICAgIHRoaXMuYmFubmVyID0gYmFubmVyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXMuaGFzX21vcmVfcGFnZSA9PT0gMSkge1xuICAgICAgICAgIHRoaXMuaGFzTW9yZSA9IHRydWU7XG4gICAgICAgICAgdGhpcy5wYWdlICs9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5oYXNNb3JlID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5wYWdlID0gMTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpc3RzID0gbGlzdHNDYWNoZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgdGhpcy5oYXNNb3JlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvdycsIGVycik7XG4gICAgICB9KTtcbiAgfVxuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mmlumhtSdcbiAgfTtcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImhlYWRlclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6YmFubmVyLnN5bmNcIjpcImJhbm5lclwiLFwidi1iaW5kOmF1dG9QbGF5Lm9uY2VcIjpcImF1dG9QbGF5XCIsXCJ2LWJpbmQ6c2hvd0RvdHMub25jZVwiOlwic2hvd0RvdHNcIn0sXCJob21lTGlzdHNcIjp7XCJ2LWJpbmQ6bGlzdHMuc3luY1wiOlwibGlzdHNcIn0sXCJoYXNNb3JlVGlwXCI6e1widi1iaW5kOnNob3cuc3luY1wiOlwiaGFzTW9yZVwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgaGVhZGVyOiBIZWFkZXIsXG4gICAgaG9tZUxpc3RzOiBIb21lTGlzdHMsXG4gICAgdG9hc3Q6IFRvYXN0LFxuICAgIGhhc01vcmVUaXA6IEhhc01vcmVUaXBcbiAgfTtcbiAgZGF0YSA9IHtcbiAgICBzaG93RG90czogdHJ1ZSxcbiAgICBhdXRvUGxheTogdHJ1ZSxcbiAgICBwYWdlOiAxLFxuICAgIGJhbm5lcjogW10sXG4gICAgaGFzTW9yZTogdHJ1ZSxcbiAgICBsaXN0czogW11cbiAgfTtcbiAgbWl4aW5zID0gW0xvYWRNb3JlXTtcblxuICBtZXRob2RzID0ge307XG5cbiAgZXZlbnRzID0ge307XG4gIG9uTG9hZCgpIHtcbiAgICBpZiAodGhpcy5oYXNNb3JlKSB7XG4gICAgICB0aGlzLmdldExpc3QoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
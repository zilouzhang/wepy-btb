import wepy from 'wepy';
export default class PageMixin extends wepy.mixin {
  onReachBottom() {
    this.loadMore();
  }
  loadMore() {
    if (!this.hasMore) {
      return false;
    }
    this.getList();
  }
  data = {
    hasMore: true
  };
  methods = {
    pageScrollTo() {
      wepy.pageScrollTo({
        scrollTop: top || 0,
        duration: duration || 300
      });
    }
  };
}
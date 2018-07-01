import wepy from 'wepy';
import { setStorage } from 'utils';
export default class SaveNetPic extends wepy.mixin {
  // 缓存网络图片以供画图使用
  saveNetPic(key, value) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: value,
        success: res => {
          setStorage(key, res.path);
          resolve(res.path);
        },
        fail: () => {
          reject(value);
        }
      });
    });
  }
}
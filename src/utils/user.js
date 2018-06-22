import wepy from 'wepy';
import {
  getStorage
} from './storage';

// 判断是否登录
export const isLogin = () => {
  let data = getStorage('userInfo') || null;
  if (data) {
    return true;
  }
  return false;
};

// get wx login code
export const getWxCode = () => {
  return new Promise((resolve, reject) => {
    wepy.login({
      success: (res) => {
        resolve(res.code || '');
      },
      fail: () => {
        reject('获取登录信息失败');
      }
    });
  });
};
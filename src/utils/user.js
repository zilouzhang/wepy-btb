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
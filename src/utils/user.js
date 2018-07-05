import { Host } from 'config';
import { post } from './request';
import {
  getStorage,
  setStorage
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
  let userInfo = getStorage('userInfo');
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        post(`${Host}login/getWxSessinKeyByCode`, {
          code: res.code || ''
        }).then(res => {
          post(`${Host}login/index`, {
            sessionKey: res.session_key,
            encryptedData: userInfo.encryptedData,
            iv: encodeURIComponent(userInfo.iv)
          }).then(data => {
            resolve(data);
          }).catch(err => {
            reject(err);
          });
        }).catch(err => {
          reject(err);
        });
      },
      fail: () => {
        reject('获取登录信息失败');
      }
    });
  });
};
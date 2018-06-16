import wepy from 'wepy';

const Expire = 7 * 24 * 3600;

// set storage
export const setStorage = (key, value) => {
  let currentTime = Math.floor(new Date().getTime() / 1000);
  let expire = currentTime + Expire;
  try {
    wepy.setStorageSync(key, {
      expire,
      value
    });
    return true;
  } catch (e) {
    console.log('当前设备不支持该方法');
    return false;
  }
}

// get storage
export const getStorage = (key) => {
  try {
    let currentTime = Math.floor(new Date().getTime() / 1000);
    let data = wepy.getStorageSync(key);
    if (data && data.expire && currentTime < data.expire) {
      return data.value;
    }
    wepy.removeStorageSync(key);
    return null;
  } catch (e) {
    console.log('当前设备不支持该方法');
    return null;
  }
}
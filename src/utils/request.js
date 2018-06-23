import wepy from "wepy";

export const post = (url, params) => {
  if (url) {
    return new Promise((resolve, reject) => {
      wepy.request({
        url,
        method: 'post',
        data: {
          ...params
        }
      }).then(res => {
        if (res.statusCode === 200 && res.data && res.data.code && res.data.code === 1000) {
          resolve(res.data.data);
        } else {
          reject(res.data.msg);
        }
      }).catch(err => {
        reject('请求失败');
      });
    });
  }
};

export const get = (url, params) => {
  if (url) {
    return new Promise((resolve, reject) => {
      wepy.request({
        url,
        method: 'get',
        data: {
          ...params
        }
      }).then(res => {
        if (res.statusCode === 200 && res.data && res.data.code && res.data.code === 1000) {
          resolve(res.data.data);
        } else {
          reject(res.data.msg);
        }
      }).catch(err => {
        reject('请求失败');
      });
    });
  }
}
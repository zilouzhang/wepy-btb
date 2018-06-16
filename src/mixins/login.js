import wepy from 'wepy';
import {
  getStorage,
  setStorage
} from 'utils';
export default class Login extends wepy.mixin {
  data = {
    userInfo: getStorage('userInfo') || {}
  };
  methods = {
    getUserInfo(e) {
      
      console.log(e);
    }
  };
}
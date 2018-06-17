
// 设备信息
import wepy from 'wepy';
export const sysInfo = wepy.getSystemInfoSync();
export const ScreenWidth = sysInfo.screenWidth;
export const WxVersion = sysInfo.version;
export const SdkVersion = sysInfo.SDKVersion;
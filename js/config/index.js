const __DEV__ = "debug";
// 开发环境基础配置
const developmentConfig = {
  //   apiHost: "http://10.0.2.2:18081", // api地址
  apiHost: "http://47.99.93.72", // api地址
  log: true, // 是否开启输出日志
  showLog: true // 是否显示输出日志
};
// 生产环境基础配置
const productionConfig = {
  domain: "", // api域名
  log: false, // 是否开启输出日志
  showLog: false // 是否显示输出日志
};
console.ignoredYellowBox = ["Warning: isMounted"];
// 系统环境配置
const env = (() => {
  if (__DEV__) {
    //开发环境
    return developmentConfig;
  } else {
    //生产环境
    return productionConfig;
  }
})();

export { developmentConfig, productionConfig, env };

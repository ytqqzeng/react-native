import { developmentConfig } from "../config/index";
const ROOT_URL = developmentConfig.apiHost;
/**
 *
 * @param {*} str
 * @param {*} flag  goods 商品首页
 */
// export const getOriginalImg = function(str = "", flag) {
//   if (str.indexOf("http") === 0) {
//     return str;
//   } else {
//     return `${ROOT_URL}/shop/eop/upload/getFile.do?subFolder=${flag}&fileName=${str}`;
//   }
// };

//   把详情数组转换为图片url数组
// export const utilImg = (str = "") => {
//   if (!str) return [];
//   var ImgUrlArr = [];
//   //匹配图片（g表示匹配所有结果i表示区分大小写）
//   var imgReg = /<img.*?(?:>|\/>)/gi;
//   //匹配src属性
//   var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
//   var arr = str.match(imgReg);
//   // console.warn("所有已成功匹配图片的数组：" + arr);
//   if (!arr) return [];
//   for (var i = 0; i < arr.length; i++) {
//     var src = arr[i].match(srcReg);
//     //获取图片地址
//     if (src[1]) {
//       ImgUrlArr.push(src[1]);
//     }
//     //当然你也可以替换src属性
//     if (src[0]) {
//       var t = src[0].replace(/src/i, "href");
//     }
//   }
//   return ImgUrlArr;
// };
export default class FnUtils {
  static getOriginalImg = function(str = "", flag) {
    if (str.indexOf("http") === 0) {
      return str;
    } else {
      return `${ROOT_URL}/shop/eop/upload/getFile.do?subFolder=${flag}&fileName=${str}`;
    }
  };
  static utilImg = (str = "") => {
    if (!str) return [];
    var ImgUrlArr = [];
    //匹配图片（g表示匹配所有结果i表示区分大小写）
    var imgReg = /<img.*?(?:>|\/>)/gi;
    //匹配src属性
    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    var arr = str.match(imgReg);
    // console.warn("所有已成功匹配图片的数组：" + arr);
    if (!arr) return [];
    for (var i = 0; i < arr.length; i++) {
      var src = arr[i].match(srcReg);
      //获取图片地址
      if (src[1]) {
        ImgUrlArr.push(src[1]);
      }
      //当然你也可以替换src属性
      if (src[0]) {
        var t = src[0].replace(/src/i, "href");
      }
    }
    return ImgUrlArr;
  };
}

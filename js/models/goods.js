import { GoodsApi } from "../config/api/goods";
import Fetch from "../util/fetchRequest";

export default class Goods {
  static goodSearch(param) {
    return Fetch.fetchGet(GoodsApi.goodSearch, param).catch(error => {
      console.warn("error::搜索错误", error);
      return false;
    });
  }
  //   商品分类相关
  /**
   * 大分类数据
   * @param {*} param
   */
  static goodCategory(param) {
    return Fetch.fetchGet(GoodsApi.goodCategory, param).catch(error => {
      console.warn("error::错误", error);
      return false;
    });
  }
  /**
   * 更具大分类获取小分类
   * @param {*} param
   */
  static goodCategoryChild(param) {
    return Fetch.fetchGet(GoodsApi.goodCategoryChild, param).catch(error => {
      console.warn("error::错误", error);
      return false;
    });
  }
  /**
   * 小分类商品列表
   * @param {*} param
   */
  static goodCategoryGoodsList(param) {
    return Fetch.fetchGet(GoodsApi.goodCategoryChildList, param).catch(
      error => {
        console.warn("error::错误", error);
        return false;
      }
    );
  }
  /**
   * 支付成功以后查看商品的价格
   * @param {*} param
   */
  static checkedPrice(param) {
    return Fetch.fetchGet(GoodsApi.checkedPrice, param).catch(error => {
      console.warn("error::错误", error);
      return false;
    });
  }
  /**
   * 查看过价格的商品列表
   * @param {*} param
   */
  static checkedPriceGoodsList(param) {
    return Fetch.fetchGet(GoodsApi.checkedPriceGoodsList, param).catch(
      error => {
        console.warn("error::错误", error);
        return false;
      }
    );
  }
  /**
   * 收藏过的的商品列表
   * @param {*} param
   */
  static favoriteGoodsList(param) {
    return Fetch.fetchGet(GoodsApi.favoriteGoodsList, param).catch(error => {
      console.warn("error::错误", error);
      return false;
    });
  }
  /**
   * 收藏商品
   * @param {*} param
   */
  static favoriteGoods(param) {
    return Fetch.fetchGet(GoodsApi.favoriteGoods, param).catch(error => {
      console.warn("error::错误", error);
      return false;
    });
  }
}

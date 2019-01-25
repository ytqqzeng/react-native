import types from "../../constants";
import Goods from "../../models/goods";
import StorageUtil, { StorageKey } from "../../models/StorageModel";

/**
 * 更新 已经支付 可查看价格的商品列表 仅图片 用于个人中心缩略显示
 * @param {*} json
 */
export const checkPriceGoods = json => {
  return {
    type: types.goods.CHECKED_PRICE,
    checkedPriceGoodsList: json
  };
};

// 可以异步的action
export const asyncCheckPriceGoods = ({ uname }) => {
  return dispatch => {
    //   更新查看过价格的商品列表数据 完整数据 保证个人中心 已查看价格数据更新
    Goods.checkedPriceGoodsList({ uname }).then(res => {
      if (res.result == 1) {
        StorageUtil.SetStorage(StorageKey.checkedPriceGoods, res.data);
        const imgArray = res.data.map(item => {
          return item.original;
        });
        dispatch(checkPriceGoods(imgArray));
      }
    });
  };
};
/**
 * 更新 收藏的商品 仅图片 用于个人中心缩略显示
 * @param {*} json
 */
export const favoriteGoods = json => {
  return {
    type: types.goods.FAVORITE_GOODS,
    favoriteGoodsList: json
  };
};
// 可以异步的action
export const asyncFavoriteGoods = ({ uname }) => {
  return dispatch => {
    //   更新收藏过的商品数据 完整数据 保证个人中心 已查看价格数据更新
    Goods.favoriteGoodsList({ uname }).then(res => {
      if (res.result == 1) {
        StorageUtil.SetStorage(StorageKey.favoriteGoods, res.data);
        const imgArray = res.data.map(item => {
          return item.original;
        });
        dispatch(favoriteGoods(imgArray));
      }
    });
  };
};

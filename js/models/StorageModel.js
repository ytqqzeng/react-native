/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, { Component } from "react";
import { AsyncStorage } from "react-native";
export const StorageKey = {
  newGoods: "NEW_GOODS", // 首页新品
  themeGoods: "THEME_GOODS", // 首页主题推荐
  recommendGoods: "RECOMMEND_GOODS", // 主页的推荐页面数据
  authorGoods: "AUTHOR_GOODS", // 详情页里面的推荐商品
  searchGoodGoods: "SEARCH_GOODGOODS", // 关键词搜索商品
  checkedPriceGoods: "CHECKED_PRICE_GOODS", // 已经查看价格的商品
  swipperGoods: "SWIPPER_GOODS",
  catagoryGoods: "CATEGORY_GOODS", // 储存分类商品
  searchHistory: "SEARCH_HISTORY", // 搜索历史
  styleGoods: "STYLE_GOODS", // 你的风格商品
  favoriteGoods: "FAVORITE_GOODS", // 收藏的商品
  myHeartList: "MYHEARTLIST", // 好物 心动列表
  subject_goods: "SUBJECT_GOODS"
};
export default class StorageUtil {
  static removeSearchHistory(data) {
    return Promise.resolve().then(() => {
      AsyncStorage.removeItem("SEARCH_HISTORY");
    });
  }

  /**
   * 储存数据到AsyncStorage
   * @param {*} data
   */
  static SetStorage(key, data) {
    AsyncStorage.setItem(key, JSON.stringify(data));
  }
  /**
   * 从AsyncStorage获取数据
   * @param {*} data
   */
  static GetStorage(key) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key, (error, result) => {
        const data = JSON.parse(result);
        if (data !== null) {
          resolve(data);
        } else {
          reject(null);
        }
      });
    });
  }
}

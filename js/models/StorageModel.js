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
  checkedPriceGoods: "CHECKED_PRICE_GOODS",
  swipperGoods: "SWIPPER_GOODS",
  styleGoods: "STYLE_GOODS",
  favoriteGoods: "FAVORITE_GOODS"
  //   orderList: "ORDER_LIST" // 订单列表
};
export default class StorageUtil {
  // 关键词搜索商品
  static setSearchGoods(data) {
    AsyncStorage.setItem("SEARCH_GOODGOODS", JSON.stringify(data));
  }
  static setSwipperGoods(data) {
    AsyncStorage.setItem("SWIPPER_GOODS", JSON.stringify(data));
  }
  static setNewGoods(data) {
    AsyncStorage.setItem("NEW_GOODS", JSON.stringify(data));
  }
  static setStyleGoods(data) {
    AsyncStorage.setItem("STYLE_GOODS", JSON.stringify(data));
  }
  static setThemeGoods(data) {
    AsyncStorage.setItem("THEME_GOODS", JSON.stringify(data));
  }
  // 主页的推荐页面数据
  static setRecommendGoods(data) {
    AsyncStorage.setItem("RECOMMEND_GOODS", JSON.stringify(data));
  }
  // 详情页里面的推荐商品
  static setAuthorGoods(data) {
    AsyncStorage.setItem("AUTHOR_GOODS", JSON.stringify(data));
  }
  // 通过type类型获取商品信息
  static getGoods(type) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(type, (error, result) => {
        const data = JSON.parse(result);
        if (data !== null) {
          resolve(data);
        } else {
          reject(null);
        }
      });
    });
  }
  // 搜索历史
  static setSearchHistory(data) {
    AsyncStorage.setItem("SEARCH_HISTORY", JSON.stringify(data));
  }
  static removeSearchHistory(data) {
    return Promise.resolve().then(() => {
      AsyncStorage.removeItem("SEARCH_HISTORY");
    });
  }
  static getSearchHistory(data) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem("SEARCH_HISTORY", (error, result) => {
        const data = JSON.parse(result);
        if (data !== null) {
          resolve(data);
        } else {
          reject(null);
        }
      });
    });
  }
  /**
   * 储存分类商品
   * @param {*} data
   */
  static SetCategoryGoods(data) {
    AsyncStorage.setItem("CATEGORY_GOODS", JSON.stringify(data));
  }
  /**
   * 储存获取商品
   * @param {*} data
   */
  static getCategoryGoods(data) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem("CATEGORY_GOODS", (error, result) => {
        const data = JSON.parse(result);
        if (data !== null) {
          resolve(data);
        } else {
          reject(null);
        }
      });
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

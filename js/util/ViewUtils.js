/**
 * ViewUtils
 * @flow
 **/
"use strict";

import React from "react";
import {
  TouchableHighlight,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from "react-native";
import { scaleSize, scaleHeight, setSpText2 } from "./screenUtil";
export default class ViewUtils {
  /**
   * 获取设置页的Item
   * @param callBack 单击item的回调
   * @param icon 左侧图标
   * @param text 显示的文本
   * @param tintStyle 图标着色
   * @param expandableIco 右侧图标
   * @return {XML}
   */
  static getSettingItem(callBack, icon, text, tintStyle, expandableIco) {
    return (
      <TouchableHighlight onPress={callBack}>
        <View style={[styles.setting_item_container]}>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            {icon ? (
              <Image
                source={icon}
                resizeMode="stretch"
                style={[
                  { opacity: 1, width: 16, height: 16, marginRight: 10 },
                  tintStyle
                ]}
              />
            ) : (
              <View
                style={{ opacity: 1, width: 16, height: 16, marginRight: 10 }}
              />
            )}
            <Text>{text}</Text>
          </View>
          <Image
            source={
              expandableIco
                ? expandableIco
                : require("../../res/images/ic_tiaozhuan.png")
            }
            style={[
              {
                marginRight: 10,
                height: 22,
                width: 22,
                alignSelf: "center",
                opacity: 1
              },
              tintStyle
            ]}
          />
        </View>
      </TouchableHighlight>
    );
  }
  static getLeftButton(callBack) {
    return (
      <TouchableOpacity style={{ padding: 25 }} onPress={callBack}>
        <Image
          style={{
            width: scaleSize(18),
            height: scaleHeight(18),
            tintColor: "#000"
          }}
          source={require("../../res/image/arrowLeft.png")}
        />
      </TouchableOpacity>
    );
  }
  static getLeftButtonForGoodsDetail(callBack) {
    return (
      <TouchableOpacity style={{ padding: 25 }} onPress={callBack}>
        <Image
          style={{
            width: scaleSize(24),
            height: scaleSize(24),
            zIndex: 101
            // tintColor: "#000"
          }}
          source={require("../../res/image/find_back_black.png")}
        />
      </TouchableOpacity>
    );
  }
  static getRightButtonForGoodsDetail(callBack) {
    return (
      <TouchableOpacity style={{ alignItems: "center" }} onPress={callBack}>
        <Image
          style={{
            width: scaleSize(24),
            height: scaleSize(24),
            marginRight: scaleSize(20),
            zIndex: 101
          }}
          source={require("../../res/image/find_more_black.png")}
        />
      </TouchableOpacity>
    );
  }

  static getRightButton(title, callBack) {
    return (
      <TouchableOpacity style={{ alignItems: "center" }} onPress={callBack}>
        <View style={{ marginRight: 10 }}>
          <Text style={{ fontSize: 20, color: "#222" }}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  static getRightImageButton(callBack) {
    return (
      <TouchableOpacity style={{ alignItems: "center" }} onPress={callBack}>
        <Image
          style={{
            width: scaleSize(19),
            height: scaleSize(19),
            marginRight: scaleSize(20),
            marginBottom: scaleSize(0),
            tintColor: "#000"
          }}
          source={require("../../res/image/search.png")}
        />
        <Text style={{ fontSize: setSpText2(10), marginRight: scaleSize(20) }}>
          搜索
        </Text>
      </TouchableOpacity>
    );
  }

  /**
   * 获取更多按钮
   * @param callBack
   * @returns {XML}
   */
  static getMoreButton(callBack) {
    return (
      <TouchableHighlight
        underlayColor={"transparent"}
        ref="moreMenuButton"
        style={{ padding: 5 }}
        onPress={callBack}
      >
        <View style={{ paddingRight: 8 }}>
          <Image
            style={{ width: 24, height: 24 }}
            source={require("../../res/images/ic_more_vert_white_48pt.png")}
          />
        </View>
      </TouchableHighlight>
    );
  }

  /**
   * 获取分享按钮
   * @param callBack
   * @returns {XML}
   */
  static getShareButton(callBack) {
    return (
      <TouchableHighlight underlayColor={"transparent"} onPress={callBack}>
        <Image
          style={{
            width: 20,
            height: 20,
            opacity: 0.9,
            marginRight: 10,
            tintColor: "white"
          }}
          source={require("../../res/images/ic_share.png")}
        />
      </TouchableHighlight>
    );
  }
  /**
   * 发布按钮
   * @param callBack
   * @returns {XML}
   */
  static getSubmitButton(title, callBack) {
    return (
      <TouchableHighlight underlayColor={"transparent"} onPress={callBack}>
        <Text
          style={{
            fontSize: setSpText2(12),
            marginRight: scaleSize(10),
            color: "#FC6969"
          }}
        >
          {title}
        </Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  setting_item_container: {
    backgroundColor: "white",
    padding: 10,
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  }
});

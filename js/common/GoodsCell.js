/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View
} from "react-native";
import { scaleSize, scaleHeight, setSpText2 } from "../util/screenUtil";
/**
 * 搜索 类目 的单个商品展现样式
 * 组件使用： 需传入 item（单个商品的数据）, index（数据的索引位置）, navigation,type(存到数据库的key)
 */
export default class GoodsCell extends Component {
  render() {
    const {
      item,
      index,
      navigation,
      type,
      updateData,
      isCheckedPriceGoods
    } = this.props;

    var is_viewed_price = item.is_viewed_price;
    // 个人中心 已查看价格的商品列表数据里面没有返回is_viewed_price 所以做此判断
    if (isCheckedPriceGoods) {
      is_viewed_price = 1;
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("GoodsDetail", {
              goodIndex: index,
              title: item.name,
              type: type,
              updateData: updateData
            });
          }}
        >
          <View style={{ flexDirection: "row", marginTop: scaleSize(15) }}>
            <Image
              source={{ uri: item.original }}
              style={{
                width: scaleSize(100),
                height: scaleHeight(100),
                marginRight: scaleSize(10)
              }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: setSpText2(10), flexWrap: "wrap" }}>
                {item.name}
              </Text>
              <Text style={{ marginTop: scaleSize(10) }}>
                {item.meta_description}
              </Text>
              {is_viewed_price ? (
                <Text
                  style={{
                    fontSize: setSpText2(7),
                    flexWrap: "wrap",
                    marginTop: scaleSize(10)
                  }}
                >
                  Price:{item.mktprice}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: setSpText2(7),
                    marginTop: scaleSize(10),
                    paddingHorizontal: scaleSize(4),
                    paddingVertical: scaleSize(1),
                    borderColor: "#FF5656",
                    borderRadius: scaleSize(10),
                    borderWidth: 1,
                    color: "#FF5656",
                    width: scaleSize(40),
                    textAlign: "center",
                    fontSize: setSpText2(7)
                  }}
                >
                  立即抢
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});

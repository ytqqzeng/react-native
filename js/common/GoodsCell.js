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
import FnUtils from "../util/fnUtils";
import { NewLabel } from "../common/Label";
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

    const pageKey = navigation.state.key;
    // const pageId = navigation
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
              updateData: updateData,
              pageKey: pageKey
            });
          }}
        >
          <View style={{ flexDirection: "row", marginTop: scaleSize(15) }}>
            <Image
              source={{ uri: FnUtils.getOriginalImg(item.original, "goods") }}
              style={{
                width: scaleSize(100),
                height: scaleHeight(100),
                marginRight: scaleSize(10)
              }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: setSpText2(12), flexWrap: "wrap" }}>
                {item.name}
              </Text>
              {/* <Text style={{ marginTop: scaleSize(10) }}>
                {item.meta_description}
              </Text> */}
              {is_viewed_price ? (
                <Text
                  style={{
                    fontSize: setSpText2(12),
                    flexWrap: "wrap",
                    marginTop: 4
                  }}
                >
                  价格:{item.mktprice}
                </Text>
              ) : (
                <NewLabel title={"立即抢"} Wstyle={{ marginTop: 4 }} />
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

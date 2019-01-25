/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";

import { scaleSize, scaleHeight, setSpText2 } from "../../util/screenUtil";
export default class GoodItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _purchaseBtn = () => {
    return (
      <Text
        style={{
          paddingHorizontal: scaleSize(4),
          paddingVertical: scaleSize(1),
          backgroundColor: "#FF5656",
          color: "#fff",
          height: scaleSize(20),
          fontSize: setSpText2(14),
          textAlign: "center"
        }}
      >
        立即抢
      </Text>
    );
  };
  _newGoodsBtn = () => {
    return (
      <Text
        style={{
          paddingHorizontal: scaleSize(5),
          paddingVertical: scaleSize(1),
          backgroundColor: "#555",
          borderRadius: scaleSize(10),
          color: "#fff",
          textAlign: "center",
          fontSize: setSpText2(14)
        }}
      >
        新品推荐
      </Text>
    );
  };
  render() {
    const navigation = this.props.navigation;
    let { name, original, is_viewed_price, mktprice } = this.props.info;
    console.warn("is_viewed_price热门新品::", is_viewed_price);
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("GoodsDetail", {
              goodIndex: this.props.index,
              title: name,
              type: "NEW_GOODS",
              updateData: this.props.updateData
            });
          }}
        >
          <View>
            <Image
              style={styles.pic}
              source={{ uri: original }}
              resizeMode={"contain"}
            />
          </View>
          <Text style={styles.title}>{name}</Text>

          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: scaleSize(15),
              justifyContent: "space-between",
              marginBottom: scaleSize(10)
            }}
          >
            {is_viewed_price ? (
              <Text
                style={{
                  fontSize: setSpText2(14),
                  color: "#000"
                }}
              >
                ¥:{mktprice}
              </Text>
            ) : (
              this._purchaseBtn()
            )}
            <View>{this._newGoodsBtn()}</View>
          </View>
          <Image
            source={require("../../../res/image/new@48.png")}
            style={{
              width: scaleSize(45),
              height: scaleSize(45),
              position: "absolute",
              top: 10,
              right: 10
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: scaleSize(10),
    backgroundColor: "#fff",
    borderRadius: scaleSize(10)
  },
  pic: {
    height: scaleHeight(245)
  },
  title: {
    paddingHorizontal: scaleSize(20),
    fontSize: setSpText2(14),
    marginVertical: scaleSize(12),
    color: "#000"
  }
});

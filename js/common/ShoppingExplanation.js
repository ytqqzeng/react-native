/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Image, Text, View } from "react-native";
import EndLine from "../common/EndLine";
/**
 * 购买须知
 */
export default class ShoppingExplanation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{ fontSize: 25 }}>购买须知</Text>
          <Image
            source={require("../../res/pageImage/icon_right_arrow.png")}
            style={styles.triangle}
          />
          <View />
        </View>
        <View style={styles.detail}>
          <Text style={{ fontWeight: "100" }}>预计发货时间</Text>
          <Text style={{ color: "#ccc", fontWeight: "normal" }}>7个工作日</Text>
        </View>
        <View style={styles.detail}>
          <Text>退换货</Text>
          <Text style={{ color: "#ccc" }}>自收到商品7天之内可以申请退换货</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.title}>
          <Text style={{ fontSize: 25 }}>常见问题</Text>
          <Image
            source={require("../../res/pageImage/icon_right_arrow.png")}
            style={styles.triangle}
          />
          <View />
        </View>
        <View style={styles.detail}>
          <Text style={{ fontWeight: "100" }}>发货时间延迟怎么办？</Text>
        </View>
        <View style={styles.detail}>
          <Text style={{ color: "#ccc", fontWeight: "normal", lineHeight: 30 }}>
            7个工作日自收到商品7天之内可以申请退换货自收到商品7天之内可以申请退换货自收到商品7天之内可以申请退换货自收到商品7天之内可以申请退换货自收到商品7天之内可以申请退换货自收到商品7天之内可以申请退换货
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={{ fontWeight: "100" }}>如何处理退换货？</Text>
        </View>
        <View style={styles.detail}>
          <Text style={{ color: "#ccc", fontWeight: "normal", lineHeight: 30 }}>
            7个工作日自收到商品7天之内可以申请退换货自收到商品7天之内可以申请退换货自收到商品7天之内可以申请退换货自收到商品7天之内可以申请退换货自收到商品7天之内可以申请退换货自收到商品7天之内可以申请退换货
          </Text>
        </View>
        <View style={styles.end}>
          <EndLine title={"the end .."} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    padding: 30
  },
  title: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10
  },
  end: {
    marginTop: 50,
    marginBottom: 50
  },
  triangle: {
    height: 30,
    width: 30,
    top: 4
  }
});

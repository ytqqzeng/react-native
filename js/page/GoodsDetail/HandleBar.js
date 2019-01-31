import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { scaleSize, scaleHeight, setSpText2 } from "../../util/screenUtil";

const { width } = Dimensions.get("window");

/**
 *   页面最底部的操作栏
 */
export default class HandleBar extends Component {
  notCheck = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.showPrice();
        }}
        style={styles.handlePrice}
      >
        <Text
          style={{
            flex: 1,
            color: "#fff",
            padding: 18,
            fontSize: scaleSize(12),
            textAlign: "center",
            backgroundColor: "#FC6969"
          }}
        >
          {"付款查看价格"}
        </Text>
      </TouchableOpacity>
    );
  };
  notPayment = () => {
    return (
      <TouchableOpacity
        style={styles.handlePayment}
        onPress={() => {
          this.props.paymented();
        }}
      >
        <Image
          source={require("../../../res/image/payment_.png")}
          style={{
            width: scaleSize(15),
            height: scaleSize(15),
            tintColor: "#fff"
          }}
        />
        <Text
          style={{
            marginHorizontal: scaleSize(10),
            paddingVertical: 18,
            color: "#fff",
            textAlign: "center",
            fontSize: scaleSize(12)
          }}
        >
          {"付定金"}
        </Text>
      </TouchableOpacity>
    );
  };
  //   已经付定金
  paymented = payment => {
    const { clickBtn } = this.props;
    if (payment) {
      return (
        <TouchableOpacity
          style={styles.handleBuy}
          onPress={() => {
            clickBtn();
          }}
        >
          <Text
            style={{
              fontSize: scaleSize(12),
              color: "#fff",
              paddingVertical: 18,
              textAlign: "center"
            }}
          >
            {"购买"}
          </Text>
          <Text style={styles.paymented}>{"你已付定金"}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.handleBuy}
          onPress={() => {
            clickBtn();
          }}
        >
          <Image
            source={require("../../../res/image/payment_48px.png")}
            style={{
              width: scaleSize(15),
              height: scaleSize(15),
              tintColor: "#fff"
            }}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: scaleSize(12),
              paddingVertical: 18,
              marginHorizontal: scaleSize(10),
              textAlign: "center"
            }}
          >
            {"购买"}
          </Text>
        </TouchableOpacity>
      );
    }
  };
  render() {
    const { goodDetail } = this.props;
    const { payment } = this.props;
    // 设置底部状态栏是否显示一元显示价格的按钮

    // 没有支付查看价格的钱
    let bar = goodDetail.is_viewed_price ? null : this.notCheck();
    // 是否支付定金
    let isPayment = payment ? null : this.notPayment();
    return (
      <View style={styles.handleBar}>
        {bar}
        {isPayment}
        {this.paymented(payment)}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  paymented: {
    position: "absolute",
    top: 0,
    left: 0,
    // width: 80,
    paddingHorizontal: 10,
    height: 20,
    fontSize: scaleSize(8),
    color: "#fff",
    borderRadius: 4,
    backgroundColor: "#FC6969"
  },

  handleBar: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  handlePrice: {
    flexDirection: "row",
    alignItems: "center",
    width: scaleSize(130),
    textAlign: "center"
  },
  handlePayment: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#333",
    borderRightWidth: 2,
    borderColor: "#fff"
  },
  handleBuy: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    // paddingLeft: 20,
    // paddingRight: 20,
    flexDirection: "row"
  }
});

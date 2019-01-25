import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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
            marginBottom: scaleSize(5),
            top: scaleSize(-2),
            color: "#fff",
            padding: 8,
            borderRadius: 10,
            textAlign: "center",
            backgroundColor: "#E4007F"
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
        <MaterialCommunityIcons name={"share"} size={40} color={"#fff"} />
        <Text
          style={{
            marginHorizontal: scaleSize(10),
            color: "#fff",
            paddingTop: 8,
            textAlign: "center"
          }}
        >
          {"付定金"}
        </Text>
      </TouchableOpacity>
    );
  };
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
          <Text style={{ color: "#fff", paddingTop: 8, textAlign: "center" }}>
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
          <MaterialCommunityIcons name={"share"} size={40} color={"#fff"} />
          <Text style={{ color: "#fff", paddingTop: 8, textAlign: "center" }}>
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

    let bar = goodDetail.is_viewed_price ? null : this.notCheck();
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
    top: -5,
    left: 0,
    width: 80,
    height: 20,
    fontSize: 12,
    color: "#fff",
    borderRadius: 4,
    backgroundColor: "#CD1076"
  },

  handleBar: {
    flexDirection: "row",
    justifyContent: "center",
    height: 50,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#000"
  },
  handlePrice: {
    width: scaleSize(130),
    marginBottom: scaleSize(5),
    textAlign: "center",
    borderRightWidth: 2,
    borderRightColor: "#eee"
  },
  handlePayment: {
    flex: 1,
    justifyContent: "center",
    // paddingLeft: 20,
    // paddingRight: 20,
    borderRightWidth: 2,
    borderRightColor: "#eee",
    flexDirection: "row"
  },
  handleBuy: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row"
  }
});

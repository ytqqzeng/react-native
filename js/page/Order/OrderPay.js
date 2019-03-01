/**
 * 订单支付页面
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  View
} from "react-native";
import { scaleSize, setSpText2 } from "../../util/screenUtil";
import NavigationBar from "../../common/NavigationBar";
import ViewUtils from "../../util/ViewUtils";
import Order from "../../models/order";
import { connect } from "react-redux";
class OrderPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: "weixin", // 默认微信支付选中
      paying: "正在支付...."
    };
  }
  _changeStatus = (order_id, payment_name) => {
    const { member_id, price, isPrepay } = this.props.navigation.state.params;
    if (isPrepay) {
      const params = { order_id, member_id };

      Order.prePaySuccess(params).then(res => {
        if (res.result === 1) {
          console.warn(":定金支付成功:");
        } else {
          console.warn(":定金支付失败:");
        }
      });
    } else {
      const params = { order_id, member_id, pay_money: price, payment_name };

      Order.changeOrderToSuccess(params).then(res => {
        if (res.result === 1) {
          console.warn(":全额支付成功 切换订单状态成功:");
        } else {
          console.warn(":切换订单状态失败:");
        }
      });
    }
  };
  _submit = () => {
    const { price, order_id } = this.props.navigation.state.params;
    const { flag } = this.state;
    if (flag === "weixin") {
      this.setState(
        {
          flag: this.state.paying
        },
        () => {
          setTimeout(() => {
            this._changeStatus(order_id, "微信");
            this.props.navigation.navigate("OrderPayed", {
              flag: "weixin",
              price
            });
          }, 2000);
        }
      );
    } else if (flag === "zhifubao") {
      this.setState(
        {
          flag: this.state.paying
        },
        () => {
          this._changeStatus(order_id, "支付宝");
          setTimeout(() => {
            this.props.navigation.navigate("OrderPayed", {
              flag: "zhifubao",
              price
            });
          }, 2000);
        }
      );
      //   重复点击
    } else {
      return false;
    }
  };
  render() {
    const { navigation, userInfo } = this.props;
    const { price } = navigation.state.params;
    const { flag } = this.state;
    let payName;
    if (flag === "weixin") {
      payName = "微信支付";
    } else if (flag === "zhifubao") {
      payName = "支付宝支付";
    } else {
      payName = "正在支付...  ";
    }

    return (
      <View style={styles.container}>
        <NavigationBar
          title={"收银台"}
          statusBar={{ backgroundColor: "steelblue", hidden: true }}
          leftButton={ViewUtils.getLeftButton(() => {
            navigation.goBack(userInfo.pageKey);
          })}
          rightButton={ViewUtils.getSubmitButton("订单中心", () => {
            navigation.navigate("OrderPage");
          })}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#DDD",
            paddingHorizontal: scaleSize(5)
          }}
        >
          <Text style={[styles.text]}>{`需支付:`}</Text>
          <Text style={[styles.text, { color: "#FC6969" }]}>{`¥${price}`}</Text>
        </View>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.text, { backgroundColor: "#EEE", color: "#888" }]}
            >
              选择支付方式
            </Text>
            <View
              style={{
                backgroundColor: "#fff",
                paddingVertical: scaleSize(5),
                paddingHorizontal: scaleSize(15)
              }}
            >
              <View style={styles.panel}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../../../res/image/weixinPay.png")}
                    style={[
                      styles.image,
                      { marginRight: scaleSize(20), tintColor: "#2CA43A" }
                    ]}
                  />
                  <View>
                    <Text style={styles.paName}>微信支付</Text>
                    <Text style={[styles.paName, { color: "#999" }]}>
                      微信安全支付
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      flag: "weixin"
                    });
                  }}
                >
                  <Image
                    source={
                      flag === "weixin"
                        ? require("../../../res/image/abc_btn_radio_on.png")
                        : require("../../../res/image/abc_btn_radio_off.png")
                    }
                    style={styles.image}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.panel}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../../../res/image/zhifubaoPay.png")}
                    style={[
                      styles.image,
                      { marginRight: scaleSize(20), tintColor: "#00A5E8" }
                    ]}
                  />
                  <View>
                    <Text style={styles.paName}>支付宝支付</Text>
                    <Text style={[styles.paName, { color: "#999" }]}>
                      支付宝安全支付
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      flag: "zhifubao"
                    });
                  }}
                >
                  <Image
                    source={
                      flag === "zhifubao"
                        ? require("../../../res/image/abc_btn_radio_on.png")
                        : require("../../../res/image/abc_btn_radio_off.png")
                    }
                    style={styles.image}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <View>
          <Text
            onPress={this._submit}
            style={[styles.text, { backgroundColor: "#FC6969", color: "#FFF" }]}
          >{`${payName}¥${price}`}</Text>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo
  };
};
export default connect(mapStateToProps)(OrderPay);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  text: {
    color: "#333",
    textAlignVertical: "center",
    textAlign: "center",
    height: scaleSize(40),
    fontSize: setSpText2(13)
  },
  panel: {
    paddingVertical: scaleSize(20),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  paName: {
    textAlignVertical: "center",
    color: "#333",
    fontSize: setSpText2(11)
  },
  image: {
    height: scaleSize(22),
    width: scaleSize(22),
    tintColor: "#FC6969"
  }
});

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
export default class OrderPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: "weixin" // 默认微信支付选中
    };
  }
  _submit = () => {
    const { flag } = this.state;
    if (flag === "weixin") {
      alert("跳转微信支付");
    } else if (flag === "zhifubao") {
      alert("跳转到支付宝支付");
    } else {
      alert("error");
    }
  };
  render() {
    const { navigation } = this.props;
    const { params } = this.props.navigation.state;
    const price = params.price;
    const { flag } = this.state;
    const payName = flag === "weixin" ? "微信支付" : "支付宝支付";
    return (
      <View style={styles.container}>
        <NavigationBar
          title={"收银台"}
          statusBar={{ backgroundColor: "steelblue", hidden: true }}
          leftButton={ViewUtils.getLeftButton(() => {
            navigation.goBack(null);
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

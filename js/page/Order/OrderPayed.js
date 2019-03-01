/**
 * 订单支付完成的页面
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
  FlatList,
  View
} from "react-native";
import { scaleSize, setSpText2 } from "../../util/screenUtil";
import NavigationBar from "../../common/NavigationBar";
import ViewUtils from "../../util/ViewUtils";
import { connect } from "react-redux";
class OrderPayed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _renderHead = () => {
    const { navigation, userInfo } = this.props;
    const { flag, price } = navigation.state.params;
    const payedType = flag === "weixin" ? "微信支付" : "支付宝支付";
    return (
      <View
        style={{
          backgroundColor: "#fff"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 200
          }}
        >
          <Image
            source={require("../../../res/image/setting/icon_menu_order.png")}
            style={{
              tintColor: "#FC6969",
              width: 120,
              height: 120,
              marginRight: 20
            }}
          />
          <View>
            <View style={{ flexDirection: "row", paddingVertical: 7 }}>
              <Text style={{ fontSize: 21 }}>支付方式：</Text>
              <Text style={{ fontSize: 21, color: "#FC6969" }}>
                {payedType}
              </Text>
            </View>
            <View style={{ flexDirection: "row", paddingVertical: 7 }}>
              <Text style={{ fontSize: 21 }}>支付金额：</Text>
              <Text style={{ fontSize: 21, color: "#FC6969" }}>
                {`¥ ${price}`}
              </Text>
            </View>
            <View style={{ flexDirection: "row", paddingVertical: 7 }}>
              <Text style={{ fontSize: 21 }}>优惠金额：</Text>
              <Text style={{ fontSize: 21, color: "#FC6969" }}>{`¥ 0.00`}</Text>
            </View>
          </View>
        </View>
        {/* 查看订单按钮 */}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text
            onPress={() => {
              navigation.navigate("OrderPage");
            }}
            style={styles.text}
          >
            查看订单
          </Text>
        </View>
        {/* 查看广告按钮 */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20
          }}
        >
          <Text
            onPress={() => {
              navigation.navigate("HomePage");
            }}
            style={[
              styles.text,
              {
                color: "#FFF",
                backgroundColor: "#FC6969",
                borderColor: "#FC6969"
              }
            ]}
          >
            回首页
          </Text>
        </View>
        {/* 注意 */}

        <Text
          style={{
            paddingVertical: 15,
            paddingHorizontal: 20,
            fontSize: 20,
            color: "#999"
          }}
        >
          注意：本平台不会以订单异常为理由、系统升级为由要求您点击任何网址链接进行退款操作
        </Text>
      </View>
    );
  };
  render() {
    const { navigation, userInfo } = this.props;
    console.warn("userInfo::", userInfo);
    return (
      <View style={styles.container}>
        <NavigationBar
          title={"订单支付成功"}
          statusBar={{ backgroundColor: "steelblue", hidden: true }}
          leftButton={ViewUtils.getLeftButton(() => {
            navigation.goBack(userInfo.pageKey);
          })}
          rightButton={ViewUtils.getSubmitButton("完成", () => {
            navigation.navigate("HomePage");
          })}
        />
        <FlatList
          ListHeaderComponent={this._renderHead}
          data={[
            { key: "." }
            // { key: "b" },
            // { key: "c" },
            // { key: "d" },
            // { key: "e" },
            // { key: "f" },
            // { key: "g" },
            // { key: "e" },
            // { key: "f" },
            // { key: "g" }
          ]}
          renderItem={({ item }) => (
            <Text style={{ fontSize: 50 }}>{item.key}</Text>
          )}
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo
  };
};
export default connect(mapStateToProps)(OrderPayed);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  text: {
    textAlign: "center",
    paddingVertical: 7,
    width: 350,
    borderColor: "#999",
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 26
  }
});

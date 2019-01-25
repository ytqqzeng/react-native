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
  ScrollView,
  Image,
  Text,
  FlatList,
  TextInput,
  View
} from "react-native";
import dayjs from "dayjs";

import { scaleSize, setSpText2 } from "../../../util/screenUtil";
import CountDown from "./CountDown";
import Order from "../../../models/order";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import { connect } from "react-redux";
// 通过参数过滤数组
const filterArray = arg => item => item.status === arg;
class OrderType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderListData: []
    };
  }
  /**
   * 订单状态
   */
  _orderstatus = status => {
    const arr = [
      "新订单待确",
      "等待付款",
      "已付款",
      "已发货",
      "已收货",
      "交易成功",
      "已取消",
      "交易完成"
    ];
    return <Text style={styles.redText}>{arr[status]}</Text>;
  };
  _operateOrder = () => {
    return (
      <Text
        style={{
          backgroundColor: "#FC6969",
          color: "#fff",
          textAlign: "center",
          fontSize: setSpText2(13),
          paddingVertical: scaleSize(9)
        }}
      >
        去支付
      </Text>
    );
  };
  _countDown = data => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingVertical: scaleSize(10)
          }}
        >
          <Text style={styles.redText}>还有</Text>
          <CountDown date={"2019-01-25"} />
          <Text style={styles.redText}>{` 订单即将关闭`}</Text>
        </View>
      </View>
    );
  };
  _orderImg = data => {
    // console.warn("data::", data);
    var goodsData = JSON.parse(data);
    // console.warn("goodsData::", goodsData);

    if (!goodsData) return null;
    goodsData = goodsData[0];

    return (
      <View
        style={{
          alignItems: "center",
          paddingVertical: scaleSize(10),
          borderBottomColor: "#eee",
          borderBottomWidth: 1
        }}
      >
        <Image
          source={{ uri: goodsData.image }}
          style={{ width: scaleSize(110), height: scaleSize(110) }}
        />
      </View>
    );
  };
  orderPrice = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingVertical: scaleSize(15),
          borderBottomColor: "#eee",
          borderBottomWidth: 1
        }}
      >
        <Text style={styles.redText}>订单合计：</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.grayText}>¥{`546.00`}</Text>
          <Text
            style={{ fontSize: setSpText2(12), color: "#999" }}
          >{` / 包含运费¥ 16.00`}</Text>
        </View>
      </View>
    );
  };
  _renderItem = ({ item }) => {
    // console.warn("item::", item);
    const { create_time, status, items_json } = item;
    // console.warn("items_json::", items_json);
    const orderCreateTime = dayjs(create_time * 1000)
      .format()
      .slice(0, 10);

    return (
      <View>
        {/* 订单日期 */}
        <Text style={styles.orderDate}>{orderCreateTime}</Text>
        <View
          style={{
            paddingHorizontal: scaleSize(20),
            backgroundColor: "#fff"
          }}
        >
          <View style={styles.orderStatus}>
            <Text style={styles.grayText}>订单状态</Text>
            {/* 订单状态 */}
            {this._orderstatus(status)}
          </View>
          {/* 订单图片 详细 */}
          {this._orderImg(items_json)}
          {/* 订单价格 */}
          {this.orderPrice()}

          {/* 倒计时 */}
          {this._countDown()}
          {/* 操作按钮 */}
          {this._operateOrder()}
        </View>
      </View>
    );
  };
  componentDidMount() {
    const { orderList, userInfo } = this.props;
    const { type } = this.props;

    var orderListData = orderList.orderList.filter(filterArray(type));
    if (type === 9) {
      orderListData = orderList.orderList;
    }
    this.setState({
      orderListData
    });
    // console.warn("userInfo::", userInfo);
  }
  render() {
    const { orderListData } = this.state;
    // console.warn("orderListData::", orderListData);
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <FlatList data={orderListData} renderItem={this._renderItem} />
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    orderList: state.order
  };
};
export default connect(mapStateToProps)(OrderType);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  redText: {
    color: "#FC6969",
    fontSize: setSpText2(12)
  },
  grayText: {
    fontSize: setSpText2(12),
    color: "#999"
  },
  orderDate: {
    textAlign: "center",
    backgroundColor: "#eee",
    paddingVertical: scaleSize(5),
    color: "#999"
  },
  orderStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingVertical: scaleSize(17)
  }
});

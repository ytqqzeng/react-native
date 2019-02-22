/**
 * 个人中心订单页 包含各种状态的订单
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
  View,
  Alert
} from "react-native";
import dayjs from "dayjs";

import { scaleSize, setSpText2 } from "../../../util/screenUtil";
import CountDown from "./CountDown";
import Order from "../../../models/order";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import { connect } from "react-redux";
import { asyncUserOrderList } from "../../../actions/order";
const orderArray = [
  "新订单待确",
  "等待付款",
  "已付款",
  "已发货",
  "已收货",
  "交易成功",
  "已取消",
  "交易完成"
];
const status2Word = [
  "新订单",
  "去支付",
  "等待发货",
  "准备收货",
  "确认交易",
  "等待评价",
  "订单已取消",
  "完成订单"
];
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
    return <Text style={styles.redText}>{orderArray[status]}</Text>;
  };
  //   点击去支付按钮
  _paySubmit = (status, need_pay_money) => {
    const { navigation } = this.props;
    if (status === 1) {
      navigation.navigate("OrderPay", {
        price: need_pay_money
      });
    } else {
    }
  };
  //   渲染去支付那一块的按钮
  _operateOrder = (status, need_pay_money) => {
    //   通过status来判断显示的文字
    return (
      <Text
        onPress={() => {
          this._paySubmit(status, need_pay_money);
        }}
        style={styles.operateBtn}
      >
        {status2Word[status]}
      </Text>
    );
  };
  _countDown = orderEndTime => {
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
          <CountDown date={orderEndTime} />
          <Text style={styles.redText}>{` 订单即将关闭`}</Text>
        </View>
      </View>
    );
  };

  //   有规格的商品使用items_json，没有规格的商品使用goods
  _orderImg = (items_json, goods) => {
    var _img;
    if (items_json) {
      var goodsData = JSON.parse(items_json);
      _img = goodsData[0].image;
    } else {
      var tmpData = JSON.parse(goods);
      _img = tmpData.original;
    }

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
          source={{ uri: _img }}
          style={{ width: scaleSize(110), height: scaleSize(110) }}
        />
      </View>
    );
  };
  orderPrice = need_pay_money => {
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
          <Text style={styles.grayText}>¥{need_pay_money}</Text>
          {/* <Text
            style={{ fontSize: setSpText2(12), color: "#999" }}
          >{` / 包含运费¥ 16.00`}</Text> */}
        </View>
      </View>
    );
  };
  //   评价订单
  _rateOrderBtn = (items_json, goods) => {
    const { member_id } = this.props.userInfo;
    var _img;
    if (items_json) {
      var goodsData = JSON.parse(items_json);
      _img = goodsData[0].image;
      _goods_id = goodsData[0].goods_id;
    } else {
      var tmpData = JSON.parse(goods);
      _img = tmpData.original;
      _goods_id = tmpData.goods_id;
    }
    return (
      <View style={styles.btnWrapper}>
        <Text
          onPress={() => {
            this.props.navigation.navigate("OrderRate", {
              _img,
              member_id,
              _goods_id
            });
          }}
          style={styles.deleteOrder}
        >
          评价订单
        </Text>
      </View>
    );
  };
  //   删除 取消订单 按钮
  _deleteOrderBtn = (status, order_id) => {
    let text;
    if (status < 2) {
      text = "取消订单";
    } else if (status > 5) {
      text = "删除订单";
    }
    return (
      <View style={styles.btnWrapper}>
        <Text
          onPress={() => {
            this._deleteAndCancelSubmit(status, order_id);
          }}
          style={styles.deleteOrder}
        >
          {text}
        </Text>
      </View>
    );
  };
  //   提交 删除和取消订单
  _deleteAndCancelSubmit = (status, order_id) => {
    const { member_id } = this.props.userInfo;
    const params = {
      member_id,
      order_id
    };
    if (status < 2) {
      this._cancelOrder(params);
    } else if (status > 5) {
      this._deleteOrder(params);
    }
  };
  _cancelOrder = params => {
    const { dispatch } = this.props;
    const { member_id } = this.props.userInfo;
    Order.cancelOrder(params).then(res => {
      console.warn("res::", res);
      if (res.result == 1) {
        Alert.alert(
          "取消订单",
          "成功",
          [
            {
              text: "确定",
              onPress: () => {
                //   更新保存在redux里面的订单列表
                dispatch(asyncUserOrderList({ member_id }));
              }
            }
          ],
          { cancelable: false }
        );
      } else {
        console.warn("error:res.message::", res.message);
      }
    });
  };
  _deleteOrder = params => {
    const { member_id } = params;
    const { dispatch } = this.props;
    Order.deleteOrder(params).then(res => {
      console.warn("res::", res);
      if (res.result == 1) {
        Alert.alert(
          "删除订单",
          "成功",
          [
            {
              text: "确定",
              onPress: () => {
                //   更新保存在redux里面的订单列表
                dispatch(asyncUserOrderList({ member_id }));
              }
            }
          ],
          { cancelable: false }
        );
      } else {
        console.warn("error:res.message::", res.message);
      }
    });
  };
  _renderItem = ({ item }) => {
    const {
      create_time,
      status,
      items_json,
      need_pay_money,
      order_id,
      goods
    } = item;
    const orderCreateTime = dayjs(create_time * 1000)
      .format()
      .slice(0, 10);
    //   86400000为一天的毫秒时间
    const orderEndTime = create_time * 1000 + 86400000;
    return (
      <View style={{ marginBottom: 20 }}>
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
          {this._orderImg(items_json, goods)}
          {/* 订单价格 */}
          {this.orderPrice(need_pay_money)}

          {/* 倒计时 */}
          {this._countDown(orderEndTime)}
          {/* 操作按钮 */}
          {this._operateOrder(status, need_pay_money)}

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            {this._deleteOrderBtn(status, order_id)}
            {status === 7 ? this._rateOrderBtn(items_json, goods) : null}
            {/* {this._rateOrderBtn(items_json, goods)} */}
          </View>
        </View>
      </View>
    );
  };
  componentDidMount() {}
  render() {
    const { orderList, userInfo } = this.props;
    const { type } = this.props;
    var orderListData = orderList.orderList.filter(filterArray(type));
    if (type === 9) {
      orderListData = orderList.orderList;
    }
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
  },
  deleteOrder: {
    textAlign: "right",
    paddingHorizontal: scaleSize(5),
    paddingVertical: scaleSize(2),
    textAlignVertical: "center",
    borderRadius: scaleSize(10),
    fontSize: setSpText2(11),
    borderWidth: 1,
    borderColor: "#888",
    color: "#888"
  },
  operateBtn: {
    backgroundColor: "#FC6969",
    color: "#fff",
    textAlign: "center",
    fontSize: setSpText2(13),
    paddingVertical: scaleSize(9)
  },
  btnWrapper: {
    flexDirection: "row",
    marginTop: scaleSize(5),
    marginHorizontal: 2
  }
});

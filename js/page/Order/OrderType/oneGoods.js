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
  View,
  Alert
} from "react-native";
import dayjs from "dayjs";

import { scaleSize, setSpText2 } from "../../../util/screenUtil";
import CountDown from "./CountDown";
import Order from "../../../models/order";
import User from "../../../models/user";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import { connect } from "react-redux";
import { asyncUserOrderList } from "../../../actions/order";
import FnUtils from "../../../util/fnUtils";
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
  "等待发货中...",
  "确认收货",
  "已经签收了",
  "交易完成了",
  "订单取消了",
  "完成订单"
];
export default class OneGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
      expressFee: 0, // 快递
      viewed_cost: 0, //
      advance: 0,
      totalMoney: 0,
      advanceCount: 0 // 使用多少之前的预存款
    };
  }
  /**
   * 订单状态
   */
  _orderstatus = status => {
    return <Text style={styles.redText}>{orderArray[status]}</Text>;
  };
  //   点击去支付按钮
  _paySubmit = (status, need_pay_money, order_id, isPrepay) => {
    const { navigation, dispatch } = this.props;
    const { member_id } = this.props.userInfo;
    console.warn("isPrepay::", isPrepay);
    if (status === 1) {
      navigation.navigate("OrderPay", {
        price: need_pay_money,
        order_id,
        member_id,
        isPrepay
      });
      //  已发货到确认收货
    } else if (status === 3) {
      const params = { order_id, status: 4 };
      Order.orderStatusSuccess(params).then(res => {
        if (res.result === 1) {
          dispatch(asyncUserOrderList({ member_id }));
        } else {
          console.warn(":切换订单状态失败:");
        }
      });
      //   已收货到交易成功
    }
    // else if (status === 4) {
    //   const params = { order_id, status: 5 };
    //   Order.orderStatusSuccess(params).then(res => {
    //     if (res.result === 1) {
    //       dispatch(asyncUserOrderList({ member_id }));
    //     } else {
    //       console.warn(":切换订单状态失败:");
    //     }
    //   });
    // }
  };
  //   渲染去支付那一块的按钮
  _operateOrder = (status, need_pay_money, order_id, isPrepay) => {
    //   通过status来判断显示的文字
    return (
      <Text
        onPress={() => {
          this._paySubmit(status, need_pay_money, order_id, isPrepay);
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
          source={{ uri: FnUtils.getOriginalImg(_img, "goods") }}
          style={{ width: scaleSize(110), height: scaleSize(110) }}
        />
      </View>
    );
  };
  _openOrderDetail = () => {
    const { order_id, need_pay_money } = this.props.item;
    const { member_id } = this.props.userInfo;
    const { showDetail, totalMoney } = this.state;
    if (showDetail) {
      this.setState({
        showDetail: false,
        totalMoney: need_pay_money
      });
    } else {
      this.setState({
        showDetail: true
      });
      const params = {
        member_id,
        order_id
      };

      User.getUserOrderFee(params).then(res => {
        // 点开详细尾款 初始化数据
        if (res.result == 1) {
          this.setState({
            expressFee: res.data.ship_price,
            viewed_cost: res.data.viewed_cost,
            advance: res.data.advance,
            totalMoney: totalMoney + res.data.ship_price - res.data.viewed_cost
          });
        }
      });
    }
  };
  componentDidMount() {
    const { need_pay_money } = this.props.item;
    this.setState({
      totalMoney: need_pay_money
    });
  }
  orderPrice = (need_pay_money, flag) => {
    const { totalMoney } = this.state;
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
          <Text style={[styles.grayText, { width: 80 }]}>¥{totalMoney}</Text>
          {flag ? (
            <Text
              onPress={this._openOrderDetail}
              style={{
                fontSize: setSpText2(12),
                color: "#FFF",
                paddingHorizontal: 5,
                borderWidth: 1,
                marginLeft: 10,
                borderRadius: 3,
                backgroundColor: "#FC6969"
              }}
            >{`尾款详细`}</Text>
          ) : null}
        </View>
      </View>
    );
  };
  //   评价订单
  _rateOrderBtn = (items_json, goods, order_id) => {
    const { member_id } = this.props.userInfo;
    var _img, _goods_id;
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
              order_id,
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

    if (!text) return null;

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
        console.warn("error:::", res.message);
      }
    });
  };
  _deleteOrder = params => {
    const { member_id } = params;
    const { dispatch } = this.props;
    Order.deleteOrder(params).then(res => {
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
  _btn = () => {
    return (
      <Text
        onPress={() => {
          this._payRest();
        }}
        style={styles.operateBtn}
      >
        支付尾款
      </Text>
    );
  };
  _payRest = () => {
    const { order_id } = this.props.item;
    const { navigation } = this.props;
    const { member_id } = this.props.userInfo;
    const { totalMoney } = this.state;

    navigation.navigate("OrderPay", {
      price: totalMoney,
      order_id,
      member_id,
      isPrepay: false
    });
  };
  //   渲染尾款内容
  _payRestMoney = () => {
    return (
      <View>
        {this._expressFee()}
        {this._viewedCost()}
        {this._advance()}
        {this._btn()}
      </View>
    );
  };
  /**
   * 快递费
   */
  _expressFee = () => {
    const { expressFee } = this.state;
    return (
      <View style={styles.panel}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: "#eee",
            borderBottomWidth: 1,
            paddingVertical: scaleSize(5)
          }}
        >
          <Text style={[styles.text, {}]}>快递费：</Text>
          <Text style={[styles.text, {}]}>{`+${expressFee}元`}</Text>
        </View>
      </View>
    );
  };
  /**
   * 查看价格的花费
   */
  _viewedCost = () => {
    const { viewed_cost } = this.state;
    return (
      <View style={styles.panel}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: "#eee",
            borderBottomWidth: 1,
            paddingVertical: scaleSize(5)
          }}
        >
          <Text style={[styles.text, {}]}>抵扣查看价格花费：</Text>
          <Text style={[styles.text, {}]}>{`-${viewed_cost}元`}</Text>
        </View>
      </View>
    );
  };
  /**
   * 预存款 之前查看价格积累的金额
   */
  _advance = () => {
    const { expressFee, viewed_cost, advance } = this.state;
    const { item } = this.props;
    return (
      <View style={styles.panel}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderColor: "#eee",
            borderBottomWidth: 1,
            paddingVertical: scaleSize(5)
          }}
        >
          <Text style={[styles.text, {}]}>{`可用预存款共计${advance}元`}</Text>
          <TextInput
            keyboardType="numeric"
            placeholder={"使用多少"}
            style={[
              styles.text,
              {
                borderWidth: 1,
                marginLeft: scaleSize(10),
                borderColor: "#DDD"
              }
            ]}
            onChangeText={advanceCount => {
              var newText2;
              const newText = advanceCount.replace(/[^\d]+/, "");
              //   当前默认价格
              const defaultCost =
                item.need_pay_money + expressFee - viewed_cost;

              // 当输入的值超过自己拥有的预存款
              if (newText > advance) {
                newText2 = newText.replace(/[\d]+/, "");
                this.setState({
                  advanceCount: newText2,
                  totalMoney:
                    item.need_pay_money + expressFee - viewed_cost - newText2
                });
                return;
              }
              // 当输入的值超过自己目前商品的价格
              if (newText > defaultCost) {
                alert("超多最多抵扣限额");
                newText2 = newText.replace(/[\d]+/, "");
                this.setState({
                  advanceCount: newText2,
                  totalMoney:
                    item.need_pay_money + expressFee - viewed_cost - newText2
                });
                return;
              }
              this.setState({
                advanceCount: newText,
                totalMoney:
                  item.need_pay_money + expressFee - viewed_cost - newText
              });
            }}
            value={this.state.advanceCount}
          />
        </View>
      </View>
    );
  };
  render() {
    const {
      create_time,
      status,
      items_json,
      need_pay_money,
      order_id,
      goods,
      goods_amount,
      discount
    } = this.props.item;
    const rate = need_pay_money / goods_amount;

    var paystatus, flag; // flag区别是否是尾款
    if (rate === 0.1 && discount === 0) {
      paystatus = <Text style={styles.grayText}>未支付定金</Text>;
      var isPrepay = 1; //表示isPrePay = true ,支付页面好区分使用那个接口
    } else if (rate === 0.9 && discount === 0) {
      paystatus = <Text style={styles.grayText}>已支付定金</Text>;
      var isPrepay = 0;
      flag = true;
    } else {
      paystatus = null;
      var isPrepay = 0;
    }
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
            {paystatus}
            {/* 订单状态 */}
            {this._orderstatus(status)}
          </View>
          {/* 订单图片 详细 */}
          {this._orderImg(items_json, goods)}
          {/* 订单价格 */}
          {this.orderPrice(need_pay_money, flag)}
          {this.state.showDetail ? this._payRestMoney() : null}
          {/* 倒计时 */}
          {status === 1 ? this._countDown(orderEndTime) : null}
          {/* 操作按钮 */}
          {flag
            ? null
            : this._operateOrder(status, need_pay_money, order_id, isPrepay)}
          {/* 付尾款的详细 */}

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            {this._deleteOrderBtn(status, order_id)}
            {status === 4
              ? this._rateOrderBtn(items_json, goods, order_id)
              : null}
          </View>
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
  },
  text: {
    color: "#777",
    fontSize: setSpText2(13),
    paddingVertical: scaleSize(3)
  },
  panel: {
    paddingVertical: scaleSize(8),
    paddingHorizontal: scaleSize(15),
    backgroundColor: "#fff"
  }
});

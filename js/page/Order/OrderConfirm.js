/**
 * 订单确认页
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TextInput,
  View
} from "react-native";
import { scaleSize, setSpText2 } from "../../util/screenUtil";
import NavigationBar from "../../common/NavigationBar";
import ViewUtils from "../../util/ViewUtils";
import FnUtils from "../../util/fnUtils";
import Order from "../../models/order";
import User from "../../models/user";
import { connect } from "react-redux";
import { Label } from "../../common/Label";
// import { updateUserInfo } from "../../actions/user";
class OrderConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArr: [],
      addr: {}, // 一条地址信息
      address_id: 0, // 地址ID
      expressFee: 0, //快递费,
      viewed_cost: 0, // 查看价格
      advance: 0, // 预存款
      remark: "", //备注
      advanceCount: 0, // 使用多少之前的预存款
      goodsData: [] // 商品数据
    };
  }
  /**
   * 获取订单相关费用
   */
  _getOrderFee = () => {
    const { member_id } = this.props.userInfo;
    const { address_id, goodsData } = this.state;
    const { goods_id } = goodsData;
    const params = {
      member_id,
      address_id,
      goods_id
    };

    User.getUserOrderFee(params).then(res => {
      if (res.result == 1) {
        console.warn("res::", res);
        this.setState({
          expressFee: res.data.ship_price,
          viewed_cost: res.data.viewed_cost,
          advance: res.data.advance
        });
      }
    });
  };
  /**
   * 切换地址 更新地址信息
   */
  _updateData = data => {
    this.setState(
      {
        addr: data,
        address_id: data.addr_id
      },
      () => {
        this._getOrderFee();
      }
    );
  };
  /**
   * 初始化获取地址信息
   */
  _getData = () => {
    const { member_id } = this.props.userInfo;
    User.getUserAddressList({ member_id }).then(res => {
      if (res.result == 1) {
        this.setState({
          dataArr: res.data
        });
        res.data.forEach(item => {
          if (item.def_addr == 1) {
            this.setState(
              {
                addr: item,
                address_id: item.addr_id
              },
              () => {
                this._getOrderFee();
              }
            );
          }
        });
      }
    });
    // User
  };
  componentDidMount() {
    const { params } = this.props.navigation.state;

    this.setState({
      goodsData: params
    });
    this._getData();
  }
  /**
   * 展示地址
   */
  _showAddress = data => {
    const { navigation } = this.props;

    return (
      <TouchableOpacity
        style={[
          styles.panel,
          {
            borderTopWidth: 1,
            borderTopColor: "#eee"
          }
        ]}
        onPress={() => {
          navigation.navigate("Address", {
            updateData: this._updateData,
            type: "orderConfirm"
          });
        }}
      >
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <Text style={[styles.text, { marginRight: scaleSize(200) }]}>
            {data.name}
          </Text>
          <Text style={[styles.text]}>{data.mobile}</Text>
        </View>
        {data.name ? (
          <Text style={[styles.text]}>
            {`${data.province} ${data.city} ${data.region} ${data.addr} `}
          </Text>
        ) : (
          <Text
            style={[styles.text, { textAlign: "center", color: "#FC6969" }]}
          >{`+添加地址`}</Text>
        )}
        <Image
          source={require("../../../res/image/ic_tiaozhuan.png")}
          style={{
            tintColor: "#888",
            width: 30,
            height: 30,
            position: "absolute",
            top: scaleSize(30),
            right: scaleSize(10)
          }}
        />
      </TouchableOpacity>
    );
  };
  _showTitle = (title, style) => {
    return (
      <Text
        style={[
          styles.text,
          {
            ...style,
            textAlign: "center",
            backgroundColor: "#eee",
            fontSize: setSpText2(9)
          }
        ]}
      >
        {title}
      </Text>
    );
  };
  /**
   * 商品信息展示
   */
  _showGoods = () => {
    const { goodsData } = this.state;
    const { original, name, specs, mktprice } = goodsData;

    return (
      <View style={[styles.panel, { flexDirection: "row" }]}>
        <Image
          source={{ uri: FnUtils.getOriginalImg(original, "goods") }}
          style={{ width: scaleSize(70), height: scaleSize(70) }}
        />
        <View style={{ paddingLeft: scaleSize(5) }}>
          <Text style={[styles.text, {}]}>{name}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.text, { color: "#999" }]}>规格：</Text>
            <Text style={[styles.text, {}]}>{specs}</Text>
          </View>
          <Text style={[styles.text, { color: "#FA4D50" }]}>¥ {mktprice}</Text>
          <View style={{ flexDirection: "row" }}>
            <Label
              title={"正品保证"}
              style={{
                marginRight: 10,
                borderWidth: 1,
                borderColor: "#FC6969",
                borderRadius: 3
              }}
            />
            <Label
              title={"现货"}
              style={{
                marginRight: 10,
                borderWidth: 1,
                borderColor: "#FC6969",
                borderRadius: 3
              }}
            />
          </View>
        </View>
      </View>
    );
  };
  /**
   * 备注
   */
  _note = () => {
    return (
      <View style={styles.panel}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderColor: "#eee",
            borderBottomWidth: 1,
            borderTopWidth: 1,
            paddingVertical: scaleSize(5)
          }}
        >
          <Text style={[styles.text, {}]}>备注：</Text>
          <TextInput
            placeholder={"填写备注"}
            style={[styles.text, {}]}
            onChangeText={remark => this.setState({ remark })}
            value={this.state.remark}
          />
        </View>
      </View>
    );
  };
  /**
   * 优惠卷
   */
  _coupon = () => {
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
          <Text style={[styles.text, {}]}>店铺优惠卷：</Text>
          <Text style={[styles.text, {}]}>暂无</Text>
        </View>
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
    const { advance } = this.state;
    const { goodsData, expressFee, viewed_cost } = this.state;
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
              const newText = advanceCount.replace(/[^\d]+/, "");
              //   当前默认价格
              const defaultCost = goodsData.mktprice + expressFee - viewed_cost;

              // 当输入的值超过自己拥有的预存款
              if (newText > advance) {
                const newText2 = newText.replace(/[\d]+/, "");
                this.setState({ advanceCount: newText2 });
                return;
              }
              // 当输入的值超过自己目前商品的价格
              if (newText > defaultCost) {
                alert("超多最多抵扣限额");
                const newText2 = newText.replace(/[\d]+/, "");
                this.setState({ advanceCount: newText2 });
                return;
              }
              this.setState({ advanceCount: newText });
            }}
            value={this.state.advanceCount}
          />
        </View>
      </View>
    );
  };
  /**
   * 提交订单
   */
  _submit = () => {
    const addrInfo = this.state.addr;
    const {
      remark,
      goodsData, // 上一个页面传递过来的所有参数
      expressFee,
      advanceCount,
      viewed_cost
    } = this.state;
    const { navigation } = this.props;
    const { goods_id, product_id, isPrepay, mktprice } = goodsData;
    const { member_id, province, city, region, addr, name, mobile } = addrInfo;
    const shipping_area = `${province}-${city}-${region}`;
    if (!name) {
      Alert.alert("未提交", "请添加地址");
      return;
    }
    var params = {
      discount: isPrepay ? 0 : Number(viewed_cost) + Number(advanceCount),
      goods_id,
      member_id,
      product_id,
      shipping_area, //省市区拼接在一起的字符串
      ship_name: name,
      ship_addr: addr, // 收件具体地址
      ship_mobile: mobile,
      shipping_amount: expressFee, // 快递价格
      remark // 备注
    };
    if (isPrepay) {
      params = { ...params, prepay: mktprice * 0.1 };
    }
    Order.createOrder(params).then(res => {
      if (res.result == 1) {
        navigation.navigate("OrderPay", {
          price: isPrepay ? mktprice * 0.1 : res.data.need_pay_money,
          order_id: res.data.order_id,
          goods_id,
          member_id,
          isPrepay
        });
      } else {
        alert("提交订单失败");
      }
    });
  };

  render() {
    const {
      goodsData,
      expressFee,
      advanceCount,
      addr,
      viewed_cost
    } = this.state;

    const { isPrepay } = goodsData;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={"订单确认"}
          statusBar={{ backgroundColor: "steelblue", hidden: true }}
          leftButton={ViewUtils.getLeftButton(() => {
            navigation.goBack(null);
          })}
        />
        <ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: "#ddd"
            }}
          >
            {isPrepay ? (
              <Text style={{ paddingHorizontal: scaleSize(15) }}>
                定金支付确认
              </Text>
            ) : null}
            {this._showAddress(addr)}
            {this._showTitle("商品信息")}
            {this._showGoods()}
            {this._note()}
            {this._showTitle("", { paddingVertical: scaleSize(3) })}

            {isPrepay ? null : this._coupon()}
            {isPrepay ? null : this._expressFee()}
            {isPrepay ? null : this._viewedCost()}
            {isPrepay ? null : this._advance()}
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: scaleSize(15)
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.text, {}]}>合计：</Text>
            <Text style={[styles.text, { color: "#FA4D50" }]}>
              ¥{" "}
              {isPrepay
                ? goodsData.mktprice * 0.1
                : goodsData.mktprice + expressFee - viewed_cost - advanceCount}
            </Text>
          </View>
          <Text
            style={{
              width: scaleSize(150),
              textAlign: "center",
              paddingVertical: scaleSize(10),
              backgroundColor: "#FC6969",
              color: "#fff",
              fontSize: setSpText2(14)
            }}
            onPress={this._submit}
          >
            提交订单
          </Text>
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
export default connect(mapStateToProps)(OrderConfirm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
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

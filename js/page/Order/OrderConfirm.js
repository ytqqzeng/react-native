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
import Order from "../../models/order";
import User from "../../models/user";
import { connect } from "react-redux";
import { Label } from "../../common/Label";
class OrderConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArr: [],
      addr: {}, // 一条地址信息
      remark: "", //备注
      goodsData: [] // 商品数据
    };
  }
  /**
   * 切换地址 更新地址信息
   */
  _updateData = data => {
    this.setState({
      addr: data
    });
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
            this.setState({
              addr: item
            });
          }
        });
      }
    });
  };
  componentDidMount() {
    this._getData();
    const { params } = this.props.navigation.state;
    this.setState({
      goodsData: params
    });
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
          source={{ uri: original }}
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
            <Label title={"正品保证"} style={{ marginRight: 10 }} />
            <Label title={"现货"} />
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
   * 提交订单
   */
  _submit = () => {
    const addrInfo = this.state.addr;
    // console.warn("addrInfo::", addrInfo);
    const { remark, goodsData } = this.state;
    console.warn(":goodsData:", goodsData);
    const { goods_id, product_id, mktprice, viewed_cost } = goodsData;
    const { member_id, province, city, region, addr, name, mobile } = addrInfo;
    const shipping_area = `${province}-${city}-${region}`;
    if (!name) {
      Alert.alert("未提交", "请添加地址");
    }
    const params = {
      discount: viewed_cost,
      //   viewed_cost,
      goods_id,
      member_id,
      product_id,
      shipping_area, //省市区拼接在一起的字符串
      ship_name: name,
      ship_addr: addr, // 收件具体地址
      ship_mobile: mobile,
      shipping_amount: 14.0, // 快递价格
      // discount, //折扣
      remark // 备注
    };
    console.warn("params::", params);
    Order.createOrder(params).then(res => {
      console.warn("res::", res);
      if (res.result == 1) {
        alert("提交成功");
        console.warn("res::", res);
      } else {
        alert("失败：" + res.message);
      }
    });
  };
  render() {
    const { goodsData } = this.state;

    const { navigation } = this.props;
    const { dataArr, addr } = this.state;

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
            {this._showAddress(addr)}
            {this._showTitle("商品信息")}
            {this._showGoods()}
            {this._note()}
            {this._showTitle("", { paddingVertical: scaleSize(3) })}
            {this._coupon()}
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
              ¥ {goodsData.mktprice}
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
    fontSize: setSpText2(12),
    paddingVertical: scaleSize(3)
  },
  panel: {
    paddingVertical: scaleSize(8),
    paddingHorizontal: scaleSize(15),
    backgroundColor: "#fff"
  }
});

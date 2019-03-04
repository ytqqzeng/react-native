/**
 * 个人中心订单页 包含各种状态的订单
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Image, Text, FlatList, View, Alert } from "react-native";
import OneGoods from "./oneGoods";
import { scaleSize, setSpText2 } from "../../../util/screenUtil";
import { connect } from "react-redux";
import { asyncUserOrderList } from "../../../actions/order";

// 通过参数过滤数组
const filterArray = arg => item => item.status === arg;
class OrderType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openRest: false,
      orderListData: [],
      orderListArray: []
    };
  }

  componentDidMount() {
    const { orderList, userInfo, dispatch } = this.props;
    const { member_id } = userInfo;
    dispatch(asyncUserOrderList({ member_id }));
  }

  render() {
    const { orderList } = this.props;
    const { type } = this.props;
    var orderListData = orderList.orderList.filter(filterArray(type));
    if (type === 9) {
      orderListData = orderList.orderList;
    }
    return (
      <View style={styles.container}>
        {/* <FlatList
          data={[{ key: "a" }]}
          renderItem={({ item }) => <Text>{null}</Text>}
          ListHeaderComponent={() => {
            return orderListData.map(item => {
              return <OneGoods item={item} {...this.props} />;
            });
          }}
        /> */}
        <FlatList
          data={orderListData}
          renderItem={({ item }) => <OneGoods item={item} {...this.props} />}
        />
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

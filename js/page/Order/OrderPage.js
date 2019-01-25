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
  TextInput,
  View
} from "react-native";
import OrderType from "./OrderType";
import { scaleSize, setSpText2 } from "../../util/screenUtil";
import NavigationBar from "../../common/NavigationBar";
import ViewUtils from "../../util/ViewUtils";
import StorageUtil, { StorageKey } from "../../models/StorageModel";
import Order from "../../models/order";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import { connect } from "react-redux";
import { asyncUserOrderList } from "../../actions/order";
class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { dispatch } = this.props;
    const { member_id } = this.props.userInfo;
    dispatch(asyncUserOrderList({ member_id }));
  }
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <NavigationBar
          title={"我的订单"}
          statusBar={{ backgroundColor: "steelblue", hidden: true }}
          leftButton={ViewUtils.getLeftButton(() => {
            navigation.goBack(null);
          })}
        />
        <ScrollableTabView
          tabBarBackgroundColor="#fff" // 背景色
          tabBarInactiveTextColor="#666" // 未激活状态的颜色
          tabBarActiveTextColor="#FC6969" // 激活状态颜色
          tabBarUnderlineStyle={{
            backgroundColor: "#FF3C50",
            height: scaleSize(0)
          }}
          // 这个是插件里面自定义的一个头组件
          renderTabBar={() => (
            <ScrollableTabBar
              tabsContainerStyle={{ color: "red" }}
              textStyle={{
                fontSize: setSpText2(12),
                borderBottomColor: "#fff"
              }}

              // style ={styles.scrollBox}
            />
          )} // 自定义tabbar 可以不要这个
        >
          <OrderType tabLabel="全部" navigation={navigation} type={9} />
          <OrderType tabLabel="待付款" navigation={navigation} type={1} />
          <OrderType tabLabel="已付款" navigation={navigation} type={2} />
          <OrderType tabLabel="已发货" navigation={navigation} type={3} />
          <OrderType tabLabel="已收货" navigation={navigation} type={4} />
          <OrderType tabLabel="交易成功" navigation={navigation} type={5} />
          <OrderType tabLabel="已取消" navigation={navigation} type={6} />
          <OrderType tabLabel="交易完成" navigation={navigation} type={7} />
        </ScrollableTabView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo
    //   goodsInfo: state.goods
  };
};
export default connect(mapStateToProps)(OrderPage);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  page1: {
    flex: 1,
    backgroundColor: "red"
  },
  page2: {
    flex: 1,
    backgroundColor: "green"
  },
  image: {
    height: 22,
    width: 22
  }
});

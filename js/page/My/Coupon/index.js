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

import { scaleSize, setSpText2 } from "../../../util/screenUtil";
import NavigationBar from "../../../common/NavigationBar";
import ViewUtils from "../../../util/ViewUtils";
import CouponType from "./CouponType";
// import StorageUtil, { StorageKey } from "../../../models/StorageModel";
import User from "../../../models/user";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import { connect } from "react-redux";
// import { asyncUserOrderList } from "../../../actions/order";
class Coupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usedData: [],
      noUseData: []
    };
  }

  _filterData = data => {
    const noUseData = data.filter(item => {
      return item.used === 0;
    });
    const usedData = data.filter(item => {
      return item.used === 1;
    });
    this.setState({
      usedData,
      noUseData
    });
  };
  componentDidMount() {
    const { member_id } = this.props.userInfo;
    User.getUserCoupon({ member_id }).then(res => {
      if (res.result === 1) {
        this._filterData(res.data);
      }
    });
  }
  render() {
    const { navigation } = this.props;
    const { usedData, noUseData } = this.state;
    console.warn("noUseData::", noUseData);
    return (
      <View style={styles.container}>
        <NavigationBar
          title={"优惠券"}
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
          <CouponType
            tabLabel={`未使用(${noUseData.length})`}
            navigation={navigation}
            data={noUseData}
            used={false}
          />
          <CouponType
            tabLabel="使用记录"
            navigation={navigation}
            data={usedData}
            used={true}
          />
        </ScrollableTabView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo
  };
};
export default connect(mapStateToProps)(Coupon);
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

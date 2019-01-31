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
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  View
} from "react-native";

import area from "./area.json";
import NavigationBar from "../../../../common/NavigationBar";
import ViewUtils from "../../../../util/ViewUtils";
import User from "../../../../models/user";
import { connect } from "react-redux";
import { Label } from "../../../../common/Label";
import { Toast } from "antd-mobile-rn";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  scaleSize,
  scaleHeight,
  setSpText2
} from "../../../../util/screenUtil";
const widthScreen = Dimensions.get("window").width;
class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArr: []
    };
  }

  _createAreaData() {
    let data = [];
    let len = area.length;
    for (let i = 0; i < len; i++) {
      let city = [];
      for (let j = 0, cityLen = area[i]["city"].length; j < cityLen; j++) {
        let _city = {};
        _city[area[i]["city"][j]["name"]] = area[i]["city"][j]["area"];
        city.push(_city);
      }

      let _data = {};
      _data[area[i]["name"]] = city;
      data.push(_data);
    }
    return data;
  }

  /**
   * 点击地址栏
   */
  _clickAddress = item => {
    const { navigation } = this.props;
    const { params } = this.props.navigation.state;
    if (params.type === "orderConfirm") {
      // 如果是从订单页面跳转过来的
      const callback = params.updateData;
      callback(item);
      navigation.goBack();
    } else {
      return;
    }
  };
  /**
   * 渲染地址出来
   */
  _renderItem = ({ item }) => {
    const { navigation } = this.props;
    const {
      name,
      mobile,
      province,
      city,
      region,
      addr,
      addr_id,
      def_addr
    } = item;
    return (
      <View style={styles.rowFront}>
        <TouchableOpacity
          onPress={() => {
            this._clickAddress(item);
          }}
          style={{ flex: 1, marginVertical: 15 }}
        >
          <View style={{ flexDirection: "row", marginBottom: scaleSize(10) }}>
            <Text
              style={{ marginRight: scaleSize(10), fontSize: setSpText2(13) }}
            >
              {name}
            </Text>
            <Text
              style={{ marginRight: scaleSize(10), fontSize: setSpText2(13) }}
            >
              {mobile}
            </Text>
            {def_addr ? (
              <Label
                title={"默认"}
                style={{
                  fontSize: setSpText2(11),
                  borderRadius: scaleSize(3)
                }}
              />
            ) : null}
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: setSpText2(11),
                color: "#999"
              }}
            >{`${province} ${city} ${region} ${addr}`}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditAddress", {
              item,
              updateData: this._updateData
            });
          }}
          style={{ position: "absolute", top: 20, right: 20 }}
        >
          <Image
            source={require("../../../../../res/image/ic_tiaozhuan.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  _updateData = () => {
    const { member_id } = this.props.userInfo;
    User.getUserAddressList({ member_id }).then(res => {
      if (res.result == 1) {
        this.setState({
          dataArr: res.data
        });
      }
    });
  };
  componentDidMount() {
    this._updateData();
  }
  _delete = ({ item }) => {
    console.warn("item::", item);
    const { dataArr } = this.state;
    const { member_id } = this.props.userInfo;
    const { addr_id } = item;
    User.deleteUserAddress({ member_id, addr_id }).then(res => {
      if (res.result == 1) {
        Toast.info("删除地址成功", 1);
        this.setState({
          dataArr: dataArr.filter(item => {
            return item.addr_id !== addr_id;
          })
        });
      }
    });
  };
  _keyExtractor = (item, index) => item.addr_id;
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <NavigationBar
          title={"管理收货地址"}
          statusBar={{ backgroundColor: "steelblue", hidden: true }}
          leftButton={ViewUtils.getLeftButton(() => {
            navigation.goBack(null);
          })}
        />
        <ScrollView>
          <View
            style={{
              flex: 1,
              paddingHorizontal: scaleSize(15),
              backgroundColor: "#fff"
            }}
          >
            <SwipeListView
              useFlatList
              keyExtractor={this._keyExtractor}
              data={this.state.dataArr}
              renderItem={this._renderItem}
              //   ItemSeparatorComponent={() => (
              //     <View style={{ height: 2, backgroundColor: "#ddd" }} />
              //   )}
              renderHiddenItem={(data, rowMap) => (
                <View style={styles.rowBack}>
                  <Text />
                  <Text
                    onPress={() => {
                      this._delete(data);
                    }}
                    style={{
                      textAlign: "center",
                      paddingHorizontal: scaleSize(12),
                      fontSize: setSpText2(12),
                      color: "#fff"
                    }}
                  >
                    删除
                  </Text>
                </View>
              )}
              rightOpenValue={-75}
            />
          </View>
        </ScrollView>
        <View>
          <Text
            style={{
              width: widthScreen,
              textAlign: "center",
              paddingVertical: scaleSize(10),
              backgroundColor: "#FC6969",
              color: "#fff",
              fontSize: setSpText2(14)
            }}
            onPress={() => {
              navigation.navigate("AddAddress", {
                updateData: this._updateData
              });
            }}
          >
            新增收货地址
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
export default connect(mapStateToProps)(Address);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  rowFront: {
    backgroundColor: "#fff",
    overflow: "hidden",
    borderBottomColor: "#999",
    borderBottomWidth: 1
    // marginBottom: -1 // 插件会莫名的多出一条边线
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#FC6969",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15
  },
  image: {
    height: 22,
    width: 22
  }
});

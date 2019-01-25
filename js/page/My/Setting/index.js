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
  TouchableHighlight,
  StyleSheet,
  Image,
  Button,
  Text,
  View,
  FlatList,
  Alert,
  AsyncStorage
} from "react-native";
import { loginOutAction } from "../../../actions/user";
import { connect } from "react-redux";
import NavigationBar from "../../../common/NavigationBar";
import ViewUtils from "../../../util/ViewUtils";
import { scaleSize, scaleHeight, setSpText2 } from "../../../util/screenUtil";
import { NavigationActions } from "react-navigation";
//  这个插件必须先修改源文件才能使用 不然提示找不到方法 https://blog.csdn.net/qq_31743309/article/details/83787550
import * as CacheManager from "react-native-http-cache";
// push BillTwo
// this.props.navigation.dispatch(resetAction);

// 使用reset action重置路由
// const resetAction = NavigationActions.reset({
//     index: 1,  // 注意不要越界
//     actions: [  // 栈里的路由信息会从 Home->HomeTwo 变成了 Bill->BillTwo
//         NavigationActions.navigate({ routeName: 'Bill'}),
//         NavigationActions.navigate({ routeName: 'BillTwo'})
//     ]
// });
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({
      routeName: "WelcomePage",
      action: NavigationActions.navigate({
        routeName: "NewGood" // 这个是tabs 里面的任何一个tab
      })
    })
  ]
});

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cacheSize: "0.00M"
    };
  }
  _logout = () => {
    const { navigation, loginOut } = this.props;
    Alert.alert(
      "退出登陆",
      "",
      [
        {
          text: "确认",
          onPress: async () => {
            await loginOut(); // dispach
            navigation.dispatch(resetAction);
          }
        },
        { text: "取消", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  };
  _goto = action => {
    switch (action) {
      case "clean":
        return this._clean();
      case "encourage":
        return this._encourage();
      case "privacy":
        return this._privacy();
      case "logout":
        return this._logout();
    }
  };
  _privacy = () => {};
  _encourage = () => {};
  _clean = () => {
    Alert.alert(
      "清除缓存?",
      "",
      [
        {
          text: "确认",
          onPress: () => {
            this.clearCacheSize();
          }
        },
        { text: "取消", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  };
  _renderItem = item => {
    return (
      <View>
        <TouchableHighlight
          underlayColor={"#DDD"}
          onPress={() => {
            this._goto(item.action);
          }}
        >
          <View style={styles.itemView}>
            <Image
              source={item.icon}
              style={{
                width: scaleSize(20),
                height: scaleHeight(19),
                tintColor: "#666",
                marginRight: scaleSize(10)
              }}
            />
            <Text style={{ fontSize: setSpText2(15) }}>{item.title}</Text>
            <Text
              style={{ fontSize: setSpText2(15), marginLeft: scaleSize(100) }}
            >
              {item.other}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.line} />
      </View>
    );
  };
  // 获得缓存大小
  getCacheSize = async () => {
    const data = await CacheManager.getCacheSize();
    const size = data / (1024 * 1024);
    this.setState({ cacheSize: size.toFixed(2) + "M" });
  };
  // 清除缓存
  clearCacheSize = async () => {
    await CacheManager.clearCache();
    // this.getCacheSize();
    // 这里貌似清除不能全部清除为0，这里直接写死0即可。
    this.setState({ cacheSize: "0M" });
    alert("清除缓存成功");
  };
  componentDidMount() {
    this.getCacheSize();
  }
  render() {
    const { cacheSize } = this.state;
    let itemData = [
      {
        icon: require("../../../../res/image/setting/icon_trash.png"),
        title: "清除缓存",
        action: "clean",
        other: cacheSize
      },
      {
        icon: require("../../../../res/image/setting/icon_logout.png"),
        title: "退出登陆",
        action: "logout",
        other: ""
      }
    ];
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <NavigationBar
          title={"设置"}
          statusBar={{ backgroundColor: "steelblue", hidden: true }}
          style={{ backgroundColor: "steelblue" }}
          leftButton={ViewUtils.getLeftButton(() => {
            navigation.goBack();
          })}
        />
        <FlatList
          data={itemData}
          renderItem={({ item }) => this._renderItem(item)}
        />
      </View>
    );
  }
}
export default connect(
  null,
  { loginOut: loginOutAction }
)(Setting);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  line: {
    width: "90%",
    height: 1,
    backgroundColor: "#eee",
    marginBottom: scaleSize(15)
  },
  itemView: {
    flexDirection: "row",
    paddingLeft: scaleSize(20),
    marginVertical: scaleSize(15),
    alignItems: "center"
  }
});

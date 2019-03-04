/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Image, View, BackHandler } from "react-native";
import { scaleSize, scaleHeight, setSpText2 } from "../util/screenUtil";
import TabNavigator from "react-native-tab-navigator";
import HomeIndex from "../page/Home";
import MyPage from "../page/My";
import GoodGoods from "../page/GoodGoods";
import Category from "../page/Category";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "tb_home"
    };
  }
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <TabNavigator
          tabBarStyle={{
            height: scaleHeight(48),
            overflow: "hidden",
            backgroundColor: "#fff"
          }}
        >
          <TabNavigator.Item
            selected={this.state.selectedTab === "tb_home"}
            title={"首页"}
            titleStyle={{ fontSize: setSpText2(10) }}
            // 导航文字选中的颜色
            selectedTitleStyle={{ color: "#FF3C50" }}
            renderIcon={() => (
              <Image
                style={styles.image}
                source={require("../../res/image/tab/icon_tab_main_select.png")}
              />
            )}
            // 设置选中的颜色 注意这里的写法
            renderSelectedIcon={() => (
              <Image
                style={[styles.image, { tintColor: "#FF3C50" }]}
                source={require("../../res/image/tab/icon_tab_main_selected.png")}
              />
            )}
            // badgeText="2" // 设置有几个消息
            onPress={() => this.setState({ selectedTab: "tb_home" })}
          >
            <HomeIndex navigation={navigation} />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === "tb_classify"}
            title={"分类"}
            titleStyle={{ fontSize: setSpText2(10) }}
            // 导航文字选中的颜色
            selectedTitleStyle={{ color: "#FF3C50" }}
            renderIcon={() => (
              <Image
                style={styles.image}
                source={require("../../res/image/tab/icon_tab_cat_center_select.png")}
              />
            )}
            renderSelectedIcon={() => (
              <Image
                style={[styles.image, { tintColor: "#FF3C50" }]}
                source={require("../../res/image/tab/icon_tab_cat_center_selected.png")}
              />
            )}
            onPress={() => this.setState({ selectedTab: "tb_classify" })}
          >
            <Category navigation={navigation} />
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === "tb_goodgoods"}
            title={"好物"}
            titleStyle={{ fontSize: setSpText2(10) }}
            // 导航文字选中的颜色
            selectedTitleStyle={{ color: "#FF3C50" }}
            renderIcon={() => (
              <Image
                style={styles.image}
                source={require("../../res/image/tab/icon_tab_goodgoods_select.png")}
              />
            )}
            renderSelectedIcon={() => (
              <Image
                style={[styles.image, { tintColor: "#FF3C50" }]}
                source={require("../../res/image/tab/icon_tab_goodgoods_selected.png")}
              />
            )}
            onPress={() => this.setState({ selectedTab: "tb_goodgoods" })}
          >
            <GoodGoods navigation={navigation} />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === "tb_mine"}
            title={"我的"}
            titleStyle={{ fontSize: setSpText2(10) }}
            // 导航文字选中的颜色
            selectedTitleStyle={{ color: "#FF3C50" }}
            renderIcon={() => (
              <Image
                style={styles.image}
                source={require("../../res/image/tab/icon_tab_user_select.png")}
              />
            )}
            renderSelectedIcon={() => (
              <Image
                style={[styles.image, { tintColor: "#FF3C50" }]}
                source={require("../../res/image/tab/icon_tab_user_selected.png")}
              />
            )}
            onPress={() => this.setState({ selectedTab: "tb_mine" })}
          >
            <MyPage {...this.props} />
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: scaleHeight(20),
    width: scaleSize(20),
    tintColor: "#222222",
    marginBottom: scaleSize(1.5)
  }
});

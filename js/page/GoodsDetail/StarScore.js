/**
 * Created by QQ756312633 on 2017/5/12.
 * http://blog.csdn.net/yeputi1015/article/
 */
"use strict";

import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView,
  Alert,
  ListView,
  ScrollView,
  InteractionManager,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";

var { width, height } = Dimensions.get("window");

export default class StarScore extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      totalScore: 5, // 总分值
      currentScore: 3 // 分值
    };
  }

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          width: width,
          height: 20,
          marginBottom: 6
        }}
      >
        {this._renderBody()}
      </View>
    );
  }

  _renderBody() {
    let images = [];
    for (var i = 1; i <= this.state.totalScore; i++) {
      let currentCount = i;
      images.push(
        <View key={"i" + i}>
          <View>
            <Image
              source={require("../../../res/image/ic_star_navbar.png")}
              style={{
                width: 30,
                height: 30,
                marginHorizontal: 5,
                tintColor: "#ddd"
              }}
            />
            {this._renderYellowStart(i)}
          </View>
        </View>
      );
    }
    return images;
  }

  _renderYellowStart(count) {
    if (count <= this.props.currentScore) {
      return (
        <Image
          source={require("../../../res/image/ic_star_navbar.png")}
          style={{
            width: 30,
            height: 30,
            marginHorizontal: 5,
            position: "absolute",
            tintColor: "#FC6969"
          }}
        />
      );
    }
  }

  _score(i) {
    this.setState({
      currentScore: i
    });
    this.props.selectIndex(i);
  }
}

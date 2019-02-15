/**
 * 详情页问答区域 提问
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Image,
  TextInput,
  View,
  Alert
} from "react-native";
import NavigationBar from "../../../common/NavigationBar";
import ViewUtils from "../../../util/ViewUtils";
import { scaleSize, scaleHeight, setSpText2 } from "../../../util/screenUtil";
import Goods from "../../../models/goods";
export default class FaqAsk extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }
  _submit = () => {
    const { navigation } = this.props;
    const { member_id, goods_id } = this.props.navigation.state.params;
    const { text } = this.state;
    if (!text) return;
    Goods.faqGoodsAsk({ member_id, goods_id, content: text }).then(res => {
      if (res.result == 1) {
        Alert.alert("发布提问", "发布提问成功，审核中...", [
          { text: "返回", onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert("发布提问失败");
      }
    });
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={"发布问题"}
          statusBar={{ backgroundColor: "steelblue", hidden: true }}
          style={{ backgroundColor: "steelblue" }}
          leftButton={ViewUtils.getLeftButton(() => {
            navigation.goBack();
          })}
          rightButton={ViewUtils.getSubmitButton("发布", () => {
            this._submit();
          })}
        />
        <View>
          <TextInput
            multiline={true}
            style={{
              textAlignVertical: "top",
              height: scaleSize(80),
              backgroundColor: "#eee",
              padding: scaleSize(10),
              fontSize: setSpText2(13),
              color: "#666"
            }}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            placeholder={"说出您的问题，已购买的人会为您解答哦~"}
            placeholderTextColor="#999"
          />
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

/**注册页面
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import { scaleSize, scaleHeight, setSpText2 } from "../../util/screenUtil";
import NavigationBar from "../../common/NavigationBar";
import ViewUtils from "../../util/ViewUtils";
import { Button, Toast, WhiteSpace, WingBlank } from "antd-mobile-rn";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import User from "../../models/user";
export default class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    mobile: "",
    secureTextEntry: true
  };
  _submit = () => {
    const { navigation } = this.props;
    const { mobile, username, password, email } = this.state;
    if (!username) {
      return alert("请输入用户名");
    }
    if (!password) {
      return alert("请输入密码");
    }
    if (!email) {
      return alert("请输入邮箱");
    }
    const params = {
      username,
      password,
      mobile,
      email
    };
    User.register(params).then(res => {
      if (res && res.result == 1) {
        Alert.alert(
          "注册成功",
          "",
          [
            {
              text: "去登陆",
              onPress: () => {
                navigation.navigate("Login", { name: "动态的" });
              }
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
      } else if (res && res.result == 0) {
        Toast.fail(res.message);
      } else {
        Toast.fail("注册失败");
      }
    });
  };
  render() {
    const { navigation } = this.props;
    const { username, secureTextEntry } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={"注册"}
          statusBar={{ backgroundColor: "steelblue", hidden: true }}
          style={{ backgroundColor: "steelblue" }}
          leftButton={ViewUtils.getLeftButton(() => {
            navigation.goBack();
          })}
        />
        <KeyboardAwareScrollView>
          <View style={{ alignItems: "center", marginTop: scaleSize(60) }}>
            <View style={styles.view1}>
              <Text
                style={{
                  paddingRight: scaleSize(20),
                  fontSize: setSpText2(14)
                }}
              >
                用户名
              </Text>
              <TextInput
                style={styles.textInput1}
                placeholder={"输入用户名"}
                onChangeText={e => this.setState({ username: e })}
                underlineColorAndroid={"transparent"}
                placeholderTextColor={"#CCCCCC"}
              />
            </View>
            <View style={styles.view1}>
              <Text
                style={{
                  paddingRight: scaleSize(20),
                  fontSize: setSpText2(14)
                }}
              >
                密 码
              </Text>
              <TextInput
                style={styles.textInput1}
                value={this.state.password}
                placeholder={"设置密码(必须包含数字和字母)"}
                secureTextEntry={secureTextEntry}
                onChangeText={e => {
                  this.setState({ password: e });
                }}
                underlineColorAndroid={"transparent"}
                placeholderTextColor={"#CCCCCC"}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  right: 10
                }}
                onPress={() => {
                  this.setState({
                    secureTextEntry: !secureTextEntry
                  });
                }}
              >
                <Image
                  resizeMode="contain"
                  source={require("../../../res/image/yan.png")}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: "#333",
                    transform: [
                      { rotateX: secureTextEntry ? "0deg" : "180deg" }
                    ]
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.view1}>
              <Text
                style={{
                  paddingRight: scaleSize(20),
                  fontSize: setSpText2(14)
                }}
              >
                邮 箱
              </Text>
              <TextInput
                style={styles.textInput1}
                placeholder={"请输入邮箱"}
                onChangeText={e => {
                  this.setState({ email: e });
                }}
                value={this.state.email}
                underlineColorAndroid={"transparent"}
                placeholderTextColor={"#CCCCCC"}
              />
            </View>
            <View style={styles.view1}>
              <Text
                style={{
                  paddingRight: scaleSize(20),
                  fontSize: setSpText2(14)
                }}
              >
                手 机
              </Text>
              <TextInput
                style={styles.textInput1}
                placeholder={"选填 手机号"}
                onChangeText={e => {
                  this.setState({ mobile: e });
                }}
                value={this.state.mobile}
                underlineColorAndroid={"transparent"}
                placeholderTextColor={"#CCCCCC"}
              />
            </View>

            <Text
              style={{
                marginTop: scaleSize(40),
                width: scaleSize(320),
                textAlign: "center",
                paddingVertical: scaleSize(10),
                backgroundColor: "#FC6969",
                color: "#fff",
                fontSize: setSpText2(14)
              }}
              onPress={this._submit}
            >
              账号注册
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  textInput1: {
    fontSize: setSpText2(14),
    color: "#333",
    height: 45
    // borderBottomWidth: 0.5,
    // borderBottomColor: "#eaeaea"
  },
  view1: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleSize(10),
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    width: scaleSize(320),
    paddingBottom: scaleSize(5)
  }
});

import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import NavigationBar from "../../common/NavigationBar";
import ViewUtils from "../../util/ViewUtils";

import { asyncLoging } from "../../actions/user";
import { connect } from "react-redux";
import { Toast } from "antd-mobile-rn";
import { NavigationActions } from "react-navigation";
import { scaleSize, scaleHeight, setSpText2 } from "../../util/screenUtil";

// 这里必须重置路由 不然退出登录的时候会出现路由跳转问题
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({
      routeName: "HomePage"
    })
  ]
});
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      validcode: "",
      valiImage: "",
      isError: false
    };
  }
  // 当登录状态发生变化的时候 loginStaus
  componentDidUpdate(prevProps, prevState) {
    const { navigation, loginStaus } = this.props;
    if (prevProps.loginStaus !== loginStaus) {
      navigation.dispatch(resetAction);
    }
  }
  login() {
    const { username, password } = this.state;
    if (!username) {
      // return Toast.warn('请输入用户名')
      return alert("请输入用户名");
    }
    if (!password) {
      return alert("请输入密码");
      // return Toast.warn('请输入密码')
    }
    const params = {
      username,
      password
    };
    this.props.dispatch(asyncLoging(params)).then(res => {
      console.warn("res登录::", res);
      if (res === "error") {
        Toast.fail("登录失败");
      }
    });
  }
  componentDidMount() {}
  render() {
    const { navigation, isError, isLoding } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={"登录"}
          leftButton={ViewUtils.getLeftButton(() => {
            navigation.goBack();
          })}
        />
        <View style={{ alignItems: "center", marginTop: scaleSize(60) }}>
          <View style={styles.view1}>
            <Text
              style={{ paddingRight: scaleSize(20), fontSize: setSpText2(14) }}
            >
              账号
            </Text>
            <TextInput
              style={styles.textInput1}
              placeholder={"输入账号"}
              onChangeText={e => {
                this.setState({
                  username: e
                });
              }}
              value={this.state.username}
              //   underlineColorAndroid={"transparent"}
              //   placeholderTextColor={"#CCCCCC"}
            />
          </View>
          <View style={styles.view1}>
            <Text
              style={{ paddingRight: scaleSize(20), fontSize: setSpText2(14) }}
            >
              密码
            </Text>
            <TextInput
              style={styles.textInput1}
              value={this.state.password}
              placeholder={"输入密码"}
              secureTextEntry={true}
              onChangeText={e => {
                this.setState({
                  password: e
                });
              }}
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
            onPress={() => {
              this.login();
            }}
          >
            登 陆
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: scaleSize(50),
              justifyContent: "space-around"
            }}
          >
            <Text
              style={{
                color: "#FC6969",
                marginHorizontal: scaleSize(20),
                fontSize: setSpText2(11)
              }}
              onPress={() => {
                // navigation.navigate("Register");
                alert("未完成");
              }}
            >
              找回密码
            </Text>
            <Text
              style={{
                color: "#FC6969",
                marginHorizontal: scaleSize(20),
                fontSize: setSpText2(11)
              }}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              账号注册
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    loginStaus: state.user.loginStaus,
    isLoding: state.user.isLoding,
    isError: state.user.isError
  };
};
export default connect(mapStateToProps)(Login);

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

/**
 * 首页
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import ButtonView from "../common/ButtonView";
import videoUrl from "../../res/pageImage/landing.mp4";
import Video from "react-native-video";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import * as WeChat from "react-native-wechat";

const { width, height } = Dimensions.get("window");
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({
      routeName: "HomePage"
    })
  ]
});
class WelcomePage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { navigation, loginStaus, state } = this.props;
    console.warn("state::", state);
    if (loginStaus) {
      console.warn("已经登录");
      navigation.dispatch(resetAction);
    } else {
      console.warn("没有登录");
    }
    try {
      WeChat.registerApp("wx1a76ca32a2015cda");
    } catch (e) {
      console.error("e:", e);
    }
  }
  //   点击微信登录按钮
  //   https://www.jianshu.com/p/46a9919636be
  _wxLogin = () => {
    let scope = "snsapi_userinfo";
    let statess = "wechat_sdk_abcs";

    // const isRegistered = WeChat.registerApp("wx1a76ca32a2015cda");
    WeChat.isWXAppInstalled().then(isInstalled => {
      if (isInstalled) {
        // 获取微信授权
        WeChat.sendAuthRequest(scope, statess)
          .then(responseCode => {
            //授权成功获取token
            console.warn("responseCode::", responseCode);

            // this.getAccessToken(responseCode);
          })
          .catch(error => {
            alert("登录授权发生错误：", error.message, [{ text: "确定" }]);
          });
      } else {
        alert("没有安装微信软件，请您安装微信之后再试");
      }
    });
  };
  //   获取token
  getAccessToken(responseCode) {
    let appId = "wx1a76ca32a2015cda";
    let secret = "047eae21f5bc3f7972bacb9b4a5ceaf5";
    switch (parseInt(responseCode.errCode)) {
      // 用户换取access_token的code，仅在ErrCode为0时有效
      case 0:
        //获取token值
        getRequest(
          "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" +
            appId +
            "&secret=" +
            secret +
            "&code=" +
            responseCode.code +
            "&grant_type=authorization_code"
        )
          .then(res => {
            console.warn("res::", res);
            //授权成功，获取用户头像等信息
            this.getUserInfoFormWx(res);
          })
          .catch(err => {});
        break;
      case -4:
        //用户拒绝
        break;
      case -2:
        //用户取消
        break;
    }
  }
  /*** 微信登录 获取用户信息*/

  getUserInfoFormWx(res) {
    getRequest(
      "https://api.weixin.qq.com/sns/userinfo?access_token=" +
        res.access_token +
        "&openid=" +
        res.openid
    )
      .then(res => {
        console.warn("res2::", res);
        ToastAndroid.show("用户信息" + JSON.stringify(res), ToastAndroid.SHORT);
      })
      .catch(err => {});
  }
  render() {
    const { navigation, loginStaus } = this.props;
    if (loginStaus) {
      return null;
    }
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {/* <Video
            source={videoUrl}
            repeat={true}
            paused={false}
            resizeMode={"stretch"}
            style={styles.backgroundVideo}
          /> */}
          <Image
            source={require("../../res/pageImage/welcome.jpg")}
            style={{ width: width, height: height }}
            resizeMode={"cover"}
          />
        </View>

        <View style={styles.btnWrapper}>
          <ButtonView
            btnStyle={styles.telBtn}
            underlayColor="#eee"
            textStyle={styles.telText}
            btnName="账号密码登录"
            onPress={() => {
              navigation.navigate("Login", { name: "参数" });
            }}
          />
          <Text
            style={{
              borderBottomColor: "#ccc",
              color: "#666",
              borderBottomWidth: 1,
              width: 200,
              marginVertical: 20,
              textAlign: "center",
              fontSize: 10,
              paddingVertical: 4
            }}
          >
            第 三 方 登 录
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={this._wxLogin}>
              <Image
                source={require("../../res/image/icon_weixin.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../res/image/icon_weibo.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../res/image/icon_qq.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginStaus: state.user.loginStaus,
    state
  };
};
export default connect(mapStateToProps)(WelcomePage);
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#111",
    marginHorizontal: 20
  },

  btnWrapper: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    zIndex: 1000
  },

  telBtn: {
    height: 45,
    width: 250,
    backgroundColor: "#FC6969",
    borderColor: "#666",

    borderRadius: 5
  },
  telText: {
    color: "#fff"
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

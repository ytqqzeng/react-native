// 个人信息
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
  StyleSheet,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  Alert,
  View,
  TouchableHighlight
} from "react-native";
import ImagePicker from "react-native-image-picker";
import NavigationBar from "../../../common/NavigationBar";
import ViewUtils from "../../../util/ViewUtils";
import { List, Modal, DatePicker, Button } from "antd-mobile-rn";
import { connect } from "react-redux";
import moment from "moment";
import User from "../../../models/user";
import { env } from "../../../config";
import { updateUserInfo } from "../../../actions/user";
import { scaleSize, scaleHeight, setSpText2 } from "../../../util/screenUtil";
const ROOT_URL = `${env.apiHost}/`;
const Item = List.Item;

var options = {
  title: "选择照片",
  cancelButtonTitle: "取消",
  takePhotoButtonTitle: "拍照",
  chooseFromLibraryButtonTitle: "从相册中选择",
  storageOptions: {
    skipBackup: false,
    path: "images"
  },
  maxWidth: 700,
  maxHeight: 700
};
class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tmpAvatar: null,
      avatar: null,
      nickname: null,
      sex: null,
      birthday: null,
      face: null,
      userInfoOrigin: null
    };
  }
  componentWillMount() {
    this.setState({
      userInfoOrigin: this.props.userInfo
    });
  }
  _submit = () => {
    const {
      uname,
      sex,
      birthday,
      avatar,
      nickname,
      userInfoOrigin
    } = this.state;

    if (avatar) {
      console.warn("avatar::", avatar);
      User.uploadAvatar(avatar)
        .then(res => {
          console.warn("res::", res);
          this.setState({
            face: res.original
          });
          let params = {
            uname: userInfoOrigin.uname,
            face: res.original,
            nickname: nickname == null ? userInfoOrigin.nickname : nickname,
            birthday: birthday == null ? userInfoOrigin.birthday : birthday,
            sex: sex == null ? userInfoOrigin.sex : sex
          };
          User.updateUserInfo(params).then(res => {
            if (res.result == 1) {
              const newUserInfo = { ...userInfoOrigin, ...params };
              this.props.dispatch(updateUserInfo(newUserInfo));
              Alert.alert("成功", "用户信息更新成功");
              this.setState({
                avatar: null,
                nickname: null,
                sex: null,
                birthday: null
              });
            }
          });
        })
        .catch(err => console.warn("err::", err));
    } else {
      let params = {
        uname: userInfoOrigin.uname,
        face: userInfoOrigin.face,
        nickname: nickname == null ? userInfoOrigin.nickname : nickname,
        birthday: birthday == null ? userInfoOrigin.birthday : birthday,
        sex: sex == null ? userInfoOrigin.sex : sex
      };
      User.updateUserInfo(params).then(res => {
        if (res.result == 1) {
          const newUserInfo = { ...userInfoOrigin, ...params };
          //   更改store里面的用户信息
          this.props.dispatch(updateUserInfo(newUserInfo));
          //   将按钮设置为不可用

          Alert.alert("成功", "用户信息更新成功");
          this.setState({
            avatar: null,
            nickname: null,
            sex: null,
            birthday: null
          });
        }
      });
    }
  };
  render() {
    const { navigation, userInfo } = this.props;
    const {
      tmpAvatar,
      sex,
      birthday,
      avatar,
      nickname,
      userInfoOrigin
    } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={"修改个人信息"}
          statusBar={{ backgroundColor: "steelblue", hidden: true }}
          leftButton={ViewUtils.getLeftButton(() => {
            navigation.goBack(null);
          })}
        />
        <View>
          <List>
            <Item
              style={{ fontSize: 30, color: "red" }}
              extra={
                <Image
                  source={{
                    uri: tmpAvatar
                      ? "data:image/jpeg;base64," + tmpAvatar
                      : `${ROOT_URL}/shop/eop/upload/getFile.do?subFolder=/avatar&fileName=${
                          userInfoOrigin.face
                        }`
                  }}
                  style={{
                    width: 20,
                    height: 20,
                    borderWidth: 1,
                    borderColor: "#111"
                  }}
                />
              }
              arrow="horizontal"
              onClick={() => {
                ImagePicker.showImagePicker(options, response => {
                  if (response.error) {
                    alert("系统异常，请稍后再试");
                  } else if (response.didCancel) {
                    console.log("User cancelled image picker");
                  } else {
                    this.setState({
                      tmpAvatar: response.data,
                      avatar: response.uri
                    });
                  }
                });
              }}
            >
              头像
            </Item>
            <Item
              arrow="horizontal"
              extra={
                <TextInput
                  placeholder="请输入昵称"
                  defaultValue={userInfoOrigin.nickname}
                  underlineColorAndroid={"transparent"}
                  placeholderTextColor={"#CCCCCC"}
                  onChangeText={e => {
                    this.setState({
                      nickname: e
                    });
                  }}
                  style={{
                    fontSize: 17,
                    color: "#888",
                    textAlign: "right",
                    minWidth: 100
                  }}
                />
              }
            >
              昵称
            </Item>
            <Item
              arrow="horizontal"
              extra={
                <TextInput
                  placeholder="请选择性别"
                  defaultValue={userInfoOrigin.sex ? "男" : "女"}
                  value={
                    (sex === null ? userInfoOrigin.sex : sex) ? "男" : "女"
                  }
                  underlineColorAndroid={"transparent"}
                  placeholderTextColor={"#CCCCCC"}
                  editable={false}
                  style={{
                    fontSize: 17,
                    color: "#888",
                    textAlign: "right",
                    minWidth: 100
                  }}
                />
              }
              onClick={() => {
                Modal.operation([
                  { text: "男", onPress: () => this.setState({ sex: 1 }) },
                  { text: "女", onPress: () => this.setState({ sex: 0 }) }
                ]);
              }}
            >
              性别
            </Item>
            <Item
              arrow="horizontal"
              extra={<Text>修改地址</Text>}
              onClick={() => {
                navigation.navigate("Address", { name: "动态的" });
              }}
            >
              收货地址
            </Item>
          </List>
          <List style={{ marginTop: 10 }}>
            <DatePicker
              mode="date"
              title="生日"
              extra="立即补充"
              value={
                (birthday === null
                ? userInfoOrigin.birthday
                : birthday)
                  ? new Date(
                      birthday === null ? userInfoOrigin.birthday : birthday
                    )
                  : null
              }
              minDate={new Date("1900-01-01")}
              onChange={date => {
                this.setState({
                  birthday: moment(date).format("YYYY-MM-DD")
                });
              }}
            >
              <Item arrow="horizontal">生日</Item>
            </DatePicker>
          </List>
        </View>
        <SafeAreaView>
          <Button
            type="primary"
            disabled={
              avatar === null &&
              nickname === null &&
              sex === null &&
              birthday === null
            }
            style={{
              margin: scaleSize(30),
              backgroundColor: "#FC6969",
              borderWidth: 0,
              borderRadius: scaleSize(3)
            }}
            onClick={() => {
              this._submit();
            }}
          >
            保 存
          </Button>
        </SafeAreaView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo
  };
};
export default connect(mapStateToProps)(UserInfo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  image: {
    height: 22,
    width: 22
  }
});

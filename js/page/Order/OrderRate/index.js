/**
 * 评价晒单
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
  TouchableOpacity,
  Text,
  View
} from "react-native";
import { scaleSize, setSpText2, scaleHeight } from "../../../util/screenUtil";
import NavigationBar from "../../../common/NavigationBar";
import ViewUtils from "../../../util/ViewUtils";
import StarScore from "./StarScore";
import ImagePicker from "react-native-image-picker";
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
export default class OrderRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScore: 3,
      text: "",
      imgDataArr: [],
      imgUriArr: []
    };
  }
  //  评分当前选中
  _selectIndex(count) {
    this.state.currentScore = count;
  }
  //   评价的内容
  _rateWords = () => {
    return (
      <TextInput
        style={{
          height: scaleHeight(100),
          backgroundColor: "#EEE",
          fontSize: setSpText2(13),
          textAlignVertical: "top"
        }}
        onChangeText={text => this.setState({ text })}
        value={this.state.text}
        placeholder={"请输入评价的内容"}
        placeholderTextColor={"#DDD"}
        multiline={true}
      />
    );
  };
  //   晒图
  _takePhoto = () => {
    const { imgDataArr, imgUriArr } = this.state;
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#FFF",
          padding: scaleSize(15)
        }}
      >
        {imgDataArr.map(item => {
          return (
            <View>
              <Image
                source={{ uri: "data:image/jpeg;base64," + item }}
                style={{
                  width: scaleSize(64),
                  height: scaleSize(64),
                  marginHorizontal: scaleSize(10),
                  borderWidth: 1,
                  borderColor: "#EEE"
                }}
                resizeMode={"cover"}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: -10,
                  right: 10,
                  zIndex: 10
                }}
                onPress={() => {
                  alert(4);
                }}
              >
                <Image
                  source={{ uri: "data:image/jpeg;base64," + item }}
                  style={{
                    width: scaleSize(10),
                    height: scaleSize(10)
                  }}
                  resizeMode={"cover"}
                />
              </TouchableOpacity>
            </View>
          );
        })}

        {/* {avatar2 ? (
          <Image
            source={require(avatar2)}
            style={{ width: scaleSize(44), height: scaleSize(32) }}
          />
        ) : null} */}

        <TouchableOpacity
          onPress={() => {
            ImagePicker.showImagePicker(options, response => {
              if (response.error) {
                alert("系统异常，请稍后再试");
              } else if (response.didCancel) {
                console.log("User cancelled image picker");
              } else {
                console.warn("response::", response);
                imgDataArr.push(response.data);
                imgUriArr.push(response.uri);
                this.setState({
                  imgDataArr,
                  imgUriArr
                });
              }
            });
          }}
          style={{
            padding: scaleSize(10),
            borderWidth: 1,
            borderColor: "#EEE",
            width: scaleSize(64),
            height: scaleSize(64)
          }}
        >
          <Image
            source={require("../../../../res/image/takePhoto.png")}
            style={{ width: scaleSize(44), height: scaleSize(32) }}
          />
          <Text style={{ textAlign: "center" }}>照片</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const { navigation } = this.props;
    const { _img, member_id, _goods_id } = navigation.state.params;

    return (
      <View style={styles.container}>
        <NavigationBar
          title={"评价晒单"}
          statusBar={{ backgroundColor: "steelblue", hidden: true }}
          leftButton={ViewUtils.getLeftButton(() => {
            navigation.goBack(null);
          })}
          rightButton={ViewUtils.getSubmitButton("提交", () => {
            alert("未完成");
          })}
        />
        <View style={{}}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingHorizontal: scaleSize(10),
              paddingVertical: scaleSize(15),
              backgroundColor: "#FFF"
            }}
          >
            <Image
              source={{ uri: _img }}
              style={{ width: scaleSize(80), height: scaleSize(80) }}
            />
            <View>
              <Text style={{ fontSize: setSpText2(13), color: "#666" }}>
                评分
              </Text>
              <StarScore selectIndex={this._selectIndex.bind(this)} />
            </View>
          </View>
          {this._rateWords()}
          {this._takePhoto()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});

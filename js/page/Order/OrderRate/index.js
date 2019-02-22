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
import Toast, { DURATION } from "react-native-easy-toast";
import Order from "../../../models/order";
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
      loading: true,
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
          textAlignVertical: "top",
          paddingHorizontal: scaleSize(15)
        }}
        onChangeText={text => this.setState({ content: text })}
        value={this.state.content}
        placeholder={"请输入评价的内容"}
        placeholderTextColor={"#DDD"}
        multiline={true}
      />
    );
  };
  _deleteImg = index => {
    const { imgDataArr, imgUriArr } = this.state;
    imgDataArr.splice(index, 1);
    imgUriArr.splice(index, 1);
    this.setState({
      imgDataArr,
      imgUriArr,
      content: "",
      grade: 3
    });
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
        {imgDataArr.map((item, index) => {
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
                  this._deleteImg(index);
                }}
              >
                <Image
                  source={require("../../../../res/image/cancel.png")}
                  style={{
                    width: scaleSize(25),
                    height: scaleSize(25),
                    tintColor: "#999"
                  }}
                  resizeMode={"cover"}
                />
              </TouchableOpacity>
            </View>
          );
        })}

        <TouchableOpacity
          onPress={() => {
            //   规定只能上传一张图片
            if (imgUriArr.length > 0) return;
            ImagePicker.showImagePicker(options, response => {
              if (response.error) {
                alert("系统异常，请稍后再试");
              } else if (response.didCancel) {
                console.log("User cancelled image picker");
              } else {
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
  _submit = param => {
    const { currentScore, content, imgUriArr } = this.state;
    const params = {
      ...param,
      content,
      grade: currentScore,
      img: imgUriArr.join()
    };
    if (content) {
      this.refs.toast.show("提交中~", 10000);
      Order.rateOrder(params).then(res => {
        this.refs.toast.close();
        if (res.result === 1) {
        } else {
          alert("失败:", res.message);
        }
      });
    } else {
      this.refs.toast.show("至少输入一个字哦~!", 800);
    }
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
            this._submit({ member_id, goods_id: _goods_id });
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
          <Toast ref="toast" position="center" opacity={0.8} />
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

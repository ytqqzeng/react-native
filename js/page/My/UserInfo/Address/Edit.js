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
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Text,
  View
} from "react-native";
import Picker from "react-native-picker";
import area from "./area.json";
import { scaleSize, setSpText2 } from "../../../../util/screenUtil";
import NavigationBar from "../../../../common/NavigationBar";
import ViewUtils from "../../../../util/ViewUtils";
import { connect } from "react-redux";
import User from "../../../../models/user";
import { Toast } from "antd-mobile-rn";
class EditAdress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      mobile: "",
      addr: "",
      def_addr: 0
    };
  }
  _createAreaData() {
    let data = [];
    let len = area.length;
    for (let i = 0; i < len; i++) {
      let city = [];
      for (let j = 0, cityLen = area[i]["city"].length; j < cityLen; j++) {
        let _city = {};
        _city[area[i]["city"][j]["name"]] = area[i]["city"][j]["area"];
        city.push(_city);
      }
      let _data = {};
      _data[area[i]["name"]] = city;
      data.push(_data);
    }
    return data;
  }
  _showAreaPicker() {
    const { params } = this.props.navigation.state;
    const data = params.item;
    const address = Array(data.province, data.city, data.region);

    Picker.init({
      pickerData: this._createAreaData(),
      selectedValue: address,
      onPickerConfirm: pickedValue => {
        console.warn("area", pickedValue);
        this.setState({
          address: pickedValue.join(" ")
        });
      },
      onPickerCancel: pickedValue => {
        console.warn("area", pickedValue);
      },
      onPickerSelect: pickedValue => {
        // Picker.select(["山东", "青岛", "黄岛区"]);
        console.warn("area3", pickedValue);
      }
    });
    Picker.show();
  }
  _save = () => {
    const { params } = this.props.navigation.state;
    const { name, mobile, addr, address, def_addr } = this.state;
    const { userInfo } = this.props;

    if (!name) {
      alert("请输入收件人");
      return;
    }
    if (!mobile) {
      alert("请输入手机");
      return;
    }
    if (!address) {
      alert("请选择地区");
      return;
    }
    if (!addr) {
      alert("详细街道");
      return;
    }

    const [province, city, region] = address.split(" ");
    const paramsObj = {
      addr_id: params.item.addr_id,
      province,
      city,
      region,
      name,
      mobile,
      addr,
      def_addr,
      member_id: userInfo.member_id
    };

    User.addUserAddress(paramsObj).then(res => {
      if (res.result == 1) {
        Toast.info("编辑地址成功！", 1);
        params.updateData();
      }
    });
  };
  componentWillUnmount() {
    Picker.hide();
  }
  componentDidMount() {
    const { params } = this.props.navigation.state;
    const data = params.item;
    const address = `${data.province} ${data.city} ${data.region}`;
    this.setState({
      name: data.name,
      address: address,
      mobile: data.mobile,
      addr: data.addr,
      def_addr: data.def_addr
    });
  }
  render() {
    const { params } = this.props.navigation.state;
    const data = params.item;

    const { navigation } = this.props;
    const { def_addr } = this.state;
    const imgIcon = def_addr
      ? require("../../../../../res/image/abc_btn_check_on.png")
      : require("../../../../../res/image/abc_btn_check_off.png");
    return (
      <View>
        <NavigationBar
          title={"编辑收货地址"}
          statusBar={{ backgroundColor: "steelblue", hidden: true }}
          leftButton={ViewUtils.getLeftButton(() => {
            navigation.goBack(null);
          })}
        />
        <Text
          style={{
            paddingVertical: scaleSize(10),
            color: "#666",
            fontSize: setSpText2(11),
            backgroundColor: "#999",
            textAlign: "center"
          }}
        >
          地址信息
        </Text>
        <View style={{ paddingHorizontal: scaleSize(5) }}>
          <TextInput
            style={styles.textInput1}
            value={this.state.name}
            placeholder={"收件人:"}
            onChangeText={e => {
              this.setState({
                name: e
              });
            }}
            underlineColorAndroid={"#ddd"}
            placeholderTextColor={"#444"}
          />
          <TextInput
            style={styles.textInput1}
            value={this.state.mobile}
            placeholder={"手机:"}
            onChangeText={e => {
              this.setState({
                mobile: e
              });
            }}
            underlineColorAndroid={"#ddd"}
            placeholderTextColor={"#444"}
          />
          <TextInput
            defaultValue={`${data.province} ${data.city} ${data.region} `}
            style={styles.textInput1}
            value={this.state.address}
            placeholder={`${data.province} ${data.city} ${data.region} `}
            onFocus={this._showAreaPicker.bind(this)}
            onBlur={() => {
              Picker.hide();
            }}
            underlineColorAndroid={"#ddd"}
            placeholderTextColor={"#444"}
          />

          <TextInput
            style={styles.textInput1}
            value={this.state.addr}
            placeholder={"街道地址:"}
            onChangeText={e => {
              this.setState({
                addr: e
              });
            }}
            underlineColorAndroid={"#ddd"}
            placeholderTextColor={"#444"}
          />
          <TouchableWithoutFeedback
            onPress={() => {
              if (def_addr == 1) {
                this.setState({
                  def_addr: 0
                });
              } else {
                this.setState({
                  def_addr: 1
                });
              }
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={imgIcon}
                style={{
                  width: scaleSize(20),
                  height: scaleSize(20),
                  tintColor: "#FC6969"
                }}
              />
              <Text style={{ fontSize: setSpText2(10) }}>是否为默认地址</Text>
            </View>
          </TouchableWithoutFeedback>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
                this._save();
              }}
            >
              保 存
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo
  };
};
export default connect(mapStateToProps)(EditAdress);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  textInput1: {
    fontSize: setSpText2(11),
    color: "#111",
    height: scaleSize(45),
    borderBottomWidth: 0.5,
    borderBottomColor: "#eaeaea"
  }
});

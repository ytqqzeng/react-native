/**
 * 详情页问答区域 详细
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
  Text,
  ScrollView,
  View,
  TouchableOpacity
} from "react-native";
import NavigationBar from "../../../common/NavigationBar";
import ViewUtils from "../../../util/ViewUtils";
import { scaleSize, scaleHeight, setSpText2 } from "../../../util/screenUtil";
import { connect } from "react-redux";

/**
 * 常见问的解答
 */
class FaqDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _item = data => {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: scaleSize(15),
          paddingVertical: scaleSize(5),
          marginTop: scaleSize(8)
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingVertical: scaleSize(3),
            alignItems: "center"
          }}
        >
          <View style={styles.askWrapper}>
            <Text style={styles.ask}>问</Text>
          </View>
          <Text
            style={{ fontSize: setSpText2(13), color: "#333", width: "90%" }}
            numberOfLines={1}
          >
            {data.content}
          </Text>
        </View>
        {/* 答*/}
        {data.replystatus === 1 && (
          <View
            style={{
              flexDirection: "row",
              marginLeft: scaleSize(10),
              alignItems: "center",
              backgroundColor: "#eee",
              padding: scaleSize(6),
              borderRadius: scaleSize(3)
            }}
          >
            <View style={[styles.askWrapper, { backgroundColor: "steelblue" }]}>
              <Text style={styles.ask}>答</Text>
            </View>
            <Text
              style={{ fontSize: setSpText2(13), color: "#999", width: "90%" }}
              numberOfLines={1}
            >
              {data.replystatus === 1 && data.reply}
            </Text>
          </View>
        )}
      </View>
    );
  };
  render() {
    const { navigation } = this.props;
    const { member_id } = this.props.userInfo;
    const { data, goods_id } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <NavigationBar
          title={"问答区"}
          statusBar={{ backgroundColor: "steelblue", hidden: true }}
          style={{ backgroundColor: "steelblue" }}
          leftButton={ViewUtils.getLeftButton(() => {
            navigation.goBack();
          })}
        />
        <ScrollView>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: "center", fontSize: setSpText2(12) }}>
              商品问答区
            </Text>
            {data.length > 0 && data.map(item => this._item(item))}
          </View>
        </ScrollView>
        <View
          style={{
            height: 45,
            backgroundColor: "transparent",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            top: -20
          }}
        >
          <Text
            onPress={() => {
              navigation.navigate("FaqAsk", {
                member_id,
                goods_id
              });
            }}
            style={{
              fontSize: setSpText2(13),
              paddingHorizontal: scaleSize(25),
              paddingVertical: scaleSize(5),
              backgroundColor: "#FC6969",
              borderRadius: scaleSize(15),
              color: "#fff"
            }}
          >
            问问买家
          </Text>
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
export default connect(mapStateToProps)(FaqDetail);
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  askWrapper: {
    width: scaleSize(20),
    height: scaleSize(20),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FC6969",
    borderRadius: scaleSize(20) / 2,
    borderBottomLeftRadius: 0,
    marginRight: scaleSize(5)
  },
  ask: {
    fontSize: setSpText2(13),
    color: "#fff"
  }
});

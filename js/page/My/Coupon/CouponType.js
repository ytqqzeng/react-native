/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import dayjs from "dayjs";
import {
  Platform,
  StyleSheet,
  Image,
  Text,
  View,
  FlatList
} from "react-native";
import { scaleSize, scaleHeight, setSpText2 } from "../../../util/screenUtil";

export default class CouponType extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
    };
  }
  _renderItem = ({ item }) => {
    const isUsed = this.props.used;
    const {
      type_name,
      use_start_date,
      use_end_date,
      type_money,
      min_goods_amount
    } = item;
    const start = dayjs(use_start_date * 1000)
      .format("YYYY.MM.DD")
      .slice(0, 10);
    const end = dayjs(use_end_date * 1000)
      .format("YYYY.MM.DD")
      .slice(0, 10);
    const img = isUsed
      ? require("../../../../res/image/coupon_001.png")
      : require("../../../../res/image/coupon_003.png");
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          marginVertical: 20
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image source={img} style={{ height: scaleSize(140), width: scaleSize(150) }} />
          <Text
            style={{
              position: "absolute",
              fontSize: setSpText2 (20),
              fontWeight: "bold",
              color: "#FFF",
              top: 20
            }}
          >
            {`¥ ${type_money}`}
          </Text>

          <Text
            style={{
              fontSize: setSpText2 (10),
              color: "#FFF",
              position: "absolute",
              top: 80
            }}
          >
            {`满${min_goods_amount}元可以使用`}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFF",
            height: 140,
            padding: 15,
            justifyContent: "flex-start"
          }}
        >
          <Text style={{ fontSize: setSpText2 (13), color: "#666", marginBottom: 40 }}>
            {type_name}
          </Text>
          <Text
            style={{ fontSize: setSpText2 (10), color: "#DDD" }}
          >{`${start} - ${end}`}</Text>
          {isUsed ? (
            <Image
              source={require("../../../../res/image/coupon_017.png")}
              style={{
                height: 72,
                width: 71,
                position: "absolute",
                right: 40,
                top: 40
              }}
            />
          ) : null}
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.props.data} 
        onRefresh={this.props.changeData}
        refreshing={this.props.loading}
        renderItem={this._renderItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  
});

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

export default class CouponType extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          <Image source={img} style={{ height: 140, width: 200 }} />
          <Text
            style={{
              position: "absolute",
              fontSize: 50,
              fontWeight: "bold",
              color: "#FFF",
              top: 20
            }}
          >
            {`¥ ${type_money}`}
          </Text>

          <Text
            style={{
              fontSize: 20,
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
          <Text style={{ fontSize: 20, color: "#666", marginBottom: 40 }}>
            {type_name}
          </Text>
          <Text
            style={{ fontSize: 15, color: "#DDD" }}
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
    const { data, used } = this.props;
    return (
      <View style={styles.container}>
        <FlatList data={data} renderItem={this._renderItem} />
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

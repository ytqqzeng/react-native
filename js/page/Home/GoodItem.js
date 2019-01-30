/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import { Label } from ".././../common/Label";
import { scaleSize, scaleHeight, setSpText2 } from "../../util/screenUtil";
export default class GoodItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const navigation = this.props.navigation;
    let { name, original, is_viewed_price, mktprice } = this.props.info;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("GoodsDetail", {
              goodIndex: this.props.index,
              title: name,
              type: "NEW_GOODS",
              updateData: this.props.updateData
            });
          }}
        >
          <View>
            <Image
              style={styles.pic}
              source={{ uri: original }}
              resizeMode={"contain"}
            />
          </View>
          <Text style={styles.title}>{name}</Text>

          <View
            style={{
              paddingHorizontal: scaleSize(15),
              justifyContent: "space-between",
              marginBottom: scaleSize(10)
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Label
                title={"新品"}
                style={{
                  backgroundColor: "#eee",
                  color: "#999",
                  borderWidth: 0,
                  fontSize: setSpText2(9),
                  borderRadius: scaleSize(2)
                }}
              />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              {is_viewed_price ? (
                <Text
                  style={{
                    fontSize: setSpText2(14),
                    color: "#000"
                  }}
                >
                  ¥:{mktprice}
                </Text>
              ) : (
                <Label
                  title={"立即抢"}
                  style={{
                    backgroundColor: "#FC6969",
                    borderRadius: scaleSize(3),
                    color: "#fff",
                    borderWidth: 0,
                    fontSize: setSpText2(14)
                  }}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: scaleSize(10),
    backgroundColor: "#fff",
    borderRadius: scaleSize(10)
  },
  pic: {
    height: scaleHeight(245)
  },
  title: {
    paddingHorizontal: scaleSize(20),
    fontSize: setSpText2(14),
    marginVertical: scaleSize(12),
    color: "#000"
  }
});

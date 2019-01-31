//  头像组件
import React, { Component } from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import { scaleSize, scaleHeight, setSpText2 } from "../util/screenUtil";
export default class Avartar extends Component {
  render() {
    const size = this.props.size;
    return (
      <View style={styles.container}>
        <Image
          style={[styles.avatar, size]}
          source={{ uri: this.props.avatarUrl }}
        />
        <Text style={styles.avatanamer}>{this.props.avatarName}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  avatanamer: {
    fontSize: setSpText2(14),
    marginLeft: 5
  }
});

/**
 * 分割线
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { scaleSize, scaleHeight, setSpText2 } from "../util/screenUtil";
export default (CuttingLine = ({ title, subtitle, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={{ flexDirection: "row", marginBottom: scaleSize(10) }}>
        <View style={{ width: scaleSize(5), backgroundColor: "#FC6969" }} />
        <Text
          style={{
            fontSize: setSpText2(12),
            marginLeft: scaleSize(8),
            fontWeight: "bold",
            color: "#333",
            letterSpacing: 1
          }}
        >
          {title}
        </Text>
      </View>
      <Text
        style={{
          fontSize: setSpText2(12),
          letterSpacing: 1,
          color: "#999"
        }}
      >
        {subtitle}
      </Text>
    </View>
  );
});
// 第二种样式的分割线
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleSize(15)
  }
});

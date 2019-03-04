import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { scaleSize, scaleHeight, setSpText2 } from "../util/screenUtil";
export const Label = ({ title, style }) => {
  return (
    <Text
      style={{
        color: "#FC6969",
        textAlign: "center",
        paddingHorizontal: scaleSize(5),
        paddingVertical: scaleSize(2),
        fontSize: setSpText2(8),
        ...style
      }}
    >
      {title}
    </Text>
  );
};
/**
 * Tstyle text style
 * Wstyle wrapper style
 * @param {*} param0
 */
export const NewLabel = ({ title, Tstyle, Wstyle }) => {
  return (
    <View style={{ flexDirection: "row", ...Wstyle }}>
      <Text
        style={{
          color: "#FC6969",
          textAlign: "center",
          paddingHorizontal: scaleSize(5),
          paddingVertical: scaleSize(2),
          fontSize: setSpText2(8),
          borderWidth: 1,
          borderColor: "#FC6969",
          borderRadius: 3,
          ...Tstyle
        }}
      >
        {title}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({});

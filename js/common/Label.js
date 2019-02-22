import React, { Component } from "react";
import { Text } from "react-native";
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

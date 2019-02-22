import React, { Component } from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import { scaleSize, scaleHeight, setSpText2 } from "../util/screenUtil";
export const Header = ({ title }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Image
        style={styles.recArrow2}
        source={require("../../res/pageImage/icon_left_arrow.png")}
      />
      <Image
        style={styles.recArrow2}
        source={require("../../res/pageImage/icon_left_arrow.png")}
      />
      <Image
        style={styles.recArrow2}
        source={require("../../res/pageImage/icon_left_arrow.png")}
      />
      <Text style={styles.noteTitle}>{title}</Text>
      <Image
        style={styles.recArrow2}
        source={require("../../res/pageImage/icon_right_arrow.png")}
      />
      <Image
        style={styles.recArrow2}
        source={require("../../res/pageImage/icon_right_arrow.png")}
      />
      <Image
        style={styles.recArrow2}
        source={require("../../res/pageImage/icon_right_arrow.png")}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  recArrow2: {
    width: 20,
    height: 20,
    marginHorizontal: 7
  },
  noteTitle: {
    fontSize: setSpText2(14),
    color: "#fff",
    backgroundColor: "#222",
    paddingHorizontal: scaleSize(40),
    paddingVertical: scaleSize(4),
    borderColor: "#999",
    borderWidth: 2,
    borderRadius: 2
  }
});

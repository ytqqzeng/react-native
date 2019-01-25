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
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { scaleSize, scaleHeight, setSpText2 } from "../../util/screenUtil";
export default class ThemeRecommend extends Component {
  render() {
    let { data, index, navigation, updateData } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("GoodsDetail", {
            goodIndex: index,
            title: data.name,
            type: "THEME_GOODS",
            updateData: updateData
          });
        }}
      >
        <View style={styles.container}>
          <View style={styles.titleWrapper}>
            <View style={styles.line} />
            <Text style={styles.title}>什么风格</Text>
            <View style={styles.line} />
          </View>
          <Text style={styles.desc}>风格描述的文字</Text>
          <Image
            resizeMode={"contain"}
            style={styles.image}
            source={{ uri: data.original }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: scaleSize(150),
    height: scaleSize(200),
    alignItems: "center",
    backgroundColor: "#eee",
    marginBottom: scaleSize(20),
    borderColor: "#333",
    borderWidth: 1
  },
  titleWrapper: {
    flexDirection: "row"
  },
  line: {
    width: scaleSize(10),
    height: 1,
    marginTop: scaleSize(19),
    backgroundColor: "#333"
  },
  title: {
    textAlign: "center",
    color: "#222",
    fontSize: setSpText2(8),
    margin: scaleSize(8),
    marginTop: scaleSize(10)
  },
  desc: {
    textAlign: "center",
    color: "#999",
    fontSize: setSpText2(7),
    margin: 5
  },
  image: {
    flex: 1,
    width: 220,
    margin: "auto",
    margin: 3
  }
});

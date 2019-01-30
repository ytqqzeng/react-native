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
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View
} from "react-native";
import { scaleSize, scaleHeight, setSpText2 } from "../../util/screenUtil";
import Swiper from "react-native-swiper";
const WindowWidth = Dimensions.get("window").width;

export default class Swipper extends Component {
  rederImage(data, key) {
    const { navigation, updateData } = this.props;
    let Imageurl = data.original;
    return (
      <TouchableOpacity key={key} onPress={() => {}}>
        <View style={styles.slide375} key={key}>
          <Image
            style={{
              height: scaleHeight(130),
              width: "100%",
              borderRadius: scaleSize(10)
            }}
            source={Imageurl}
            // resizeMode={"cover"}
          />
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    const { data } = this.props;
    return (
      <View
        style={styles.container}
        style={{
          height: scaleHeight(150),
          paddingVertical: scaleSize(10),
          backgroundColor: "#fff"
        }}
      >
        <Swiper style={styles.wrapper} showsButtons={false}>
          {data.map((item, i) => {
            return this.rederImage(item, i);
          })}
        </Swiper>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink"
  },
  wrapper: {
    flexDirection: "row",
    height: scaleHeight(150)
  },
  slide375: {
    justifyContent: "center",
    alignItems: "center"
  }
});

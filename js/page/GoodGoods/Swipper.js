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
import FnUtils from "../../util/fnUtils";
import Swiper from "react-native-swiper";
const WindowWidth = Dimensions.get("window").width;

export default class Swipper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.slide1 = this.props.slide;
  }
  rederImage(data, key) {
    const { navigation, isShowText, updateData } = this.props;
    let Imageurl = FnUtils.getOriginalImg(data.original, "goods");
    return (
      <TouchableOpacity
        key={key}
        onPress={() => {
          navigation.navigate("GoodsDetail", {
            goodIndex: key,
            title: data.name,
            type: "SWIPPER_GOODS",
            updateData: updateData
          });
        }}
      >
        <View style={styles.slide375} key={key}>
          <Image
            style={styles.img}
            source={{ uri: Imageurl }}
            resizeMode={"cover"}
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
          height: 300
        }}
      >
        <Swiper
          style={styles.wrapper}
          style={{ height: 300 }}
          showsButtons={false}
        >
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
    backgroundColor: "#F5FCFF"
  },
  wrapper: {
    flexDirection: "row",
    height: 300
  },
  slide375: {
    flexDirection: "row",
    height: 300,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    position: "absolute",
    textAlign: "center",
    zIndex: 100,
    top: 10,
    left: 0,
    width: "100%",
    height: 30,
    color: "#fff",
    fontSize: 15
  },
  img: {
    flex: 1,
    height: 300,
    borderRadius: 20
  }
});

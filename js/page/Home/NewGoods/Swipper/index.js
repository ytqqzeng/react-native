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

import FnUtils from "../../../../util/fnUtils";
import Swiper from "react-native-swiper";
const WindowWidth = Dimensions.get("window").width;

export default class Swipper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  rederImage(data, key) {
    let Imageurl = FnUtils.getOriginalImg(data.banner, "subject");
    return (
      <TouchableOpacity
        key={key}
        onPress={() => {
          this.props.navigation.navigate("SwiperDetail", {
            subject_id: data.id,
            title: data.title
          });
        }}
      >
        <View style={styles.slide250} key={key}>
          <Image
            style={styles.img}
            source={{ uri: Imageurl }}
            resizeMode={"stretch"}
          />
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View
        style={styles.container}
        style={{
          height: 250
        }}
      >
        <Swiper style={styles.wrapper} showsButtons={false}>
          {this.props.data.map((item, i) => {
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
    height: 250
  },
  slide250: {
    flexDirection: "row",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333"
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
    fontSize: 15,
    backgroundColor: "rgba(0,0,0,.3)"
  },
  img: {
    flex: 1,
    height: 250,
    width: WindowWidth
  }
});

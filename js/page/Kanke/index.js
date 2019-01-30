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
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Text,
  View
} from "react-native";
import NavigationBar from "../../common/NavigationBar";
import { scaleSize, scaleHeight, setSpText2 } from "../../util/screenUtil";
import Swipper from "./Swipper";
import Video from "react-native-video";
import videoUrl from "../../../res/pageImage/landing.mp4";

export default class Kanke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgArray: [
        {
          original: require("../../../res/pageImage/_1.jpg")
        },
        {
          original: require("../../../res/pageImage/_2.jpg")
        },
        {
          original: require("../../../res/pageImage/_3.jpg")
        }
      ],
      videoArray: [
        {
          original: require("../../../res/pageImage/ad01.jpg")
        },
        {
          original: require("../../../res/pageImage/ad02.jpg")
        },
        {
          original: require("../../../res/pageImage/ad03.jpg")
        }
      ]
    };
  }
  _renderItem = ({ item }) => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        style={{
          paddingVertical: scaleSize(10),
          paddingHorizontal: scaleSize(10)
        }}
        onPress={() => {
          navigation.navigate("KankeDetail");
        }}
      >
        {/* <Video
          controls={true}
          source={videoUrl}
          repeat={true}
          paused={false}
          resizeMode={"cover"}
          style={{ height: 200, width: 300 }}
        /> */}
        <View>
          <Image
            source={item.original}
            style={{ height: scaleSize(150), borderRadius: scaleSize(10) }}
          />
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../../res/image/player_play.png")}
              style={{
                height: scaleSize(60),
                width: scaleSize(60),
                tintColor: "#777",
                position: "absolute",
                top: scaleSize(-90)
              }}
            />
          </View>
        </View>

        <Text
          style={{
            fontSize: setSpText2(15),
            color: "#888",
            paddingVertical: scaleSize(8)
          }}
        >
          这里是视频标题这里是视频标题这里是视频标题这里是视频标题这里是视频标题这里是视频标题
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                width: scaleSize(26),
                height: scaleSize(26),
                borderRadius: scaleSize(13),
                marginRight: scaleSize(10)
              }}
              source={require("../../../res/pageImage/good1.jpeg")}
            />
            <Text style={{ fontSize: setSpText2(12), color: "#888" }}>
              广告的昵称
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                width: scaleSize(13),
                height: scaleSize(13),
                tintColor: "#888"
              }}
              source={require("../../../res/image/person.png")}
            />
            <Text
              style={{
                marginLeft: scaleSize(5),
                fontSize: setSpText2(12),
                Color: "#888"
              }}
            >
              1026
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar title={"看客"} />
        <ScrollView style={{ backgroundColor: "#ddd" }}>
          <View
            style={{
              paddingHorizontal: scaleSize(10),
              marginBottom: scaleSize(11),
              backgroundColor: "#fff"
            }}
          >
            <Swipper navigation={navigation} data={this.state.imgArray} />
          </View>
          <View
            style={{
              //   paddingHorizontal: scaleSize(10),
              marginBottom: scaleSize(2),
              backgroundColor: "#fff"
            }}
          >
            <FlatList
              data={this.state.videoArray}
              renderItem={this._renderItem}
              ItemSeparatorComponent={() => (
                <View
                  style={{ height: scaleSize(10), backgroundColor: "#ddd" }}
                />
              )}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

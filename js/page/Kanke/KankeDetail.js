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
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  FlatList,
  Text,
  View,
  Dimensions
} from "react-native";
import NavigationBar from "../../common/NavigationBar";
import ViewUtils from "../../util/ViewUtils";
import { scaleSize, scaleHeight, setSpText2 } from "../../util/screenUtil";
import Swipper from "./Swipper";
import Video from "react-native-video";
import videoUrl from "../../../res/pageImage/landing.mp4";
const { width } = Dimensions.get("window");
export default class KankeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: true
    };
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={""}
          statusBar={{ backgroundColor: "steelblue", hidden: true }}
          style={{ backgroundColor: "steelblue" }}
          leftButton={ViewUtils.getLeftButton(() => {
            navigation.goBack();
          })}
        />
        <ScrollView>
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ alignItems: "center", marginTop: scaleSize(50) }}>
              <Image
                style={{
                  borderRadius: scaleSize(30),
                  width: scaleSize(60),
                  height: scaleSize(60),
                  marginBottom: scaleSize(10)
                }}
                source={require("../../../res/pageImage/good1.jpeg")}
              />
              <Text
                style={{
                  fontSize: setSpText2(14),
                  color: "#888",
                  marginBottom: scaleSize(30)
                }}
              >
                这里是广告的昵称
              </Text>
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({
                  paused: !this.state.paused
                });
              }}
            >
              <View style={{ height: scaleSize(160), backgroundColor: "#888" }}>
                {/* <Video
                  // controls={true}
                  //   source={videoUrl}
                  source={{
                    uri:
                      "http://sharevod.dangcdn.com/dsp/v/2017020808/42f788b5259a74d6f0c3.mp4?t=1549245467&k=D0168E3E307A8ABFE5ADED25FAE97B2B"
                  }}
                  repeat={true}
                  paused={this.state.paused}
                  resizeMode={"center"}
                  style={{
                    height: scaleSize(50)
                  }}
                /> */}
                {this.state.paused ? (
                  <View
                    style={{
                      flexDirection: "row",
                      height: scaleSize(160),
                      justifyContent: "center"
                    }}
                  >
                    <Image
                      source={require("../../../res/image/player_play.png")}
                      style={{
                        height: scaleSize(60),
                        width: scaleSize(60),
                        tintColor: "#777",
                        position: "absolute",
                        top: scaleSize(60)
                      }}
                    />
                  </View>
                ) : null}
              </View>
            </TouchableWithoutFeedback>
            <View
              style={{
                marginVertical: scaleSize(10),
                paddingHorizontal: scaleSize(10)
              }}
            >
              <Text
                style={{
                  fontSize: setSpText2(18),
                  color: "#888"
                }}
              >
                这里是广告的名称 这里是广告的名称 这里是广告的名称
                这里是广告的名称 这里是
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingVertical: scaleSize(50),
              backgroundColor: "#fff"
            }}
          >
            <View style={{ paddingHorizontal: scaleSize(20) }}>
              <Image
                source={require("../../../res/image/off_on.png")}
                style={{
                  height: scaleSize(30),
                  width: scaleSize(30),
                  tintColor: "#999"
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  marginTop: scaleSize(10),
                  color: "#999",
                  fontSize: setSpText2(10)
                }}
              >
                123
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: scaleSize(20)
              }}
            >
              <Image
                source={require("../../../res/image/person.png")}
                style={{
                  height: scaleSize(30),
                  width: scaleSize(30),
                  tintColor: "#999"
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  marginTop: scaleSize(10),
                  color: "#999",
                  fontSize: setSpText2(10)
                }}
              >
                1123
              </Text>
            </View>
          </View>
        </ScrollView>
        <View>
          <Text
            onPress={() => {
              alert("跳转");
            }}
            style={{
              textAlign: "center",
              fontSize: setSpText2(14),
              color: "#fff",
              paddingVertical: scaleSize(14),
              backgroundColor: "#FC6969"
            }}
          >
            商品直达链接
          </Text>
        </View>
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

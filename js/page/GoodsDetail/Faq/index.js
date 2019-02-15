/**
 * 详情页 商品问答模块
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
import { scaleSize, scaleHeight, setSpText2 } from "../../../util/screenUtil";

/**
 * 常见问的解答
 */
export default class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  FaqHeader = data => {
    if (data.length > 0) {
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text style={styles.text}>问答</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.text}>{`共${data.length}条问题`}</Text>
            <Image
              source={require("../../../../res/image/ic_tiaozhuan.png")}
              style={{
                width: scaleSize(15),
                height: scaleSize(15),
                tintColor: "#777"
              }}
            />
          </View>
        </View>
      );
    }
    return (
      <View>
        <Text style={styles.text}>暂无问答</Text>
      </View>
    );
  };
  FaqBody = data => {
    if (data.length > 0) {
      const arr = data.map(item => item.content);
      const newArr = arr.slice(0, 2);
      return (
        <View>
          {newArr.map(item => {
            return (
              <View
                style={{ flexDirection: "row", paddingVertical: scaleSize(3) }}
              >
                <View style={styles.askWrapper}>
                  <Text style={styles.ask}>问</Text>
                </View>
                <Text style={styles.text2} numberOfLines={1}>
                  {item}
                </Text>
              </View>
            );
          })}
        </View>
      );
    }
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={styles.text}>商品好不好，问问买过的人吧</Text>
        <Image
          source={require("../../../../res/image/ic_tiaozhuan.png")}
          style={{
            width: scaleSize(15),
            height: scaleSize(15),
            tintColor: "#777"
          }}
        />
      </View>
    );
  };
  render() {
    const { navigation, goods_id, data } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate("FaqDetail", { data, goods_id });
        }}
      >
        {this.FaqHeader(data)}
        {this.FaqBody(data)}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    paddingHorizontal: scaleSize(15),

    paddingVertical: scaleSize(5),
    overflow: "hidden"
  },
  text: {
    fontSize: setSpText2(12),
    color: "#777"
  },
  text2: {
    fontSize: setSpText2(13),
    color: "#333",
    width: "90%"
    // flexWrap: "nowrap"
  },
  askWrapper: {
    width: scaleSize(20),
    height: scaleSize(20),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FC6969",
    borderRadius: scaleSize(20) / 2,
    borderBottomLeftRadius: 0,
    marginRight: scaleSize(5)
  },
  ask: {
    fontSize: setSpText2(13),
    color: "#fff"
  },
  image: {
    height: 22,
    width: 22
  }
});

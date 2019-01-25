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
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  Text,
  FlatList,
  View
} from "react-native";
import NavigationBar from "../../common/NavigationBar";
import ViewUtils from "../../util/ViewUtils";
import { scaleSize, scaleHeight, setSpText2 } from "../../util/screenUtil";
import Swipper from "../../common/Swipper";
import Goods from "../../models/goods";
import StorageUtil, { StorageKey } from "../../models/StorageModel";

export default class GoodGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swipperArray: [],
      flatListArray: []
    };
  }
  _recommendOneGoods = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          alert(1);
        }}
        style={{ marginTop: scaleSize(10) }}
      >
        <Text style={{ color: "#BE9A95" }}>好物推荐</Text>
        <Text
          style={{ fontSize: setSpText2(15), marginVertical: scaleSize(2) }}
        >
          Ck One summer新款中性男女士香水100ML
        </Text>
        <Text style={{ marginVertical: scaleSize(2), color: "#ccc" }}>
          Ck One summer新款中性男女士香水100ML
        </Text>
        <Image
          source={{
            uri:
              "http://static.v5.javamall.com.cn/attachment/goods/201511240227066343.jpg"
          }}
          style={{
            height: scaleSize(200),
            borderColor: "#eee",
            borderWidth: 1,
            borderRadius: scaleSize(11)
          }}
        />
      </TouchableOpacity>
    );
  };
  /**
   * 共多少件商品
   * num （数量）
   */
  _goodsCount = num => {
    return (
      <Text
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          paddingVertical: scaleHeight(1),
          paddingHorizontal: scaleSize(4),
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: scaleSize(10),
          color: "#fff",
          fontSize: setSpText2(8)
        }}
      >
        共{num}件
      </Text>
    );
  };
  /**
   * 两个类目
   */
  _twoCategory = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: scaleSize(30)
        }}
      >
        <TouchableOpacity
          onPress={() => {
            alert(1);
          }}
          style={{
            flex: 1,
            marginRight: scaleSize(5),
            height: scaleHeight(100)
          }}
        >
          <Image
            style={{
              width: "100%",
              height: scaleHeight(100)
            }}
            source={require("../../../res/image/banner/xinongqingdan.jpg")}
          />
          {this._goodsCount(15)}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            alert(2);
          }}
          style={{
            flex: 1,
            height: scaleHeight(100),
            marginLeft: scaleSize(5)
          }}
        >
          <Image
            style={{
              width: "100%",
              height: scaleHeight(100)
            }}
            source={require("../../../res/image/banner/haowu.jpg")}
          />
          {this._goodsCount(25)}
        </TouchableOpacity>
      </View>
    );
  };
  _editRecommend = () => {
    return (
      <View style={{ borderColor: "#ccc", borderBottomWidth: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <Text
            style={{
              width: scaleSize(3),
              height: scaleHeight(15),
              backgroundColor: "#333",
              marginRight: scaleSize(5)
            }}
          />
          <Text style={{ fontSize: setSpText2(12) }}>热卖推荐 </Text>
        </View>
      </View>
    );
  };
  _flatList = () => {
    const { flatListArray } = this.state;
    return (
      <View style={{ marginVertical: scaleSize(5) }}>
        <FlatList
          horizontal={true}
          keyExtractor={(item, index) => item.id}
          data={flatListArray}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Image
                source={{ uri: item.original }}
                style={{
                  width: scaleSize(100),
                  height: scaleHeight(100),
                  marginLeft: scaleSize(20)
                }}
              />
              <Text
                style={{ textAlign: "center", marginVertical: scaleSize(2) }}
              >
                {item.name.slice(0, 3)}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };
  /**
   * 5折商品
   */
  _countGoods = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          alert(3);
        }}
      >
        <Image
          source={require("../../../res/image/banner/5zhe.jpg")}
          style={{ height: scaleSize(100), width: "100%" }}
        />
        {this._goodsCount(35)}
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    StorageUtil.GetStorage(StorageKey.swipperGoods).then(res => {
      this.setState({
        swipperArray: res
      });
    });
    StorageUtil.GetStorage(StorageKey.styleGoods).then(res => {
      this.setState({
        flatListArray: res
      });
    });
  }
  render() {
    const { swipperArray } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={"好物"}
          style={{ backgroundColor: "steelblue" }}
          rightButton={ViewUtils.getRightImageButton(() => {
            navigation.navigate("Search", { name: "动态的" });
          })}
        />
        <ScrollView>
          <View style={{ paddingHorizontal: 30 }}>
            {this._recommendOneGoods()}

            {this._twoCategory()}
            {this._editRecommend()}
            <View>
              <Swipper data={swipperArray} {...this.props} />
            </View>
            <View
              style={{
                height: scaleSize(10),
                backgroundColor: "#eee",
                marginVertical: scaleSize(5)
              }}
            />
            {this._flatList()}
            <View
              style={{
                height: scaleSize(10),
                backgroundColor: "#eee",
                marginVertical: scaleSize(5)
              }}
            />
            {this._countGoods()}
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
  }
});

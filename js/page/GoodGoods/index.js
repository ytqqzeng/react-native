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
import Swipper from "./Swipper";
import Goods from "../../models/goods";
import StorageUtil, { StorageKey } from "../../models/StorageModel";
import CuttingLine from "../../common/CuttingLine";

export default class GoodGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swipperArray: [],
      flatListArray: [],
      myHeartListLen: 0 //心动清单多少条数据
    };
  }
  //   这里的数据是借用swipperArray的数据
  _recommendOneGoods = () => {
    const { swipperArray } = this.state;
    const oneData = swipperArray.slice(0, 1);
    if (oneData.length === 0) return null;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("GoodsDetail", {
            type: StorageKey.swipperGoods,
            goodIndex: 0
          });
        }}
        style={{ marginTop: scaleSize(10) }}
      >
        <Text style={{ color: "#BE9A95" }}>好物推荐</Text>
        <Text
          style={{ fontSize: setSpText2(15), marginVertical: scaleSize(2) }}
        >
          {oneData[0]["name"]}
        </Text>
        <Text style={{ marginVertical: scaleSize(2), color: "#ccc" }}>
          {oneData[0]["name"]}
        </Text>
        <Image
          source={{
            uri: oneData[0]["original"]
          }}
          style={{
            height: scaleSize(200),

            borderRadius: scaleSize(12)
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
    const { myHeartListLen } = this.state;
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
            this.props.navigation.navigate("MyHeartList", {
              title: "心动清单"
            });
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
              height: scaleHeight(100),
              borderRadius: scaleSize(7)
            }}
            source={require("../../../res/image/banner/xinongqingdan.jpg")}
          />
          {this._goodsCount(myHeartListLen)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("GoodGoodsList", {
              title: "好物推荐"
            });
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
              height: scaleHeight(100),
              borderRadius: scaleSize(7)
            }}
            source={require("../../../res/image/banner/haowu.jpg")}
          />
          {this._goodsCount(myHeartListLen)}
        </TouchableOpacity>
      </View>
    );
  };
  _editRecommend = () => {
    return (
      <View style={{}}>
        <CuttingLine
          title={"你的风格推荐"}
          subtitle={"最IN你的口味"}
          style={{ paddingHorizontal: 0 }}
        />
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
                  marginLeft: scaleSize(20),
                  borderRadius: scaleSize(10)
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
          this.props.navigation.navigate("MyHeartList", {
            title: "5折商品"
          });
        }}
      >
        <Image
          source={require("../../../res/image/banner/5zhe.jpg")}
          style={{
            height: scaleSize(100),
            width: "100%",
            borderRadius: scaleSize(12)
          }}
        />
        {this._goodsCount(35)}
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    //   心动清单数量显示的逻辑
    StorageUtil.GetStorage(StorageKey.myHeartList).then(
      res => {
        this.setState({
          myHeartListLen: res.length
        });
      },
      err => {
        Goods.goodSearch({ keyword: "女" }).then(res => {
          if (res.result == 1) {
            this.setState({
              myHeartListLen: res.data.length
            });
          }
        });
      }
    );
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
            navigation.navigate("Search");
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
            <View style={styles.line} />
            {this._flatList()}
            <View style={styles.line} />
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
  },
  line: {
    height: scaleSize(10),
    backgroundColor: "#eee",
    marginVertical: scaleSize(20)
  }
});

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
  FlatList,
  TouchableOpacity,
  Button,
  View,
  ScrollView
} from "react-native";
import Goods from "../../models/goods";
import Swipper from "../../common/Swipper";
import CuttingLine from "../../common/CuttingLine";
import GoodItem from "./GoodItem";
import ThemeRecommend from "./ThemeRecommend";

import { scaleSize, scaleHeight, setSpText2 } from "../../util/screenUtil";
import StorageUtil from "../../models/StorageModel";
import { connect } from "react-redux";
class NewGood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swipperArray: [], // 轮播图的商品
      styleGoodsDate: [], // 我的风格商品
      newGoodsDate: [], // 新品
      themeGoodsDate: [], // 主题推荐
      relayPop: false
    };
    this.navigation = this.props.navigation;
  }

  //   componentWillMount() {
  //     const { params } = this.navigation.state;
  //     console.warn("params::", params);
  //   }
  goodItems(data, index) {
    return (
      <GoodItem
        index={index}
        info={data}
        key={index}
        navigation={this.navigation}
        updateData={this._updateData}
      />
    );
  }
  _updateData = () => {
    const { member_id } = this.props.userInfo;
    console.warn("member_idttt::", member_id);
    // swipper的数据
    Goods.goodSearch({ keyword: "女", member_id }).then(res => {
      if (res.result == 1) {
        this.setState({
          swipperArray: res.data
        });
        StorageUtil.setSwipperGoods(res.data);
      }
    });
    // 新品的数据
    Goods.goodSearch({ keyword: "包", member_id }).then(res => {
      if (res.result == 1) {
        this.setState({
          newGoodsDate: res.data
        });
        StorageUtil.setNewGoods(res.data);
      }
    });
    // 你的风格 商品
    Goods.goodSearch({ keyword: "女", member_id }).then(res => {
      if (res.result == 1) {
        this.setState({
          styleGoodsDate: res.data
        });
        StorageUtil.setStyleGoods(res.data);
      }
    });
    // 主题 推荐
    Goods.goodSearch({ keyword: "女", member_id }).then(res => {
      if (res.result == 1) {
        var data = res.data.slice(0, 4);
        this.setState({
          themeGoodsDate: data
        });
        StorageUtil.setThemeGoods(data);
      }
    });
  };
  componentDidMount() {
    this._updateData();
  }
  _renderTitle = (title, english) => {
    return (
      <View style={{ backgroundColor: "#fff", paddingVertical: scaleSize(5) }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: setSpText2(15),
            color: "#000"
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: setSpText2(13),
            color: "#FF5656"
          }}
        >
          {english}
        </Text>
      </View>
    );
  };
  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.swipperWapper}>
            <Swipper
              data={this.state.swipperArray}
              isShowText={false}
              {...this.props}
              updateData={this._updateData}
            />
          </View>
          <View
            style={{
              backgroundColor: "#EEE"
            }}
          >
            <CuttingLine title={"热门新品推荐"} subtitle={"Top精选品质好货"} />

            <View style={{ marginHorizontal: scaleSize(15) }}>
              {this.state.newGoodsDate.map((item, i, arr) => {
                return this.goodItems(item, i);
              })}
            </View>
            <CuttingLine title={"你的风格推荐"} subtitle={"最IN你的口味"} />
            <View
              style={{
                marginBottom: scaleSize(20),
                marginTop: scaleSize(20),
                flex: 1,
                height: scaleSize(100)
              }}
            >
              <FlatList
                keyExtractor={item => item.name}
                data={this.state.styleGoodsDate}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("GoodsDetail", {
                          goodIndex: index,
                          title: item.name,
                          type: "STYLE_GOODS",
                          updateData: this._updateData
                        });
                      }}
                    >
                      <Image
                        source={{ uri: item.original }}
                        style={{
                          width: scaleSize(100),
                          height: scaleHeight(100),
                          marginLeft: scaleSize(20),
                          borderRadius: scaleSize(5)
                        }}
                      />
                    </TouchableOpacity>
                  );
                }}
                horizontal={true}
              />
            </View>
            <CuttingLine title={"主题热卖推荐"} subtitle={"HOT热销主题商品"} />
            <View style={styles.themeRecommend}>
              {this.state.themeGoodsDate.map((item, i, arr) => {
                return (
                  <ThemeRecommend
                    {...this.props}
                    key={i}
                    index={i}
                    data={item}
                    updateData={this._updateData}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    goodsInfo: state.goods
  };
};
export default connect(mapStateToProps)(NewGood);
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  swipperWapper: {
    flex: 1
  },
  themeRecommend: {
    marginBottom: 40,
    marginTop: 40,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  }
});

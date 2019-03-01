/**
 * Sample React Native App
 * 我的足迹
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
  TouchableOpacity,
  ActivityIndicator,
  SectionList
} from "react-native";
import dayjs from "dayjs";
import NavigationBar from "../../../common/NavigationBar";
import ViewUtils from "../../../util/ViewUtils";
import { scaleSize, scaleHeight, setSpText2 } from "../../../util/screenUtil";
import FnUtils from "../../../util/fnUtils";
import Goods from "../../../models/goods";
// 获取索引
function getArrayIndex(arr, arg) {
  var flag;
  arr.forEach(function(item, i) {
    if (item.title === arg) {
      flag = i + 1;
    }
  });
  return flag;
}
// 把获取的数据重新组装符合SectionList的数据格式
function newArray(arr) {
  return arr.reduce((acc, cur) => {
    var flag = getArrayIndex(acc, cur.tmpDate);
    if (flag) {
      acc[flag - 1].data.push(cur);
    } else {
      var obj = { data: [] };
      obj.title = cur.tmpDate;
      obj.data.push(cur);
      acc.push(obj);
    }
    return acc;
  }, []);
}

export default class FootPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      loading: true
    };
  }
  componentDidMount() {
    const { params } = this.props.navigation.state;
    const { memberId } = params;
    Goods.footPrintList({ member_id: memberId }).then(res => {
      if (res.result === 1) {
        this.setState({
          dataArray: res.data,
          loading: false
        });
      }
    });
  }
  _renderItem = (item, index) => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("GoodsDetail", {
            isFootPrint: true,
            detailData: item
          });
        }}
        key={index}
        style={{
          flex: 1,
          flexDirection: "row",
          paddingHorizontal: scaleSize(10),
          paddingVertical: scaleSize(10)
        }}
      >
        <Image
          source={{ uri: FnUtils.getOriginalImg(item.original, "goods") }}
          style={{ width: scaleSize(90), height: scaleSize(90) }}
        />
        <View
          style={{
            flex: 1,
            height: scaleSize(90),
            justifyContent: "center",
            marginHorizontal: scaleSize(10),
            borderBottomWidth: 1,
            borderColor: "#ddd"
          }}
        >
          <Text
            numberOfLines={2}
            style={{ fontSize: setSpText2(13), marginBottom: scaleSize(5) }}
          >
            {item.name}
          </Text>
          {item.is_viewed_price ? (
            <Text style={{ fontSize: setSpText2(13), color: "#FC6969" }}>{`¥${
              item.mktprice
            }`}</Text>
          ) : (
            <Text
              style={{ fontSize: setSpText2(13), color: "#FC6969" }}
            >{`¥ ?元`}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const { navigation } = this.props;
    const { dataArray, loading } = this.state;
    // 给获取的元数据添加一个日期属性 用于后面日期归类
    let fixData = dataArray.map(item => {
      tmpDate = dayjs(item.view_time)
        .format()
        .slice(0, 10);
      return { ...item, tmpDate };
    });
    const ArrayData = newArray(fixData);

    return (
      <View style={styles.container}>
        <NavigationBar
          title={"浏览记录"}
          statusBar={{ backgroundColor: "steelblue", hidden: true }}
          style={{ backgroundColor: "steelblue" }}
          leftButton={ViewUtils.getLeftButton(() => {
            navigation.goBack();
          })}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#FC6969" />
        ) : (
          <SectionList
            renderItem={({ item, index, section }) => {
              return this._renderItem(item, index);
            }}
            renderSectionHeader={({ section: { title } }) => {
              return <Text style={styles.title}>{title}</Text>;
            }}
            sections={ArrayData}
            keyExtractor={(item, index) => String(item.goods_id)}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  title: {
    fontSize: setSpText2(12),
    color: "#999",
    paddingVertical: scaleSize(3),
    marginLeft: scaleSize(10),
    borderBottomWidth: 1,
    borderColor: "#ddd"
  }
});

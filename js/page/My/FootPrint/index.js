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
  SectionList
} from "react-native";
import dayjs from "dayjs";
import NavigationBar from "../../../common/NavigationBar";
import ViewUtils from "../../../util/ViewUtils";
import { scaleSize, scaleHeight, setSpText2 } from "../../../util/screenUtil";
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
      dataArray: []
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const { memberId } = params;
    Goods.footPrintList({ member_id: memberId }).then(res => {
      this.setState({
        dataArray: res.data
      });
    });
  }
  render() {
    const { navigation } = this.props;
    const { dataArray } = this.state;
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

        <SectionList
          renderItem={({ item, index, section }) => {
            console.warn("item::", item);
            return <Text key={index}>{item.name}</Text>;
          }}
          renderSectionHeader={({ section: { title } }) => {
            return <Text style={{ fontWeight: "bold" }}>{title}</Text>;
          }}
          sections={ArrayData}
          //   keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  page1: {
    flex: 1,
    backgroundColor: "red"
  },
  page2: {
    flex: 1,
    backgroundColor: "green"
  },
  image: {
    height: 22,
    width: 22
  }
});

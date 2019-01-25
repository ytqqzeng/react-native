/**
 *
 */
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SectionList,
  Dimensions
} from "react-native";
import NavigationBar from "../../common/NavigationBar";
import ViewUtils from "../../util/ViewUtils";
import Goods from "../../models/goods";
import { scaleSize, scaleHeight, setSpText2 } from "../../util/screenUtil";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class Category extends Component {
  constructor(props) {
    super(props);
    this._flatList = null;
    this._sectionList = null;
    this.state = {
      RootData: [], // 左边大分类的原始数据
      ItemData: [], // 右边小分类的原始数据
      selectedRootCate: 0,
      catId: null
    };
  }
  componentDidMount() {
    // 网络请求 获取初始数据
    //   获取大分类数据
    Goods.goodCategory().then(res => {
      this.setState({
        RootData: res.data
      });
      //   默认展示第一列大分类的数据
      Goods.goodCategoryChild({ parent_id: res.data[0]["cat_id"] }).then(
        res2 => {
          this.setState({
            ItemData: res2.data
          });
        }
      );
    });
  }
  renderNavBar() {
    const { navigation } = this.props;
    return (
      <View>
        <NavigationBar
          title={"商品分类"}
          style={{ backgroundColor: "steelblue" }}
          rightButton={ViewUtils.getRightImageButton(() => {
            navigation.navigate("Search", { name: "动态的" });
          })}
        />
      </View>
    );
  }
  // 左列表的单个item
  _renderItem = item => {
    let index = item.index;
    let title = item.item.title;
    let cat_id = item.item.cat_id;
    const { RootData, catId } = this.state;
    return (
      <TouchableOpacity
        key={index}
        style={[
          {
            alignItems: "center",
            justifyContent: "center",
            width: scaleSize(100),
            height: scaleHeight(55)
          },
          this.state.selectedRootCate === index
            ? {
                backgroundColor: "#F5F5F5",
                borderLeftWidth: scaleSize(3),
                borderLeftColor: "red"
              }
            : { backgroundColor: "white" }
        ]}
        onPress={() => {
          setTimeout(() => {
            //   设置点击左列表item,滚动到列表顶部 右列表滚动到顶端位置
            (RootData.length - index) * scaleHeight(55) >
            height - scaleHeight(65)
              ? this._flatList.scrollToOffset({
                  animated: true,
                  offset: index * scaleHeight(55)
                })
              : null;
            // this._sectionList.scrollToLocation({ itemIndex: 0, sectionIndex: 0, animated: true, viewOffset: 40 })
          }, 100);
          this.setState(
            {
              selectedRootCate: index,
              catId: cat_id
            },
            () => {
              Goods.goodCategoryChild({ parent_id: cat_id }).then(res2 => {
                this.setState({
                  ItemData: res2.data
                });
              });
            }
          );
        }}
      >
        <Text
          style={{
            fontSize: setSpText2(11),
            color: this.state.selectedRootCate === index ? "red" : "#333"
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  // 渲染左边列表
  renderRootCate() {
    const { RootData } = this.state;
    let data = [];

    if (RootData.length == 0) return null;
    RootData.map((item, index) => {
      data.push({ key: index, title: item.name, cat_id: item.cat_id });
    });
    return (
      <View style={{ backgroundColor: "#F5F5F5" }}>
        <FlatList
          ref={flatList => (this._flatList = flatList)}
          data={data}
          ListHeaderComponent={() => <View />}
          ListFooterComponent={() => <View />}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: "#F5F5F5" }} />
          )}
          renderItem={this._renderItem}
          onEndReachedThreshold={20}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
  // section的头部
  sectionComp(item) {
    return (
      <View style={{ backgroundColor: "#F5F5F5", justifyContent: "center" }}>
        <Text
          style={{
            color: "gray",
            marginBottom: scaleSize(8),
            fontSize: setSpText2(10)
          }}
        >
          {item.section.key}
        </Text>
      </View>
    );
  }

  renderCell(item, index) {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        key={index}
        style={{
          height: scaleHeight(80),
          width: (width - scaleSize(100)) / 3,
          backgroundColor: "white",
          marginBottom: scaleSize(8),
          marginRight: scaleSize(10),
          alignItems: "center"
        }}
        onPress={() => {
          navigation.navigate("CategoryGoods", {
            title: item.name,
            cat_id: item.cat_id
          });
        }}
      >
        <Image
          style={{
            width: scaleSize(45),
            height: scaleHeight(45),
            marginVertical: scaleSize(6)
          }}
          source={{ uri: item.image }}
        />
        <Text style={{ color: "#ccc", fontSize: setSpText2(10) }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }

  renderItem(item) {
    // // 获取到需要被渲染的单个section的数据
    let data = item.section.data;
    return item.index === 0 ? (
      <View key={item.index} style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {data.map((cell, index) => this.renderCell(cell, index))}
      </View>
    ) : null;
  }

  renderItemCate() {
    const { ItemData } = this.state;
    if (ItemData.length == 0) return null;
    let tempArr = ItemData.map((item, index) => {
      let tempObj = {};
      tempObj.key = item.name;
      tempObj.data = item.children;
      tempObj.data.sectionId = index;

      return tempObj;
    });
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F5F5F5",
          marginLeft: 10,
          marginTop: 8
        }}
      >
        <SectionList
          ref={ref => (this._sectionList = ref)}
          renderSectionHeader={this.sectionComp}
          renderItem={data => this.renderItem(data)}
          sections={tempArr}
          ItemSeparatorComponent={() => <View />}
          ListHeaderComponent={() => <View />}
          ListFooterComponent={() => <View />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => "key" + index + item}
        />
      </View>
    );
  }

  renderCategory() {
    return (
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          backgroundColor: "#F5F5F5",
          marginBottom: 25
        }}
      >
        {this.renderRootCate()}
        {this.renderItemCate()}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderCategory()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

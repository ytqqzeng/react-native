/**分类详细商品列表
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import NavigationBar from "../../common/NavigationBar";
import ViewUtils from "../../util/ViewUtils";
import GoodsCell from "../../common/GoodsCell";
import Goods from "../../models/goods";
import StorageUtil from "../../models/StorageModel";
import { connect } from "react-redux";
/**
 * 某个分类的商品列表页面
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: []
    };
  }
  _renderItemView = ({ item, index }) => {
    const { navigation } = this.props;
    return (
      <GoodsCell
        item={item}
        index={index}
        navigation={navigation}
        type={"CATEGORY_GOODS"}
        updateData={this._updateData}
      />
    );
  };
  _updateData = () => {
    const { params } = this.props.navigation.state;
    const cat_id = params ? params.cat_id : null;
    const { member_id } = this.props.userInfo;
    Goods.goodCategoryGoodsList({ cat_id: cat_id, member_id }).then(res => {
      this.setState({
        dataArray: res.data
      });
      StorageUtil.SetCategoryGoods(res.data);
    });
  };
  componentDidMount() {
    this._updateData();
  }
  render() {
    const { params } = this.props.navigation.state;
    const title = params ? params.title : null;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <NavigationBar
          title={title}
          style={{ backgroundColor: "steelblue" }}
          leftButton={ViewUtils.getLeftButton(() => {
            navigation.goBack();
          })}
        />
        <View style={{ paddingHorizontal: 20 }}>
          <FlatList
            keyExtractor={item => item.cat_id}
            data={this.state.dataArray}
            renderItem={this._renderItemView}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo
  };
};
export default connect(mapStateToProps)(App);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});

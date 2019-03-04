/**已查看商品的列表
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import NavigationBar from "../../../common/NavigationBar";
import ViewUtils from "../../../util/ViewUtils";
import GoodsCell from "../../../common/GoodsCell";
import { connect } from "react-redux";
import StorageUtil, { StorageKey } from "../../../models/StorageModel";
import Goods from "../../../models/goods";
/**
 * 已经查看价格
 */
class CheckPriceGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      loading: true
    };
  }
  /**
   * 渲染单条数据
   */
  _renderItemView = ({ item, index }) => {
    const { navigation } = this.props;
    return (
      <GoodsCell
        isCheckedPriceGoods={true}
        item={item}
        index={index}
        navigation={navigation}
        type={StorageKey.checkedPriceGoods}
        updateData={this._updateData}
      />
    );
  };
  /**
   * 更新数据
   */
  _updateData = () => {
    const { uname } = this.props.userInfo;
    Goods.checkedPriceGoodsList({ uname }).then(res => {
      if (res.result === 1) {
        this.setState({
          dataArray: res.data,
          loading: false
        });
      }
    });
  };
  _getData = () => {
    this.setState({
      loading: true
    });
    const { uname } = this.props.userInfo;
    Goods.checkedPriceGoodsList({ uname }).then(res => {
      if (res.result == 1) {
        const newData = this.state.dataArray.concat(res.data);
        this.setState({
          dataArray: newData,
          loading: false
        });
      }
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
        <View style={{ paddingHorizontal: 20, marginBottom: 100 }}>
          {this.state.loading ? (
            <ActivityIndicator size="large" color="#FC6969" />
          ) : (
            <FlatList
              data={this.state.dataArray}
              renderItem={this._renderItemView}
              refreshing={this.state.loading}
              onRefresh={this._getData}
            />
          )}
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
export default connect(mapStateToProps)(CheckPriceGoods);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  image: {
    height: 22,
    width: 22
  }
});

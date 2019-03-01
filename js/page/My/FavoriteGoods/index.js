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
import Goods from "../../../models/goods";
import { connect } from "react-redux";

import StorageUtil, { StorageKey } from "../../../models/StorageModel";

class FavoriteGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      loading: true
    };
  }
  _renderItemView = ({ item, index }) => {
    const { navigation } = this.props;
    // console.warn("navigaiton::", navigation);
    return (
      <GoodsCell
        item={item}
        index={index}
        navigation={navigation}
        type={StorageKey.favoriteGoods}
        updateData={this._updateData}
      />
    );
  };
  _updateData = () => {
    const { uname } = this.props.userInfo;
    Goods.favoriteGoodsList({ uname }).then(res => {
      if (res.result == 1) {
        this.setState({
          dataArray: res.data,
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
export default connect(mapStateToProps)(FavoriteGoods);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});

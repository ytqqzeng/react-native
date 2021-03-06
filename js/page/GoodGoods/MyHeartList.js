/**心动清单
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
import { connect } from "react-redux";

import StorageUtil, { StorageKey } from "../../models/StorageModel";

class MyHeartList extends Component {
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
        type={StorageKey.myHeartList}
        updateData={this._updateData}
      />
    );
  };
  _updateData = () => {
    const { member_id } = this.props.userInfo;
    Goods.goodSearch({ keyword: "女", member_id }).then(res => {
      if (res.result == 1) {
        this.setState({
          dataArray: res.data
        });
        StorageUtil.SetStorage(StorageKey.myHeartList, res.data);
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
          <FlatList
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
export default connect(mapStateToProps)(MyHeartList);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});

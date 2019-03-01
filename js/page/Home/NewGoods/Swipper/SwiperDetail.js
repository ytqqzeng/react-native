/**
 * 点击轮播图的页面
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
  FlatList
} from "react-native";
import NavigationBar from "../../../../common/NavigationBar";
import ViewUtils from "../../../../util/ViewUtils";
import FnUtils from "../../../../util/fnUtils";
import StorageUtil, { StorageKey } from "../../../../models/StorageModel";
import Goods from "../../../../models/goods";
import { connect } from "react-redux";
import GoodsCell from "../../../../common/GoodsCell";

class SwiperDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataImgArray: [],
      dataArray: [],
      loading: true
    };
  }

  componentDidMount() {
    const { subject_id } = this.props.navigation.state.params;
    Goods.getSubjectImgs({ subject_id }).then(res => {
      if (res.result === 1) {
        this.setState({
          dataImgArray: res.data,
          loading: false
        });
      } else {
        console.warn("err::", res.message);
      }
    });
    this._updateData();
  }
  _updateData = () => {
    const { member_id } = this.props.userInfo;
    const { subject_id } = this.props.navigation.state.params;
    Goods.getSubjectGoods({ subject_id, member_id }).then(res => {
      if (res.result === 1) {
        this.setState({
          dataArray: res.data[0]
        });
        StorageUtil.SetStorage(StorageKey.subject_goods, res.data[0]);
      } else {
        console.warn("err::", res.message);
      }
    });
  };
  _renderHead = () => {
    return (
      <View>
        {this.state.dataImgArray.map(item => {
          return (
            <View style={{ paddingHorizontal: 20 }}>
              <Image
                source={{ uri: FnUtils.getOriginalImg(item, "subject") }}
                style={{ height: 350 }}
                resizeMode={"contain"}
              />
            </View>
          );
        })}
      </View>
    );
  };
  _renderItem = ({ item, index }) => {
    const { navigation } = this.props;
    return (
      <View style={{ paddingHorizontal: 20, backgroundColor: "#FFF" }}>
        <GoodsCell
          item={item}
          index={index}
          navigation={navigation}
          type={StorageKey.subject_goods}
          updateData={this._updateData}
        />
      </View>
    );
  };
  render() {
    const { title } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={title}
          statusBar={{ backgroundColor: "steelblue", hidden: true }}
          leftButton={ViewUtils.getLeftButton(() => {
            this.props.navigation.goBack(null);
          })}
        />
        <View style={{ backgroundColor: "#FFF", paddingBottom: 100 }}>
          {this.state.loading ? (
            <ActivityIndicator size="large" color="#FC6969" />
          ) : (
            <FlatList
              ListHeaderComponent={this._renderHead}
              data={this.state.dataArray}
              renderItem={this._renderItem}
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
export default connect(mapStateToProps)(SwiperDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});

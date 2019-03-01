/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { scaleSize, scaleHeight, setSpText2 } from "../../util/screenUtil";
import FnUtils from "../../util/fnUtils";
import Avartar from "../../common/avatar";
import { Header } from "../../common/Header";
import { StorageKey } from "../../models/StorageModel";
import Goods from "../../models/goods";
import StarScore from "./StarScore";

/**
 * 商品推荐人的板块信息
 */
export default class GoodsAuthor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMoreNotes: false, // 查看更多流言
      isFollow: false, // 是否点击关注
      commentsArray: []
    };
  }
  // 切换关注状态
  _switchFollowState = () => {
    setTimeout(() => {
      // 异步操作 改变状态
    }, 0);
    this.setState({
      isFollow: !this.state.isFollow
    });
  };

  // 推荐商品的单条信息
  _renderItem = ({ item, index }) => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        style={styles.renderItem}
        activeOpacity={1}
        onPress={() => {
          navigation.navigate("GoodsDetail", {
            goodIndex: index,
            title: item.name,
            type: StorageKey.authorGoods
          });
        }}
      >
        <Image
          resizeMode={"contain"}
          source={{ uri: FnUtils.getOriginalImg(item.original, "goods") }}
          style={{ height: scaleSize(120), width: scaleSize(120) }}
        />
      </TouchableOpacity>
    );
  };
  // 推荐的商品
  _recommendDetail = data => {
    return (
      <View style={styles.recGoodsDetail}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => item.goods_id}
          renderItem={this._renderItem}
          horizontal={true}
        />
      </View>
    );
  };
  // 留言
  _noteTitle = () => {
    return (
      <View style={{ marginTop: 20 }}>
        <Header title={"商品评价"} />
      </View>
    );
  };

  _noteItem = ({ item }) => {
    const { content, face, uname, grade } = item;

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.notesAvartar}>
          <Avartar
            avatarName={uname}
            avatarUrl={face}
            size={{ width: scaleSize(25), height: scaleSize(25) }}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <StarScore currentScore={grade} />
          </View>
        </View>
        <View style={styles.noteDetail}>
          <Text style={styles.noteText}>{content}</Text>
        </View>
      </View>
    );
  };
  _moreNote = () => {
    return (
      <View style={styles.moreNotesContainer}>
        <View style={styles.notesLeftLine} />
        <TouchableOpacity
          onPress={() => {
            this.setState({
              isMoreNotes: !this.state.isMoreNotes
            });
          }}
        >
          {this.state.isMoreNotes ? (
            <Text style={styles.moreNotes}>{"收起留言"}</Text>
          ) : (
            <Text style={styles.moreNotes}>{"查看更多留言"}</Text>
          )}
        </TouchableOpacity>

        <View style={styles.notesLeftLine} />
      </View>
    );
  };
  componentDidMount() {
    const goods_id = this.props.goods_id;
    if (goods_id) {
      Goods.getComments({ goods_id }).then(res => {
        this.setState({
          commentsArray: res.data
        });
      });
    }
  }
  _commentItem = data => {
    return (
      <View style={[styles.notes, { paddingLeft: 20, paddingRight: 20 }]}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => item.goodsId}
          renderItem={this._noteItem}
        />
      </View>
    );
  };
  render() {
    const { recommend } = this.props;
    const { commentsArray } = this.state;
    return (
      <View style={styles.container}>
        {this._noteTitle()}
        {this._commentItem(commentsArray)}
        {this._recommendDetail(recommend)}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  avartarWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30
  },
  follow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 60,
    marginTop: 10,
    marginBottom: 20
  },
  recArrow: {
    width: 20,
    height: 20,
    top: 3,
    marginHorizontal: 10
  },

  recGoodsDetail: {
    width: "100%",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20
  },
  renderItem: {
    flex: 1,
    flexDirection: "row",
    height: scaleSize(150),
    paddingLeft: scaleSize(15),
    paddingVertical: scaleSize(15),
    backgroundColor: "#ddd"
  },

  notes: {
    flex: 1
  },
  notesAvartar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 30
  },
  noteDetail: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  noteText: {
    width: "80%",
    color: "#777",
    borderWidth: 1,
    borderColor: "#999",
    textAlign: "left",
    backgroundColor: "#E5FAFA",
    borderRadius: 3,
    padding: 20,
    paddingBottom: 40,
    fontSize: setSpText2(13)
  },
  moreNotes: {
    paddingHorizontal: 35,
    paddingVertical: 10,
    fontSize: setSpText2(14),
    backgroundColor: "#707070",
    color: "#fff",
    borderColor: "#999",
    borderWidth: 2,
    borderRadius: 2
  },
  moreNotesContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center"
  },
  notesLeftLine: {
    flex: 1,
    backgroundColor: "#999",
    height: 1
  }
});

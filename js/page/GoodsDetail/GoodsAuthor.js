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
import Avartar from "../../common/avatar";
import { Header } from "../../common/Header";
import { StorageKey } from "../../models/StorageModel";

/**
 * 商品推荐人的板块信息
 */
export default class GoodsAuthor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMoreNotes: false, // 查看更多流言
      isFollow: false, // 是否点击关注
      authorInfo: {
        avatarUrl:
          "https://gd1.alicdn.com/imgextra/i4/791105148/O1CN01uVEr3b1ntpQGtz8Cg_!!791105148.jpg_400x400.jpg",
        avatarName: "哆啦咪",
        authorDescrip: "用美好的事物包围自己，善待此生",

        note: [
          {
            avatarName: "米拉",
            avatarUrl:
              "https://gd1.alicdn.com/imgextra/i4/791105148/O1CN01uVEr3b1ntpQGtz8Cg_!!791105148.jpg_400x400.jpg",
            words: "产品很不错，下次再来买,产品很不错，下次再来买",
            stars: 240
          },
          {
            avatarName: "叶子节点",
            avatarUrl:
              "https://gd1.alicdn.com/imgextra/i4/791105148/O1CN01uVEr3b1ntpQGtz8Cg_!!791105148.jpg_400x400.jpg",
            words: "产品很不错，下次再来买",
            stars: 200
          },
          {
            avatarName: "米拉",
            avatarUrl:
              "https://gd1.alicdn.com/imgextra/i4/791105148/O1CN01uVEr3b1ntpQGtz8Cg_!!791105148.jpg_400x400.jpg",
            words: "产品很不错，下次再来买,产品很不错，下次再来买",
            stars: 220
          }
        ]
      }
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
          source={{ uri: item.original }}
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
  // 全部留言
  _notes = data => {
    if (!this.state.isMoreNotes) {
      data = data.slice(0, 2);
    }
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
  _noteItem = ({ item }) => {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.notesAvartar}>
          <Avartar
            avatarName={item.avatarName}
            avatarUrl={item.avatarUrl}
            size={{ width: scaleSize(25), height: scaleSize(25) }}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../../res/image/praise.png")}
              style={{
                width: scaleSize(14),
                height: scaleSize(14),
                tintColor: "#333",
                marginRight: 5
              }}
            />
            <Text>{item.stars}</Text>
          </View>
        </View>
        <View style={styles.noteDetail}>
          <Text style={styles.noteText}>{item.words}</Text>
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
  render() {
    let { avatarUrl, avatarName, authorDescrip, note } = this.state.authorInfo;
    const { recommend } = this.props;

    return (
      <View style={styles.container}>
        {this._noteTitle()}
        {this._notes(note)}
        {this._moreNote()}
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

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
  // 关注
  _follow = follow => {
    return (
      <View style={styles.follow}>
        <Text style={{ fontSize: 18 }}>关注</Text>
        <TouchableOpacity
          activeOpacity={0.9}
          style={{ justifyContent: "center" }}
          onPress={() => {
            this._switchFollowState();
          }}
        >
          <Image
            style={{
              width: 20,
              height: 18,
              tintColor: "red",
              marginLeft: 5,
              marginRight: 5
            }}
            source={follow}
          />
        </TouchableOpacity>
      </View>
    );
  };
  // 推荐的头部
  _recommend = avatarName => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image
          style={styles.recArrow}
          source={require("../../../res/image/icon_left_arrow.png")}
        />
        <Text style={{ fontSize: 18, color: "#000" }}>
          {avatarName + "的推荐"}
        </Text>
        <Image
          style={styles.recArrow}
          source={require("../../../res/image/icon_right_arrow.png")}
        />
      </View>
    );
  };
  // 推荐商品的单条信息
  _renderItem = ({ item, index }) => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        style={styles.renderItem}
        activeOpacity={1}
        onPress={() => {
          // alert(`商品的id是${item.goodsId}`)
          navigation.navigate("GoodsDetail", {
            goodIndex: index,
            title: item.name,
            type: "AUTHOR_GOODS"
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
          // keyExtractor={(item, index) => item.goodsId}
          renderItem={this._renderItem}
          horizontal={true}
        />
      </View>
    );
  };
  // 留言
  _noteTitle = avatarName => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image
          style={styles.recArrow2}
          source={require("../../../res/pageImage/icon_left_arrow.png")}
        />
        <Image
          style={styles.recArrow2}
          source={require("../../../res/pageImage/icon_left_arrow.png")}
        />
        <Image
          style={styles.recArrow2}
          source={require("../../../res/pageImage/icon_left_arrow.png")}
        />
        <Text style={styles.noteTitle}>{`给${avatarName}的留言`}</Text>
        <Image
          style={styles.recArrow2}
          source={require("../../../res/pageImage/icon_right_arrow.png")}
        />
        <Image
          style={styles.recArrow2}
          source={require("../../../res/pageImage/icon_right_arrow.png")}
        />
        <Image
          style={styles.recArrow2}
          source={require("../../../res/pageImage/icon_right_arrow.png")}
        />
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
            size={{ width: 30, height: 30 }}
          />
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../../res/image/praise.png")}
              style={{
                width: 16,
                height: 15,
                top: 4,
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
    let follow = this.state.isFollow
      ? require("../../../res/image/favorited.png")
      : require("../../../res/image/favorite.png");
    return (
      <View style={styles.container}>
        <View style={styles.avartarWrapper}>
          <Avartar
            avatarName={avatarName}
            avatarUrl={avatarUrl}
            size={{ width: 40, height: 40 }}
          />
        </View>
        <Text style={{ fontSize: 17, color: "#666", textAlign: "center" }}>
          {authorDescrip}
        </Text>
        <View style={{ marginTop: 10, marginBottom: 10 }} />
        {/* {this._follow(follow)} */}
        {this._recommend(avatarName)}
        {this._recommendDetail(recommend)}
        {this._noteTitle(avatarName)}
        {this._notes(note)}
        {this._moreNote()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
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
    marginRight: 10,
    marginLeft: 10
  },
  recArrow2: {
    width: 20,
    height: 20,
    top: 14,
    marginRight: 10,
    marginLeft: 10
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
    backgroundColor: "#999"
  },
  noteTitle: {
    fontSize: 18,
    color: "#fff",
    backgroundColor: "#222",
    padding: 10
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
    textAlign: "center",
    backgroundColor: "#E5FAFA",
    borderRadius: 3,
    padding: 20,
    paddingBottom: 40
  },
  moreNotes: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#707070",
    color: "#fff",
    borderColor: "#B7B7B7",
    borderWidth: 2,
    borderRadius: 3
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

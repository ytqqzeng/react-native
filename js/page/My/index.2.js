// 我的个人中心
import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  SectionList,
  Animated,
  Text,
  TouchableHighlight,
  View,
  Dimensions,
  Platform,
  TouchableOpacity
} from "react-native";
import { scaleSize, scaleHeight, setSpText2 } from "../../util/screenUtil";

import { env } from "../../config";
const ROOT_URL = `${env.apiHost}/`;

import NavBar from "./NavBar";
import { connect } from "react-redux";
import Goods from "../../models/goods";
import StorageUtil, { StorageKey } from "../../models/StorageModel";
import { asyncCheckPriceGoods } from "../../actions/goods";
let { width } = Dimensions.get("window");

let navHeight = (Platform.OS === "ios" ? 20 : 0) + 45;

const arrow = require("../../../res/image/mq_arrow_right.png");
const HEADER_MAX_HEIGHT = 450;
const HEADER_MIN_HEIGHT = 64;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT; //160-64=96
const NAV_BAR_HEIGHT_IOS = 40;
const NAV_BAR_HEIGHT_ANDROID = 45;
class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
      ),
      topValue: 0,
      headTop: 0,
      userInfo: null,
      checkedGoods: [] // 已查看价格的商品
      //   checkedGoodsImg: [] // 已查看价格的商品的图片
    };
  }

  _renderHead = () => {
    const { navigation } = this.props;
    const { face, nickname } = this.props.userInfo;
    // const scrollY = Animated.add(
    //   this.state.scrollY,
    //   Platform.OS === "ios" ? 200 : 0
    // );

    // const headerTranslate = scrollY.interpolate({
    //   inputRange: [0, 200],
    //   outputRange: [0, -200],
    //   extrapolate: "clamp" // 阻止输出值超过outputRange
    // });

    // //图片跟随滚动，但是是滚动距离的一般
    // const imageTranslate = scrollY.interpolate({
    //   inputRange: [0, HEADER_SCROLL_DISTANCE],
    //   outputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    //   extrapolate: "clamp"
    // });

    return (
      <View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("UserInfo");
            }}
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: scaleSize(20),
              paddingVertical: scaleSize(20)
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center"
              }}
            >
              <Image
                source={{
                  uri: face
                    ? `${ROOT_URL}/shop/eop/upload/getFile.do?subFolder=/avatar&fileName=${face}`
                    : "data:image/jpeg;base64,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"
                }}
                style={styles.avatarImg}
              />
              <Text style={{ color: "#fff", fontSize: 18 }}>{nickname}</Text>
            </View>
            <View>
              {/* <View
                style={{
                  padding: scaleSize(10),
                  backgroundColor: "#FC696",
                  height: scaleSize(30),
                  //   padding: scaleSize(5),
                  borderTopLeftRadius: scaleSize(15),
                  borderBottomLeftRadius: scaleSize(15)
                }}
              > */}
              <Text
                style={{
                  backgroundColor: "#FC6969",
                  color: "#fff"
                  //   padding: scaleSize(5),
                  //   borderTopLeftRadius: "50%",
                  //   borderBottomLeftRadius: "50%"
                }}
              >
                {/* {"信息编辑"} */}
              </Text>
              {/* </View> */}
              {/* <Image style={styles.arrow} source={arrow} /> */}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  _renderBody = () => {
    const { navigation, goodsInfo } = this.props;
    console.warn("goodsInfo::", goodsInfo);

    const images =
      goodsInfo.checkedPriceGoodsList.length > 4
        ? goodsInfo.checkedPriceGoodsList.slice(0, 4)
        : goodsInfo.checkedPriceGoodsList;
    const imagesFavorite =
      goodsInfo.favoriteGoodsList.length > 4
        ? goodsInfo.favoriteGoodsList.slice(0, 4)
        : goodsInfo.favoriteGoodsList;
    return (
      <View
        style={{
          padding: scaleSize(20),
          flex: 1,
          zIndex: 13
        }}
      >
        <View style={styles.BuyerFavi}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CheckPriceGoods", {
                title: "已查看价格"
              });
            }}
            style={styles.Buyer}
          >
            <Text style={{ color: "#fff" }}>已查看价格</Text>
            <View style={styles.BuyerAvatar}>
              <View style={{ flexDirection: "row" }}>
                {images.map(item => {
                  return (
                    <Image
                      source={{ uri: item }}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        borderColor: "#eee",
                        borderWidth: 1
                      }}
                    />
                  );
                })}
              </View>
              <Image
                style={[styles.arrow, { marginRight: 20 }]}
                source={arrow}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("FavoriteGoods", {
                title: "我的收藏"
              });
            }}
            style={styles.Buyer}
          >
            <Text style={{ color: "#fff" }}>已收藏商品</Text>
            <View style={styles.BuyerAvatar}>
              <View style={{ flexDirection: "row" }}>
                {imagesFavorite.map(item => {
                  return (
                    <Image
                      source={{ uri: item }}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        borderColor: "#eee",
                        borderWidth: 1
                      }}
                    />
                  );
                })}
              </View>
              <Image
                style={[styles.arrow, { marginRight: 20 }]}
                source={arrow}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View />
      </View>
    );
  };
  _renderItem() {
    const { navigation } = this.props;
    const data = [
      [
        {
          icon: require("../../../res/image/setting/icon_main_edit.png"),
          title: "个人信息",
          other: "",
          navigate: "UserInfo"
        },
        {
          icon: require("../../../res/image/setting/icon_menu_order.png"),
          title: "我的订单",
          other: "",
          navigate: "OrderPage"
        },
        {
          icon: require("../../../res/image/setting/icon_shouhou.png"),
          title: "我的售后",
          other: "",
          navigate: "HelpCenter"
        },
        {
          icon: require("../../../res/image/setting/icon_msg.png"),
          title: "消息中心",
          other: "仅需3秒,超值礼金等你额",
          navigate: "HelpCenter"
        }
      ],
      [
        {
          icon: require("../../../res/image/setting/icon_youhuijuan.png"),
          title: "优惠卷",
          other: "",
          navigate: "HelpCenter"
        }
      ],
      [
        {
          icon: require("../../../res/image/setting/icon_kefu.png"),
          title: "联系客服",
          other: "",
          navigate: "HelpCenter"
        },

        {
          icon: require("../../../res/image/setting/icon_help.png"),
          title: "帮助中心",
          other: "",
          navigate: "HelpCenter"
        }
      ],
      [
        {
          icon: require("../../../res/image/setting/icon_menu_setting.png"),
          title: "设置",
          other: "",
          navigate: "Setting"
        }
      ]
    ];

    return data.map((items, i) => {
      return (
        <View key={i}>
          {items.map((item, index) => {
            return (
              <TouchableHighlight
                key={index}
                underlayColor={"#DDD"}
                onPress={() => {
                  navigation.navigate(item.navigate, { name: "动态的" });
                }}
              >
                <View style={styles.itemView}>
                  <Image
                    source={item.icon}
                    style={{
                      width: scaleSize(20),
                      height: scaleHeight(19),
                      tintColor: "#666",
                      marginRight: scaleSize(10)
                    }}
                  />
                  <Text style={{ fontSize: setSpText2(15) }}>{item.title}</Text>
                  {item.other ? (
                    <Text
                      style={[styles.otherText, { marginRight: scaleSize(20) }]}
                    >
                      {item.other}
                    </Text>
                  ) : null}
                  <Image
                    style={[styles.arrow2, { marginRight: scaleSize(20) }]}
                    source={arrow}
                  />
                </View>
              </TouchableHighlight>
            );
          })}
          <View style={styles.line} />
        </View>
      );
    });
  }
  componentDidMount() {
    const { uname } = this.props.userInfo;
    const { goodsInfo, dispatch } = this.props;
    dispatch(asyncCheckPriceGoods({ uname }));
  }

  render() {
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0
    ); //文字变成透明的
    const textOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });
    // 导航条背景色变化
    const barBackColor = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: ["rgba(255,255,255,0)", "rgba(255,255,255,1)"],
      extrapolate: "clamp"
    });

    return (
      <View style={styles.container}>
        <NavBar
          barBackColor={barBackColor}
          //   opacity={textOpacity}
          title={"个人中心"}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100
          }}
        />
        {/* {this._renderHead()} */}
        <Animated.ScrollView
          bounces={true} // ios 弹性拉动
          alwaysBounceVertical={true} // ios
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={e => {
            Animated.event([
              { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
            ]).call(this, e);
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              paddingBottom: 200,
              paddingHorizontal: scaleSize(10)
            }}
          >
            <View
              style={{
                backgroundColor: "pink",
                borderRadius: scaleSize(5),
                marginTop:
                  Platform.OS === "ios"
                    ? scaleHeight(NAV_BAR_HEIGHT_IOS)
                    : scaleHeight(NAV_BAR_HEIGHT_ANDROID)
              }}
            >
              {this._renderHead()}
              {this._renderBody()}
            </View>
            {this._renderItem()}
          </View>
        </Animated.ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    goodsInfo: state.goods
  };
};
export default connect(mapStateToProps)(MyPage);
const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: "red"
  },
  backgroundImage: {
    // position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    // width: null,
    // height: 200
    // resizeMode: "cover"
  },
  header: {
    // position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    // // backgroundColor: "green",
    // overflow: "hidden",
    // height: 200,
    marginTop: 50,
    padding: scaleSize(20)
  },
  fill: {
    flex: 1
    // paddingTop: scaleSize(100)
  },
  btn: {
    margin: 5,
    borderWidth: 1,
    padding: 2
  },
  headSection: {
    height: scaleSize(100),
    width: width,
    padding: 30,
    backgroundColor: "#FAB9B2",
    paddingTop: 60
  },
  avatar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scaleSize(20),
    zIndex: 13
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 40,
    marginRight: 20
  },
  uname: {
    width: 200,
    height: 80,
    justifyContent: "center"
  },
  name: {
    flexDirection: "row"
  },
  type: {
    backgroundColor: "#DBAAA1",
    color: "#fff",
    fontSize: 12,
    padding: 5,
    borderRadius: 13,
    marginLeft: 3
  },
  numbers: {
    flexDirection: "row"
  },
  arrow: {
    width: 22,
    height: 22,
    position: "absolute",
    top: 30,
    right: 0
  },
  arrow2: {
    width: scaleSize(22),
    height: scaleHeight(22),
    position: "absolute",
    top: 0,
    right: 0
  },
  otherText: {
    position: "absolute",
    top: scaleSize(3),
    right: 25,
    fontSize: setSpText2(10)
  },
  BuyerFavi: {
    height: 100,
    flexDirection: "row",
    borderTopWidth: 1,
    color: "#eee"
  }, //我的买手 我的喜欢
  Buyer: {
    flex: 1,
    // borderRightWidth: 1,
    // borderColor: "#eee",
    justifyContent: "space-between"
  },
  Bfavi: {
    flex: 1,
    marginLeft: 30
  },
  BuyerAvatar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
    alignItems: "center"
  },
  line: {
    width: "90%",
    height: 1,
    backgroundColor: "#eee",
    marginBottom: scaleSize(15)
  },
  itemView: {
    flexDirection: "row",
    paddingLeft: scaleSize(20),
    marginVertical: scaleSize(15),
    alignItems: "center"
  }
});

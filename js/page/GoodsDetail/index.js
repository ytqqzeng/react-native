/**商品详情页面
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  WebView,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  Text,
  Animated,
  Alert,
  ScrollView,
  View,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

import ShoppingExplanation from "../../common/ShoppingExplanation";
import GoodsAuthor from "./GoodsAuthor";
import { scaleSize, scaleHeight, setSpText2 } from "../../util/screenUtil";
import NavBar from "./goodsNavBar";
import ViewUtils from "../../util/ViewUtils";
import FnUtil from "../../util/fnUtils";

import Goods from "../../models/goods";
import StorageUtil, { StorageKey } from "../../models/StorageModel";
import { connect } from "react-redux";
import { asyncCheckPriceGoods, asyncFavoriteGoods } from "../../actions/goods";
import { setPageKey } from "../../actions/user";

import StatusBar from "./StatusBar";
import HandleBar from "./HandleBar";
import SpecModal from "./Modal";
import ScaledImage from "./ScaledImage";
import { Label } from "../../common/Label";
import SkuGoods from "./SkuGoods";
import Faq from "./Faq";

const { width } = Dimensions.get("window");

const HEADER_MAX_HEIGHT = 450;
const HEADER_MIN_HEIGHT = 64;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT; //160-64=96

class GoodsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPrepay: true, // 判断是否是支付定金
      specVisible: false,
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
      ),
      height: 0, //webview的高度
      viewHeight: 0, //webview的高度
      //   is_viewed_price: 0,
      goodDetail: {}, // 商品的全部信息
      payment: 0, // 临时的 是否支付定金
      faq: [] // 商品问答的数据列表
    };
  }
  // 付定金
  paymented = () => {
    const { viewed_cost, is_viewed_price } = this.state.goodDetail;
    if (!is_viewed_price) {
      Alert.alert("提示", "请先付款查看价格");
      return false;
    }
    // 请求接口返回数据，如果成功这执行如下

    Alert.alert(
      "支付定金",
      `确认支付定金？`,
      [
        {
          text: "确认",
          onPress: () => {
            this.setState({
              payment: 300
            });
          }
        },
        {
          text: "取消",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };
  // 支付查看价格
  showPrice = () => {
    const { dispatch } = this.props;
    const { goodDetail } = this.state;
    const { uname, member_id } = this.props.userInfo;
    const { params } = this.props.navigation.state;
    const updateData = params.updateData ? params.updateData : null;
    const viewed_cost = goodDetail.price;

    // 请求接口返回数据，如果成功这执行如下

    Alert.alert(
      "查看价格",
      `确认支付${viewed_cost}元？`,
      [
        {
          text: "确认",
          onPress: () => {
            //   将状态改为已支付查看价格
            Goods.checkedPrice({
              goods_id: goodDetail.goods_id,
              member_id: member_id
            }).then(res => {
              if (res.result == 1) {
                dispatch(asyncCheckPriceGoods({ uname }));
                this.setState({
                  goodDetail: {
                    ...goodDetail,
                    is_viewed_price: 1,
                    viewed_cost
                  }
                });

                // 是否重新请求上一个列表页面得数据，从而保证返回上一页数据显示正确
                // 避免在详情页改变了数据 但是在上一页里面还是原来的数据
                if (updateData) {
                  updateData();
                }
              } else {
                console.warn("res.message::", res.message);
              }
            });
          }
        },
        {
          text: "取消",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };
  // 商品问答数据列表。
  _getFAQData = data => {
    const { goods_id } = data;
    console.warn("goods_id::", goods_id);
    Goods.faqGoods({ goods_id }).then(res => {
      if (res.result == 1) {
        this.setState({
          faq: res.data
        });
      }
    });
  };
  /**
   * 留下足迹
   */
  _footPrint = (member_id, data) => {
    const { goods_id } = data;
    const params = {
      goods_id,
      member_id
    };
    Goods.footPrint(params).then(res => {
      if (res.result === 1) {
        console.warn("留下足迹成功");
      } else {
        console.warn("res.message::", res.message);
      }
    });
  };
  componentDidMount() {
    const { member_id } = this.props.userInfo;
    console.warn("member_id::", member_id);
    const { params } = this.props.navigation.state;
    const goodIndex = params ? params.goodIndex : null;
    const type = params ? params.type : null;
    const isFootPrint = params ? params.isFootPrint : null;
    const detailData = params ? params.detailData : null;
    // const pageKey = params ? params.pageKey : null;
    const { dispatch, userInfo } = this.props;
    const pageKey = this.props.navigation.state.key;
    // console.warn("newTest::", newTest);
    if (type) {
      StorageUtil.GetStorage(type)
        .then(res => {
          this.setState({
            goodDetail: res[goodIndex]
          });
          return res[goodIndex];
        })
        .then(data => {
          this._getFAQData(data);
          this._footPrint(member_id, data);
        })
        .catch(err => console.warn("err::", err));
      // 足迹页面跳转过来的
    } else if (isFootPrint) {
      this.setState(
        {
          goodDetail: detailData
        },
        () => {
          this._getFAQData(detailData);
          this._footPrint(member_id, detailData);
        }
      );
    }
    // 详情页商品推荐
    Goods.goodSearch({ keyword: "包", member_id }).then(res => {
      if (res.result == 1) {
        this.setState({
          recommend: res.data
        });
        StorageUtil.SetStorage(StorageKey.authorGoods, res.data);
      }
    });
    // 设置是从哪个页面跳进来的/
    // console.warn("pageKey::", pageKey);
    if (pageKey) {
      const newUserInfo = { ...userInfo, pageKey };
      dispatch(setPageKey({ ...newUserInfo }));
    }
  }

  _goodDetail = () => {
    const { goodDetail, viewHeight, recommend, faq } = this.state;

    const imgArr = FnUtil.utilImg(goodDetail.intro);
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT],
      outputRange: [0, -HEADER_MAX_HEIGHT],
      extrapolate: "clamp" // 阻止输出值超过outputRange
    });
    //图片跟随滚动，但是是滚动距离的一般
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, HEADER_SCROLL_DISTANCE / 2],
      extrapolate: "clamp"
    });

    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] }
          ]}
        >
          <Animated.Image
            resizeMode={"contain"}
            source={{
              uri: FnUtil.getOriginalImg(goodDetail.original, "goods")
            }}
            style={[
              styles.backgroundImage,
              {
                transform: [{ translateY: imageTranslate }]
              }
            ]}
          />
        </Animated.View>
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
          <View style={styles.sectionDetail}>
            <View
              style={{
                marginVertical: scaleSize(8),
                paddingHorizontal: scaleSize(20)
              }}
            >
              <Text
                style={{
                  paddingVertical: scaleSize(10),
                  color: "#333",
                  fontSize: setSpText2(16)
                }}
              >
                {goodDetail.name}
              </Text>
              <View
                style={{ flexDirection: "row", marginVertical: scaleSize(3) }}
              >
                <Label
                  title={"正品"}
                  style={{
                    marginRight: 10,
                    borderRadius: scaleSize(3),
                    borderColor: "#FF5656",
                    borderWidth: 1
                  }}
                />
                <Label
                  title={"现货"}
                  style={{
                    borderRadius: scaleSize(3),
                    borderColor: "#FF5656",
                    borderWidth: 1
                  }}
                />
              </View>
            </View>
            <View>
              <StatusBar payment={this.state.payment} goodDetail={goodDetail} />
            </View>
            <View style={{ flex: 1 }}>
              {imgArr.length > 0
                ? imgArr.map((item, index) => {
                    return <ScaledImage key={index} uri={item} width={width} />;
                  })
                : null}
            </View>
          </View>
          <View>
            {goodDetail.goods_id ? (
              <GoodsAuthor
                goods_id={goodDetail.goods_id}
                recommend={recommend}
                navigation={this.props.navigation}
              />
            ) : null}
          </View>
          <View style={{ height: 15, backgroundColor: "#EEE" }} />
          <Faq
            data={faq}
            goods_id={goodDetail.goods_id}
            navigation={this.props.navigation}
          />
          <ShoppingExplanation />
        </Animated.ScrollView>
      </View>
    );
  };
  _changeFavorite = () => {
    const { params } = this.props.navigation.state;
    const updateData = params.updateData ? params.updateData : null;
    const { goodDetail } = this.state;
    const { is_favorite_goods, goods_id } = this.state.goodDetail;
    const { uname, member_id } = this.props.userInfo;
    const { dispatch } = this.props;

    //   收藏商品
    Goods.favoriteGoods({
      goods_id: goods_id,
      member_id: member_id
    }).then(res => {
      if (res.result == 1) {
        dispatch(asyncFavoriteGoods({ uname }));
      }
      return true;
    });

    if (updateData) {
      updateData();
    }

    if (is_favorite_goods) {
      this.setState({
        goodDetail: { ...goodDetail, is_favorite_goods: 0 }
      });
    } else {
      this.setState({
        goodDetail: { ...goodDetail, is_favorite_goods: 1 }
      });
    }
  };
  _submit = data => {
    const { navigation } = this.props;
    const { goodDetail, payment, isPrepay } = this.state;
    const { name, original, goods_id, mktprice, viewed_cost } = goodDetail;
    var a = { name, original, goods_id, mktprice, viewed_cost, isPrepay };
    const newData = { ...data, ...a };
    navigation.navigate("OrderConfirm", newData);
  };
  render() {
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0
    );

    //文字变成透明的
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
    const { params } = this.props.navigation.state;
    const title = params ? params.title : null;
    const navigation = this.props.navigation;
    const { goodDetail, payment } = this.state;

    return (
      <View style={styles.container}>
        <NavBar
          barBackColor={barBackColor}
          opacity={textOpacity}
          title={title}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100
          }}
          leftButton={ViewUtils.getLeftButtonForGoodsDetail(() => {
            navigation.goBack();
          })}
          rightButton={ViewUtils.getRightButtonForGoodsDetail(() => {})}
        />

        {goodDetail ? (
          this._goodDetail()
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.6)",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: scaleSize(20),
            position: "absolute",
            bottom: 70,
            left: 6,
            width: scaleSize(40),
            height: scaleSize(40)
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={this._changeFavorite}
          >
            {goodDetail.is_favorite_goods ? (
              <Image
                source={require("../../../res/image/collected.png")}
                style={{ width: scaleSize(20), height: scaleSize(20) }}
                tintColor={"#FC6969"}
              />
            ) : (
              <Image
                source={require("../../../res/image/collect.png")}
                style={{ width: scaleSize(20), height: scaleSize(20) }}
                tintColor={"#FC6969"}
              />
            )}
          </TouchableOpacity>
          {/* <View style={{ flexDirection: "row" }}>
            <Text style={{ padding: 5 }}>加入购物车</Text>
          </View> */}
        </View>
        {goodDetail.market_enable ? (
          <HandleBar
            goodDetail={goodDetail}
            payment={payment}
            showPrice={this.showPrice}
            paymented={() => {
              if (!goodDetail.is_viewed_price) {
                Alert.alert("提示", "需要先查看价格");
                return;
              }
              this.setState({
                specVisible: true,
                isPrepay: true
              });
            }}
            clickBtn={() => {
              if (!goodDetail.is_viewed_price) {
                Alert.alert("提示", "需要先查看价格");
                return;
              }
              this.setState({
                specVisible: true,
                isPrepay: false
              });
            }}
          />
        ) : null}

        <SpecModal
          visible={this.state.specVisible}
          hide={() => {
            this.setState({
              specVisible: false
            });
          }}
          ref={e => (this.SpecModal = e)}
        >
          <SkuGoods submit={this._submit} data={goodDetail.specs} />
        </SpecModal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo
  };
};
export default connect(mapStateToProps)(GoodsDetail);
const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: "cover"
  },
  contentContainer: {},
  container: {
    flex: 1
  },
  sectionDetail: {
    flex: 1,
    paddingTop: 450
  },
  text: {
    fontSize: setSpText2(10),
    color: "#fff",
    marginLeft: scaleSize(10)
  },

  payment: {
    flex: 1,
    height: scaleHeight(55),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#3A3A3A"
  },
  videoWrapper: {
    height: 400,
    width: "100%"
  },
  backgroundVideo: {
    width: width - 50,
    height: 400
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0
  },

  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f5f5f6",
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT
  }
});

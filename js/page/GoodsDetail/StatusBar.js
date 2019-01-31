import React, { Component } from "react";
import { StyleSheet, Image, Text, Animated, View } from "react-native";
import CountDown from "../../common/CountDown";
import { scaleSize, scaleHeight, setSpText2 } from "../../util/screenUtil";

/**
 * 商品主图下面的状态显示条
 */
export default class StatusBar extends Component {
  // 已付定金
  state = {
    fadeInOpacity: new Animated.Value(0), // 初始值
    endTime: 11 * 60 * 1000 + +new Date(),
    viewNum: 2121
  };
  _fadeInOpacity = () => {
    Animated.timing(this.state.fadeInOpacity, {
      toValue: 1, // 目标值
      duration: 500 // 动画时间
    }).start(() => {
      Animated.timing(this.state.fadeInOpacity, {
        toValue: 0.5, // 目标值
        duration: 500 // 动画时间
      }).start(() => {
        this._fadeInOpacity();
      });
    });
  };
  componentDidMount() {
    this._fadeInOpacity();
  }
  paymented = () => {
    return (
      <View>
        <View style={styles.dollar}>
          <Image
            source={require("../../../res/image/rmb.png")}
            style={{
              top: -5,
              width: scaleSize(30),
              height: scaleSize(30),
              zIndex: 1000,
              tintColor: "yellow"
            }}
          />
        </View>
        <Text style={styles.price}>{"已付定金"}</Text>
      </View>
    );
  };
  // 一元查看
  checked = is_viewed_price => {
    return (
      <View>
        <Text style={styles.price}>
          {is_viewed_price ? "当前价" : "查看价格"}
        </Text>
      </View>
    );
  };
  render() {
    const { endTime, viewNum } = this.state;
    const { payment } = this.props;
    const { is_viewed_price } = this.props.goodDetail;
    let isPayment = payment ? this.paymented() : this.checked(is_viewed_price);
    return (
      <View style={styles.statusbar}>
        <View style={styles.viewNum}>
          <Image
            source={require("../../../res/image/view.png")}
            style={{
              width: scaleSize(18),
              height: scaleSize(18)
            }}
          />
          <Text style={styles.text}>{viewNum}</Text>
        </View>
        <View style={styles.endTime}>
          <CountDown
            //date={new Date(parseInt(endTime))}
            date={endTime}
            days={{ plural: "Days ", singular: "day " }}
            hours=":"
            mins=":"
            segs=""
            daysStyle={styles.time}
            hoursStyle={styles.time}
            minsStyle={styles.time}
            secsStyle={styles.time}
            firstColonStyle={styles.colon}
            secondColonStyle={styles.colon}
          />
        </View>
        <View style={styles.payment}>
          {isPayment}
          <Animated.View style={{ opacity: this.state.fadeInOpacity }}>
            <Text style={[styles.salePrice]}>
              {is_viewed_price ? this.props.goodDetail.mktprice : "? 元"}
            </Text>
          </Animated.View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  statusbar: {
    flexDirection: "row",
    width: "100%"
  },
  viewNum: {
    flex: 1,
    height: scaleHeight(55),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3A3A3A"
  },
  text: {
    fontSize: setSpText2(12),
    color: "#fff",
    marginLeft: scaleSize(10)
  },
  endTime: {
    width: scaleSize(130),
    height: scaleHeight(55),
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#000"
  },
  time: {
    backgroundColor: "#000",
    color: "#fff",
    fontSize: setSpText2(12),
    marginLeft: 3
  },
  payment: {
    flex: 1,
    height: scaleHeight(55),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#3A3A3A"
  },
  dollar: {
    position: "absolute",
    left: 60,
    top: 0
  },
  price: {
    color: "#fff",
    fontSize: setSpText2(12),
    marginLeft: scaleSize(13)
  },
  salePrice: {
    paddingHorizontal: scaleSize(3),
    fontSize: setSpText2(12),
    textAlign: "center",
    color: "#fff",
    paddingVertical: scaleSize(7),
    borderRadius: scaleSize(2),
    backgroundColor: "#FC6969"
  }
});

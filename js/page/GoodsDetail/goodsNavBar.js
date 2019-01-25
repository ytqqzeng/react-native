/**
 * NavigationBar
 * @flow
 */
import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  DeviceInfo,
  Animated,
  Image,
  StatusBar,
  Text,
  View,
  ViewPropTypes
} from "react-native";
import PropTypes from "prop-types";
import { scaleSize, scaleHeight, setSpText2 } from "../../util/screenUtil";
const NAV_BAR_HEIGHT_IOS = 40;
const NAV_BAR_HEIGHT_ANDROID = 45;
const STATUS_BAR_HEIGHT = DeviceInfo.isIPhoneX_deprecated ? 0 : 20;
const StatusBarShape = {
  barStyle: PropTypes.oneOf(["light-content", "default"]),
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string
};
export default class GoodsNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      hide: false
    };
  }

  getButtonElement(data) {
    return <View style={styles.navBarButton}>{data ? data : null}</View>;
  }

  render() {
    const { opacity, barBackColor } = this.props;

    let titleView = (
      <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>
        商品详情
      </Text>
    );

    let content = this.props.hide ? null : (
      <Animated.View style={[styles.navBar, { backgroundColor: barBackColor }]}>
        {this.getButtonElement(this.props.leftButton)}
        <Animated.View
          style={[styles.navBarTitleContainer, { opacity: opacity }]}
        >
          {titleView}
        </Animated.View>
        {this.getButtonElement(this.props.rightButton)}
      </Animated.View>
    );
    return <View style={[styles.container, this.props.style]}>{content}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "rgba(0,0,0,0.3)"
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height:
      Platform.OS === "ios"
        ? scaleHeight(NAV_BAR_HEIGHT_IOS)
        : scaleHeight(NAV_BAR_HEIGHT_ANDROID)
  },
  navBarTitleContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",

    left: 40,
    top: 0,
    right: 40,
    bottom: 0
  },
  title: {
    fontSize: setSpText2(15),
    color: "#fff"
  },
  navBarButton: {
    alignItems: "center"
  },
  statusBar: {
    height: Platform.OS === "ios" ? STATUS_BAR_HEIGHT : 0
  }
});

// 动态设置网络图片得高度
import React, { Component, PropTypes } from "react";
import { Image } from "react-native";
// https://linxiaoru.github.io/2017/08/28/react-native-%E4%B8%8D%E5%AE%9A%E5%AE%BD%E9%AB%98%E7%BD%91%E7%BB%9C%E5%9B%BE%E7%89%87%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/
export default class ScaledImage extends Component {
  constructor(props) {
    super(props);
    this.state = { source: { uri: this.props.uri } };
  }
  componentWillMount() {
    Image.getSize(this.props.uri, (width, height) => {
      if (this.props.width && !this.props.height) {
        this.setState({
          width: this.props.width,
          height: height * (this.props.width / width)
        });
      } else if (!this.props.width && this.props.height) {
        this.setState({
          width: width * (this.props.height / height),
          height: this.props.height
        });
      } else {
        this.setState({ width: width, height: height });
      }
    });
  }
  render() {
    return (
      <Image
        source={this.state.source}
        style={{ height: this.state.height, width: this.state.width }}
      />
    );
  }
}

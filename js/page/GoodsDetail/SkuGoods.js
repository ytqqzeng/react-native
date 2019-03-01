import React, { Component } from "react";
import { StyleSheet, Image, Text, Animated, View } from "react-native";
import { scaleSize, scaleHeight, setSpText2 } from "../../util/screenUtil";

export default class SkuGoods extends Component {
  // 已付定金
  state = {
    productAndSpecObj: {}, // 商品的sku和商品id的字典 用于通过sku查找出商品id
    goodsArr: [], //商品 保存商品规格 用于推断最终选择了哪个规格做依据
    flag0: 0, // 作为商品规格的区分，比如是颜色 还是 尺码
    flag1: 0,
    flag2: 0
  };
  _productAndSpecObj = data => {
    var a = {};
    if (!Array.isArray(data)) {
      console.warn("商品上传参数specs有误");
      return;
    }
    data.forEach(item => {
      a[item.specs] = item.product_id;
    });
    this.setState({
      productAndSpecObj: a
    });
  };
  _getData = data => {
    var tmpAr;
    data = JSON.parse(data);
    var c = this._productAndSpecObj(data); // 保存一份 product_id:spec 的对象 用于通过选中的sku来推断 product_id

    if (Array.isArray(data) && data.length > 1) {
      tmpAr = data.map(item => item.specs);

      // 获取到每一项有几个参数
      var len = tmpAr[0].split("、").length;
      var newArr = [];
      // 通过双循环把需要的数据推入一个数组里面 元素也是一个数组
      for (var i = 0; i < len; i++) {
        var oneArr = [];
        for (var j = 0, lens = tmpAr.length; j < lens; j++) {
          var a = tmpAr[j].split("、");
          oneArr.push(a[i]);
        }
        newArr.push(oneArr);
      }
      //   数组去重
      var a = newArr.map(item => {
        return item.filter(function(element, index, self) {
          return self.indexOf(element) === index;
        });
      });
      this.setState({
        goodsArr: a
      });
    } else {
      this.setState({
        goodsArr: [["默认"]]
      });
    }
  };

  componentDidMount() {
    const { data } = this.props;
    this._getData(data);
  }
  // 选好了提交 把product_id 传到父组件去
  _submit = () => {
    const { submit } = this.props;
    // goodsArr=[["红","蓝"],["240","250"]]
    // productAndSpecObj={"红、240": 245}
    const { flag0, flag1, flag2, goodsArr, productAndSpecObj } = this.state;

    var product_id, specs;
    if (goodsArr.length == 1) {
      product_id = "";
      specs = "";
    }
    if (goodsArr.length == 2) {
      //说明有2个sku
      var a = goodsArr[0][flag0];
      var b = goodsArr[1][flag1];
      specs = a + "、" + b;
      product_id = productAndSpecObj[specs]; // 得到product_id
    }
    if (goodsArr.length == 3) {
      //说明有3个sku
      var a = goodsArr[0][flag0];
      var b = goodsArr[1][flag1];
      var d = goodsArr[2][flag2];
      specs = a + "、" + b + "、" + d;
      product_id = productAndSpecObj[specs];
    }
    // 把product_id 传到父组件去
    submit({ product_id, specs });
  };
  render() {
    const { goodsArr } = this.state;

    return (
      <View>
        <View
          style={{
            paddingTop: scaleSize(30),
            paddingHorizontal: scaleSize(20)
          }}
        >
          <Text
            style={{
              marginVertical: scaleSize(10),
              fontSize: setSpText2(12),
              color: "#999"
            }}
          >
            规格属性:
          </Text>
          {goodsArr.map((item, index) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomColor: "#eee",
                  borderBottomWidth: 1,
                  paddingBottom: scaleSize(15),
                  marginBottom: scaleSize(15)
                }}
              >
                {item.map((i, index2) => {
                  return (
                    <Text
                      onPress={() => {
                        this.setState({
                          ["flag" + index]: index2
                        });
                      }}
                      style={[
                        styles.text,
                        this.state[`flag${index}`] == index2
                          ? styles.active
                          : null
                      ]}
                    >
                      {i}
                    </Text>
                  );
                })}
              </View>
            );
          })}
        </View>
        <View style={{ marginTop: scaleSize(50), alignItems: "center" }}>
          <Text
            style={{
              textAlign: "center",
              backgroundColor: "#FC6969",
              width: scaleSize(300),
              paddingVertical: scaleSize(10),
              borderRadius: scaleSize(25),
              color: "#fff",
              fontSize: setSpText2(12)
            }}
            onPress={this._submit}
          >
            选好了
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  active: {
    backgroundColor: "#FC6969",
    color: "#fff",
    borderColor: "#FC6969"
  },
  text: {
    marginRight: 30,
    paddingHorizontal: scaleSize(20),
    paddingVertical: scaleSize(5),
    fontSize: setSpText2(12),
    borderRadius: scaleSize(15),
    borderWidth: 1,
    borderColor: "#888",
    color: "#888"
  }
});

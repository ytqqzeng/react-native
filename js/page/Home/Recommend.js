import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { scaleSize, scaleHeight, setSpText2 } from "../../util/screenUtil";
import Goods from "../../models/goods";
import { Label } from "../../common/Label";
import StorageUtil from "../../models/StorageModel";
import { connect } from "react-redux";
const { width } = Dimensions.get("window");
let pageNo = 1; //当前第几页
let totalPage = 5; //总的页数
let itemNo = 0; //item的个数

class RecommendGood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      //网络请求状态
      error: false,
      errorInfo: "",
      dataArray: [],
      showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
      isRefreshing: false //下拉控制
    };
  }

  //网络请求——获取第pageNo页数据
  fetchData(pageNo) {
    const { member_id } = this.props.userInfo;
    //这个是js的访问网络的方法
    // fetch(REQUEST_URL + pageNo)
    //     .then((response) => response.json())
    //     .then((responseData) => {
    //         let data = responseData.items;
    //         let dataBlob = [];
    //         let i = itemNo;

    //         data.map(function (item) {
    //             dataBlob.push({
    //                 key: i,
    //                 value: item,
    //             })
    //             i++;
    //         });
    //         itemNo = i;
    //         console.log("itemNo:" + itemNo);
    //         let foot = 0;
    //         if (pageNo >= totalPage) {
    //             foot = 1;//listView底部显示没有更多数据了
    //         }

    //         this.setState({
    //             //复制数据源
    //             dataArray: this.state.dataArray.concat(dataBlob),
    //             isLoading: false,
    //             showFoot: foot,
    //             isRefreshing: false,
    //         });
    //         data = null;
    //         dataBlob = null;
    //     })
    //     .catch((error) => {
    //         this.setState({
    //             error: true,
    //             errorInfo: error
    //         })
    //     })
    //     .done();
    let foot = 0;
    Goods.goodSearch({ keyword: "包", member_id }).then(res => {
      if (res.result == 1) {
        this.setState({
          dataArray: res.data,
          isLoading: false,
          showFoot: foot,
          isRefreshing: false
        });
        StorageUtil.setRecommendGoods(res.data);
      }
    });
  }
  /**
   * 更新数据
   */
  _updateData = () => {
    this.fetchData(pageNo);
  };

  componentDidMount() {
    //请求数据
    this.fetchData(pageNo);
  }

  //加载等待页
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color="red" size="large" />
      </View>
    );
  }

  //加载失败view
  renderErrorView() {
    return (
      <View style={styles.container}>
        <Text>Fail</Text>
      </View>
    );
  }

  //返回itemView
  // _renderItemView({ item }) {
  //     return (
  //         <View>
  //             <Text style={styles.title}>name: {item.value.name}</Text>
  //             <Text style={styles.content}>stars: {item.value.stargazers_count}</Text>
  //             <Text style={styles.content}>description: {item.value.description}</Text>
  //         </View>
  //     );
  // }

  _renderItemView = ({ item, index }) => {
    const navigation = this.props.navigation;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("GoodsDetail", {
            goodIndex: index,
            title: item.name,
            type: "RECOMMEND_GOODS",
            updateData: this._updateData
          });
        }}
      >
        <View
          style={{
            width: (width - scaleSize(20) - 12) / 2,
            // borderRadius: scaleSize(10),
            // flex: 1,
            backgroundColor: "#fff",
            marginHorizontal: 6,
            marginVertical: scaleSize(15),
            paddingHorizontal: scaleSize(20),
            paddingVertical: scaleSize(10)
          }}
        >
          <View style={{ marginRight: scaleSize(5) }}>
            <Image
              source={{ uri: item.original }}
              style={{ width: scaleSize(150), height: scaleHeight(150) }}
            />
          </View>
          <View
            style={{ flex: 1, flexWrap: "wrap", marginVertical: scaleSize(3) }}
          >
            <Text
              numberOfLines={5}
              style={{
                fontSize: setSpText2(10),
                color: "#333",
                height: scaleHeight(40)
              }}
            >
              {item.name}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {item.is_viewed_price ? (
              <Text
                style={{
                  fontSize: setSpText2(8),
                  color: "#000"
                }}
              >
                ¥:{item.mktprice}
              </Text>
            ) : (
              <Label
                title={`立即抢`}
                style={{
                  borderRadius: scaleSize(2),
                  backgroundColor: "#FC6969",
                  color: "#fff",
                  borderColor: "#FF5656",
                  borderWidth: 1
                }}
              />
            )}
            <Label
              title={`猜你喜欢`}
              style={{
                color: "#999",
                backgroundColor: "#eee",
                borderWidth: 0,
                borderRadius: scaleSize(2)
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // renderData() {
  //     return (
  //         <View style={styles.container}>
  //             <FlatList
  //                 data={this.state.dataArray}
  //                 renderItem={this._renderItemView}
  //                 ListFooterComponent={this._renderFooter.bind(this)}
  //                 onEndReached={this._onEndReached.bind(this)}
  //                 onEndReachedThreshold={1}
  //                 ItemSeparatorComponent={this._separator}
  //             />
  //         </View>
  //     );
  // }
  _renderItemCategory = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          alert(1);
        }}
        style={{ marginHorizontal: scaleSize(10) }}
      >
        <Image
          source={item.img}
          style={{
            borderRadius: scaleSize(8),
            width: scaleSize(120),
            height: scaleSize(120)
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: scaleSize(10)
          }}
        >
          <Label
            title={`上新${item.num}款`}
            style={{
              backgroundColor: "#FC6969",
              color: "#fff",

              borderRadius: scaleSize(2),
              borderColor: "#FF5656",
              borderWidth: 1
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  _separator() {
    return <View style={{ height: 1, backgroundColor: "#999999" }} />;
  }
  _renderFooter() {
    if (this.state.showFoot === 1) {
      return (
        <View
          style={{
            height: 30,
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <Text
            style={{
              color: "#999999",
              fontSize: 14,
              marginTop: 5,
              marginBottom: 5
            }}
          >
            没有更多数据了
          </Text>
        </View>
      );
    } else if (this.state.showFoot === 2) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator />
          <Text>正在加载更多数据...</Text>
        </View>
      );
    } else if (this.state.showFoot === 0) {
      return (
        <View style={styles.footer}>
          <Text />
        </View>
      );
    }
  }

  _onEndReached() {
    //如果是正在加载中或没有更多数据了，则返回
    if (this.state.showFoot != 0) {
      return;
    }
    //如果当前页大于或等于总页数，那就是到最后一页了，返回
    if (pageNo != 1 && pageNo >= totalPage) {
      return;
    } else {
      pageNo++;
    }
    //底部显示正在加载更多数据
    this.setState({ showFoot: 2 });
    //获取数据
    this.fetchData(pageNo);
  }
  renderData() {
    const tmpData = [
      {
        img: require("../../../res/image/banner/catagory1.jpg"),
        num: 133
      },
      {
        img: require("../../../res/image/banner/catagory2.jpg"),
        num: 143
      },
      {
        img: require("../../../res/image/banner/catagory3.jpg"),
        num: 99
      }
    ];
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: setSpText2(14),
                color: "#333",
                backgroundColor: "#fff",
                paddingVertical: scaleSize(12)
              }}
            >
              为你推荐
            </Text>
            <FlatList
              data={tmpData}
              horizontal={true}
              renderItem={this._renderItemCategory}
            />
          </View>
          <View style={{ height: 5, backgroundColor: "#fff" }} />
          <View style={{ paddingHorizontal: scaleSize(10) }}>
            <FlatList
              data={this.state.dataArray}
              renderItem={this._renderItemView}
              ListFooterComponent={this._renderFooter.bind(this)}
              onEndReached={this._onEndReached.bind(this)}
              onEndReachedThreshold={1}
              numColumns={2}
              // ItemSeparatorComponent={this._separator} 每个Item的分割线
            />
          </View>
        </ScrollView>
      </View>
    );
  }
  render() {
    //第一次加载等待的view
    if (this.state.isLoading && !this.state.error) {
      return this.renderLoadingView();
    } else if (this.state.error) {
      //请求失败view
      return this.renderErrorView();
    }
    //加载数据
    return this.renderData();
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo
  };
};
export default connect(mapStateToProps)(RecommendGood);
const styles = StyleSheet.create({
  container: {
    flex: 1
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#F5FCFF"
  },
  title: {
    fontSize: 15,
    color: "blue"
  },
  footer: {
    flexDirection: "row",
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  content: {
    fontSize: 15,
    color: "black"
  }
});

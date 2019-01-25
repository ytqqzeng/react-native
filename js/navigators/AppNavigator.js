import { StackNavigator } from "react-navigation";
import WelcomePage from "../page/WelcomePage";
import HomePage from "../page/HomePage";
import MyPage from "../page/My";
import GoodsDetail from "../page/GoodsDetail";
import HomeIndex from "../page/Home";
import NewGood from "../page/Home/NewGood";
import RecommendGood from "../page/Home/Recommend";
import Login from "../page/Login/Login";
import Register from "../page/Login/Register";
import UserInfo from "../page/My/UserInfo";
import Address from "../page/My/UserInfo/Address";
import AddAddress from "../page/My/UserInfo/Address/Add";
import EditAddress from "../page/My/UserInfo/Address/Edit";
import HelpCenter from "../page/My/HelpCenter";
import HelpPage from "../page/My/HelpCenter/HelpPage";
import GoodGoods from "../page/GoodGoods";
import OrderConfirm from "../page/Order/OrderConfirm";
import OrderPage from "../page/Order/OrderPage";
import OrderType from "../page/Order/OrderType";

import SearchPage from "../common/Search";
import Category from "../page/Category";
import CategoryGoods from "../page/Category/CategoryGoods";
import Setting from "../page/My/Setting";
import CheckPriceGoods from "../page/My/CheckedPriceGoods";
import FavoriteGoods from "../page/My/FavoriteGoods";
// 测试页面
import Animated from "../demo/animated";

export default (AppNavigator = StackNavigator(
  {
    WelcomePage: {
      screen: WelcomePage
    },
    HomePage: {
      screen: HomePage
    },
    MyPage: {
      screen: MyPage
    },
    // 好物
    GoodGoods: {
      screen: GoodGoods
    },
    // 推荐
    RecommendGood: {
      screen: RecommendGood
    },
    // 搜索页面
    Search: {
      screen: SearchPage
    },
    // 用户头像 会员名 地址
    UserInfo: {
      screen: UserInfo
    },
    // 用户地址
    Address: {
      screen: Address
    },
    // 新增用户地址
    AddAddress: {
      screen: AddAddress
    },
    // 编辑用户地址
    EditAddress: {
      screen: EditAddress
    },
    // 订单确认
    OrderConfirm: {
      screen: OrderConfirm
    },
    // 我的订单
    OrderPage: {
      screen: OrderPage
    },
    // 订单类型
    OrderType: {
      screen: OrderType
    },
    // 分类
    Category: {
      screen: Category
    },
    // 分类商品列表
    CategoryGoods: {
      screen: CategoryGoods
    },
    // 帮助中心
    HelpCenter: {
      screen: HelpCenter
    },
    // 具体帮助页面
    HelpPage: {
      screen: HelpPage
    },
    // 已经查看价格的商品
    CheckPriceGoods: {
      screen: CheckPriceGoods
    },
    // 已经收藏的商品
    FavoriteGoods: {
      screen: FavoriteGoods
    },
    // 设置
    Setting: {
      screen: Setting
    },
    // CustomKeyPage:{
    //     screen: CustomKeyPage
    // },
    GoodsDetail: {
      screen: GoodsDetail
    },
    // GoodItem:{
    //     screen: GoodItem
    // },
    HomeIndex: {
      screen: HomeIndex
    },
    NewGood: {
      screen: NewGood
    },
    // 登陆页面
    Login: {
      screen: Login
    },
    // 注册页面
    Register: {
      screen: Register
    },
    // 测试页面
    Animated: {
      screen: Animated
    }
  },
  {
    navigationOptions: {
      header: null
    }
  }
));

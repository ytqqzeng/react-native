import { StackNavigator } from "react-navigation";
import WelcomePage from "../page/WelcomePage";
import HomePage from "../page/HomePage";
import MyPage from "../page/My";
import GoodsDetail from "../page/GoodsDetail";
import HomeIndex from "../page/Home";
import NewGood from "../page/Home/NewGoods";
import SwiperDetail from "../page/Home/NewGoods/Swipper/SwiperDetail";
import RecommendGood from "../page/Home/Recommend";
import Login from "../page/Login/Login";
import Register from "../page/Login/Register";
import UserInfo from "../page/My/UserInfo";
import Address from "../page/My/UserInfo/Address";
import AddAddress from "../page/My/UserInfo/Address/Add";
import EditAddress from "../page/My/UserInfo/Address/Edit";
import HelpCenter from "../page/My/HelpCenter";
import FootPrint from "../page/My/FootPrint";
import HelpPage from "../page/My/HelpCenter/HelpPage";
import Coupon from "../page/My/Coupon";
import GoodGoods from "../page/GoodGoods";
import MyHeartList from "../page/GoodGoods/MyHeartList";
import GoodGoodsList from "../page/GoodGoods/GoodGoodsList";
import OrderConfirm from "../page/Order/OrderConfirm";
import OrderPage from "../page/Order/OrderPage";
import OrderType from "../page/Order/OrderType";
import OrderPay from "../page/Order/OrderPay";
import OrderPayed from "../page/Order/OrderPayed";
import OrderRate from "../page/Order/OrderRate";
import Kanke from "../page/Kanke";
import KankeDetail from "../page/Kanke/KankeDetail";
import FaqAsk from "../page/GoodsDetail/Faq/FaqAsk";
import FaqDetail from "../page/GoodsDetail/Faq/FaqDetail";

import SearchPage from "../common/Search";
import Category from "../page/Category";
import CategoryGoods from "../page/Category/CategoryGoods";
import Setting from "../page/My/Setting";
import CheckPriceGoods from "../page/My/CheckedPriceGoods";
import FavoriteGoods from "../page/My/FavoriteGoods";

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
    // 心动清单
    MyHeartList: {
      screen: MyHeartList
    },
    // 好物清单
    GoodGoodsList: {
      screen: GoodGoodsList
    },
    // 推荐
    RecommendGood: {
      screen: RecommendGood
    },
    // 搜索页面
    Search: {
      screen: SearchPage
    },
    // 看客页面
    Kanke: {
      screen: Kanke
    },
    // 看客详情页面
    KankeDetail: {
      screen: KankeDetail
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
    // 订单支付
    OrderPay: {
      screen: OrderPay
    },
    // 订单支付成功
    OrderPayed: {
      screen: OrderPayed
    },
    // 订单评价
    OrderRate: {
      screen: OrderRate
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
    // 优惠卷
    Coupon: {
      screen: Coupon
    },
    // 我的足迹
    FootPrint: {
      screen: FootPrint
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
    GoodsDetail: {
      screen: GoodsDetail
    },
    // 详情页问答区域 提问
    FaqAsk: {
      screen: FaqAsk
    },
    // 详情页问答区域
    FaqDetail: {
      screen: FaqDetail
    },
    HomeIndex: {
      screen: HomeIndex
    },
    NewGood: {
      screen: NewGood
    },
    // 首页轮播图详情页面
    SwiperDetail: {
      screen: SwiperDetail
    },
    // 登陆页面
    Login: {
      screen: Login
    },
    // 注册页面
    Register: {
      screen: Register
    }
  },
  {
    navigationOptions: {
      header: null
    }
  }
));

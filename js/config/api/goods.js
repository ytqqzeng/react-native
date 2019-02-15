import { env } from "../index";
const ROOT_URL = `${env.apiHost}/`;
export const GoodsApi = {
  // 商品搜索
  goodSearch: {
    url: `${ROOT_URL}shop/api/shop/goods-ext/search-goods.do`,
    method: "GET"
  },
  // 商品大分类
  goodCategory: {
    url: `${ROOT_URL}shop/api/shop/goods-ext/get-cat.do`,
    method: "GET"
  },
  /**
   * 根据大分类获取小分类
   */
  goodCategoryChild: {
    url: `${ROOT_URL}shop/api/shop/goods-ext/get-cat.do`,
    method: "GET"
  },
  // 点击小分类获取到的商品列表
  goodCategoryChildList: {
    url: `${ROOT_URL}shop/api/shop/goods-ext/get-goods-by-cat.do`,
    method: "GET"
  },
  // 获取查看过价格的商品列表
  checkedPriceGoodsList: {
    url: `${ROOT_URL}shop/api/shop/goods-ext/get-viewed-price-goods.do`,
    method: "GET"
  },
  // 支付成功以后查看价格
  checkedPrice: {
    url: `${ROOT_URL}shop/api/shop/goods-ext/view-price.do`,
    method: "GET"
  },
  // 收藏过的商品列表
  favoriteGoodsList: {
    url: `${ROOT_URL}shop/api/shop/goods-ext/get-favorite-goods.do`,
    method: "GET"
  },
  // 收藏商品
  favoriteGoods: {
    url: `${ROOT_URL}shop/api/shop/goods-ext/favorite-goods.do`,
    method: "POST"
  },
  // 商品问答列表
  faqGoods: {
    url: `${ROOT_URL}shop/api/shop/goods-ext/get-queries.do`,
    method: "GET"
  },
  // 商品问答列表 提问
  faqGoodsAsk: {
    url: `${ROOT_URL}shop/api/shop/goods-ext/add-query.do`,
    method: "POST"
  },
  // 留下足迹
  footPrint: {
    url: `${ROOT_URL}shop/api/shop/goods-ext/view-goods.do`,
    method: "GET"
  },
  // 获取足迹 列表
  footPrintList: {
    url: `${ROOT_URL}shop/api/shop/goods-ext/get-viewed-goods.do`,
    method: "GET"
  }
};

import { env } from "../index";

const ROOT_URL = `${env.apiHost}/`;

export const OrderApi = {
  createOrder: {
    url: `${ROOT_URL}shop/api/shop/order-ext/create-order.do`,
    method: "POST"
  },
  cancelOrder: {
    url: `${ROOT_URL}shop/api/shop/order-ext/cancel-order.do`,
    method: "POST"
  },
  deleteOrder: {
    url: `${ROOT_URL}shop/api/shop/order-ext/delete-order.do`,
    method: "POST"
  },
  rateOrder: {
    url: `${ROOT_URL}shop/api/shop/goods-ext/add-comment.do`,
    method: "POST"
  },
  OrderList: {
    url: `${ROOT_URL}shop/api/shop/order-ext/get-order-by-member-id.do`,
    method: "GET"
  },
  updateAndvance: {
    url: `${ROOT_URL}shop/api/shop/member-ext/update-advance.do`,
    method: "GET"
  },
  orderStatusSuccess: {
    url: `${ROOT_URL}shop/api/shop/order-ext/change-order-status.do`,
    method: "GET"
  },
  //   正常购买 支付订单

  changeOrderToSuccess: {
    url: `${ROOT_URL}shop/api/shop/order-ext/pay.do`,
    method: "GET"
  },
  //   定金支付

  prePaySuccess: {
    url: `${ROOT_URL}shop/api/shop/order-ext/prepay.do`,
    method: "GET"
  },
  uploadRateImg: {
    url: `${ROOT_URL}shop/eop/upload/upload-img.do?subFolder=comment`,
    method: "POST"
  }
};

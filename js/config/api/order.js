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
  OrderList: {
    url: `${ROOT_URL}shop/api/shop/order-ext/get-order-by-member-id.do`,
    method: "GET"
  },
  updateAndvance: {
    url: `${ROOT_URL}shop/api/shop/member-ext/update-advance.do`,
    method: "GET"
  }
};

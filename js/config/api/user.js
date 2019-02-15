import { env } from "../index";

const ROOT_URL = `${env.apiHost}/`;

export const UserApi = {
  login: {
    url: `${ROOT_URL}shop/api/shop/member-ext/login-ext.do`,
    method: "POST"
  },
  register: {
    url: `${ROOT_URL}shop/api/shop/member-ext/register-ext.do`,
    method: "POST"
  },
  uploadAvatar: {
    url: `${ROOT_URL}shop/eop/upload/upload-img.do?subFolder=avatar`,
    method: "POST"
  },
  updateUserInfo: {
    url: `${ROOT_URL}shop/api/shop/member-ext/update.do`,
    method: "POST"
  },
  addUserAddress: {
    url: `${ROOT_URL}shop/api/shop/member-ext/save-address.do`,
    method: "POST"
  },
  getUserAddressList: {
    url: `${ROOT_URL}shop/api/shop/member-ext/get-address-list.do`,
    method: "GET"
  },
  //   快递费
  getUserExpressFee: {
    url: `${ROOT_URL}shop/api/shop/order-ext/get-shipping-price.do`,
    method: "GET"
  },
  deleteUserAddress: {
    url: `${ROOT_URL}shop/api/shop/member-ext/delete-address.do`,
    method: "GET"
  }
};

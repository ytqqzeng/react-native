import { OrderApi } from "../config/api/order";
import Fetch from "../util/fetchRequest";

export default class Order {
  static OrderList(params = { member_id }) {
    return Fetch.fetchGet(OrderApi.OrderList, params).catch(error => {
      console.warn("error::登陆错误", error);
      return false;
    });
  }
  /**
   * 更新预存款的总数
   * @param {} params
   */
  static updateAndvance(params = { member_id }) {
    return Fetch.fetchGet(OrderApi.updateAndvance, params).catch(error => {
      console.warn("error::预存款报错", error);
      return false;
    });
  }
  /**
   * 订单状态改为 支付成功
   * @param {} params
   */
  static orderStatusSuccess(params = { goods_id, member_id }) {
    return Fetch.fetchGet(OrderApi.orderStatusSuccess, params).catch(error => {
      console.warn("error::修改订单状态报错", error);
      return false;
    });
  }
  /**
   * 正常购买支付
   * @param {} params
   */
  static changeOrderToSuccess(params = { goods_id, member_id }) {
    return Fetch.fetchGet(OrderApi.changeOrderToSuccess, params).catch(
      error => {
        console.warn("error::修改订单状态报错", error);
        return false;
      }
    );
  }
  /**
   * 支付定金
   * @param {} params
   */
  static prePaySuccess(params = { goods_id, member_id }) {
    return Fetch.fetchGet(OrderApi.prePaySuccess, params).catch(error => {
      console.warn("error::修改订单状态报错", error);
      return false;
    });
  }
  /**
   * 创建订单
   * @param {*} param0
   */
  static createOrder({
    goods_id,
    prepay,
    member_id,
    product_id,
    shipping_area, //省市区拼接在一起的字符串
    ship_name,
    ship_addr, // 收件具体地址
    ship_mobile,
    shipping_amount, // 快递价格
    discount, //折扣
    remark // 备注
  }) {
    let formdata = new FormData();

    formdata.append("goods_id", goods_id);
    formdata.append("member_id", member_id);
    if (product_id) {
      formdata.append("product_id", Number(product_id));
    }
    if (prepay) {
      formdata.append("prepay", Number(prepay));
    }
    formdata.append("shipping_area", shipping_area);
    formdata.append("ship_name", ship_name);
    formdata.append("ship_addr", ship_addr);
    formdata.append("ship_mobile", ship_mobile);
    formdata.append("shipping_amount", shipping_amount);
    formdata.append("discount", discount);
    formdata.append("remark", remark);
    // console.warn("formdata::", formdata);
    return fetch(OrderApi.createOrder.url, {
      method: "POST",
      body: formdata
    })
      .then(function(response) {
        console.warn("response::", response);
        return response.json();
      })
      .catch(e => {
        console.warn("e::", e);
        console.warn("出错");
      });
  }
  /**
   * 取消订单
   * @param {*} param0
   */
  static cancelOrder({ member_id, order_id }) {
    let formdata = new FormData();
    formdata.append("order_id", order_id);
    formdata.append("member_id", member_id);
    console.warn("formdata::", formdata);
    return fetch(OrderApi.cancelOrder.url, {
      method: "POST",
      body: formdata
    })
      .then(function(response) {
        console.warn("response::", response);
        return response.json();
      })
      .catch(e => {
        console.warn("e::", e);
        console.warn("出错");
      });
  }
  /**
   * 删除订单
   * @param {*} param
   */
  static deleteOrder({ member_id, order_id }) {
    let formdata = new FormData();
    formdata.append("order_id", order_id);
    formdata.append("member_id", member_id);
    console.warn("formdata::", formdata);
    return fetch(OrderApi.deleteOrder.url, {
      method: "POST",
      body: formdata
    })
      .then(function(response) {
        console.warn("responseDelete::", response);
        return response.json();
      })
      .catch(e => {
        console.warn("e::", e);
        console.warn("出错");
      });
  }
  /**
   * 评价订单
   * @param {*} param
   */
  static rateOrder({ member_id, content, grade, img, goods_id }) {
    let formdata = new FormData();
    formdata.append("member_id", member_id);
    formdata.append("content", content);
    formdata.append("grade", grade);
    formdata.append("img", img);
    formdata.append("goods_id", goods_id);
    return fetch(OrderApi.rateOrder.url, {
      method: "POST",
      body: formdata
    })
      .then(function(response) {
        console.warn("response::", response);
        return response.json();
      })
      .catch(e => {
        console.warn("e::", e);
        console.warn("出错");
        return null;
      });
  }
  /**
   * 提交评价图片
   * @param {*} img
   */
  static uploadRateImg(img) {
    let formData = new FormData();
    let file = { uri: img, type: "multipart/form-data", name: "image.png" };
    formData.append("file", file);
    return fetch(OrderApi.uploadRateImg.url, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    })
      .then(response => response.text())
      .then(responseData => {
        console.warn("responseData::", responseData);
        var responseData = JSON.parse(responseData);
        return responseData;
      })
      .catch(error => {
        console.warn("error", error);
      });
  }
}

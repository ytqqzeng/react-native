import { OrderApi } from "../config/api/order";
import Fetch from "../util/fetchRequest";

export default class Order {
  static OrderList(params = { member_id }) {
    return Fetch.fetchGet(OrderApi.OrderList, params).catch(error => {
      console.warn("error::登陆错误", error);
      return false;
    });
  }
  static createOrder({
    goods_id,
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
    console.warn("discount::", discount);
    let formdata = new FormData();
    formdata.append("goods_id", goods_id);
    formdata.append("member_id", member_id);
    formdata.append("product_id", product_id);
    formdata.append("shipping_area", shipping_area);
    formdata.append("ship_name", ship_name);
    formdata.append("ship_addr", ship_addr);
    formdata.append("ship_mobile", ship_mobile);
    formdata.append("shipping_amount", shipping_amount);
    formdata.append("discount", discount);
    formdata.append("remark", remark);
    return fetch(OrderApi.createOrder.url, {
      method: "POST",
      body: formdata
    })
      .then(function(response) {
        console.warn("1::", response);
        return response.json();
      })
      .catch(e => {
        console.warn("出错");
      });
  }
}

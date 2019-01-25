import types from "../../constants";
import Order from "../../models/order";

// 更新用户订单列表信息
export const userOrderList = json => {
  return {
    type: types.order.USER_ORDER_LIST,
    orderList: json
  };
};

// 可以异步的action
export const asyncUserOrderList = ({ member_id }) => {
  return dispatch => {
    Order.OrderList({ member_id }).then(res => {
      if (res.result == 1) {
        console.warn("res.data 订单数据::", res.data);
        dispatch(userOrderList(res.data));
      }
    });
  };
};

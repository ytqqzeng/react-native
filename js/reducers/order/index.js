import types from "../../constants";

const initialState = {
  orderList: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.order.USER_ORDER_LIST:
      return Object.assign({}, state, {
        orderList: action.orderList
      });
    default:
      return state;
  }
};

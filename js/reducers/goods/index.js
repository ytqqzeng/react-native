import types from "../../constants";

const initialState = {
  checkedPriceGoodsList: [],
  favoriteGoodsList: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.goods.CHECKED_PRICE:
      return Object.assign({}, state, {
        checkedPriceGoodsList: action.checkedPriceGoodsList
      });
    case types.goods.FAVORITE_GOODS:
      return Object.assign({}, state, {
        favoriteGoodsList: action.favoriteGoodsList
      });
    default:
      return state;
  }
};

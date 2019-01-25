import { combineReducers } from "redux";
import user from "./user";
import goods from "./goods";
import order from "./order";

const rootReducer = combineReducers({
  user,
  goods,
  order
});
export default rootReducer;

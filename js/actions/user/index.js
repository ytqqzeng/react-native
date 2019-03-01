import types from "../../constants";
import { UserApi } from "../../config/api/user";

export const loginStatus = () => {
  return {
    type: types.user.USER_STATUS_CHANGE
  };
};
// 退出登陆
export const loginOutAction = () => {
  return {
    type: types.user.USER_LOGIN_OUT
  };
};
export const isLoding = () => {
  return {
    type: types.user.USER_LODING
  };
};
export const alreadyLogin = json => {
  return {
    type: types.user.UPDATE_USER_INFO,
    userInfo: json
  };
};
// 更新用户信息 需要重新获取用户信息
export const updateUserInfo = json => {
  return {
    type: types.user.UPDATE_USER_INFO,
    userInfo: json
  };
};
// 设置进入详情页面之前那个页面的key 以便以后可以在支付成功以后跳回去
export const setPageKey = json => {
  return {
    type: types.user.SET_PAGE_KEY,
    userInfo: json
  };
};

// 可以异步的action
export const asyncLoging = ({ username, password }) => {
  return dispatch => {
    dispatch(isLoding());
    let formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    return fetch(UserApi.login.url, {
      method: "POST",
      body: formdata
    })
      .then(function(response) {
        return response.json();
      })
      .then(res => {
        if (res.result == 1) {
          // 这里的dispatch不能次序放反 不然会导致userInfo还没有设置成功就跳转页面，然后newgoods页面里面获取不到userInfo数据
          dispatch(alreadyLogin(res.data));
          dispatch(loginStatus());
          return "success";
        } else {
          alert(res.message);
        }
      })
      .catch(e => {
        console.warn("e::", e);
        return "error";
      });
  };
};

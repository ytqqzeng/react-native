import { UserApi } from "../config/api/user";
import Fetch from "../util/fetchRequest";

export default class User {
  static login(
    params = { login_type: "password", username: null, password: null }
  ) {
    return Fetch.fetchPost(UserApi.login, params).catch(error => {
      console.warn("error::登陆错误", error);
      return false;
    });
  }
  static register({ username, password, mobile, email }) {
    let formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    formdata.append("mobile", mobile);
    formdata.append("email", email);
    return fetch(UserApi.register.url, {
      method: "POST",
      body: formdata
    })
      .then(function(response) {
        console.warn("1::", response);
        return response.json();
      })
      .catch(e => {
        console.warn("注册出错");
      });
  }
  static uploadAvatar(img) {
    let formData = new FormData();
    let file = { uri: img, type: "multipart/form-data", name: "image.png" };
    formData.append("file", file);
    return fetch(UserApi.uploadAvatar.url, {
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
        console.error("error", error);
      });
  }
  static updateUserInfo({ uname, sex, birthday, face, nickname }) {
    let formdata = new FormData();
    formdata.append("uname", uname);
    formdata.append("sex", sex);
    formdata.append("birthday", +new Date(birthday));
    formdata.append("face", face);
    formdata.append("nickname", nickname);
    return fetch(UserApi.updateUserInfo.url, {
      method: "POST",
      body: formdata
    })
      .then(function(response) {
        console.warn("1::", response);
        return response.json();
      })
      .catch(e => {
        console.warn("更新出错");
      });
  }
  /**
   * 获取用户地址
   * @param {*} param
   */
  static getUserAddressList(param) {
    return Fetch.fetchGet(UserApi.getUserAddressList, param).catch(error => {
      console.warn("error::错误", error);
      return false;
    });
  }
  /**
   * 删除用户地址
   * @param {*} param
   */
  static deleteUserAddress(param) {
    return Fetch.fetchGet(UserApi.deleteUserAddress, param).catch(error => {
      console.warn("error::错误", error);
      return false;
    });
  }

  /**
   * add/edit用户地址
   * @param {}} param0
   */
  static addUserAddress({
    addr_id,
    member_id,
    name,
    mobile,
    province,
    city,
    region,
    addr,
    def_addr
  }) {
    let formdata = new FormData();
    if (addr_id) {
      formdata.append("addr_id", addr_id);
    }

    formdata.append("member_id", member_id);
    formdata.append("name", name);
    formdata.append("mobile", mobile);
    formdata.append("province", province);
    formdata.append("city", city);
    formdata.append("region", region);
    formdata.append("addr", addr);
    formdata.append("def_addr", def_addr);

    return fetch(UserApi.addUserAddress.url, {
      method: "POST",
      body: formdata
    })
      .then(function(response) {
        return response.json();
      })
      .catch(e => {
        console.warn("更新出错");
      });
  }

  // async register(params) {
  //     try {
  //         request(UserApi.register,{  params })
  //         return true
  //     } catch (e) {
  //         this.setException(e)
  //         return false
  //     }
  // }
}

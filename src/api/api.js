import { get, post } from "./http";
import store from "../vuex/store";

/**
 * testGet 接口
 * @param {Object} p 请求参数
 */
export const testGet2211 = () => {
  get("/local/api/login/get");
};
/** ----------------获取配置文件---------------- */

/**
 * 文字配置
 */
export const G_WordsConfig = () => {
  get("../../static/api.json")
    .then(res => {
      console.log(res);
      store.commit("SetApiConfig", res);
    })
    .catch(err => {
      console.warn(err);
    });
};

/**
 * 接口配置
 */
export const G_ApiConfig = () => {
  get("../../static/words.json")
    .then(res => {
      console.log(res);
      store.commit("SetWordsConfig", res);
    })
    .catch(err => {
      console.warn(err);
    });
};

/** ----------------首页---------------- */

/**
 * 获取用户信息
 * @param {用户id} id
 */
export const G_UserInfo = () => {
  return new Promise((resolve, reject) => {
    get("/local/api/Promotion/Info")
      .then(res => {
        return resolve(res);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const G_SetUserUpId = (id, upId) => {
  post("", { id, upId });
};

export const G_Promotion = () => {
  return new Promise((resolve, reject) => {
    get("/local/api/Promotion")
      .then(result => {
        return resolve(result);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

/** ----------------登录页---------------- */

/**
 * 获取token
 * @param {账号密码} form
 */
export const P_Login = form => {
  return new Promise((resolve, reject) => {
    post("/local/token", form)
      .then(res => {
        console.log(res);
        return resolve(res);
      })
      .catch(err => {
        console.log(err);
        return reject(err);
      });
  });
};

export const P_Registe = form => {
  return new Promise((resolve, reject) => {
    post("/local/api/Account/Register", form)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

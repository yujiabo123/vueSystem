import { get, post } from "./http";
import store from "../vuex/store";

/**
 * testGet 接口
 * @param {Object} p 请求参数
 */
// export const testGet2211 = () => {
//   get("/local/api/login/get");
// };
/** ----------------获取配置文件---------------- */

/**
 * 接口配置
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
 * 文字配置
 */
export const G_ApiConfig = () => {
  get("../../static/words.json")
    .then(res => {
      store.commit("SetWordsConfig", res);
    })
    .catch(err => {
      console.warn(err);
    });
};

/** ----------------首页---------------- */

/**
 * 获取用户信息
 */
export const G_UserInfo = () => {
  return new Promise((resolve, reject) => {
    get(store.getters.ApiConfig.Info)
      .then(res => {
        return resolve(res);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const G_Promotion = () => {
  return new Promise((resolve, reject) => {
    get(store.getters.ApiConfig.Promotion)
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
    post(store.getters.ApiConfig.token, form)
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
    post(store.getters.ApiConfig.Register, form)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
/** ----------------个人信息---------------- */
/**
 *
 * @param {*} id
 */
export const G_SupInfo = Pcode => {
  return new Promise((resolve, reject) => {
    get(store.getters.ApiConfig.SupInfo, { Pcode: Pcode })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 *
 * @param {*} pcode
 */
export const P_Bind = Pcode => {
  return new Promise((resolve, reject) => {
    post(store.getters.ApiConfig.Bind, { Pcode: Pcode })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/** ----------------代理管理---------------- */

export const G_SubP = (IndexId, size = 50) => {
  return new Promise((resolve, reject) => {
    get(store.getters.ApiConfig.SubP, { IndexId: IndexId, size: size })
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/** ----------------玩家管理---------------- */

export const G_SubU = (IndexId, size = 50) => {
  return new Promise((resolve, reject) => {
    get(store.getters.ApiConfig.SubU, { IndexId: IndexId, size: size })
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/** ----------------收入明细---------------- */

export const G_Profit = () => {
  return new Promise((resolve, reject) => {
    get(store.getters.ApiConfig.Profit)
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
};

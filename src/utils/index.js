import store from "@/store/index.js";
import TokenUtil from "./TokenUtil.js";

export const login = (user) => {
    console.log("login：", user);
    //放到全局
    store.commit("setUserInfo", user);
    //设置Token
    TokenUtil.setToken(user.token);
}

export const logout = () => {
    store.commit("setUserInfo", null);
    //设置Token
    TokenUtil.delToken();
}
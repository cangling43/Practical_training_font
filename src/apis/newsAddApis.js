import request from "./request.js"
import webconfig from "@/webconfig.js";
const url = webconfig.back_host;


/**
 * 
 * @param {*} news  接口传输越简单越好
 * @returns 
 */

const Addnews = (news) => {
    return request({
        url: url + "/news/add",
        method: "POST",
        data: {
            news
        }
    })
}



export default {
    Addnews
}
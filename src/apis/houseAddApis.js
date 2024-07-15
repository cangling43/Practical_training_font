import request from "./request.js"
import webconfig from "@/webconfig.js";
const url = webconfig.back_host;


/**
 * 
 * @param {*} house  接口传输越简单越好
 * @returns 
 */

const Addhouse = (house) => {
    return request({
        url: url + "/house/add",
        method: "POST",
        data: {
            house
        }
    })
}



export default {
    Addhouse
}
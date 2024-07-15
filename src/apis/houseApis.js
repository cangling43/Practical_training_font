import request from "./request.js"
import webconfig from "@/webconfig.js";
const url = webconfig.back_host;



/**
 * 获取房屋列表（分页）
 * @param {*} pageNo 页码
 * @param {*} pageSize 页大小
 * @returns 房屋分页数据列表
 */
const GetHouseList = (pageNo, pageSize) => {
    return request({
        url: url + "/house/getlist",
        method: "POST",
        data: {
            pageNo, pageSize
        }
    })
}

const GetDetailById = (house_id) => {
    return request({
        url: url + "/house/GetDetailById",
        method: "POST",
        data: {
            house_id
        }
    })
}

export default {
    GetHouseList, GetDetailById
}
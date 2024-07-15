import request from "./request.js"
import webconfig from "@/webconfig.js";
const url = webconfig.back_host;


const GetNewsList = (pageNo, pageSize) => {
    return request({
        url: url + "/news/getlist",
        method: "POST",
        data: {
            pageNo, pageSize
        }
    })
}

const GetDetailById = (news_id) => {
    return request({
        url: url + "/news/getdetailById",
        method: "POST",
        data: {
            news_id
        }
    })
}


export default {
    GetNewsList, GetDetailById
}
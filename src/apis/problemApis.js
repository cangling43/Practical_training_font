import request from "./request.js"
import webconfig from "@/webconfig.js";
const url = webconfig.back_host;

const GetProblemInfoByType = (type) => {
    return request({
        url: url + "/problem/GetProblemInfoByType",
        method: "POST",
        data: {
           type
        }
    })
}

const GetProblemInfoByById = (id) => {
    return request({
        url: url + "/problem/GetProblemInfoById",
        method: "POST",
        data: {
           id
        }
    })
}

export default {
    GetProblemInfoByType,GetProblemInfoByById
}
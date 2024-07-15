import request from "./request.js"
import webconfig from "@/webconfig.js";
const url = webconfig.back_host;


const GetUserInfoByToken = (token) => {
    return request({
        url: url + "/user/GetUserInfoByToken",
        method: "POST"
    })
}

const SearchOwnerInfoList = (name) => {
    return request({
        url: url + "/user/SearchOwners",
        method: "POST",
        data: {
            name
        }
    })
}

const GetOwnerById = (owner_id) => {
    return request({
        url: url + "/user/GetOwnerById",
        method: "POST",
        data: {
            owner_id
        }
    })
}


const Login = (form) => {
    return request({
        url: url + "/user/login",
        method: "POST",
        data: {
            form
        }
    })
}


const Register = (form) => {
    return request({
        url: url + "/user/register",
        method: "POST",
        data: {
            form
        }
    })
}

const GetUserList = (pageNo, pageSize) => {
    return request({
        url: url + "/user/GetUserList",
        method: "POST",
        data: {
            pageNo, pageSize
        }
    })
}



export default {
    SearchOwnerInfoList, Login, Register, GetUserInfoByToken, GetOwnerById,GetUserList
}
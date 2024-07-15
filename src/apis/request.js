import axios from "axios";
import { message } from 'ant-design-vue';
import Token from '@/utils/TokenUtil.js';


export default (args) => {
    Object.assign(args, {
        headers: {
            Token: Token.getToken()
        }
    });
    return new Promise((resolve, reject) => {
        axios.request(args).then(response => {
            const data = response.data;
            if (data.code == 200) {
                resolve(data.data);
            } else {
                console.error("code error!");
                message.error("请求错误：" + data.data);
                reject();
            }
        }).catch(err => {
            reject(err);
        });
    })
}
<script setup>
import { onBeforeMount, onMounted } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import TokenUtils from './utils/TokenUtil.js'
import { login, logout } from '@/utils/index.js';
import { message} from 'ant-design-vue'
import userApis from './apis/userApis.js';

const store = useStore()
const router = useRouter()

onBeforeMount(async () => {

    document.title = '房屋租赁系统'

    const token = TokenUtils.getToken();
    console.log("获取到Token：", token);

    if(token == null || token.length == 0){
        TokenUtils.delToken();
    }else{
        //有token,用token去获取用户信息
        try {
            const res = await userApis.GetUserInfoByToken(token);
            login(res); 
        } catch (err) {
            logout();
        }
    }
    
   
})

</script>

<template>
    <router-view></router-view>
</template>


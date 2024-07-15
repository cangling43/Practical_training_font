<script setup>
import { onMounted } from 'vue';
import { message } from 'ant-design-vue';
import TokenUtils from '../../utils/TokenUtil.js';
import { useRouter } from 'vue-router';
import AddressRearch from '../../components/Search.vue'
import axios from 'axios';
import { useStore } from 'vuex';
import '../../index.css'
import Page2 from './page2.vue';
import { defineComponent, ref } from 'vue';
import store from '@/store/index.js';


// const store = useStore();

//生命周期函数，启动时执行
onMounted(async () => {
  const token = TokenUtils.getToken();
  console.log(token);
  if (token == null || token.length == 0) {
    TokenUtils.delToken();
  } else {
    //有token，用token去获取用户信息
    const res = (await axios.request({
      url: "http://localhost:8080/user",
      method: "get",
      params: {
        token,
      }
    })).data;

    if (res.data) {
      //这个token有效
      store.commit("setUserInfo", res.data);
    } else {
      message.warning("Token无效！");
      TokenUtils.delToken();
    }
  }
})
const searchText = ref('');




const router = useRouter();
const StateSearch = ref(true);

// const SearchStatue = ref(true);

const onSearch = () => {
  let SearchStatue = Math.floor(Math.random() * 2) + 1;
  if (SearchStatue == 1) {
    router.push('search/1');
  } else {
    router.push('search/2');
  }
 
};





</script>

<template>
  <div class="P-home">
    <div class="P-home-page1">
      <div class="P-homepage1-tit">houseSystem</div>
      <div class="P-homepage1-intro">欢迎来到 houseSystem</div>
      <div style="width:400px;margin: 0 auto;margin-top: 20px;">
        <!-- <d-search icon-position="left" style="width: 400px" size="lg" placeholder="请输入区域"></d-search> -->
        <AddressRearch></AddressRearch>
        <d-button type="primary" style="margin-top: 10px;" @click="onSearch">搜索</d-button>
      </div>
    </div>

  </div>
  <!-- <Page2></Page2> -->
</template>




<style></style>
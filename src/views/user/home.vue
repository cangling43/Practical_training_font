<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />
      <a-menu
        v-model="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
        @click="handleClick"
      >
       <a-menu-item key="/home">首页</a-menu-item>
        <a-menu-item key="/lookhouse">房源查看</a-menu-item>
        <a-menu-item key="/notice">新闻公告</a-menu-item>
        <a-menu-item key="/feedback">用户反馈</a-menu-item>
        <a-menu-item v-if="getuser == null" key="/login" style=" float : right;right:3% ;position:absolute">登录</a-menu-item>
        <a-menu-item v-else key="logout" style=" float : right;right:3% ;position:absolute">
          <a-sub-menu>
            <template #title>{{ store.state.user.username }}</template>
            <a-menu-item key="2.1"  @click="handleSingle">个人中心</a-menu-item>
            <a-menu-item key="2.2"  @click="handleBack">后台管理</a-menu-item>
            <a-menu-item key="2.3"  @click="handleChange">修改密码</a-menu-item>
            <a-menu-item key="2.4"  @click="handleLogout">退出登录</a-menu-item>
          </a-sub-menu>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 5px">
     
      <div :style="{ background: '#fff',width:'100%' }">
          <router-view></router-view>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
     houseSystem ©2024 Created by Debra
    </a-layout-footer>
  </a-layout>
</template>
<script setup>
import { useStore } from 'vuex'
import loginModal from './login.vue'
import { computed, ref } from 'vue';
import {useRouter} from 'vue-router';
import TokenUtils from '../../utils/TokenUtil.js';
import { message } from 'ant-design-vue';
const router = useRouter();
const store = useStore();

const LoginModalref =ref(null);

const getuser = computed(() => {
  return store.state.user;
})
const handleClick = ({ key }) => {
  if(key == 'login'){
    LoginModalref.value.showModal();
  }else if(key[0] == '/'){
    router.push(key);
  }
}

const handleSingle = () => {
router.push({
path: '/singleInfo',

});
}

const handleBack = () => {
  router.push({
    path: '/admin'
  })
}

const handleChange = () => {
console.log('修改密码');
router.push({
path: '/changePassword',
query: {
  // 这里可以添加您想要传递的参数
  message: 'You have been logged out.',
},
})
}

const handleLogout = () => {
// 触发Vuex中的logout mutation
store.commit('logout');
// 清除token
message.success('登出成功')
TokenUtils.delToken();
// 跳转到首页或其他页面
router.push('/');
}

const selectedKeys = ref(['2']);

</script>
<style scoped>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}

.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}
</style>
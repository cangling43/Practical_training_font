<template>
  <a-card>
    <h1>用户详细信息</h1>
    <a-descriptions title="用户属性" bordered v-if="single!=null">
      <!-- 使用v-if确保在数据加载前不显示任何内容 -->
      <a-descriptions-item label="用户ID" >{{single.user_id }}</a-descriptions-item>
      <a-descriptions-item label="用户名" >{{single.username}}</a-descriptions-item>
      <a-descriptions-item label="姓名" >{{single.name}} </a-descriptions-item>
      <a-descriptions-item label="手机号"> {{single.phone}}</a-descriptions-item>
      <a-descriptions-item label="邮箱" >{{single.email}}</a-descriptions-item>
      <a-descriptions-item label="身份" >{{userIdentity(single.identity)}}</a-descriptions-item>
      <a-descriptions-item label="性别" >{{single.gender}}</a-descriptions-item>
      <a-descriptions-item label="地址" >{{single.address}}</a-descriptions-item>
      <a-descriptions-item label="年龄" >{{single.age}}</a-descriptions-item>
      <a-descriptions-item label="职业" >{{single.profession}}</a-descriptions-item>
      <a-descriptions-item label="创建时间">{{formatDateTime(single.createdAt)}}</a-descriptions-item>
    </a-descriptions>
    <div v-else>
      <p>加载中...</p>
    </div>
  </a-card>
</template>

<script setup>
import axios from 'axios'; // 引入axios库
import { onMounted,ref } from 'vue'; // 引入onMounted函数
import store from '@/store/index.js';
import userApis from '@/apis/userApis.js'
const single = store.state.user; // 使用ref创建响应式数据




const userIdentity = (identityValue) => {
  return identityMap[identityValue] || '未知身份';
};

const formatDateTime = (datetime) => {
  // 确保传入的是有效的时间戳
  if (!datetime) return '无效日期';

  // 将时间戳转换为 Date 对象
  const date = new Date(datetime);

  // 将 Date 对象转换为本地时间字符串
  return date.toLocaleString();
};


const identityMap = ref({
        0: '租客',
        1: '房东',
        2: '管理员',
        3: '超级管理员'
      });

const user = ref(null); // 使用ref创建响应式数据

</script>

<style scoped>
/* 自定义样式 */
</style>
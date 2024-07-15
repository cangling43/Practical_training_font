<template>
    <div class="message-board">
      <h2>留言板</h2>
      <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="width: 256px"
    mode="vertical"
    :items="items"
    @click="handleClick"
  />
      
    
    </div>
  </template>
  
<script setup>
import { h, ref } from 'vue';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const selectedKeys = ref([]);
const openKeys = ref([]);
const items = ref([
  {
    key: '/always',
    icon: () => h(MailOutlined),
    label: '常见问题',
    title: '常见问题',
  },
  {
    key: '/owner',
    icon: () => h(CalendarOutlined),
    label: '房东问题',
    title: '房东问题',
  },
  {
    key: 'user',
    icon: () => h(AppstoreOutlined),
    label: '用户问题',
    title: '用户问题',
    children: [
      {
        key: '/login',
        label: '登录问题',
        title: '登录问题',
      },
      {
        key: '/house',
        label: '房源问题',
        title: '房源问题',
      },
      {
        key: '/order',
        label: '订单问题',
        title: '订单问题',
      },
         {
        key: '/contract',
        label: '合同问题',
        title: '合同问题',
      },
      
    ],
  },
]);
const handleClick = ({ key }) => {
    router.push(`/problem${key}`);
}


  </script>
  
  <style scoped>
 .message-board {
    max-width: 1000px;
    height:1000px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
 }

  </style>
  
<template>
  

  <h1>新闻添加</h1>
  Title:<a-input v-model:value="newAddInfo.title"></a-input>

 <div id="markdown">
    <md-editor v-model="newAddInfo.text" @click="onUploadImg"/>
  </div>

 <div style="height:100px;">
  <a-button type="primary" style="display:block;margin:40px auto;" @click="onaddNews">创建新闻</a-button>
 </div>
 </template>


 <script setup>
import { MdEditor } from 'md-editor-v3';
import { ref,defineEmits } from 'vue';
import 'md-editor-v3/lib/style.css'
import AddnewsApis from '@/apis/newsAddApis.js'
import { reactive } from 'vue';
import {message} from 'ant-design-vue';
import router from '@/router';
const value = ref(false);
const emit = defineEmits(['close']);

const newAddInfo = reactive({
  title: 'hh',
  content: 'content',
  phone: '1233',
  email: 'jin@163.com',
  address: '11321'
});


const onaddNews = () => {
 
  //res返回的是后端的数据
  AddnewsApis.Addnews(newAddInfo)
  .then((res) => {
    message.success("提交成功！");
    router.push({ path: "/admin/news" });
    emit('close');
  });
  
};

const onUploadImg = (files) =>  {
      console.log('上传图片', files)
}


</script>

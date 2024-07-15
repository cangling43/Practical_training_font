<template>
    <div style="">
        <!-- <h1>{{news.title}}</h1> -->
    </div>
    <MdPreview :editorId="id" :modelValue="text" />
  <!-- <MdCatalog :editorId="id" :scrollElement="scrollElement" /> -->
</template>


<script setup>
import { ref, onBeforeMount } from 'vue';
import newsApis from '@/apis/newsApis.js';
import { useRoute } from 'vue-router';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
const value = ref(false);
const emit = defineEmits(['close']);

const route = useRoute();

const routeId = route.params.id; 

const news = ref(null);

const id = 'preview-only';
const text = ref('# Hello Editor');
const scrollElement = document.documentElement;

const GetDetailById = async () => {
    const res = await newsApis.GetDetailById(routeId);
    //将image_list转换为列表
    //获取单个没有rows
    news.value = res;
    console.log('news: ', news.value);
    text.value = news.value.content;
}

const onUploadImg = (files) =>  {
      console.log('上传图片', files)
}


onBeforeMount(async () => {
    GetDetailById();
   
})

console.log('news.value',news.value);


</script>
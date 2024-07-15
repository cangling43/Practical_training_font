<template>

<div>
<div>
  <a-button type="primary" class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">
    <PlusCircleOutlined />
    发布新房源
  </a-button>
    <a-modal v-model:open="open" title="请输入房源信息" size="size">
      <template #footer></template>
      <AddRent @close="open = false"/>
    </a-modal>
 
</div>
<div style="width:100%;display:inline-block;">
  <span v-for="(item, index) in houseList" :key="index" :house="item" style="width:20%;padding:8px;float:left;">
    <HouseCardComp :house="item" />
  </span>
</div>
<a-pagination
      v-model:current="pageNo"
      v-model:page-size="pageSize"
      :total="total"
      :show-total="total => `共计 ${total} 项`"
      @change="GetList"
      :page-size-options="['5', '10', '20', '50']"
      show-size-changer
>
<template #buildOptionText="props">
  <span>{{ props.value }}条/页</span>
</template>
</a-pagination>
</div>
</template>


<script setup>
import houseApis from '@/apis/houseApis.js';
import {ref, onBeforeMount} from 'vue';
import HouseCardComp from '@/components/house/HouseCardComp.vue';
import { DownloadOutlined,PlusCircleOutlined } from '@ant-design/icons-vue';
import AddRent from '@/components/add_rent.vue';
import { useRoute } from 'vue-router'
const route = useRoute();
const total = ref(0);
const pageNo = ref(1);
const pageSize = ref(10);
const houseList = ref([]);
const open = ref(false);
const size = ref('large');

const GetList = async () => {
    const res = await houseApis.GetHouseList(pageNo.value, pageSize.value);
    
    //将image_list转换为列表
    res.rows.map(item => {
      item.image_list = item.image_list.split(',');
      return item;
    });

    houseList.value = res.rows;
    total.value = res.count;
    console.log('houseList1:',houseList.value);
}

onBeforeMount(async () => {
  GetList();
})


const handleAdd = () => {
      open.value = true;    
};


</script>


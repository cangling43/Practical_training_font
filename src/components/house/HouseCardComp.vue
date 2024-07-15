<template>
<div class="card" >
    <div style="height:310px;">
        <img :src="props.house.image_list[0]" style="height:100%;object-fit: cover;max-width: 100%;" />
    </div>
    <a-row style="height:32px;margin-top:12 px;">
        <a-col :span="12">
            <a-flex justify="flex-start" align="center" style="height:100%;">
                <span class="title">{{ props.house.house_name }}</span>
            </a-flex>
        </a-col>
        <a-col :span="12">
            <a-flex justify="flex-start" align="center" style="height:100%;font-size:14px;color:#ababab">{{ props.house.description }}</a-flex>
        </a-col>
    </a-row>
    
    <div style="margin-top:8px;border-bottom:1px solid #cdcdcd;padding:8px;">
        <span style="font-size:22px;color:blue;">￥{{ props.house.price }}/月</span>
    </div>
    <div style="height:32px;">
        <el-row style="height:100%">
            <el-col :span="8" style="padding:4px;height:100%;">
                <a-flex justify="flex-start" align="center" style="height:100%;padding:8px;">
                    <HomeOutlined style="margin-right:4px;"/> {{props.house.area}}m²
                  </a-flex>
            </el-col>
            <el-col :span="8" style="padding:4px;height:100%;">
                <a-flex justify="flex-start" align="center" style="height:100%;padding:8px;">
                    <HomeOutlined style="margin-right:4px;"/> {{props.house.area}}m²
                  </a-flex>
            </el-col>
            <el-col :span="8" style="padding:4px;height:100%;">
                <a-flex justify="flex-start" align="center" style="height:100%;padding:8px;">
                    <HomeOutlined style="margin-right:4px;"/> {{props.house.area}}m²
                  </a-flex>
            </el-col>
        </el-row>
    </div>
    <div class="card-footer">
        <a-button type="primary" style="margin-right:5px" @click="lookDetail"><EyeOutlined /></a-button>
        <a-button type="primary" style="margin-right:5px" @click="Updatehouse" ><EditOutlined /></a-button>
        <a-modal v-model:open="open" title="请输入房源信息" size="size">
            <template #footer></template>
            <UpdateRent v-if="props?.house" :house="props.house" @close="open = false"/>
        </a-modal>
        <a-button type="primary" danger @click="deletehouse"><DeleteOutlined /></a-button>
    </div>
</div>
</template>

<script setup>

import { ref } from 'vue';
import { Location, House, Lock, School } from '@element-plus/icons-vue';
import { EyeOutlined,EditOutlined, DeleteOutlined, HomeOutlined } from '@ant-design/icons-vue';
import router from '@/router';
import UpdateRent from '../update_rent.vue'
const open = ref(false);
const props = defineProps(['house'])

const lookDetail= () => {
    console.log('je')
    router.push('/admin/house/detail/'+props.house.house_id);
}

const Updatehouse = () => {
    open.value = true;
    
}

const deletehouse = () => {
    
}
const visible = ref(false);

</script>

<style scoped>
.card{
    width:100%;
    border: 1px solid #cdcdcd;
    border-radius: 8px;
    margin:18px;
}
.title{
    height:100%;
    padding-left:14px;
    font-weight:bold;
    font-size:24px;
}
</style>
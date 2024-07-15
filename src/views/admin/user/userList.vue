<template>
  <el-row>
    <el-col :span="6">
      <el-statistic title="用户量" :value="total" />
    </el-col>
    <el-col :span="6">
      <el-statistic :value="4">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            房东数
          </div>
        </template>
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic title="房源数" :value="outputValue" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="订单数" :value="562">
        <template #suffix>
          <el-icon style="vertical-align: -0.125em">
            <ChatLineRound />
          </el-icon>
        </template>
      </el-statistic>
    </el-col>
  </el-row>

  <span style="height:50px;margin-top:50px"></span>
  <a-table sticky :columns="columns" :data-source="data" :scroll="{ x: 1500 }">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'"><a>操作</a></template>
    </template>
    
  </a-table>
</template>
<script setup>
import { ref,onMounted,onBeforeMount } from 'vue';
import { useTransition } from '@vueuse/core'
import { ChatLineRound, Male } from '@element-plus/icons-vue'
import UserApis from '@/apis/userApis.js'

const source = ref(0)
const outputValue = useTransition(source, {
  duration: 1500,
})
source.value = 172000

const columns = ref([
   {
    title: '用户ID',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: '用户名',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    // fixed: 'left',
  },
  {
    title: '年龄',
    width: 100,
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '身份',
    dataIndex: 'identity',
    key: 'identity',
    width: 150,
  },
  {
    title: '所在地',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: '3',
    width: 150,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: '4',
    width: 150,
  },
  {
    title: '职业',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: '创建时间',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
]);

const total = ref(0);
const pageNo = ref(1);
const pageSize = ref(10);
const userList = ref([]);
const data = ref([]);
const GetList = async () => {
    const res = await UserApis.GetUserList(pageNo.value, pageSize.value);
    
    console.log(res);

    userList.value = res.rows;
    total.value = res.count;
    console.log('res.count',total.value);
    
    if(res.count > 0) {
  for (let i = 0; i < res.rows.length; i++) {
  data.value.push({
    key: userList.value[i].user_id,
    name: userList.value[i].username,
    age: userList.value[i].age,
    address: `London Park no. ${i}`,
    identity: userList.value[i].identity,
    phone: userList.value[i].phone,
    email: userList.value[i].email,
    address: userList.value[i].address,
  }); 
}
console.log(data);

}

}

onBeforeMount(async () => {
  GetList();
})






// for (let i = 0; i < total.value; i++) {
//   data.push({
//     key: res.data.user_id,
//     name: res.data.username,
//     age: res.data.age,
//     address: res.data.address,
//   });
// }
const fixedTop = ref(false);




</script>
<style scoped>
#components-table-demo-summary tfoot th,
#components-table-demo-summary tfoot td {
  background: #fafafa;
}
[data-theme='dark'] #components-table-demo-summary tfoot th,
[data-theme='dark'] #components-table-demo-summary tfoot td {
  background: #1d1d1d;
}

.el-col {
  text-align: center;
}

</style>
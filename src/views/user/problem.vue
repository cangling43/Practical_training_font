<template>
  <div class="message-board">
    <div class="left">
      <h2>问题反馈</h2>
      <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" style="width: 256px" mode="vertical"
        :items="items" @click="handleClick" />
    </div>

    <div class="right">
      <router-view></router-view>
    </div>

    <div class="message">
      <el-popover placement="top-start" :width="200" trigger="hover" content="找不到想问的问题？点击立即反馈">
        <template #reference>
          <el-button class="m-2" type="success" @click="status= !status">反馈</el-button>
        </template>
      </el-popover>
    </div>



  <el-form v-if="status==true" :model="ruleForm" :rules="rules" ref="ruleFormRef" label-width="100px" class="demo-ruleForm">
      <el-form-item label="问题类型" prop="type" class="up">
        <el-select v-model="ruleForm.type" placeholder="请选择问题类型">
          <el-option label="房东问题" value="房东问题"></el-option>
          <el-option label="登录问题" value="登录问题"></el-option>
          <el-option label="房源问题" value="房源问题"></el-option>
          <el-option label="订单问题" value="订单问题"></el-option>
          <el-option label="合同问题" value="合同问题"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="问题描述" prop="msg" class="down">
        <el-input v-model="ruleForm.msg" type="textarea" :rows="10"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">确定反馈</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

  </div>


</template>

<script setup>
import { defineProps, h, ref,onMounted,reactive } from 'vue';
import { ElMessage } from 'element-plus';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';

import { useRouter } from 'vue-router';

import { message } from 'ant-design-vue';


const router = useRouter();
const selectedKeys = ref([]);

const formData = reactive({});
const handleClick = ({ key }) => {
router.push(`/problem${key}`);}

const status = ref(true); // 假设status是一个响应式引用，控制表单的显示
const ruleForm = ref({
  type: '',
  msg: ''
});
const rules = {
  type: [
    { required: true, message: '请选择问题类型', trigger: 'change' }
  ],
  msg: [
    { required: true, message: '请输入问题描述', trigger: 'blur' }
  ]
};

const submitForm = () => {
  if(ruleForm.value.type === '' || ruleForm.value.msg === ''){
    ElMessage({
      message: '请填写完整信息',
      type: 'error',
    })
  }else{
    Success();
    status.value = false;
  }
};

const resetForm = () => {
  message.success('重置成功');
  ruleForm.value.type = '';
  ruleForm.value.msg = '';
};


// 重置表单函数
// const resetForm = (formName) => {

//     formName.value.resetFields();
// };
    // 反馈成功
    const Success = () => {
      ElMessage({
        message: '问题反馈成功，感谢您的支持!',
        type: 'success',
      })
    }


</script>

<style lang="less" scoped>
.message-board {
  max-width: 1000px;
  height: 1000px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  display: flex;

  .right {
    margin: 0 auto;
  }
}

.m-2 {
  border-radius: 50%;
  padding: 50px 30px;
  line-height: 1;
  background-color: #3498db;
  color: white;
  font-size: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  /* 添加阴影效果 */
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.m-2:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.message {
  position: absolute;
  left: 60px;
  top: 80%;
}

.demo-ruleForm {
  position: absolute;
  background-color: white;
  z-index: 100;
  top: 30%;
  left: 40%;
  width: 400px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  height: 50%;

  .up {
    margin-top: 40px;
    margin-right: 40px;
  }

  .down {
    margin-right: 40px;
  }
}
</style>

<script>
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

</script>

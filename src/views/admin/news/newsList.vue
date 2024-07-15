<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div class="up">新闻公告</div>
                <div class="down">
                    <p @click="$router.push('home')">首页</p>/<p class="down-down" onclick="location.reload();">新闻公告</p>
                </div>
                <a-button>
                    <router-link to="/admin/news/add">添加新闻</router-link>
                </a-button>
            </el-header>
            <el-main>
                <!-- 第一个新闻公告 -->
                <div style="width:100%;display:inline-block;">
                    <span v-for="(item, index) in newsList" :key="index" :news="item" >
                      <newsCardComp :news="item"/>
                    </span>
                  </div>
                  
            </el-main>
        </el-container>
        
        <a-pagination
        v-model:current="pageNo"
        v-model:page-size="pageSize"
        :total="total"
        :show-total="total => `共计 ${total} 项`"
        @change="newsList"
        :page-size-options="['5', '10', '20', '50']"
        show-size-changer>

  <template #buildOptionText="props">
    <span>{{ props.value }}条/页</span>
  </template>
  </a-pagination>

    </div>
</template>


<script setup>
import newsApis from '@/apis/newsApis.js';
import {ref, onBeforeMount} from 'vue';
import newsCardComp from './newsCardComp.vue';
import router from '@/router';

const pageNo = ref(1);
const pageSize = ref(10);
const newsList = ref([]);


onBeforeMount(async () => {

  const res = await newsApis.GetNewsList(pageNo.value, pageSize.value);
 console.log(res);
  newsList.value = res.rows;
  total.value = res.count;
    
})




</script>

<style lang="less" scoped>
.el-header {
    height: 200px;
    width: 100%;
    background-color: rgb(26,43,77);
}

.up {
    color: white;
    font-size: 30px;
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    margin-top: 65px
}

.down {
    color: white;
    font-size: 12px;
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;

    /* 垂直居中 */
    p {
        cursor: pointer;
    }
    .down-down {
        color: #409EFF;
    }
}

.el-main {
    font-family: "Microsoft YaHei","sans-serif";
    font-weight: bold;
    .card-up {
        font-size: 25px;
    }

    .el-icon {
        margin-top: 5px
    }

    .el-card {
        max-width: 80%;
        margin: 0 auto;
        cursor: pointer;
        margin-bottom: 50px;
        background-color: aliceblue;
    }
}
</style>
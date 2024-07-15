<template>
    <div class="out">
        <div class="up">
            <h1>{{ this.params.type }}</h1>
        </div>
        <div class="inner">
            <el-card v-for="(info, index) in alInfo" :key="index" class="main_card">
                <template #header>
                    <div>{{ info.pro_title }}</div>
                </template>
                <!-- 可以在这里添加卡片的其他内容 -->
                <div>{{ info.content }}</div>
            </el-card>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import { defineComponent } from 'vue';
import problemApis from '@/apis/problemApis';
export default defineComponent({
    created() {
        this.getProblemInfo();
    },
    data() {
        return {
            params: { type: '合同问题' },
            alInfo: [],
        };
    },
    methods: {
          async getProblemInfo() {
           const res= problemApis.GetProblemInfoByType('合同问题')
            .then(res => {
                this.alInfo = res;
            })
        },
    }
});
</script>

<style lang="less" scoped>
.out {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 600px;
    /* 水平居中 */

    .up {
        margin-bottom: 20px;
        /* 你可以根据需要调整间距 */
    }

    .inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        /* 水平居中 */
        width: 100%;

        .main_card {
            width: 100%;
            margin-bottom: 30px;
        }
    }
}

.main_card {
    transition: box-shadow 0.3s ease-in-out;
    /* 添加过渡效果 */
    cursor: pointer;
}

.main_card:hover {
    /* 鼠标悬停时增加阴影效果 */
    box-shadow: 0 8px 16px rgba(64, 158, 255, 0.7);
}
</style>
<template>
    <el-card class="content-card" shadow="hover" @click="navigateToDetail">
        <div class="flex gap-2 mt-4">
            <el-tag :key="homeInfo.status" :type="homeInfo.status=='已出租'?'danger':'success'" effect="dark" round>
                {{ homeInfo.status }}
            </el-tag>
        </div>
        <img :src="homeInfo.image_list[0]" alt="房屋内部图">
        <div class="content-card-inner">
            <h3>{{ homeInfo.name }}</h3>
            <div class="icon">
                <el-icon>
                    <Location />
                </el-icon> {{ homeInfo.address }}
            </div>
            <div class="price">
                ￥ {{ homeInfo.price }} / 月
            </div>
        </div>
        <hr>
        <div class="content-card-down">
            <el-icon>
                <House />
            </el-icon>&nbsp;卧室:{{ homeInfo.num_bed }}&nbsp;&nbsp;
            <el-icon>
                <Lock />
            </el-icon>&nbsp;洗手间:{{ homeInfo.num_ba }}&nbsp;&nbsp;
            <el-icon>
                <School />
            </el-icon>&nbsp;面积:{{ homeInfo.area }}m²
        </div>
    </el-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        homeInfo: {
            type: Object,
            required: true,
        },
    },
    methods: {
        navigateToDetail() {
            console.log('this.homeInfo.id:',this.homeInfo.house_id);
            this.$router.push({
                path: '/detail',
                query: {
                    homeInfo: JSON.stringify(this.homeInfo)
                }
                // path:`house/detail/${this.homeInfo.house_id}`,
              
            });
        },
    },


});
</script>

<style lang="less" scoped>
.content-card {
    cursor: pointer;
    height: 400px;
    width: 300px;
    position: relative;

    .content-card-inner {
        width: 100%;
        text-align: center;
        
        h3 {
            margin: 6px auto 0 auto;
        }

        .icon {
            margin: 18px auto 0 auto;
            font-size: 12px;
        }

        .price {
            margin-top: 20px;
            font-size: 25px;
            color: #409EFF;
        }
    }

    .mt-4 {
        position: absolute;
        right: 10px;
        top: 10px;
    }

    img {
        margin-top: -20px;
        margin-left: -20px;
        width: 310px;
        height: 200px;
        user-select: none;
    }
}
</style>
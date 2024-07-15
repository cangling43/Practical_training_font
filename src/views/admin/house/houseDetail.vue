<template>
    <div class="all" v-if="house">
<!-- v-if或者 house?.num_bed -->
        <!-- 图片的div -->
        <div class="changeImg">
            <el-carousel class="changeImgIn">
                <el-carousel-item v-for="item in imgList" :key="item">
                    <el-image :src="item" class="img"></el-image>
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 图片下各部分数量的div -->
        <div class="Imgdown">
            <el-card shadow="always" class="Imgdown_card">
                <div class="Imgdown_content">
                    <el-image src="https://img.pconline.com.cn/images/upload/upc/tx/housephotolib/1612/20/c2/32854772_1482206301031_690x460.jpg" class="Imgdown_img"></el-image>
                    <p>卧室: {{ house.num_bed }} 个</p>
                </div>
            </el-card>
            <el-card shadow="always" class="Imgdown_card">
                <div class="Imgdown_content">
                    <el-image src="https://img.pconline.com.cn/images/upload/upc/tx/housephotolib/1612/20/c2/32854772_1482206301031_690x460.jpg" class="Imgdown_img"></el-image>
                    <p>洗手间: {{ house.num_bath }} 个</p>
                </div>
            </el-card>
            <el-card shadow="always" class="Imgdown_card">
                <div class="Imgdown_content">
                    <el-image src="https://img.pconline.com.cn/images/upload/upc/tx/housephotolib/1612/20/c2/32854772_1482206301031_690x460.jpg" class="Imgdown_img"></el-image>
                    <p>面积: {{ house.area }} m²</p>
                </div>
            </el-card>
        </div>

        <!-- 房屋简介的div -->
        <div class="homeBriefly">
            <el-card shadow="always" class="homeBriefly_card">
                <p class="homeBriefly_card_up">详细介绍</p>
                <p>{{ house.description }}</p>
            </el-card>
            <el-card shadow="always" class="homeBriefly_card">
                <iframe src="https://m.amap.com/navi/?dest=114.355923,30.472223&destName=汤臣一品&hideRouteIcon=1&key=c0b1d073bee17c118cd371ab0a88366a"
                    style="width:100%;height:640px;"></iframe>
            </el-card>
        </div>

        <!-- 业主信息的div -->
        <div>
            <el-card shadow="always" class="homeOwn">
                <p class="homeOwn_font">联系人员</p>
                <div class="homeOwn_img">
                    <el-image :src="faceImg" fit="fill" class="img"></el-image>
                </div>
                <p class="homeOwn_font_down">房东: {{ owner.name }}</p>
                <div class="homeOwn_phone homeOwn_font_down">
                    <div>
                        <el-icon>
                            <PhoneFilled />
                        </el-icon>
                        {{ owner.phone }}
                    </div>
                    <div>
                        <el-icon>
                            <WalletFilled />
                        </el-icon>
                        {{ owner.email }}
                    </div>
                </div>
            </el-card>
        </div>

        <!-- 预定的div -->
        <div class="scheduled">
            <el-card shadow="always" class="scheduled_card">
                <p class="scheduled_card_font1">设置状态</p>
                <el-select v-model="value" clearable placeholder="请选择" class="scheduled_card_change" @change="handleSelectChange">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" class="scheduled_card_button">确定</el-button>
            </el-card>
        </div>
        
      
        <!-- 展示地图 -->


    </div> 
</template>

<script setup>

import { ref, onBeforeMount } from 'vue';
import houseApis from '@/apis/houseApis.js';
import { useRoute } from 'vue-router';
import Mapp from './mapp.vue'
import mapApis from '@/apis/mapApis.js'



const isLocked = ref(false); // 用于锁定选项的标志

const handleSelectChange = (selectedValue) => {
  // 用户做出选择后，设置锁定标志
  isLocked.value = true;
};

const route = useRoute();

const routeId = route.params.id; 

const house = ref(null);
const owner = ref(null);

const imgList = (['https://www.ikea.cn/images/e6/40/e640db73ee10b9f98f93b79572a7f505.jpg?f=s','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-EbWpuCceQW_rGBLRdMZq2hwczmVn9miq7w&s'])
const faceImg = ('https://img.zcool.cn/community/0125bd57f455baa84a0e282b860ac0.jpg@1280w_1l_2o_100sh.jpg')
const maplist = ref(null);

const options = (
    [
        {
            value: '正在出租',
        label: '正在出租',
    },{
            value: '已出租',
        label: '已出租',
    
    }
]
)


const GetDetailById = async () => {
    const res = await houseApis.GetDetailById(routeId);
    //将image_list转换为列表
    //获取单个没有rows
    house.value = res;
    console.log("house:", house.value);
    owner.value = house.value.owner;
    
}

const GetMap = async () => {
    const res = await mapApis.GetMap(keywords, subdistrict, key);
    
}



onBeforeMount(async () => {
    GetDetailById();
   
})

console.log('owner_:',owner);

</script>

<style lang="less" scoped>
.all {
    background-color: rgb(245, 245, 245);

    .el-carousel__item {
        opacity: 0.75;
        margin: 0;
        text-align: center;
    }

    .changeImg {
        width: 100%;

        .changeImgIn {
            width: 40%;
            margin-top: 2%;
            margin-left: 15%;
        }
    }

    .Imgdown {
        margin-left: 15%;
        width: 40%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;


        .Imgdown_card {
            width: 30%;
            margin-bottom: 20px;
            margin-top: 5%;
            background-color: white;
        }

        .Imgdown_content {
            display: flex;
            /* 使子元素水平排列 */
            align-items: center;
            /* 使子元素垂直居中 */
            font-weight: bold;
        }

        .Imgdown_img {
            height: 30px;
            margin-right: 10px;
            /* 添加间距 */
        }
    }

    .homeBriefly_card {
        margin-left: 15%;
        width: 40%;
        margin-bottom: 3%;
        background-color: white;

        .homeBriefly_card_up {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 5px;
            margin-top: -5px;
        }
    }

    .homeOwn {
        background-color: white;
        height: 52%;
        width: 20%;
        position: absolute;
        top: 12%;
        right: 15%;

        .homeOwn_font {
            font-size: 17px;
            font-weight: bold;
            margin-bottom: 8px;
        }

        .homeOwn_img {
            display: flex;
            justify-content: center;
            /* 水平居中 */
            height: 30px;
            user-select: none;
            /* 防止用户选择文本 */
            pointer-events: none;
            /* 禁止鼠标事件，包括拖动 */
        }

        .img {
            height: 200px;
            /* 设置图片高度 */
            width: auto;
            /* 保持图片宽高比 */
        }

        .homeOwn_font_down {
            font-size: 17px;
            font-weight: bold;
            margin-top: 70%;
            margin-left: 5%;
        }

        .homeOwn_phone {
            font-size: 15px;
            margin-top: 5px;
            margin-left: 10px;
        }
    }

    .scheduled_card {
        height: 200px;
        width: 20%;
        position: absolute;
        top: 68%;
        right: 15%;

        .scheduled_card_font1 {
            font-size: 17px;
            font-weight: bold;
        }

        .scheduled_card_font2 {
            font-size: 13px;
            font-weight: bold;
            margin-top: 20px;
        }

        .scheduled_card_change{
            margin-top: 10px;
        }

        .scheduled_card_button{
            width: 100%;
            margin-top: 5%;
        }
    }
}
</style>
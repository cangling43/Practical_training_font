<template>
    <div class="all">

        <!-- 图片的div -->
        <div class="changeImg">
            <el-carousel class="changeImgIn">
                <el-carousel-item v-for="item in homeInfo.image_list" :key="item">
                    <el-image :src="item" class="img" :fit="fill"></el-image>
                </el-carousel-item>
            </el-carousel>
        </div>

        <!-- 图片下各部分数量的div -->
        <div class="Imgdown">
            <el-card shadow="always" class="Imgdown_card">
                <div class="Imgdown_content">
                    <el-image src="../../../public/image/homeInfoImg/卧室家具.png" class="Imgdown_img"></el-image>
                    <p>卧室: {{ homeInfo.num_bed }} 个</p>
                </div>
            </el-card>
            <el-card shadow="always" class="Imgdown_card">
                <div class="Imgdown_content">
                    <el-image src="../../../public/image/homeInfoImg/洗手间.png" class="Imgdown_img"></el-image>
                    <p>洗手间: {{ homeInfo.num_bath }} 个</p>
                </div>
            </el-card>
            <el-card shadow="always" class="Imgdown_card">
                <div class="Imgdown_content">
                    <el-image src="../../../public/image/homeInfoImg/房屋面积.png" class="Imgdown_img"></el-image>
                    <p>面积: {{ homeInfo.area }} m²</p>
                </div>
            </el-card>
        </div>

        <!-- 房屋简介的div -->
        <div class="homeBriefly">
            <el-card shadow="always" class="homeBriefly_card">
                <p class="homeBriefly_card_up">详细介绍</p>
                <p>{{ homeInfo.description }}</p>
            </el-card>
        </div>

        <!-- 业主信息的div -->
        <div>
            <el-card shadow="always" class="homeOwn">
                <p class="homeOwn_font">联系人员</p>
                <div class="homeOwn_img">
                    <el-image :src="faceImg" fit="fill" class="img"></el-image>
                </div>
                <p class="homeOwn_font_down">房东: 刘亦菲</p>
                <div class="homeOwn_phone homeOwn_font_down">
                    <div>
                        <el-icon>
                            <PhoneFilled />
                        </el-icon>
                        <!-- {{ homeInfo.phone }} -->
                        10089
                    </div>
                    <div>
                        <el-icon>
                            <WalletFilled />
                        </el-icon>
                        <!-- {{ homeInfo.email }} -->
                        yifei@qq.com
                    </div>
                </div>
                
            </el-card>
             <el-card shadow="always" class="homeBriefly_card">
                <iframe src="https://m.amap.com/navi/?dest=114.355923,30.472223&destName=汤臣一品&hideRouteIcon=1&key=c0b1d073bee17c118cd371ab0a88366a"
                    style="width:100%;height:640px;"></iframe>
            </el-card>
        </div>

        <!-- 预定的div  房东、管理员和超级管理没有-->
        <div class="scheduled">
            <el-card shadow="always" class="scheduled_card">
                <p class="scheduled_card_font1">立即预订</p>
                <p class="scheduled_card_font2">预定时长</p>
                <el-select v-model="value" clearable placeholder="请选择" class="scheduled_card_change">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" class="scheduled_card_button" @click="goContract">确定</el-button>
            </el-card>
        </div>
    </div>
</template>

<script>
import { defineComponent,ref } from 'vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
    data() {
        return {
            options: [{
                value: '1个月',
                label: '1个月'
            }, {
                value: '6个月',
                label: '6个月'
            }, {
                value: '1年',
                label: '1年'
            }, {
                value: '2年',
                label: '2年'
            }, {
                value: '5年',
                label: '5年'
            }],
            value: '',
            faceImg:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEhUQEA8PFRUVFRcVFRUQFRUVFRUQFRUWFhUVFRUYHSggGBolHRUVITEhJSktLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGi0lHx0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAM0A9QMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQMEBQYHAgj/xABBEAABAwIDBQYDBQcDAwUAAAABAAIDBBESITEFBkFRcQcTYYGRoSIysUJywdHwFCNSYnOCkhUz4VOisiRjs9Lx/8QAGQEAAgMBAAAAAAAAAAAAAAAAAwQBAgUA/8QAJxEAAgICAgICAgIDAQAAAAAAAAECEQMhEjEEQSIyUXETYYGh4UL/2gAMAwEAAhEDEQA/ALA6lHJdxU2ann0S4NHZY+zRpDCOIck6EARGGyWjauTZxyKcckX7KOSdsaui1TZ2hn+zhE+AJwQuHKDtC+z4QFMQsFlGUfBMd4t7IKQWJBdyvp1t9EP2UnFvSLBVVTGNNyL20WXb7b1SG7WGzb5geHP3VX3m3xqqkkwN+Eauw4Gj+4n8VTameoJu7Fc8c8uhNiUzHHKW2DuMP2WNu2MZyJDLC+eZJ0aLc/pr4y+y6ouzvYeN/qs5lndppY5gaX4kdeScHbr2ANabWGfMuOpuiS8dvotDPT2asd4o4Bcym44Xt563RM7SyDZrrj+fT87LFajaEjzdziUmKl2Zvrl5clMfDpbZM/Lv0ei9j9oUUhAfh/td+BzVtZVRStxMcD0XlShqnfxWt+vJXjdbemSEgd4SOINyEHJhceicc4y/o1iqjGJOKFgTKlq2VDBIwi/EDNO6R1ihIY40S7IwnDYgm8Tk9jXdi820cshHJOGRBGwJUIsIC8pNnOALoMC6ARgIygUbOC1cPalik3oWSKOTGjhml6cJGTVLU5QMP3QWX1HaCAQW0hcie5XEkCeAIFqy+A1zoh5qdNg0hTUrExkhVGgqlZxGUbikwjJXEsDwkHhL3XEgyUEoY7W2mIIS6+eg681lNbL3rzJJd13ZNPhncnlxKsm+u0viLQcm/CPFx1VJqK4NaXf2N8bGzj5u9gogrei8mkqONp1+E2Bu4ceDfBjdB11UTM5xve9zqT9ASm8k5uTc5db34nrwXMLbfG85nQcAPzTijSFJSsNkJGYtbn+WWabmMXsW36ck4fPfnb3J5Kc3c3YnqSHEYGe5U8uKtlVC3SI2h2Y2Q2bCOuf1U47cIvbdrSCtK2DuvFA0DCCeZU+KUcAgvNK9DUfGj/6PPW0Ny6qPMNJA5KK72WE4XMAtzXpaWhaRmAqnvXuXFURmzQHDQjUFXj5DuprRWXi0rgynbkb1Oje0PORsLjh4HgtepXhwD26FeanxSUs5ikBBBs7pwcFtPZ/tbHGIy69tPZD8jHxfKPTL4MjkuL7RfYnJ/CVHwtT2IoFkZEPoylgm0Tk4CYxsTktnaCCCZRQBSb0oUk8pfM9EobP1TuCPJNRqn7NFXw4Jyt+i03qjpBBBaYIjmuSl01Y9KF6y1IZcTpyRlYlQURC4lOhg9iSc0qTMaSfCqtBFIYNCQr5gxjnnRoJ9ApIwqq7+1Xd0zhfN5w+Wp+g9VDVIvHbMn3j2gXya8b/3E/8A6q7tCp+LwaAB5f8AN/VL1Uv7zPhn6BRNQb5czb80zhx0BySts6hNm4ncUk+pLikqqa+Q0GQSuyqYyPA8UzxSTkwDe6RbdzdgGd4e9vwj0W1bHoGRtAAtkq1upTtYxrQOAVyhCQnLkzQxw4xFxGF1hRsXaiiWxFzUbYwV04JPvmjU2UErrRkXbZu6GhlYxvHA+3I/KT55eagezXapZK1pPh5cPZbDvY2nq6WamMkeJzDhuRk8ZtPqAvPWxS+KUPtZtxckgAEHmfNNJc8Tj+BSUuGRS/J6hpnXAPgncblRdnb/AOzcLGuq2B1gCMMlgfvYbed1dY3JNxce0Hk1LofwlOmJjTOT5iJiFMioUQRIwmwQTkk9KuST0rlJiNxqpFijuKkI1bwu2WyHSCCC0QRX2vXfeJgJkffrIs0KJBkiWa9RQqE9pnFSmUlEfNCPAhGlQEVIC3Q3exZn2uS2bGznf3IH4LUnBY72wTfv428mj6lDyILhe2ZVIc5HeJCjZHWF+PDzT+QXaeRJJ9T+Si612YA4BPY0Dm6G91Y922DELfoquBWjdd8bP3sz2tYM7njbkNSfAclbNfHQKHZrWxgQB0Cn/wDVYom3lkYwcC8gX6X1WXVm+j2vjbFCQx2YdIDjeGHMNZlhuOJPG6pVayaSoEc0srg6XA2SQk4ml9g8E5EcUtHx29yG5eSkqjs22t7RqCM2Y98p5RAXHk4g+gKYRdp7HOsKKtsPtYGjL+5wUXS7CoIGAPLQBzPueaOjqNnyP7uCRmIaAEXy5c1XlD0i6WT20i5bG3upKq4hmaXjWN3wvBGvwnXqLqtb7bac1wja443WDI2n4nEm1zybmM+gF1Xe0bZDWQtqCRja9rQbDE4G+WLw1HKyrdFTTwSU9VI1pMlsGK9yXN+Auy6nXhwVoYoyXL/RXJllF8a/yXvYu6jHkGuncb59211hfxde/wDja3Mqg9omym0tY5sX+08B0dyXWFrObiNybEHyIVr2fupWTyl1TP8ACbj4Xuu2/EMGQy6qy71bhCagc2IufNC3vIi43c7CPijv4jTxDVbHkqVNlJ4rjdf9Ma2dSS/u5+7dg75rA7RrpL4g0ehXqHZ7HNjY1xBc1rWkjQuAAJHmFg2xWh2zmDiyugLfEuJH0cVvkZVPJldftnYIVf8AaRIUqkGJhSJ+1Cx9g83YogggnEBCcknpVySelcxMRvxUi1Rt81IsKnwntlsh0gggtEEUovQBSYCVY1Y1mkKRNUrStTKBqk4GqyKTdDiMJVctRlHQqwnFYV2tS3rHC/ytH/iD+K3NxWB9qLx+2SnoPYfkhy+yDYemUCrks2w/XioiY5lSU+dlPQ7hktDpKuJjiMWHDfXPXEPonYSjFbKOEp/VFVoYGud8TrCx4EnEBcAAfjYZ5kBOqKic52EcDqSDbzH4eqZ1FK9jixwIIJB8uXgrjuPRscfiHqrZcnGNoHjhylQ+2LsqMFp7vvHC1i4XAPMN5+JuUrvjsyd0XeBjv3REt7aBuvtn5LQtlU0Y0aFMfs7HAgtBBFiDoQciFnrNLkpM0/4IqPFGV7K3Wlqmd7O/GJWAsOdmhwuC0c8+KndidnbGPxvdK43DsTjYgtyba2eVynu6ldHRSP2XUyBmBxdSySnC2WmebtaHnLE0ki3kNFbava1LE3FLUwMHN8jBfpc5oknO6XRSMYUm+0Zx2sUpc2GBpz+J4HM5MA63e1Wvbe6DKuibTj4ZGNb3Tx9mRosL+B0PVQlRUf6hWxvZE4QRWs6RpaZCHCTE1pzw4mssSPsnnloNE/K2llzlxSX4IUOTlIr+5O0xUU4xtwzxnuqhh+Zs7cjccja46+CtlKQCqrvHuw18n7bTTSQTmwkdCQO8AsBiaQWu4ahcUOx6iTKo2hVuboWxmOG/V0TGu91V8buyUpONP0U1myANouoIwcLNoNqctGxMaJbH+UB+Dq5nNa1AFWthbLip6qqjhYGsHdWAuTcxhxu45kklxuTxVniVMsuTpeisItK37H9In7EwpU/Yr4hXL2KIIIJoCE5IyJZyRkS2YmPY0cc09gkTGTVK0rs7IHjz4SDTjcSSBRImoLYTtCxTQ1KNRlqTKx2zTHkLlIQPUTDdSVMrJg5oftKO6TaV1dFsWoKQrzx2oSf+rl+878AvQshXmvtMlvWz+Dz7lQlc0FhqLKs14BBPA3Wm7ApIntc5xxAta4HmCsqc7JWPcjeQQPEU5/dk2a46Nvq138p58D4XTGXE5K16C4MqhKpeyb2hsMvkdhAa0kAewul4NlOpnhwvYkA9Vb3iJzACbg6EA6emfUIq6mswC5cLakZ+F0lyfQ28Ue0Hs+q0U7BPdVWi5XU3SvVAkWSdVRMmGGVkb262kY14vzs4FN4dh08X+3DAz+nGxn/iEvDOlzIrqTqirjvoiXbOnY4viDHE6YiRb2TVjK5rsUrmW5MuLeuqlKjb8UZwXxP/AIW5kdbKOmqaqUktjkbaxNwRkdNdVAWEW+6RP0TMbQLkkD36JSkFnKIfS1EMTpGFhkBYGh1yCXuaCcuQJPkpqljP2zyufqVNdMFOldMjdlnFV1jv/cY3/BjW/gp5rFUdxqvvTNN/1JHSDo9xIHoVcQqrbF5aSHVKpBij6dP2I2ISy9iqCCCbQEJyRkSzkjIls5MRm/VK0gzSLzmnNCM0thVzQxN1EfBBGEFtUKFPLkbAkglmFY62aTHEMafwtTamT+MK6WwU2dNCJyUISTyrAkJPcvMm/wDLirKn+ofZzl6XmdkvLe+Ul6qoPOU/UlXwbmEeokE45BIpS65AWghV7JbZG89XTDDDMQ3+B3xN8gdPJWSl7Rap5wGKI31tfP8AJUUMyulaGXBI13Ij0ORVJ44yXQSGacOno1bZO08RvYtvwKtFJODZVWGkxxh7PmGninNFWkZHIhZUlRqY5fkusR5J01l9VA0FZzKmaedVTDsh5t3JInvkp6mVrXlxe0tY/wCY3OFxGIcbZ5X6LuStqAC01Ts7D/bjBAF9Ph8eN1ZYnAopdnRvzICLbaKwlCL+asiNiHFK1zsTjbNzzcm17eHE+pUjvdWdzSTyg2PdlrT/ADv+Bvu4JenpGsOQVR7XdoYYYKYGxleXn7kYAt/k8H+1WSdAvImm7itC/ZwLRHlYW9Fdw5U7s/jtTg87ewCt0aCgcvQ9pipCNR1MpFiNj7EsvYojRI02ugATkjLolnJCVK5yYjKRL0L802l1StIc0pilU0MyVxJZBchBbtiZTHFCORcOK5AWOjRZLUztFIxOURSFSDJVdMHJWPC5ISuXDpU2mmUtlYwOK6WzHHk0n2K8t7xSXml/qO9jYL0ZtyrLYZDf7B+i8z7Tku4nmSfdF8bci2XURoELrlGtATscR/IeqQa25tzNko0/D5pzsunxyt5CxKpdWyaujW91W3iaDyCd7T2VniaMzy/FK7q01mBWjuLhZUts2IR+KTKGx74zmFLUm1hoVK1eyweCi5NmlvBUoMlRK0+0xzUhHtho1KrVPTG9rIbfjwQPc3JwaSDyIBVo2RKvZYqnbsLQXOka1ozLnGwA5krJt6d4BX1feMv3TAI4r3F2gkl5HDEST0sqHW180pvLK9/3nEgdBoFP7vtuWnxCcni/jjbM55v5HSVI3Dc2PDTtH64KxMVZ3VmsxgP8I+itQCRi7QzlVMc0qkGJjTBPmI+MQyiiNEjTaAhOSEqXckJUrn6JiR82qUpdUnNqlKXVIw+w3L6ko0oIMQW5G6EilhKMYuWBOWhZaRonUeSXDk3Rhysc0LPkTd1yuro1xyRWN9pcNLIf5V51qnXct27VanBS2v8AMbeVifwWCON034ke2L+Q+kEEY0/WiIIFOCp2DkrXubS4zfoqkSrb2e1P710Z4i46jL8UHMnwYfC1zSZrm7rMIw+KszG5KFoYbWU1C7JZqNV9AfCmctN4KVukpFLRVSaIkUtuChN8nBlLM48I3fQq0uVA7VqzDTmMavIHlqfouivki05fFmJkK17u5t9PoqzJGrPupYgDy+oT3kP4GXiVTNQ2FVWwjkG+4AV+pJcTQVlcMha+w4xXHVhBt6K9bvV2INHB3s4ZH9eKy4umaU1yj+i1U6fMTCmKfsTOPszcvYogggm0BCckJUuUhKlc/RMeyPm1S9GM03l1TqhSeFXNDU/oSLRkgjCC3ktCRT40skGpTGsg0jpBM67aUULcUsjGDm8genNVTanaJSRmzHPk+7Zo9Tn7KyTfRDlGPbLDt7eCGkaHSYiT8rGWxHxu4gAdSoeDfyFwv3FQOoGfmCsw2vvRJK8vbI7EeIkIy4NA4geN1X6vadSTd75bn+K4ujxwNoA/IV6NA7Q9qsq2taCWNF/msST5aLN5qZg0xEdNVy6ulI+d3qkDO86uKPixOC7BTyKTC7onIBB7A3I6oxUECwPmkCUfYPQFNbn1giqoy7QuwHwxWAPrZQq7YokrVHRdOz1BQtuAnzY1WtxdrCppo5Qcy2z/AAkbk4eufmrWwrMcadM11K4poJoScoTpoXMjVNEKWxrgWX9ocJkfbg36rVgVSd4aDGSSNSVXpl65JoxWop7FSe7TsLyOjvQ5/VPdsUGFzgR4qL2a/DJfl7j9WTHLnBoSa4yNEqHWs/k0/mfqFLbBq8w0H5hib94DTrb3Cgo5bxsfwtY+7T7WXNDUFpsMiwlzfI5jpoehCQcRxSpmxbHqsbAePHqplhWd7M2u5hD2WwyDEAef2m+RVg2TvhTSHA93dvBsQ85X6/mi4pCnkY6dotDUa4Y6+d13dOxYmE5ISpdybzJfyOi0OyOl1TihdmmspzStGc0jidSQ3JXAmWoImFEt+MtCBUQqB2m74SUgbBAbSSNLi7ixl7C3iTf0WgPXnvtKqzJXz53DHCMeAY0Aj1xeqz8MFKWxzPJxjogJ9pSvcXPe5xOpeSSfMpqZCuCgtFJISFQeZ/NATEZAkDlfL0SSJTR1CwlHEemRQc3iNEija6yijqDKJdhw4+35IrDmfT/lSSEAjJRF3JEuINM7GNshkz6RxykGNn9Ro+MdS2x/sW3M0XlLZFc+CaOdnzRvDxwvY5joRcea9R7GqxNEyWPNr2tc0/yuFx9Unnhux3xp/Hj+B61qDgus+SK6AMWIuamFdTgjRSTk3lChhIszfezZYsSBmPcLOBGWSZ6Xt5E/gt12lsvvvh8yRwCxze0iGrdC8WaQHNP8N7tsfD4VfEmwPktdkvsWbFC6MnNh/wC39WC6qZC3DM3gbP8Au6A+Vh6KN2TL3cvxaPb5eKkKizTh+y42z8dD9EGS+REXcSybDqcTSwHQ4mfyu5eYTHemOwFSwZH4ZByPj9L87c1F7LqDDKM7NPwnwI0PkclJ711742HCGkSNLXhwuAeJ6qIpqWi82pY3foPd7feqpgGskxs1DX5ttyHFvkti3Y2/DXQNniPg9p+Zkg1aV5j2T3rg/iGHhr1ty0Widhu0XCrqIL5PYX24Ymubn1s4ptxozEzbim8yXTedLZnoJHsjJTmlKU5pKbVKUuqSh2OtfEmWFBcsQWzGToz32Vidi8zb2y3rKn+vL/8AI5el5nXXlvbEmKomcftSyH1eSh+JtsP5HSGaJd2yXJTwsEggguODagUbNUHLjjlBBBccGgiRhccG0rd+xDbfeUrqZzvigflfXupLub6HGOllg6uPZbtgU9fFiNmTfuXcrvIwH/MNHmVSatFoPjI9MsK6LAdQElTvuE4CB2Mt0IvpGnS4/XikjQt4k+yeLiQ2VXFfg5Tl+Rq6JoFmhYB2yU+Gqa+3zNcP8XD/AOy9CluV1ifbdTZRycn2PRwP4gK8NSRGXcWUjYFVib3bvmbnGTy4t6HTzVhqTjZ+r/o3VHpJC0hzTm3P0zt6XVu2ZUCQYQdW4h04t8jcdLckLPDdkYJ2qHQ+JgJ1Op8Rx8xn5Kcow2ohwvIuPhPg4aHp/wAqCoSbuj8239fr9VIbLnwPtnZ2VvHl14JaQzF737OZtmNihxtbZ0bvjH8THmx8rZeSfdjlOf8AVHkaCKT0Jjw/VSUsbS4A2wyNLD11a5P+xzZZZPVyH7GGIeuY/wCweqtjyaaYHyMSjTRqxTeYpwU2nVM3QGC2RcxzTiiGabTap5s0ZpbErmkOT1AlmsQXbUFvKKSM6ysvgHJeVdrwFlTO1w+SWRp+8HkWXrqSMWXmztcoGw7RnDdJC2Ui1rOcxpPviPms7wJ/Jph8ztJlIJRI0S1BcCCCC44Nq6cuUAuOCQQQXHARokFxwaUheQQQSCDcEagjQhJo2rjj1VuXtcVVLDUC13sBcBwkHwvHk4OCsjVkXYPXOdBNCfljkDm+AkbmOl2E/wBxWuMKWapjCdxTOlwdUZKAVe2ScS6LK+2alxUrnD7JafRwv7XWqSqg9qEYNHNf/pPPmGkrk/kiX9Wee6d9ipLZ1UYyCD8puPunIj39CVExFOmus5p6jy/RRpqxWLpl1Ds2SsORPoT8zT9VJ1TRYOHW44OGf66qD3adjLoXZtf7OF7OHI5KfgF2G+diR1LTkVnTVOjSx7Q/dLijFtRm09Mxb3HktI3BiZ3T5WixleHu+8GNafcH3WVUBs23BrnNH3W5j2yWjdmU57uSPg1+Xnmhw1I7NvGXd6bVBTkprUaKczE4dkVLqnuzXZplLql6N2aXxOpJjs1cCfaUElG7JGt6MrRm0f/Z'
        }
    },
    props: {
        homeInfo: {
            type: Object,
            required: true,
        },
    },
    methods: {
        goContract() {
            if (this.value == '') {
                this.Error();
            } else {
                this.$router.push({
                    name: 'Payment',
                    query: {
                        homeInfo: JSON.stringify(this.homeInfo),
                        selectedValue: JSON.stringify(this.value)
                    }
                });
            }
        },

        // 预定时长必须选择的消息提醒
        Error() {
            ElMessage({
                message: '预定时长必须选择!',
                type: 'error',
            })
        }
    },
});
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

        .scheduled_card_change {
            margin-top: 10px;
        }

        .scheduled_card_button {
            width: 100%;
            margin-top: 5%;
        }
    }
}
</style>
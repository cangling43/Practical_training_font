<template>
    <div class="message-board">
        <div class="up">
            <h1>用户留言</h1>
        </div>
        <transition-group name="slide" tag="div" class="inner">
            <el-card v-for="(card, index) in cards" :key="card.id" :class="{ 'gray-card': card.gray }" class="box-card">
                <div class="clearfix">
                    <span>{{ card.name }}</span>
                </div>
                <hr>
                <div class="text item">
                    <p>{{ card.content }}</p>
                </div>
                <el-button :type="card.gray ? 'info' : 'success'" @click="toggleGray(index)" class="elButton">
                    {{ card.gray ? '标记未读' : '点击已读' }}
                </el-button>
            </el-card>
        </transition-group>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cards: [
                { id: 1, name: '金腾辉', content: '系统设计得非常人性化，使我能够轻松快捷地找到理想的租房选项。', gray: false },
                { id: 2, name: '张高博', content: '合同条款清晰明了，租房流程简便，让我感到非常放心和安全。', gray: false },
                { id: 3, name: '柳嘉斌', content: '客户服务响应迅速，解决问题高效，让租房体验更加愉快和顺畅。', gray: false },
                { id: 4, name: '张艺', content: '在线支付功能便捷可靠，省去了大量时间和麻烦，非常实用和方便。', gray: false }
            ]
        };
    },
    methods: {
        toggleGray(index) {
            this.cards[index].gray = !this.cards[index].gray;
            // 将点击的卡片移到数组末尾
            const clickedCard = this.cards.splice(index, 1)[0];
            this.cards.push(clickedCard);
        }
    }
};
</script>

<style lang="less" scoped>
.message-board {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    align-items: center;

    .up {
        margin-bottom: 20px;
        text-align: center;
    }

    .inner {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .box-card {
        width: 80%;
        margin-bottom: 20px;
        position: relative;
        transition: transform 0.3s ease;
    }

    .gray-card {
        background-color: #d3d3d3;
    }

    /* 过渡效果 */
    .slide-enter-active,
    .slide-leave-active {
        transition: transform 0.3s ease;
    }

    .slide-enter,
    .slide-leave-to {
        transform: translateY(-20px);
        opacity: 0;
    }
}

.elButton {
    position: absolute;
    right: 5px;
    top: 8px;

}

.clearfix{
    font-size: 15px;
    font-weight: bold;
}
</style>

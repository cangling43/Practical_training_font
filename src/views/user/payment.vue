<template>
    <div class="out">
        <div class="container" :class="{ 'right-panel-active': isRightPanelActive }" id="payment-box">
            <div class="form-container wechat-container">
                <form @submit.prevent="payWithWeChat">
                    <el-image fit="cover" src="../../../public/image/微信支付.png" class="change1"></el-image>
                    <div class="txtb">
                        <input type="text" v-model="wechatForm.amount" @focus="addFocus" @blur="removeFocus" />
                        <el-image src="../../../public/image/微信或支付宝支付.jpg"></el-image>
                    </div>
                    <button type="submit">已支付点击确定</button>
                </form>
            </div>
            <div class="form-container alipay-container">
                <form @submit.prevent="payWithAlipay">
                    <el-image fit="cover" src="../../../public/image/支付宝支付.png" class="change2"></el-image>
                    <div class="txtb">
                        <input type="text" v-model="alipayForm.amount" @focus="addFocus" @blur="removeFocus" />
                        <el-image src="../../../public/image/微信或支付宝支付.jpg"></el-image>
                    </div>
                    <button type="submit">已支付点击确定</button>
                </form>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>使用微信？</h1>
                        <p>请使用微信进行支付</p>
                        <button class="ghost" @click="setRightPanelActive(false)">微信支付</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>使用支付宝？</h1>
                        <p>请使用支付宝进行支付</p>
                        <button class="ghost" @click="setRightPanelActive(true)">支付宝支付</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
    data() {
        return {
            isRightPanelActive: false,
            wechatForm: {
                amount: '',
            },
            alipayForm: {
                amount: '',
            },
        };
    },
    props: {
        homeInfo: {
            type: Object,
            required: true,
        },
        selectedValue: {
            type: String,
            required: true,
        }
    },
    methods: {
        goContract() {
            console.log(this.homeInfo)
            this.$router.push({
                name: 'UpContract',
                query: {
                    homeInfo: JSON.stringify(this.homeInfo),
                    selectedValue: JSON.stringify(this.selectedValue)
                }
            });
        },
        setRightPanelActive(status) {
            this.isRightPanelActive = status;
        },
        addFocus(event) {
            event.target.classList.add('focus');
        },
        removeFocus(event) {
            if (event.target.value === '') {
                event.target.classList.remove('focus');
            }
        },
        payWithWeChat() {
            // 微信支付操作
            this.successMessage('支付成功!');
            this.goContract()
        },
        payWithAlipay() {
            // 支付宝支付操作
            this.successMessage('支付成功!');
            this.goContract()
        },
        successMessage(message) {
            ElMessage({
                message: message,
                type: 'success',
            });
        },
    }
})

</script>


<style scoped>
* {
    box-sizing: border-box;
}

body {
    font-family: 'Montserrat', sans-serif;
    background-image: linear-gradient(120deg, #3498db, #8e44ad);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

h1 {
    font-weight: bold;
    margin: 0;
}

p {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: .5px;
    margin: 20px 0 30px;
}

span {
    font-size: 12px;
}

a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
}

.out {
    width: 100%;
    background-color: rgb(245, 245, 245);
}

.container {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
    margin: 66px auto;
}

.form-container form {
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    justify-content: center;
    text-align: center;
}

.change1{
    width: 200px;
    margin-left: 60px;
    position: absolute;
    top: 20px;
    left: 36px;
}

.change2{
    width: 160px;
    margin-left: 60px;
    position: absolute;
    top: 22px;
    left: 52px;
}

.txtb {
    border-bottom: 2px solid #adadad;
    position: relative;
    margin: 10px 0;
    position: relative;
}

.txtb input {
    font-size: 15px;
    color: #333;
    border: none;
    width: 100%;
    outline: none;
    background: none;
    padding: 0 3px;
    height: 35px;
}

.txtb span::before {
    content: attr(data-placeholder);
    position: absolute;
    top: 50%;
    left: 5px;
    color: #adadad;
    transform: translateY(-50%);
    transition: .5s;
}

.txtb span::after {
    content: '';
    position: absolute;
    left: 0%;
    top: 100%;
    width: 0%;
    height: 2px;
    background-image: linear-gradient(120deg, #3498db, #8e44ad);
    transition: .5s;
}

.focus+span::before {
    top: -5px;
}

.focus+span::after {
    width: 100%;
}

button {
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background: #ff4b2b;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    cursor: pointer;
}

button:active {
    transform: scale(.95);
}

button:focus {
    outline: none;
}

button.ghost {
    background: transparent;
    border-color: #fff;
}

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all .6s ease-in-out;
}

.form-container button {
    background: linear-gradient(120deg, #3498db, #8e44ad);
    border: none;
    background-size: 200%;
    color: #fff;
    transition: .5s;
}

.form-container button:hover {
    background-position: right;
}

.wechat-container {
    left: 0;
    width: 50%;
    z-index: 2;
}

.alipay-container {
    left: 0;
    width: 50%;
    z-index: 1;
    opacity: 0;
}

.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform .6s ease-in-out;
    z-index: 100;
}

.overlay {
    background-image: linear-gradient(120deg, #3498db, #8e44ad);
    color: #fff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateY(0);
    transition: transform .6s ease-in-out;
}

.overlay-panel {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 40px;
    height: 100%;
    width: 50%;
    text-align: center;
    transform: translateY(0);
    transition: transform .6s ease-in-out;
}

.overlay-right {
    right: 0;
    transform: translateY(0);
}

.overlay-left {
    transform: translateY(-20%);
}

.container.right-panel-active .wechat-container {
    transform: translateY(100%);
}

.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

.container.right-panel-active .alipay-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
}

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.container.right-panel-active .overlay-left {
    transform: translateY(0);
}

.container.right-panel-active .overlay-right {
    transform: translateY(20%);
}
</style>
<template>
  <div class="out">
    <div class="container" :class="{ 'right-panel-active': isRightPanelActive }" id="login-box">
      <div class="form-container sign-up-container">
        <form @submit.prevent="register">
          <h1>注册</h1>
          <div>
            身份：
            <a-radio-group v-model:value="signupForm.identity">
              <a-radio :value="0">租客</a-radio>
              <a-radio :value="1">房东</a-radio>
            </a-radio-group>
          </div>
          
          <div class="txtb">
            <input type="username" v-model="signupForm.username" @focus="addFocus" @blur="removeFocus" />
            <span data-placeholder="用户名"></span>
          </div>
          <div class="txtb">
            <input type="phone" v-model="signupForm.phone" @focus="addFocus" @blur="removeFocus" />
            <span data-placeholder="手机号"></span>
          </div>
          <div class="txtb">
            <input type="password" v-model="signupForm.password" @focus="addFocus" @blur="removeFocus" />
            <span data-placeholder="密码"></span>
          </div>
          <div class="txtb">
            <input type="password" v-model="repeat_password" @focus="addFocus" @blur="removeFocus" />
            <span data-placeholder="确认密码"></span>
          </div>
          <button type="submit">注册</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form @submit.prevent="login">
          <h1>登录</h1>
          <div class="txtb">
            <input type="username" v-model="loginForm.username" @focus="addFocus" @blur="removeFocus" />
            <span data-placeholder="用户名"></span>
          </div>
          <div class="txtb">
            <input type="password" v-model="loginForm.password" @focus="addFocus" @blur="removeFocus" />
            <span data-placeholder="密码"></span>
          </div>
          <a href="#">忘记密码？</a>
          <button type="submit">登录</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>已有账号？</h1>
            <p>请使用您的账号进行登录</p>
            <button class="ghost" @click="setRightPanelActive(false)">登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>没有账号?</h1>
            <p>立即注册加入我们，和我们一起开始旅程吧</p>
            <button class="ghost" @click="setRightPanelActive(true)">注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import userApis from '@/apis/userApis.js';
import { login } from '@/utils/index.js';
import store from '@/store/index.js';

export default {
  data() {
    return {
      isRightPanelActive: false,
      loginForm: {
        username: '',
        password: '',
      },
      signupForm: {
        username: '',
        phone: '',
        password: '',
        identity:0,
      },
      repeat_password: '',
    };
  },
  mounted() {
    console.log("获取到用户：", store.state.user);
    if (store.state.user) {
      ElMessage({
        message: "您已登录，无需重复登录！",
        type: "warning",
      });
      this.$router.push("/home");
    }
  },
  methods: {
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
    async login() {
      //发送登录请求
      const res = await userApis.Login(this.loginForm);
      //this.$router.push('/home');
      login(res);
      this.Success1();
      this.$router.push("/home");
    },
    async register() {
      // 点击注册后的操作
      // 检查重复密码是否一致
      if (this.signupForm.password != this.repeat_password) {
        ElMessage({
          message: '确认密码不一致！',
          type: 'error',
        })
        return;
      }
      const res = await userApis.Register(this.signupForm);
      this.Success2();
      login(res);
      //跳转首页
      this.$router.push("/home");
    },

    // 登录成功的消息提醒
    Success1() {
      ElMessage({
        message: '登录成功!',
        type: 'success',
      })
    },
    // 注册成功的消息提醒
    Success2() {
      ElMessage({
        message: '注册成功!',
        type: 'success',
      })
    },
    // 登录成功的消息提醒
    danger3() {
      ElMessage({
        message: '用户名或密码错误!',
        type: 'error',
      })
    },
  },
};
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

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

.social-container a:hover {
  background-color: #eee;
}

.txtb {
  border-bottom: 2px solid #adadad;
  position: relative;
  margin: 10px 0;
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

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-in-container form a {
  position: relative;
  left: 100px;
}

.sign-up-container {
  left: 0;
  width: 50%;
  z-index: 1;
  opacity: 0;
}

.sign-up-container button {
  margin-top: 20px;
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

.container.right-panel-active .sign-in-container {
  transform: translateY(100%);
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.container.right-panel-active .sign-up-container {
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
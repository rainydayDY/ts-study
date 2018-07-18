/**
* 登录页
* @author xyy
* @createDate 2018/04/25
* @updateBy dongyu 2018/06/08 新增页面间手机号传递，以及注册完即可进行登录
*/
<template>
  <div class="wrapper-login" :style="{height: mainHeight}">
    <div class="in-box" :style="{background:bgImg}">
      <img :src="logoImg" />
      <div class="out-box">
        <el-form ref="form" :model="form" class="form-box" :rules="checkrules" >
          <el-form-item prop="tel" class="wrap-box wrap-register" :inline-message="true">
              <svg-icon icon-class="login-iphone" class="login-iphone"/>
              <div class="vertical"></div>
              <el-input class="tel-user" v-model="form.tel" placeholder="请输入手机号" maxlength="11"/>
          </el-form-item>
          <div class="border-line"></div>
          <el-form-item prop="pass" class="wrap-box2" :inline-message="true">
            <svg-icon icon-class="pass-16" class="login-password" />
            <div class="vertical"></div>
            <el-input class="password-user" type="password" v-model="form.pass" placeholder="请输入密码" ></el-input>
          </el-form-item>
          <el-form-item class="login-bottom">
            <div class="first-line">
              <el-checkbox v-model="form.checked" class="checked-agreement"><span class="free-login">十天内免登录</span></el-checkbox>&ensp;|&ensp;<span class="forget-password" @click="handlePass">忘记密码</span><span class="registered" @click="handleRigister">注册</span>
            </div>
            <el-button type="primary" class="main-btn login-btn" @click="handleLogin">登录</el-button>
            <div class="other-link">
              <span @click="handleThirdLogin('qq')">
                <svg-icon icon-class="QQ" class="login-icon qq-icon"/>
              </span>
              <span @click="handleThirdLogin('wechat')">
                <svg-icon icon-class="weixin" class="login-icon weixin-icon"/>
              </span>
              <span @click="handleThirdLogin('weibo')">
                <svg-icon icon-class="weibo" class="login-icon weibo-icon"/>
              </span>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import {validatePhone, validatePassword} from '@/utils/validate';
import {generateUuid} from '@/utils/utils';
import { IMG_URL } from '@/utils/constant';
@Component

export default class Login extends Vue {
  private mainHeight = `${window.innerHeight - 440}px`;
  private isVerify = false;
  private isPassword = false;
  private logoImg = IMG_URL.LOGIN.LOGIN_LOGO;
  private bgImg = `url(${IMG_URL.LOGIN.LOGIN_BG})`;
  private form = {
      tel: '',
      pass: '',
      checked: true,
  };
  private checkPhone = (rule, value, callback) => {
      if (value) {
          if (validatePhone(value)) {
              this.isVerify = true;
              return callback();
          } else {
          return callback(new Error('请输入合法的手机号'));
          }
      } else {
          return callback(new Error('请输入手机号'));
      }
  }
  private  validatePass = (rule, value, callback) => {
      if (value === '' || (value.length < 6 || value.length > 12)) {
          callback(new Error('请输入6-12位的密码'));
      } else {
          if (!validatePassword(value)) {
              callback(new Error('密码需包含数字和字母'));
          } else {
              this.isPassword = true;
          }
          callback();
     }
   }
  private checkrules = {
      tel: [
          {
              required: true,
              trigger: 'blur',
              validator: this.checkPhone,
          },
      ],
      pass: [
          {
              required: true,
              trigger: 'blur',
              validator: this.validatePass,
          },
      ],
  };
  private handleThirdLogin(type: string) {
      const uuid = generateUuid();
      let thirdWindow = null;
      const baseUrl = process.env.BASE_API;
      const scoketUrl = process.env.SOCKET_URL;
      let socket = new WebSocket(`${scoketUrl}/service/ID=${uuid}`);
      socket.onopen = () =>  {
          console.log('Socket 已打开');
      };
      socket.onmessage = (msg: any) => {
          const response = JSON.parse(msg.data);
          if (response.data) {
              this.loginSuccess(response.data);
              setTimeout(() => {
                  thirdWindow.close();
                  socket.onclose();
              }, 1000);
          }
      };
      socket.onclose = () => {
          console.log('连接已关闭');
          socket = null;
      };
      const socketUrl = `${baseUrl}/oauth/${type}/login/?ID=${uuid}`;
      const settings1 = 'height=600, width=600, top=100, left=200, toolbar=no';
      const settings2 = ', menubar=no, scrollbars=no, resizable=no, location=no, status=no';
      thirdWindow = window.open(socketUrl, '_blank', settings1 + settings2);
  }
  private handleLogin(e: any) {
      this.$refs.form.validate((valid) => {
          if (valid) {
              this.$store.dispatch('LoginByTel', this.form).then(() => {
                  console.log('登录成功');
                  this.$router.push('about');
              }).catch(() => {
                  this.$message.error('登录失败');
              });
          }
      });
  }
  private loginSuccess(response) {
      this.$store.commit('SET_TOKEN', response);
      localStorage.setItem('TokenKey', response);
      this.$store.dispatch('getUserInfo');
  }
  private handlePass() {
      this.$emit('onToast', 3);
      this.$store.commit('SET_PHONE', this.form.tel);
  }
  private handleRigister() {
      this.$emit('onToast', 2);
  }
}
</script>


<style lang="scss" scoped>
@import '../../styles/index.scss';
::-ms-clear,::-ms-reveal{display:none;}
.in-box{
  width: 538px;
  height: 350px;
  background-position: center;
  background-size: cover;
  // background: url('../../assets/login/popup-bg.png');
  @include flex-style(column,center,flex-start);
  >img{
    width: 50px;
    height: 30px;
    margin-top: 38px;
  }
}
.wrapper-login{
  @include flex-style(row,flex-start,center);
  margin-top: 20px;
  width: 538px;
  height: 350px;
}
.out-box{
  width: 535px;
  height: 250px;
  @include flex-style(column,center,flex-start);
  margin-top: 20px;
  .border-line {
    height: 1px;
    width: 340px;
    background-color: $white;
    opacity: 0.5;
  }
}
.wrap-box {
  position: relative;
  .login-iphone {
    position: absolute;
    width: 26px;
    height: 43px;
    color: $white;
    top: 50%;
    margin-top: -21.5px;
    left: 8px;
  }
}
.wrap-box2 {
  position: relative;
  .login-password {
    position: absolute;
    width: 16px;
    height: 18px;
    color: $white;
    top: 50%;
    margin-top: -9px;
    left: 14px;
  }
}
.vertical {
  position: absolute;
  width: 1px;
  height: 20px;
  color: $white;
  border-left: 1px solid $white;
  top: 50%;
  margin-top: -10px;
  left: 40px;
}
.login-bottom {
  color: $white;
  width: 340px;
  .registered {
    margin-left: 100px;
    cursor: pointer;
    opacity: 0.4;
    &:hover {
      opacity: 1;
    }
  }
  .forget-password {
    cursor: pointer;
    opacity: 0.4;
    &:hover {
      opacity: 1;
    }
  }
}
.checked-agreement {
  padding-left: 15px;
  margin-top: 3px;
  color: rgba(255,255,255,0.4) !important;
}
.login-btn {
  background-color: rgba(255,255,255,0.2);
  border-radius: 18px;
  width: 158px;
  height: 36px;
  color: $white!important;
  border: 0;
  margin: 0 auto;
  margin-top: 20px;
  @include flex-style(column,center,center);
}
.other-link {
  @include flex-style(row,center,space-between);
  width: 100%;
  height: 50px;
  margin-top: 20px;
  .qq-box {
    position: absolute;
    width: 40px;
    height: 40px;
    z-index: 5;
    cursor: pointer;
  }
  .login-icon {
    width: 40px;
    height: 40px;
    color: $white;
    opacity: 0.2;
    cursor: pointer;
  }
  .qq-icon {
    margin-left: 15px;
  }
  .weibo-icon {
    margin-right: 20px;
  }
}
.el-form-item {
  margin-bottom: 0px !important;
}
// 兼容IE11、IE10
@media screen and(-ms-high-contrast:active),(-ms-high-contrast:none){
  .weixin-icon {
    margin-left: 89px;
    margin-right: 89px;
  }
}
</style>

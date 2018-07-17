<template>
  <div class="home">
    <img src="../assets/logo.png" class="logo-img">
    <div class="stage">
      <div class="heart" @click="isClick = !isClick" :class="[isClick ? 'is-active' : '']"></div>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <el-button type="success">成功按钮</el-button>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
    components: {
        HelloWorld,
    },
})
export default class Home extends Vue {
    private value1 = '';
    private isClick: boolean = false;
    private list: number[] = [1, 2, 3];
    private mounted() {
        this.testVar();
    }
    private testVar() {
        const age: number = 25;
        const  name: string = `my age is ${age}`;
        console.log(name);
    }
}
</script>
<style lang="scss" scoped>
.logo-img{
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: pink;
  &:hover{
    transform: rotate(666turn);
    transform: rotate(666turn);
    transition-delay: 1s;
    transition-property: all;
    transition-duration: 59s;
    transition-timing-function: cubic-bezier(.34, 0, .84, 1);
    cursor: pointer;
  }
}
// TWITTER HEART
.heart {
  width: 100px;
  height: 100px;
  background: url("https://cssanimation.rocks/images/posts/steps/heart.png") no-repeat;
  background-position: 0 0;
  cursor: pointer;
  transition: background-position 1s steps(28);
  transition-duration: 0s;

  &.is-active {
    transition-duration: 1s;
    background-position: -2800px 0;
  }
}

.stage {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

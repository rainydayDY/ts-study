/**
* 滑动形选项卡组件
* @author dongyu
* @createDate 2018/03/19
*/
<template>
  <div class="tab-line" @click="handleSwitchTab" @mouseover="handleMoveSlider" @mouseout="handleMoveSlider">
    <span v-for="(item,index) in tabArray" :key="item" :data-index="index" :class="[currentIndex=== index ? 'active-tab' : '']">{{item}}</span>
    <div class="slide-line" :style="{transform: translateValue}"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Tab extends Vue {
    @Prop() private tabArray!: string[];
    @Prop() private currentTab!: number;
    private currentIndex: number = this.currentTab;
    private translateValue: string = '0';
    @Watch('currentTab')
    private onCurrentTabChanged() {
        this.currentIndex = this.currentTab;
        this.translateValue = `translateX(${this.currentTab * 120}px)`;
    }
    private handleSwitchTab(e: any) {
        if (e.target.nodeName.toLowerCase() === 'span') {
            this.currentIndex = parseInt(e.target.getAttribute('data-index'), 0);
            this.translateValue = `translateX(${this.currentIndex * 120}px)`;
            this.$emit('onchange', this.currentIndex);
        }
    }
    private handleMoveSlider(e: any) {
        let currentIndex = this.currentIndex;
        if (e.type === 'mouseover') {
            if (e.target.nodeName.toLowerCase() === 'span') {
                currentIndex = parseInt(e.target.getAttribute('data-index'), 0);
            }
        }
        this.translateValue = `translateX(${currentIndex * 120}px)`;
    }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
.tab-line{
  width: 100%;
  height: 51px;
  background-color: $white;
  @include flex-style(row,flex-start,flex-start);
  position: relative;
  span{
    display: block;
    width: 120px;
    height: 51px;
    line-height: 51px;
    text-align: center;
    color:$black;
    font-size: $sixteen-font;
    font-weight: bold;
    cursor: pointer;
    &:hover{
      color:$blue;
    }
  }
  .active-tab{
    color: $blue !important;
  }
  div{
    position: absolute;
    top: 0;
    left: 49px;
    width: 22px;
    height: 2px;
    background-color: $blue;
    transition: transform .3s cubic-bezier(.645,.045,.355,1)
  }
}
</style>

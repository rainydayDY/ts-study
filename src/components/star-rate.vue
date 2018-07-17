/**
* 星星评分组件
* @author dongyu
* @createDate 2018/05/07
*/
<template>
  <div class="star-line">
    <span v-for="n in wholeRate"  @click="handleRate(n)" :key="timeStr + n"><svg-icon :style="{fontSize: fontSize}" icon-class="star-whole"/></span>
    <span v-if="halfRate"><svg-icon icon-class="star-half" :style="{fontSize: fontSize}" /></span>
    <span v-for="(m,index) in nullRate" :data-index="m" :key="index" @click="handleRate(rate+m)"><svg-icon icon-class="star-null" :style="{fontSize: fontSize}"/></span>
    <span class="score-span" v-if="showScore">{{rate*2}}分</span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class StarRate extends Vue {
  @Prop({default: 5}) private rate!: number;
  @Prop({default: '12px'}) private fontSize!: string;
  @Prop({default: false}) private showScore!: boolean;
  private wholeRate = this.rate;
  private nullRate = 5 - this.rate;
  private timeStr = new Date().getTime();
  @Watch('rate')
  private onRateChanged() {
      this.wholeRate = this.rate;
      this.timeStr = new Date().getTime();
      this.nullRate = 5 - this.rate;
  }

  get halfRate() {
      return String(this.rate).includes('.');
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
.star-line{
  @include flex-style(row,center,center);
  >span{
    margin-left: 4px;
    cursor: pointer;
    font-size: $fourteen-font;
    color: $black;
    @include flex-style(column,center,center);
  }
  .score-span{
    margin-left: 10px;
  }
}
</style>

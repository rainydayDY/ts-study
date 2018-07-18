/**
* 详情页-目录
* @author dongyu
* @createDate 2018/03/06
* @update dongyu 2018/03/08
*/
<template>
  <div class="catalogue">
    <div class="content-wrapper" v-for="(item, index) in catalogue" :key = "index">
      <p>{{index + 1}}章  {{item.chapterName}}</p>
      <p>{{item.intro}}</p>
      <div class="cata-child">
        <span v-for="(child,childIndex) in item.videos" :key="childIndex">
          <p><svg-icon icon-class="play" class="play-icon"/> {{index+1}}-{{childIndex+1}}  {{child.title}}</p>
          <p v-if="child.studyFlag === 1">最近学习<svg-icon icon-class="study" class="study-icon"/></p>
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Catalogue extends Vue {
    @Prop() private catalogue!: any[];
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
.catalogue{
  width: 100%;
  background-color: $white;
  @include flex-style(column, center, flex-start);
}
.content-wrapper{
  width: 100%;
  >p{
    color: $black;
    line-height: 24px;
    cursor: pointer;
    &:nth-child(1){
      font-size: $sixteen-font;
      font-weight: bold;
    }
    &:nth-child(2){
      font-size: $fourteen-font;
    }
  }
}
.cata-child{
  width: 100%;
  margin: 26px 0;
  >span{
    display: block;
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    height: 40px;
    @include flex-style(row,center,space-between);
    p:nth-child(1){
      color: $black;
      font-size: $sixteen-font;
      letter-spacing: 2px;
      @include flex-style(row,center,flex-start);
    }
    p:nth-child(2){
      font-size: $fourteen-font;
      color: $dark-gray;
    }
    &:hover{
      background-color: #e5eaff;
      cursor: pointer;
    }
    &:hover .play-icon{
      color: $blue;
    }
  }
}
.play-icon{
  color: $dark-gray;
  font-size: 24px;
  margin-right: 13px;
}
.study-icon{
  color: $blue;
  font-size: $fourteen-font;
  margin-left: 10px;
}
</style>

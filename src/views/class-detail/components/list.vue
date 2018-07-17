/**
* 推荐课程列表组件
* @author dongyu
* @createDate 2018/05/07
*/
<template>
  <div class="box-wrapper" @click="handleToDetail(list.id)">
    <img :src="list.courseImg"/>
    <div>
      <p>{{list.name}}</p>
      <p><svg-icon icon-class="watch" class="watch-icon" />{{list.studyCount}}</p>
    </div>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
interface DefaultList {
    courseImg: string;
    name: string;
    studyCount: string;
}
@Component

export default class CourseList extends Vue {
    @Prop() private list!: DefaultList;
}
</script>
<style lang="scss" scoped>
@import '../../../styles/index.scss';
.box-wrapper{
  width: 228px;
  height: 64px;
  @include flex-style(row,flex-start,flex-start);
  img{
    width: 96px;
    height: 54px;
    cursor: pointer;
  }
  >div{
    width: 122px;
    height: 58px;
    margin-left: 10px;
    @include flex-style(column,flex-start,space-between);
    p{
      display: block;
      width: 122px;
      color: $black;
      &:nth-child(2){
        font-size: $twelve-font;
        line-height: $twelve-font;
        height: 20px;
        @include flex-style(row,center,flex-start);
      }
      &:nth-child(1){
        font-size: $twelve-font;
        line-height: 18px;
        letter-spacing: 2px;
        margin-top: -3px;
        height: 36px;
        overflow: hidden;
      }
    }
  }
}
.watch-icon{
  font-size: 20px;
  color: $dark-gray;
  margin-right: 10px;
}
</style>

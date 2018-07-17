/**
* 课程盒子组件
* @author dongyu
* @createDate 2018/05/03
*/
<template>
<div class="box-wrapper" @click="handleToDetail(list.id)">
  <div class="img-wrapper">
    <img :src="list.courseImg"/>
  </div>
  <div :class="[showDesc ? 'padding-bottom' : '']">
    <div class="first-line">
      <p>{{list.name}}</p>
      <div class="box-info">
        <span>主讲老师：{{list.techerName}}</span>
        <div>
          <svg-icon icon-class="watch" class="watch-icon"/>
          <span>{{list.studyCount}}</span>
        </div>
      </div>
    </div>
    <p class="box-p" v-if="showDesc">
      {{list.courseIntro}}
    </p>
    <p class="box-price">{{list.sale === 0 ? '免费' : '￥'+list.sale.toFixed(2)}}<span v-show="list.price !== list.sale">{{list.price.toFixed(2)}}</span></p>
  </div>
</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
interface DefaultList {
    courseImg: string;
    name: string;
    techerName: string;
    studyCount: string;
    courseIntro?: string;
    sale: number;
    price: number;
}
@Component
export default class CourseList extends Vue {
    @Prop() private list!: DefaultList;
    @Prop() private showDesc!: boolean;
    private handleToDetail(id: number) {
        this.$router.push({
            path: 'detail',
            query: {
                id: String(id),
            },
        });
    }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
.box-wrapper{
  width: 244px;
  border-radius: 10px;
  background-color: $white;
  overflow: hidden;
  cursor: pointer;
  // box-shadow: 2px 0px 10px rgba(4,0,0,0.08);
  &:hover{
    box-shadow: 6px 0 24px rgba(4,0,0,0.14);
  }
  &:hover img{
    transform: scale(1.15);
  }
  .img-wrapper{
    width: 244px;
    height: 136px;
    overflow: hidden;
    margin-bottom: 8px;
  }
  img{
    width: 244px;
    height: 136px;
    transition: all .6s ease;
  }
  .padding-bottom{
    padding-bottom: 6px;
  }
  >div{
    &:nth-child(2){
      padding: 0 12px;
    }
    .box-p{
      font-size: $twelve-font;
      color: $light-gray;
      line-height: 18px;
      text-align: justify;
      height: 36px;
      overflow:hidden;
    }
    .box-price{
      font-size: $twelve-font;
      line-height: 12px;
      color: $yellow;
      padding: 8px 0;
      >span{
        font-size: 12px;
        color: $light-gray;
        text-decoration: line-through;
        margin-left: 8px;
      }
    }
  }
}
.first-line{
  height: 54px;
  p{
    font-size: $fourteen-font;
    color: $black;
    line-height: 18px;
    margin-bottom: 4px;
  }
}
.box-info{
  width: 220px;
  height: 12px;
  @include flex-style(row,center,space-between);
  >span{
    font-size: $twelve-font;
    color: $light-gray;
  }
  >div{
    @include flex-style(row,center,flex-end);
    .watch-icon{
      color: $light-gray;
      font-size: $sixteen-font;
      margin-right: 6px;
    }
    span{
      font-size: $twelve-font;
      color: $light-gray;
      letter-spacing: 3px;
    }
  }
}
</style>

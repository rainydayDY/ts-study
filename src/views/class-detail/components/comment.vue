/**
* 课程详情评价组件
* @author dongyu
* @createDate 2018/05/07
* 点赞标志，后端未做，用户名不存在情况下，未返回学号，一个用户只能进行一次评论，点完赞图标变为黄色
*/
<template>
<div class="out-box">
  <div class="star-comment">为课程评分：<span v-for="n in 5" :key="n"  @click="handleRate(n)"><svg-icon icon-class="star-whole" v-if="n <= userRate"/><svg-icon icon-class="star-null" v-else/></span></div>
  <div class="comment-box">
    <textarea v-model="comment" maxlength="150" autofocus="autofocus" placeholder="说两句吧"/>
    <span>{{comment.length}}/150</span>
    <span @click="handleComment">评价</span>
  </div>
  <div class="comment-list" v-if="total > 0">
    <div v-for="(item,index) in commentList" :key="index">
      <img :src="item.headImg || defaultImg" />
      <div>
        <p><span>{{item.username || item.userNumber}}</span><starRate class="star-line" :rate="item.star/2" fontSize="13px"/><span>{{item.star}}分</span></p>
        <p>{{item.content}}</p>
        <p>{{item.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}<span  @click="handleZan(item.id,item.flag)" :class="[item.flag === '1' ? 'zan' : 'unzan']"><svg-icon :data-index="n" icon-class="zan" class="zan-icon" />{{item.praiseCount}}</span></p>
      </div>
    </div>
  </div>
  <div class="mull-wrapper" v-else>
    <img :src="nullImg" class="null-course"/>
    <p>
      暂时还没有评论哦，快来占个沙发吧~
    </p>
  </div>
  <div class="pagination-box" v-show="total > 0">
    <div class="pagigation-box">
      <el-pagination background layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pageSize" @current-change="handleChangePage" />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NetworkRequest from '@/utils/request';
import {parseTime} from '@/utils/utils';
import { IMG_URL } from '@/utils/constant';
import starRate from '@/components/star-rate.vue';

@Component({
  components: {
    starRate,
  },
})
export default class Comment extends Vue {
  private courseId = this.$route.query.id;
  private pageSize = 8;
  private currentPage = 1;
  private commentList = [];
  private total = 0;
  private userRate = 0;
  private comment = '';
  private defaultImg = IMG_URL.USER.DEFAULT;
  private nullImg = IMG_URL.CONFIG_IMG.COMMENT_NULL;
  private created() {
      console.log('课程评论');
      this.getCommentList();
  }
  private getCommentList() {
      // 获取课程评价列表
      NetworkRequest.streamRequest({
          url: '/evaluate/getEvaluateListByCourseId',
          method: 'get',
          params: {
              courseId: this.courseId,
              pageNum: this.currentPage,
              pageSize: this.pageSize
          }
      }, (response) => {
          this.total = response.total;
          this.commentList = response.list;
      });
  }

  private handleChangePage(val) {
      this.currentPage = val;
      this.getCommentList();
  }

  private handleToDetail() {
      this.$router.push('detail');
  }
  private handleRate(val) {
      this.userRate = val;
  }
  private handleComment() {
      if (!this.isLogin) {
          this.$store.commit('SET_TOAST', 1);
      } else {
          if (this.comment) {
              NetworkRequest.streamRequest({
                  url: '/evaluate/insertEValuate',
                  method: 'post',
                  data: {
                      courseId: this.courseId,
                      content: this.comment,
                      star: this.userRate * 2
                  }
              }, (response) => {
                  this.comment = '';
                  this.userRate = 0;
                  this.$message({
                      message: '评论成功！',
                      type: 'success'
                  });
                  this.getCommentList();
                  this.$emit('onchange', true);
              });
          } else {
              this.$message({
                  message: '评论内容不能为空哦',
                  type: 'warning'
              });
          }
      }
  }
  private handleZan(id, flag) {
      if (!this.isLogin) {
          this.$store.commit('SET_TOAST', 1);
      } else {
          const data = new FormData();
          data.append('evaluateId', id);
          NetworkRequest.streamRequest({
              url: '/evaluate/praise',
              method: 'post',
              data: data
          }, response => {
              this.$message({
                  message: `${flag === '0' ? '' : '取消'}点赞成功`,
                  type: 'success'
              });
              this.getCommentList();
          });
      }
  }

}
</script>


<style lang="scss" scoped>
@import '../../../styles/index.scss';
.out-box{
  width: 100%;
  >div:nth-child(1){
    width: 100%;
    height: 56px;
    @include flex-style(row,center,center);
    font-size: $sixteen-font;
    color: $black;
    >span{
      margin-left: 4px;
      cursor: pointer;
      font-size: 18px;
    }
  }
}
.comment-box{
  width: 952px;
  height: 150px;
  @include flex-style(column,flex-end,space-between);
  position: relative;
  textarea{
    width: 100%;
    height: 110px;
    box-sizing: border-box;
    padding: 12px;
    border: $border-style;
    resize: none;
  }
  span{
    &:nth-child(2){
      position: absolute;
      top: 78px;
      right: 10px;
      font-size: $twelve-font;
      color: $dark-gray;
      line-height: 32px;
    }
    &:nth-child(3){
      width: 70px;
      height: 30px;
      @include usual-btn($blue,$white);
      font-size: $fourteen-font;
    }
  }
}
.comment-list{
  width: 940px;
  margin-left: 12px;
  >div{
    width: 100%;
    height: auto;
    padding: 30px 0;
    @include flex-style(row,flex-start,flex-start);
    >img{
      width: 48px;
      height: 48px;
      border-radius: 100%;
      margin-right: 20px;
    }
    >div {
      width: 834px;
      p{
        &:nth-child(1){
          @include flex-style(row,center,flex-start);
          height: 22px;
          .star-line{
            margin: 0 10px;
          }
          span{
            font-size: $fourteen-font;
            letter-spacing: 2px;
            &:nth-child(1){
              color: $dark-gray;
            }
            &:nth-child(3){
              font-size: $fourteen-font;
              color: $black;
            }
          }
        }
        &:nth-child(2){
          font-size: $fourteen-font;
          color: $dark-gray;
          line-height: 22px;
          letter-spacing: 2px;
        }
        &:nth-child(3){
          margin-top: 6px;
          @include flex-style(row,center,space-between);
          font-size: $twelve-font;
          color: $light-gray;
          span{
            height: 12px;
            @include flex-style(row,flex-start,space-between);
            font-size: $twelve-font;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.zan-icon{
  font-size: $twelve-font;
  margin-right: 4px;
}
.zan{
  color: $blue;
}
.unzan{
  color: $dark-gray;
}
.mull-wrapper{
  width: 100%;
  height: 500px;
  @include flex-style(column,center,center);
  img{
    width: 200px;
    height: 137px;
  }
  p{
    font-size: 18px;
    color: $dark-gray;
    line-height: 18px;
    margin-top: 36px;
  }
}
</style>

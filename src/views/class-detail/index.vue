/**
* 课程详情页
* @author dongyu
* @createDate 2018/05/05
* 目录处加最近学习的标志（未加）
*/
<template>
<div class="out-box">
  <div class="top-box usual-box" @click="handlePrevious">
    <span data-path="course">课程</span><svg-icon icon-class="to-more" class="to-more" /><span data-path="category">分类</span><svg-icon icon-class="to-more" class="to-more" /><span>{{courseDetail.name}}</span>
  </div>
  <div class="usual-box">
    <div>
      <img :src="courseDetail.courseImg" />
      <div class="course-title">
        <div><p>{{courseDetail.name}}</p><span @click="handleCollect"><svg-icon :icon-class="courseDetail.collect === 1 ? 'collect' : 'un-collect'" class="collect-icon" /></span></div>
        <div>
          <div>
            <p>
              <svg-icon icon-class="watch" class="watch-icon" />
              <span>{{courseDetail.studyCount}}</span>
              <starRate :rate="courseDetail.totalStar/2" fontSize="12px"/>
              <span>主讲老师：{{courseDetail.techerName}}</span>
            </p>
            <p>{{courseDetail.price === 0 ? '免费' :'￥' + courseDetail.sale}}</p>
            <div class="btn-box">
              <!-- 无论为免费课程还是付费课程，都需要添加订单，免费课程在添加到订单之后直接就进入到视频播放页 -->
              <span v-if="courseDetail.buy === 0" @click="handleToBuy(courseDetail.auditionStatus)">立即参加</span>
              <span class="start-study" @click="handleStartLesson">立即学习</span>
            </div>
          </div>
          <div class="prgress-box">
            <canvas id="myCanvas1" width="126" height="126" class="canvas"> 您的浏览器不支持canvas标签。 </canvas>
            <div>
              完成课时<br />{{courseDetail.proess}}%
            </div>
            <span id="ball"></span>
          </div>
        </div>
      </div>
    </div>
    <tab :tabArray="tabArray" :currentTab="currentTab" @onchange="handleSwitchTab"/>
  </div>
  <div class="usual-box">
    <div class="left-box">
      <p v-show="currentTab === 0">简介：{{courseDetail.courseIntro}}</p>
      <catalogue  v-if="currentTab === 0" :catalogue="catalogue" :price="courseDetail.price" :isBuy="courseDetail.buy" :courseName="courseDetail.name" :courseId="courseDetail.id"/>
      <div  class="top-comment" v-if="currentTab === 1" >
        <div class="top-comment-box">
          <span>综合评分</span>
          <span>{{new Number(courseDetail.totalStar).toFixed(1)}}</span>
          <starRate :rate="courseDetail.totalStar/2" fontSize="13px"/>
          <span>{{courseDetail.evuateCount}}人评论</span>
        </div>
        <comment @onchange="handleCommentChange"/>
      </div>
    </div>
    <div class="right-box">
      <div>
        <div>
          <img :src="courseDetail.teacherHeadImg" />
          <p class="right-content">{{courseDetail.techerName}}老师</p>
        </div>
        <p class="right-content">{{courseDetail.teacherSimpleIntro}}</p>
      </div>
      <div>
        <p class="right-title">咨询</p>
        <div>
          <span @click="handleQQ"><svg-icon icon-class="qq-result" class="qq-icon"/></span>
          <p class="right-content">可在此咨询关于课程的内容、价格、售前、售后服务等相关信息。</p>
        </div>
      </div>
      <div>
        <p class="right-title">推荐课程</p>
        <div>
          <courseList v-for="item in recommendList" :key="item.id" :list="item" />
          <p class="right-content" @click="handleToCategory">
            更多<svg-icon icon-class="to-more" />
          </p>
        </div>
      </div>
      <div>
        <p class="right-title">{{studyCount}}人在学习该课程</p>
        <div v-if="studyUsers.length > 0">
          <div v-for="item in studyUsers" :key="item.userId">
            <img :src="item.headImg" />
            <p class="username">{{item.username ? item.username.substr(0,4) : '暂无昵称'}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script lang="ts">
let monitorTime: any = null;
import { Component, Vue } from 'vue-property-decorator';
import tab from '@/components/card-tab.vue';
import catalogue from '@/components/catalogue.vue';
import courseList from './components/list.vue';
import comment from './components/comment.vue';
import starRate from '@/components/star-rate.vue';
import NetworkRequest from '@/utils/request';
import { IMG_URL } from '@/utils/constant';
interface DefaultDetail {
  totalStar: number;
  price: number;
  sale: number;
  courseImg: string;
  name: string;
  proess: number;
  buy: number;
  evuateCount?: number;
  collect?: number;
  QQ?: string | null;
}

interface CircleParams {
  strokeColor: string;
  lineWidth: number;
  cirR: number;
}

@Component({
  components: {
    tab,
    catalogue,
    courseList,
    comment,
    starRate,
  },
})

export default class Detail extends Vue {
    private courseId: number = 0;
    private courseDetail: DefaultDetail = {
        totalStar: 2,
        price: 0,
        sale: 0,
        courseImg: '',
        name: '',
        proess: 0,
        buy: 0,
    };
    private colorPng = IMG_URL.CONFIG_IMG.COLOR;
    private studyCount = 0;
    private studyUsers = [];
    private recommendList = [];
    private showProgress = 0;
    private tabArray = ['课程详情', '评价'];
    private currentTab = 1;
    private catalogue = [];
    private flag = 0;
    private courseName = '';
    private isBuy = 0;
    private get isLogin() {
        return this.$store.state.user.token;
    }
    private mounted() {
        this.courseId = Number(this.$route.query.id);
        this.fetchData(true);
  }
  private fetchData(isNow: boolean) {
      this.getDetail(isNow);
      this.getChapter(isNow);
      this.getStudyUsers(isNow);
      this.getRecommendCourse(isNow);
  }
  private getDetail(isNow: boolean) {
      // 获取课程详情
      // console.time('课程详情加载时间');
      return new Promise((resolve, reject) => {
          NetworkRequest.streamRequest({
              url: '/course/courseDetail',
              method: 'get',
              params: {
                  courseId: this.courseId,
              },
          }, (response: DefaultDetail) => {
              resolve();
              this.courseDetail = {
                  ...response,
              };
              this.courseName = response.name;
              this.isBuy = response.buy;
              if (this.courseDetail.proess !== 0) {
                  this.drawProgress('myCanvas1', {
                      strokeColor: '#456eff',
                      lineWidth: 4,
                      cirR: 59,
                  });
              }
          });
      });
  }

  private getChapter(isNow: boolean) {
      // 获取课程章节
      return new Promise((resolve, reject) => {
          NetworkRequest.streamRequest({
              url: '/courseChapter/getChapers',
              method: 'get',
              params: {
                  courseId: this.courseId,
              },
          }, (response: any) => {
              resolve();
              this.catalogue = response;
          }, {
              cacheName: `catalogue_${this.courseId}`,
              cacheTime: 1800000,
              isNow,
          });
      });
  }

  private getStudyUsers(isNow: boolean) {
      // 查询正在学习该课程的用户
      return new Promise((resolve, reject) => {
          NetworkRequest.streamRequest({
              url: '/course/getUserCourseCount1',
              method: 'get',
              params: {
                  courseId: this.courseId,
              },
          }, (response: any) => {
              resolve();
              this.studyCount = response.count;
              this.studyUsers = response.users.slice(0, 12);
          }, {
              cacheName: `studyUsers_${this.courseId}`,
              cacheTime: 1800000,
              isNow,
          });
      });
  }

  private handleCommentChange(val: boolean) {
      // 监听是否点击评论，更新页面数据
      if (val) {
          NetworkRequest.streamRequest({
              url: '/course/courseDetail',
              method: 'get',
              params: {
                  courseId: this.courseId,
              },
          }, (response: any) => {
              this.courseDetail.totalStar = response.totalStar;
              this.courseDetail.evuateCount = response.evuateCount;
          });
      }
  }

  private getRecommendCourse(isNow: boolean) {
      // 查询推荐课程
      return new Promise((resolve, reject) => {
          NetworkRequest.streamRequest({
              url: '/course/selectCourseDetailRecommendCourse',
              method: 'get',
              params: {
                  courseId: this.courseId,
              },
          }, (response: any) => {
              resolve();
              this.recommendList = response;
              // console.timeEnd('课程详情加载时间');
          }, {
              cacheName: `recommend_${this.courseId}`,
              cacheTime: 1800000,
              isNow,
          });
      });
  }

  private handleCollect() {
      if (!this.isLogin) {
          this.$router.push('login');
      } else {
          NetworkRequest.streamRequest({
              url: '/course/collectCourse',
              method: 'get',
              params: {
                  courseId: this.courseId,
                  type: this.courseDetail.collect === 0 ? 1 : 2,
              },
          }, (response: any) => {
              this.$message({
                  message: this.courseDetail.collect === 0 ? '收藏成功！' : '取消收藏成功！',
                  type: 'success',
              });
              this.courseDetail.collect = this.courseDetail.collect === 0 ? 1 : 0;
          });
      }
  }
  private handleToBuy(flag: number) {
      this.flag = flag;
      if (!this.isLogin) {
          this.$store.commit('SET_TOAST', 1);
      } else {
          if (this.$store.state.user.phone) {
              this.buyGoods();
          }
      }
  }

  private buyGoods() {
      NetworkRequest.streamRequest({
          url: '/order/addOrder',
          method: 'get',
          params: {
              courseId: this.courseId,
              courseType: 0,
          },
      }, (response: any) => {
          if (this.flag === 0) {
              this.$store.commit('SET_PLAY', false);
              this.$router.push({
                  path: 'video-play',
                  query: {
                      courseId: String(this.courseId),
                      isBuy: '1',
                  },
              });
              this.$store.dispatch('getStudy', true);
          } else {
              this.$router.push({
                  path: 'buy-class',
                  query: {
                      orderId: String(response.id),
                  },
              });
          }
      });
  }
  private handleSwitchTab(val: number) {
      this.currentTab = val;
  }
  private handleQQ() {
      window.location.href = `tencent://message/?uin=${this.courseDetail.QQ}&Site=http://vps.shuidazhe.com&Menu=yes`;
  }
  private handlePrevious(e: any) {
      if (e.target.getAttribute('data-path')) {
          this.$router.push(e.target.getAttribute('data-path'));
      }
  }
  private drawProgress(eleId: string, circle: CircleParams) {
      const canvas = document.getElementById(eleId);
      const ball = document.getElementById('ball');
      const ctx2 = canvas.getContext('2d');
      let pro = 0;
      monitorTime = setInterval(() => {
          if (pro >= this.courseDetail.proess) {
              clearInterval(monitorTime);
              return false;
          }
          pro += 1;
          this.showProgress = pro;
          this.moveBall(ball, pro);
          const img = new Image();
          img.src = this.colorPng;
          img.onload = ctx2.drawImage(img, 0, 0, 126, 126);
          ctx2.beginPath();
          ctx2.strokeStyle = ctx2.createPattern(canvas, 'no-repeat');
          ctx2.clearRect(0, 0, 126, 126);
          ctx2.lineWidth = circle.lineWidth;
          ctx2.lineCap = 'round';
          // 绘制圆或者弧线，x,y坐标，半径，起始角度，结束角度，顺时针开始绘制
          const x = circle.cirR + circle.lineWidth;
          const y = circle.cirR + circle.lineWidth;
          const sAngle = -(Math.PI / 2);
          const eAngle = Math.PI * 2 / 100 * (pro - 25);
          ctx2.arc(x, y, circle.cirR, sAngle, eAngle, false);
          ctx2.stroke();
      }, 50);
  }
  private moveBall(ball: any, pro: number) {
      const angle = Math.PI * (pro / 100) * 360 / 180;
      ball.style.left = (Math.sin(angle) + 1) * 59 + 'px';
      ball.style.top = -(Math.cos(angle) - 1) * 59 + 'px';
  }
  // 点击立即学习
  private handleStartLesson() {
      if (!this.isLogin) {
          this.$store.commit('SET_TOAST', 1);
      } else {
          this.$store.commit('SET_PLAY', false);
          // 此处应当传递是否购买的参数。0为未购买，1为已购买
          this.$router.push({
              path: 'video-play',
              query: {
                  courseId: String(this.courseId),
                  courseName: this.courseName,
                  isBuy: String(this.isBuy),
              },
          });
      }
  }
  private handleToCategory() {
      this.$router.push('category');
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/index.scss';
.top-comment-box{
  width: 100%;
  height: 32px;
  @include flex-style(row,center,flex-start);
  span{
    &:nth-child(1){
      width: 32px;
      height: 32px;
      font-size: $fourteen-font;
      color: $black;
      line-height: 16px;
    }
    &:nth-child(2){
      font-size: 32px;
      color: $yellow;
      margin-left: 12px;
      margin-right: 10px;
    }
    &:nth-child(4){
      margin-left: 10px;
      font-size: $fourteen-font;
      color: $dark-gray;
      letter-spacing: 2px;
    }
  }
}
.out-box{
  width: 100%;
  .top-box{
    height: 60px;
    @include flex-style(row,center,flex-start);
    >span{
      font-size: $fourteen-font;
      color: $dark-gray;
      cursor: pointer;
      &:hover{
        color: $blue;
      }
    }
  }
  >div{
    &:nth-child(2){
      background-color: $white;
      height: 344px;
      >div:nth-child(1){
        width: 100%;
        height: 292px;
        box-sizing: border-box;
        padding: 20px;
        border-bottom: $border-style;
        @include flex-style(row,center,space-between);
        img{
          width: 450px;
          height: 250px;
          border-radius: 14px;
        }
      }
    }
    &:nth-child(3){
      @include flex-style(row,flex-start,space-between);
      margin-top: 20px;
      >div:nth-child(1){
        width: 992px;
        box-sizing: border-box;
        padding: 26px 30px;
        background-color: $white;
        min-height: 992px;
        >p{
          font-size: $fourteen-font;
          line-height: 18px;
          color: $black;
          letter-spacing: 2px;
          margin-bottom: 30px;
        }
      }
      >div:nth-child(2){
        width: 288px;
      }
    }
  }
}
.course-title{
  width: 790px;
  height: 250px;
  >div:nth-child(1){
    @include flex-style(row,center,space-between);
    >p{
      color: $black;
      font-size: $twenty-two-font;
      line-height: 24px;
    }
    >span{
      width: 27px;
      height: 24px;
    }
  }
  >div{
    @include flex-style(row,flex-start,flex-start);
    >div:nth-child(1){
      width: 607px;
      >p{
        &:nth-child(1){
          height: 46px;
          @include flex-style(row,center,flex-start);
          >span{
            color: $black;
            font-size: $twelve-font;
            letter-spacing: 2px;
          }
        }
        &:nth-child(2){
          color: $yellow;
          font-size: $thirty-font;
          line-height: $thirty-font;
        }
      }
      .btn-box {
        @include flex-style(row,flex-start,flex-start);
        >span{
          width: 160px;
          height: 46px;
          @include usual-btn($blue, $white);
          font-size: $twenty-font;
          letter-spacing: 4px;
          margin-top: 99px;
          &:nth-child(2) {
            margin-left: 30px;
          }
        }
      }
    }
  }
}
.star-line{
  margin-left: 42px;
  margin-right: 68px;
}
.star-icon{
  font-size: $twelve-font;
}
.collect-icon{
  font-size: 27px;
  color: $blue;
  cursor: pointer;
}
.watch-icon{
  font-size: $twenty-font;
  color: $dark-gray;
  margin-right: 10px;
}
.prgress-box{
  width: 126px;
  height: 126px;
  margin-top: 12px;
  @include flex-style(row,center,center);
  position: relative;
  canvas{
    position: absolute;
    top:0;
    left:0;
  }
  >div{
    width: 100px;
    height: 100px;
    @include flex-style(row,center,center);
    border-radius: 100%;
    color: $blue;
    background-color: $light-blue;
    font-size: $twelve-font;
    line-height: 20px;
    font-weight: bold;
    text-align: center;
  }
  >span{
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background-color: $blue;
    position: absolute;
    top:0;
    left: 57px;
  }
}
.right-content{
  font-size: $twelve-font;
  color: $black;
  line-height: 18px;
  letter-spacing: 2px;
}
.username{
  font-size: $twelve-font;
  color: $black;
  line-height: 18px;
}
.right-box{
  >div{
    width: 100%;
    background-color: $white;
    &:nth-child(1){
      >div{
        @include flex-style(column,center,center);
        border-bottom: $border-style;
        height: 136px;
        img{
          width: 74px;
          height: 74px;
          border-radius: 6px;
        }
        >p{
          margin-top: 7px;
        }
      }
      >p{
        padding: 16px 20px;
      }
    }

    &:nth-child(2){
      p{
        padding: 16px 20px;
      }
    }

    &:nth-child(3){
      >div{
        padding: 20px 30px;
        >div:not(:nth-child(1)){
          margin-top: 30px;
        }
        >p{
          width: 100%;
          @include flex-style(row,center,flex-end);
          margin-top: 26px;
          cursor: pointer;
        }
      }
    }
    &:nth-child(4){
      >div{
        padding: 14px 20px 20px;
        @include flex-style(row,flex-start,flex-start);
        flex-wrap: wrap;
        // align-content: space-between;
        > div:not(:nth-child(4n+1)) {
          margin-left: 18px;
        }
        img{
          width: 48px;
          height: 48px;
          border-radius: 6px;
          margin-top: 6px;
        }
        p{
          width: 48px;
          text-align: center;
        }
      }
    }
    &:not(:nth-child(1)){
      margin-top: 20px;
    }
  }
}
.right-title{
  width: 100%;
  height: 57px;
  font-size: $eighteen-font;
  color: $black;
  line-height: 57px;
  text-indent: 29px;
  border-bottom: $border-style;
}
.qq-icon{
  font-size: 36px;
  color: $blue;
  margin: 18px 126px 0;
}
</style>

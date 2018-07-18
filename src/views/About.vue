<template>
  <div>
    <div class="title-line"><svg-icon icon-class="tuijian" class="tuijian-icon"/>推荐课程</div>
    <div class="course-box">
      <courseList v-for="item in recommendList" :list="item" :key = "item.id" :showDesc="showDesc"/>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import courseList from '@/components/CourseList.vue'; // @ is an alias to /src
import NetworkRequest from '@/utils/request';

interface DefaultList {
    id: number;
    courseImg: string;
    name: string;
    techerName: string;
    studyCount: string;
    courseIntro?: string;
    sale: number;
    price: number;
}

@Component({
  components: {
    courseList,
  },
})
export default class About extends Vue {
    private recommendList: DefaultList[] = [];
    private showDesc = true;
    private mounted() {
    this.getRecommend(false);
  }
  private getRecommend(isNow: boolean) {
            // 请求推荐课程
            return new Promise((resolve, reject) => {
                NetworkRequest.streamRequest({
                    url: '/course/selectRecommendCourseList',
                    method: 'get',
                }, (response: any) => {
                    resolve();
                    this.recommendList = response.slice(0, 5);
                }, {
                    cacheName: 'recommendList',
                    cacheTime: 180000,
                    isNow,
                });
            });
        }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
.out-box{
  width: 100%;
}
.title-line{
  width: $main-width;
  height: 28px;
  @include flex-style(row,center,flex-start);
  margin: 36px auto 24px;
  color: $black;
  font-size: $twenty-font;
  letter-spacing: 3px;
}
.course-box{
  width: $main-width;
  height: 268px;
  @include flex-style(row,center,flex-start);
  margin: auto;
  >div:not(:nth-child(1)){
    margin-left: 20px;
  }
}
.tuijian-icon{
  font-size: 44px;
  // margin-right: 10px;
}
</style>

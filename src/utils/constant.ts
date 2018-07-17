/**
 * 常量文件，项目中用到的所有常量均在此处声明
 * @author dy
 * @createDate 2018/03/05
 * @updateDate
 */

const CACHE_NAME = {
    // 课程方向和分类列表
    DIRECTION_LIST: {
        NAME: 'directionList',
        TIME: 1800000,
    },
    // 推荐课程
    RECOMMEND_LIST: {
        NAME: 'recommendList',
        TIME: 3600000,
    },
    // 首页案例展示
    ANLI_LIST: {
        NAME: 'anliList',
        TIME: 1800000,
    },
    // 首页轮播图展示、
    HOME_BANNER_LIST: {
        NAME: 'homeBannerList',
        TIME: 1800000,
    },
    // 首页教师展示
    HOME_TEACHER_LIST: {
        NAME: 'homeTeacherList',
        TIME: 1800000,
    },
    // 首页课程展示
    HOMECOURSE_LIST: {
        NAME: 'homeCourseList',
        TIME: 3600000,
    },
    // 所有课程展示
    ALLCOURSE_LIST: {
        NAME: 'allCourseList',
        TIME: 3600000,
    },
    // 所有课程展示--课程排名
    RANKCOURSE_LIST: {
        NAME: 'rankCourseList',
        TIME: 3600000,
    },
    // 收藏课程
    COLLECT_LIST: {
        NAME: 'collectList',
        TIME: 1800000,
    },
    // 收藏中课程相关推荐
    COLLECT_RELATED: {
        NAME: 'recommendList',
        TIME: 3600000,
    },
    // 课程订单列表
    ORDER_LIST: {
        NAME: 'orderList',
        TIME: 1800000,
    },
    // 消息列表
    MESSAGE_LIST: {
        NAME: 'newsList',
        TIME: 1800000,
    },
    // 合作机构列表
    COMPANY_LIST: {
        NAME: 'companyList',
        TIME: 1800000,
    },
    // 学习中课程列表
    STUDY_LIST: {
        NAME: 'studyList',
        TIME: 1800000,
    },
    // 收益列表
    EARNING_INFO: {
        EARNING_LIST: {
            NAME: 'earningList',
            TIME: 1800000,
        },
        YESTERDAY_NUM: {
            NAME: 'yesterdayNum',
            TIME: 1800000,
        },
    },
    // 课程首页banner
    COURSE_BANNER_LIST: {
        NAME: 'courseBannerList',
        TIME: 1800000,
    },
    // 用户评论
    COMMENT_LIST: {
        NAME: 'commentList',
        TIME: 3600000,
    },
    // 系统信息：二维码和下载地址
    CONFIG_INFO: {
        QR_CODE: {
            NAME: 'qrCode',
            TIME: 7200000,
        },
        DOWNLOAD_URL: {
            NAME: 'appUrl',
            TIME: 7200000,
        },
    },

};
const IMG_URL = {
    // 首页
    HOME: {
        BANNER1: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/home/course03.jpg',
        BANNER2: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/home/course04.jpg',
        BANNER3: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/home/course05.jpg',
        WELCOME: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/home/welcome1.png',
    },
    // 首页文件
    COURSE_INDEX: {
        // 头像背景文件
        AVTOR_BG: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/course-index/avtor-bg.png',
        // 登录
        LOGIN_BG: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/course-index/login.png',
        // 没有数据
        NO_LIST: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/course-index/no-list.png',
    },
    CONFIG_IMG: {
        // 支付成功按钮
        PAY_BTN: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/config-img/btn.png',
        // 没有收藏列表的图标
        COLLECT_NULL: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/config-img/collect-null.png',
        // 渐变色
        COLOR: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/config-img/color.png',
        // 评论为空
        COMMENT_NULL: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/config-img/comment-null.png',
        // 图片加载失败
        ERROR: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/config-img/error.png',
        // 底部LOGO
        FOOTER_LOGO: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/config-img/footer-logo.png',
        // 图片加载中
        LOADING: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/config-img/loading.png',
        // logo
        LOGO: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/config-img/logo.png',
        // 没有消息
        NEWS_NULL: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/config-img/news-null.png',
        // pdf示意图
        PDF_ITEM: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/config-img/pdf-item.png',
        // 搜索结果为空
        SEARCH_NULL: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/config-img/search-null.png',
        // 学习课程为空
        STUDY_NULL: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/config-img/study-null.png',
        // 支付成功图标
        PAY_SUCCESS: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/config-img/success.png',
        // 个人中心消息为空
        MESSAGE_NULL: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/config-img/message-null.png',
        // 个人中心消息logo
        MESSAGE_AVTOR: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/config-img/avtor.png',
        // 上传课程的默认图片
        CREATE_VIDEO: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/config-img/video-img.png',
    },
    ENTERS: {
        // 入驻页的头图
        BANNER: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/enters/banner.png',
        // 入驻企业图标
        ENTER1: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/enters/enter1.png',
        ENTER2: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/enters/enter2.png',
        ENTER3: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/enters/enter3.png',
        ENTER4: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/enters/enter4.png',
        ENTER5: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/enters/enter5.png',
        ENTER6: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/enters/enter6.png',
        ENTER7: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/enters/enter7.png',
        ENTER8: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/enters/enter8.png',
        ENTER9: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/enters/enter9.png',
        ENTER10: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/enters/enter10.png',
        // 入驻类型为组织
        ORGANIZATION: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/enters/organization-icon.png',
        // 入驻类型为教师
        TEACHER: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/enters/teacher-icon.png',
        STEP3: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/enters/enters3.png',
    },
    USER: {
        // 默认头像
        DEFAULT: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/user/default.png',
        // 手持身份证背面照
        ID_BACK: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/user/id-back.png',
        // 手持身份证正面照
        ID_FRONT: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/user/id-front.png',
        // 手持身份证半身照
        ID_HALF: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/user/id-half.png',
    },
    LOGIN: {
        // 登录、忘记密码页面
        LOGIN_BG: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/login/popup-bg1.png',
        // 注册页面
        REGISTER_BG: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/login/popup-bg.png',
        // 登录页面logo
        LOGIN_LOGO: 'https://vrlab.oss-cn-beijing.aliyuncs.com/images/static-img/login/white-logo.png',
    },
};
export {
    CACHE_NAME,
    IMG_URL,
};

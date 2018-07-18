import router from './router';
import store from './store/index';

router.beforeEach((to, from, next) => {
    if (localStorage.getItem('TokenKey')) { // determine if there has token
        if (!store.state.user.userInfo) { // 判断当前用户是否已拉取完user_info信息
            store.dispatch('getUserInfo');
        }
        next();
    } else {
        next();
    }
});

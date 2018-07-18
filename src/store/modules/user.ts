import NetworkRequest from '@/utils/request';


const state = {
    token: localStorage.getItem('TokenKey'),
    name: '',
    avtor: null,
    userInfo: null,
    isNow: false,
    phone: '',
};

const mutations = {
    SET_TOKEN: (state: any, token: string) => {
        state.token = token;
    },
    SET_NAME: (state: any, name: string | null) => {
        state.name = name;
    },
    SET_AVATAR: (state: any, avtor: string | null) => {
        state.avtor = avtor;
    },
    SET_INFO: (state: any, info: any) => {
        state.userInfo = info;
    },
    SET_NOW: (state: any, flag: boolean) => {
        state.isNow = flag;
    },
    SET_PHONE: (state: any, phone: string) => {
        state.phone = phone;
    },
};
const actions = {
    LoginByTel({
        commit,
        dispatch,
    },         userInfo: any) {
        return new Promise((resolve, reject) => {
            let loginObject = {
                phone: userInfo.tel,
                password: userInfo.pass,
            };
            if (userInfo.checked) {
                loginObject = {
                    ...loginObject,
                    noLogin: 1,
                };
            }
            NetworkRequest.streamRequest({
                url: '/user/login',
                method: 'post',
                data: loginObject,
            }, (response: any) => {
                commit('SET_TOKEN', response);
                localStorage.setItem('TokenKey', response);
                resolve(response);
                dispatch('getUserInfo');
            });
        });
    },


    // 获取用户信息
    getUserInfo({ commit }) {
        return new Promise((resolve, reject) => {
            NetworkRequest.streamRequest({
                url: '/user/getUserInfo',
                method: 'get',
            }, (response: any) => {
                commit('SET_INFO', response);
                commit('SET_NAME', response.username || response.phone);
                commit('SET_PHONE', response.phone);
                resolve(response);
            });
        });
    },

    // 登出
    logOut({ commit }) {
        return new Promise((resolve, reject) => {
            NetworkRequest.streamRequest({
                url: '/user/logout',
                method: 'get',
            }, (response: any) => {
                commit('SET_TOKEN', '');
                commit('SET_INFO', null);
                localStorage.removeItem('TokenKey');
                resolve(response);
            });
        });
    },
};

export default { state, actions, mutations };

/* !
 * networkRequest
 *
 * request网络请求
 *
 * @author dongyu
 * @version 1.0.0 2017/12/25
 * @version 1.0.1 2018/4/17
 */

// import { Message, MessageBox } from 'element-ui';
import router from '@/router';
// import Cookies from 'js-cookie';
import store from '@/store';
import axios from 'axios';

// 创建axios实例
const service = axios.create({
    baseURL: 'http://192.168.1.18:8080', // api的base_url
    timeout: 5000, // 请求超时时间
});

// request拦截器
service.interceptors.request.use((config) => {
    // Do something before request is sent
    // if (store.state.user.token) {
    //     config.headers.token = localStorage.getItem('TokenKey'); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    // }
    return config;
}, (error) => {
    // Do something with request error
   Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
    (response) => response,
    (error) => {
        // Message({
        //     message: error.message,
        //     type: 'error',
        //     duration: 5 * 1000,
        // });
        return Promise.reject(error);
    });


/**
 * 带缓存的request请求
 *
 * @param cacheName 缓存名称(必传)
 * @param cacheTime 缓存时间(单位: 毫秒)(必传)
 * @param isNow 是否立即请求(true: 立即请求)(必传)
 * @param successCallback 成功回调函数(非必传)
 * @param failedCallback 失败回调函数(非必传)
 */

const NetworkRequest = new class {
    public handleRequest(settings, successCallback, cacheParams, flag) {
        service(settings).then((response) => {
            if (response.data.result === '100') {
                if (flag) {
                    if (cacheParams.cacheTime < 0) { cacheParams.cacheTime = 3600000; }
                    const result = { data: response.data, expiration: new Date().getTime() + cacheParams.cacheTime };
                    localStorage.setItem(cacheParams.cacheName, JSON.stringify(result));
                }
                if (successCallback) {
                    if (response.data.data || response.data.data === null) {
                        return successCallback(response.data.data);
                    } else {
                        return successCallback(response.data);
                    }
                }
            }
        });
    }

    public requestAndCache(settings: object, successCallback, cacheParams: object) {
        const cacheName: string = cacheParams.cacheName;
        const cacheTime: number = cacheParams.cacheTime;
        const isNow: boolean = cacheParams.isNow;
        let data = localStorage.getItem(cacheName);
        if (data && !isNow) {
            data = JSON.parse(data);
            if (parseInt(data.expiration, 0) - new Date().getTime() > 3000) {
                if (successCallback) { successCallback(data.data.data); }
                return;
            }
        }
        // 当前请求为请求缓存，但是缓存中没有，需要去请求服务器
        this.handleRequest(settings, successCallback, cacheParams, true);
    }

    public streamRequest(settings: object, successCallback, cacheParams: object) {
        if (!settings.url) { throw new Error('缺少url参数'); }
        if (settings.method === 'get') {
            // 解决IE不刷新则不请求的BUG;
            settings.params = {
                ...settings.params,
                time: new Date().getTime(),
            };
            if (cacheParams) {
                this.requestAndCache(settings, successCallback, cacheParams);
                return;
            }
        } else if (!settings.method) {
            throw new Error('缺少method参数');
        }

        this.handleRequest(settings, successCallback, null, false);
    }
}();

export default NetworkRequest;

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './beforeJump';
import './icons';
import '@/styles/element.scss';
import {
    Pagination,
    Dialog,
    Input,
    Cascader,
    Button,
    Table,
    DatePicker,
    Form,
    FormItem,
    MessageBox,
    Message,
    Radio,
    Checkbox,
    RadioGroup,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
// 阻止vue在启动时生成生产提示

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Cascader);
Vue.use(Button);
Vue.use(Table);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Checkbox);

Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');

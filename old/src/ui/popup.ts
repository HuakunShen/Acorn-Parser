import { createApp } from 'vue';
import Popup from '@/ui/Popup.vue';
import router from '@/ui/router';
import store from '@/ui/store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

createApp(Popup).use(ElementPlus).use(store).use(router).mount('#app');

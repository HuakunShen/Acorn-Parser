import { createApp } from 'vue';
import Options from '@/ui/Options.vue';
import router from '@/ui/router';
import store from '@/ui/store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

createApp(Options).use(ElementPlus).use(store).use(router).mount('#app');

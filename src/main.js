import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router.js'
import store from './store/index.js';

//ui 
import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';
import PageHeader from './components/layout/PageHeader.vue';


const app = createApp(App);

app.use(router);
app.use(store);
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('page-header', PageHeader);

app.mount('#app');
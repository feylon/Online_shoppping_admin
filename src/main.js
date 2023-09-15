import { createApp } from 'vue'
import App from './App.vue';
import {router} from "../routers/index.js";
import { ref } from "firebase/storage";
import {createPinia} from "pinia";
import "../src/style.css";

window.ref = ref;

let app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#app')





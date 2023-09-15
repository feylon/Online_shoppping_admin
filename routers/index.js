// import admin_panel from "../src/components/admin_panel.vue";
import main from "../src/components/main_page.vue";
import bosh_sahifa from "../src/components/Boshsahifa.vue";
import brands from "../src/components/brands.vue";
import login_page from "../src/components/login_page.vue";
import history from "../src/components/history.vue";
import own_info from "../src/components/own_info.vue";
import users from "../src/components/users.vue";
import edit_brand from "../src/components/ichki/edit_brand.vue";
import edit from "../src/components/edit.vue";
import sale_done from "../src/components/sale_done.vue";
import   {global_funksiya} from "../store/index.js";

import { createRouter,createWebHashHistory } from "vue-router";

let router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {path:"/login", name:"login",component:login_page},
        {path:"/:pathMatch(.*)",component:login_page},
        {path:"/",component:main,
            children:[
        {path:"/home",component:bosh_sahifa,name:"home"},
        {path:"/brands",component:brands},
        {path:"/history",component:history},
        {path:"/own_info",component:own_info},
        {path:"/users",component:users},
        {path:"/edit:name",name:"edit",props:true,component:edit},
                {path:"/sale_done",component:sale_done}
        ]}
    ]
});

router.beforeEach((to, from) => {
//    console.log(global_funksiya.state.auth)
let store = global_funksiya();
    if (to.name !== 'login' && !store.auth) return({ name: 'login' })
    
    if(to.path == "/") return ({name:'home'});

    
   });





export {router}



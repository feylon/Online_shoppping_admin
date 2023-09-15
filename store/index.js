import { defineStore } from "pinia";
export let global_funksiya = defineStore("counter",{
    state:() =>{
        return {count :0,
        menus : [true,false,false,false,false],
        auth : false,
        user:{
            useruid:"",
            user_profil_picture : ""
        }, 
        document:{
            dark :false
        },
        userdata:{

        },
        preveod:[]
        }
    },
    actions:{
        addone(){
            this.count ++;
        },
        menu_change(i){
            this.menus = [false,false,false,false,false];
            this.menus[i] = true;
        }
    }
});
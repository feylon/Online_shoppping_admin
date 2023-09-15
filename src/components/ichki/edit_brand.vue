<template>
  
    <div class="h5">ni tahrirlash</div>
    
    <div class="lll"></div>
    
     
    
    
    
    
    
    
    
    
    
    
    </template>
    <script setup>
    import { useRoute, useRouter } from "vue-router";
    import {ref,onMounted} from "vue";
    import { doc, onSnapshot } from "firebase/firestore";
    import {db} from "../../../google/index.js";
    let router = useRouter()
    let route = useRoute();
    let name = ref(route.params.name);
    // const unsub = onSnapshot(doc(db, "brands", name.value), (doc) => {
    //     console.log("Current data: ", doc.data());
    // });
    
    
    let nomi = ref();
    let narx = ref();
    let discount = ref();
    let time = ref();
    let url = ref();
    let hajm = ref();
    let hisob = ref();
    let title = ref();
    </script>
    <style scoped></style>
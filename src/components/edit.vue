<template>
    <div class="h5">"{{this.$route.params.name}}"ni tahrirlash</div>
    edit1 kelgan ma'lumot : {{this.$route.params}}
    <button class="btn btn-primary" @click="console.log(this.$route.params)"> {{this.$route.params}}</button>
    {{ data }}
</template>
<script setup>
//  import {useRoute} from "vue-router";
//  import { ref } from "vue";
//  /*Google firebase */
//  import { doc, getDoc } from "firebase/firestore";
//  import {db} from "../../google/index.js";
//  let route = useRoute();
// console.log(route.params)

// const docRef = doc(db, "brands", route.params.name);
// const docSnap = await getDoc(docRef);
// let data = ref()
// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());

//   data.value = docSnap.data()
// } else {
//   // docSnap.data() will be undefined in this case
//   console.log("No such document!");
// }
</script>
<style></style>
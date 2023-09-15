<template>
<h5>Shaxsiy ma'lumotlar</h5>
<div class="container">

    <div class="row mt-4">
<div class="col-5 ">
   <div class="d-flex">
    <div class="d-flex mt-2 w-50 flex-column gap-4"><label class="h6" for="">Ism</label>
        <label class="h6" for="">Familiya</label>
        <label class="h6" for="">Yosh</label>
        <label class="h6" for="">Email</label>
       
</div>

<div class="d-flex flex-column gap-3">
        <input :class="store.document.dark ? 'bg-dark text-light ':''" v-model="ism" :readonly="!change" type="text" class="form-control">
        <input :class="store.document.dark ? 'bg-dark text-light ':''" v-model="fam" :readonly="!change"  type="text" class="form-control">
        <input :class="store.document.dark ? 'bg-dark text-light ':''" v-model="yosh" :readonly="!change"  type="text" class="form-control">
        <input :class="store.document.dark ? 'bg-dark text-light ':''" v-model="email" :readonly="!change"  type="text" class="form-control">
       
</div>
   </div>

<div  class="d-flex  justify-content-around mt-4">
        <button v-if="change" @click="undo" class="  btn btn-outline-danger">Bekor qilish</button>
    <button v-if="!change"  @click="change = !change" class="btn btn-outline-primary"><i class="fas fa-pen"></i> O'zgartirish</button>

    <button v-if="change" 
    :disabled="(store.admin.ism != ism || store.admin.familiya != fam || store.admin.yoshi != yosh || store.admin.email != email)?false:true"
    @click="change_function" class="btn btn-outline-success"><i class="fas fa-file-arrow-up"></i> Saqlash</button>

</div>

</div>
<div class="col-7 d-flex justify-content-center me_picture_section">
<img class="me_picture" :src="profil_picture" alt="">
<label  for="profil_picture">
   
    <i class="fas fa-camera-rotate"></i>

</label>
</div>
</div>





</div>
<input @change="update_profil_picture" ref="file" v-show="false" type="file" name="" id="profil_picture" accept="imyoshi/*">
</template>
<script setup>
import {ref, onMounted} from "vue";
import   {global_funksiya} from "../../store/index.js";
import { doc, onSnapshot,updateDoc   } from "firebase/firestore";
import { getStorage,getDownloadURL,uploadBytes  } from "firebase/storage";
import {storage,db} from "../../google/index.js";

let store = global_funksiya();
let file = ref()
let ism = ref(store.admin.ism);
let fam = ref(store.admin.familiya);
let yosh = ref(store.admin.yoshi);
let email = ref(store.admin.email);
let change = ref(false);
let profil_picture = ref("")

let changed_check = ref(false)


let change_function = async ()=>{
if ("" != ism.value && "" != fam.value && "" != yosh.value && "" != email.value)
{
    await updateDoc(doc(db, "users",  store.user.useruid ), {
"ism" : ism.value,
"familiya":fam.value,
"yoshi":yosh.value,
"email":email.value
   
    
});

 
    

change.value = (false);

}
else{alert("Maydon bo'sht bo'lishi mumkin emas")}
}
let undo = ()=>{
    const unsub = onSnapshot(doc(db, "users",  store.user.useruid ), (doc) => {
    
ism.value = doc.data().ism;
fam.value = doc.data().familiya;
yosh.value = doc.data().yoshi
email.value = doc.data().email; 
});
change.value = (false);
}
// Array.prototypeval
onMounted(()=>{

const unsub = onSnapshot(doc(db, "users",  store.user.useruid ), (doc) => {
ism.value = doc.data().ism;
fam.value = doc.data().familiya;
yosh.value = doc.data().yoshi
email.value = doc.data().email; 


const storage = getStorage();
getDownloadURL(window.ref(storage, `users/${ store.user.useruid }/profile.jpg`))
  .then(async(url) => {
    profil_picture.value = url;
   
 
  })
  .catch((error) => {
   console.log(error);
  });

});


})

let update_profil_picture = async ()=>{
const storageRef = window.ref(storage,`users/${ store.user.useruid }/profile.jpg`);
await    uploadBytes(storageRef,file.value.files[0]);
getDownloadURL(window.ref(storage, `users/${ store.user.useruid }/profile.jpg`))
  .then(async(url) => {
    profil_picture.value = url;
    store.user.user_profil_picture = url;
    await updateDoc(doc(db, "users",  store.user.useruid ), {
  
  "url" : url
 
  
});


  })

}
</script>
<style scoped>
.me_picture{
    width: 300px;
    height: 300px;
    border-radius: 50%;

    }
    .me_picture_section{
        position: relative;
        
    }
    .me_picture_section label{
        width: 70px;
        height: 70px;
        position: absolute;
        border:none;
        border-radius: 50%;
        bottom: 5px;
        background: none;
        color: white;
        font-size: 25px;
        transition: 0.5s all ease;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        }
        .me_picture_section label:hover{
            background:white;
            color: #0E4BF1;
        }
</style>
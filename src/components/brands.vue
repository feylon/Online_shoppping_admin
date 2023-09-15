<template>

<div class="h5">
  Ma'lumot qo'shish
</div>
<div class="container">
  <div v-if="loading" class="justify-content-around d-flex loading align-items-center">
    <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
  </div>
<form v-else @submit.prevent="yuborish" class="adder_brand">

<div class="d-flex flex-wrap  justify-content-around">
<div class="label_input align-items-center d-flex justify-content-around mt-3">
<label class="me-3 h6" for="name">Nomi</label>
<input :class="store.document.dark ? 'bg-dark text-light ':''" v-model="name" type="text" id="name" class="form-control">
</div>


<div class="label_input align-items-center d-flex justify-content-around mt-3">
<label class="me-3 h6" for="narx">Narxi</label>
<input :class="store.document.dark ? 'bg-dark text-light ':''"  type="number" min="0" v-model="narx" id="narx" class="form-control">
</div>

<div class="label_input align-items-center d-flex justify-content-around mt-3">
<label class="me-3 h6" for="time">Hajm</label>
<input :class="store.document.dark ? 'bg-dark text-light ':''" type="number" min="0" v-model="hajm" id="time" class="form-control">
</div>


<div class="label_input align-items-center d-flex justify-content-around mt-3">
<label class="me-3 h6" for="discount">Chegirma</label>
<input :class="store.document.dark ? 'bg-dark text-light ':''" type="number" min="0" max="99" v-model="discount" id="discount" class="form-control">
</div>



<div class="label_input align-items-center d-flex justify-content-around mt-3">
<label class="me-3 h6" for="time">Kelgan vaqti</label>
<input :class="store.document.dark ? 'bg-dark text-light ':''" type="datetime-local" v-model="time" id="time" class="form-control">
</div>


<div v-if="!yangi_tip" class="label_input align-items-center d-flex justify-content-around mt-3">
<label class="me-3 h6" for="tip">Tip</label>
<select :class="store.document.dark ? 'bg-dark text-light ':''" v-model="tip" class="form-select" id="tip" aria-label="Default select example">
  <option  v-for="(i,j) in tip_items" :value="i.value" :key="j">{{i.value}}</option>
</select>
</div>


<div v-else class="label_input align-items-center d-flex justify-content-around mt-3">
<label class="me-3 h6" for="new_tip">Yangi tipni kiriting</label>
<input :class="store.document.dark ? 'bg-dark text-light ':''" type="text" id="new_tip" v-model="new_tip" class="form-control w-50">
<button class="btn btn-primary ms-2"  @click="add_tip">+</button>
</div>

<div class="label_input align-items-center d-flex justify-content-around mt-3">
  <div class="form-check">
  <input :class="store.document.dark ? 'bg-dark text-light ':''" @click="yangi_tip = !yangi_tip" v-model="yangi_tip" class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
  <label class="form-check-label" for="flexCheckChecked">
Yangi tip qo'shish
  </label>
</div> 
</div>

<div class="label_input align-items-center d-flex justify-content-around mt-3">
<label  class="me-3 h6" for="file">Rasmni tanlash</label>
<input :class="store.document.dark ? 'bg-dark text-light ':''" @change="load_file" type="file" ref="file" id="file" class="form-control"  accept="image/*">
</div>




<div class="label_input align-items-center d-flex justify-content-around mt-3">
<label class="me-3 h6" for="hisob">Hisob</label>
<select :class="store.document.dark ? 'bg-dark text-light ':''" v-model="hisob" class="form-select" id="hisob" aria-label="Default select example">
  <option value="KG" selected> KG</option>
  <option value="Litr">Litr</option>
  <option value="M^(3)">M^(3)</option>
  <option value="Dona">Dona</option>

</select>
</div>









</div>

<div class="mt-3 w-50 m-auto">
  <div class="form-floating">
  <textarea :class="store.document.dark ? 'bg-dark text-light ':''"  v-model="title" class="form-control adder_textarea" placeholder="Leave a comment here" id="title" style="height: 100px"></textarea>
  <label for="title">Tovar haqida</label>
</div>


</div>

<div class="buttons d-flex justify-content-around mt-4">
<button type="reset" class="btn btn-outline-danger"><i class="far fa-trash-can"></i>  Tozalash</button>
<button :disabled="!(name && narx && hajm && time && tip && file && hisob && title) ?true:false" type="submit" class="btn btn-outline-success"><i class="fas fa-circle-plus"></i> Qo'shish</button>
</div>

</form>


</div>

<div class="h5 mt-3">Mavjud mahsulotlar</div>
<hr>
<div class=" mt-4">
  <div class="search_section">
    <input :class="store.document.dark ? 'bg-dark text-light ':''" v-model="searcher_value" @input="searcher_name()" type="text" class ="form-control w-25 search_section_value">
    <i :class="store.document.dark ? 'text-light ':''" class="fas fa-magnifying-glass lupa"></i>
  </div>
  <table class="table table-hover text-center mt-2" :class="store.document.dark ? 'table-dark ':''">
      <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col" @click="sort_name">Nomi
         <i class="fas fa-arrow-down-z-a"></i>
      </th>
      <th scope="col">Narxi</th>
      <th scope="col">Chegirma</th>
      <th scope="col">Vaqti</th>
      <th scope="col">Tipi 

        <select :class="store.document.dark ? 'bg-dark text-light ':''" @change="filter"  v-model="tip1" class="form-select" id="tip" aria-label="Default select example">
          <option value=""></option>
  <option  v-for="(i,j) in tip_items" :value="i.value" :key="j">{{i.value}}</option>
</select>

      </th>
      <th scope="col">Rasmi</th>
      <th scope="col">Hajmi</th>
      <th scope="col">Tovar haqida</th>
      <th scope="col"></th>



    </tr>
  </thead>
  <tbody v-if="data.length">
    <tr v-for="(i,j) in data" :key="j" class="text-center pt-4">
      <th class="pt-4" scope="row">{{j + 1}}</th>
      <td class="pt-4">{{i.name}}</td>
      <td class="pt-4">{{i.narx}}</td>
      <td class="pt-4">{{i.discount}}</td>
      <td class="pt-4"> {{new Date(i.time).toLocaleString()}}</td>
      <td class="pt-4">{{i.tip}}</td>
      <td>
<img :src="i.url" alt="" class="Table-img">

      </td>
      <td class="pt-4">{{ i.hajm }} {{ i.hisob }}</td>
      <td  style="max-width: 100%!important" class="table_title">{{i.title}}</td>
      <td class="">
        <!-- <router-link :to="{name:'edit', params:{name:i.name}}" class="btn btn-outline-success mt-3 me-2"><i class="fas fa-pen"></i></router-link> -->
        <button @click="delete_item(i.name)" class="btn btn-outline-danger ms-2 mt-3"><i class="far fa-trash-can"></i></button>
        
      </td>



    </tr>
    
  </tbody>
<tbody v-else>
  <tr>
    <td colspan="10" class="text-center w-100 pb-3 pt-3">
    Ma'lumot mavjud emas
    </td>
  </tr>
</tbody>
  </table>
</div>

</template>
<script setup>
import { ref, onMounted } from 'vue';
import { global_funksiya } from '../../store';
let store = global_funksiya();
/*Google firebase */
import { doc, onSnapshot, setDoc, updateDoc,collection,deleteDoc, orderBy, limit, where, query   } from "firebase/firestore";
import { getStorage,uploadBytes,getDownloadURL } from "firebase/storage";
const storage = getStorage();
import {db} from "../../google/index.js";
let loading = ref(false); 
let yangi_tip = ref(false); 
 let err = ref(false);
 let discount = ref("0");
 let hajm = ref("");
 let hisob = ref("");
 let name = ref("");
 let narx = ref("");
 let time = ref("");
 let tip = ref("");
 let new_tip = ref("");
 let title = ref("");
 let url = ref("");
 let file = ref();
let tip_items = ref([]);
//Jadval uchun
let path = ref(query(collection(db, "brands")));;
let data = ref([]);
const unsubscribe = onSnapshot(path.value, (querySnapshot) => {
  data.value = data.value.slice(0,0);
  querySnapshot.forEach((doc) => {
      data.value.push(doc.data());
  });
});
  
 
//Jadval uchun

 let load_file = ()=>{
  // console.log(file.value.files[0]);
if((file.value.files[0].size / (1024 * 1024)).toFixed(2) > 2){alert(`Fayl hajmi 2mbdan oshishi mumkin emas,\n Sizning faylingizni hajmi ${(file.value.files[0].size / (1024 * 1024)).toFixed(2)} MB`);file.value = null;return}

 }
 let yuborish = ()=>{
  // console.log(" Yuboruish");
  loading.value = true;
  uploadBytes(window.ref(storage, 'Tovarlar/'+ name.value), file.value.files[0]).then(() => {
    const storage = getStorage();
getDownloadURL(window.ref(storage, 'Tovarlar/'+ name.value))
  .then(async (url) => {
  //  console.log(url);

   await setDoc(doc(db, "brands",name.value ), 
{
    discount:discount.value,
    hajm : hajm.value,
    hisob:hisob.value,
    name:name.value,
    narx:narx.value,
    time:time.value,
    tip:tip.value,
    title:title.value,
    url:url
}

).then((i)=>{
  


  discount.value = "";
hajm.value = "";
hisob.value = "";
name.value = "";
narx.value = "";
time.value = "";
tip.value = "";
title.value = "";
file.value = null;

  loading.value = false;
}).catch((xato)=>{
  console.log("Set docda xatolik",xato)
});

  })
  .catch((error) => {
    console.log("Loading URlda xatolik",error)
  });

}).catch(upload=>{console.log(`uploadda xatolik`,upload)});
 }



 let add_tip = async ()=>{

if(Boolean((tip_items.value.filter(j=>{return j.value.includes(new_tip.value.trim().toLowerCase())})).length)){alert("Bu to'lam mavjud");return;};
await setDoc(doc(db, "tiplar",new_tip.value ), 
{
  value:new_tip.value.toLowerCase()
}

).then((i)=>{new_tip.value = "";yangi_tip.value = false;});
}
//table
// let path = ref(query(collection(db, "brands"), where("name", "==", "OLma")));;
let sorted = ref(false);

let sort_name = function (){
  sorted.value = !sorted.value;
  if(sorted.value)
  path.value = (query(collection(db,"brands"),orderBy("name", "desc")));
  else
  path.value = (query(collection(db,"brands"),orderBy("name")));; 

  
  const unsubscribe = onSnapshot(path.value, (querySnapshot) => {
  data.value = data.value.slice(0,0);
  querySnapshot.forEach((doc) => {
      data.value.push(doc.data());
  });
});
};
let searcher_value = ref("");
let searcher_name = ()=>{
  if(searcher_value.value)
  path.value = (query(collection(db,"brands"),where("name", "==", searcher_value.value))); 
  else
  path.value = (query(collection(db, "brands")));
  
const unsubscribe = onSnapshot(path.value, (querySnapshot) => {
data.value = data.value.slice(0,0);
querySnapshot.forEach((doc) => {
    data.value.push(doc.data());
});
});
}
let tip1 = ref("")
let filter = ()=>{
// console.log(tip1.value);
if(tip1.value){
  path.value = (query(collection(db,"brands"),where("tip", "==", tip1.value.trim()))); 
}
else{
  path.value = (query(collection(db, "brands")));
};
const unsubscribe = onSnapshot(path.value, (querySnapshot) => {
data.value = data.value.slice(0,0);
querySnapshot.forEach((doc) => {
    data.value.push(doc.data());
});
});
}
 onMounted(()=>{
  
  onSnapshot(
        (collection(db, "tiplar")), 
        (snapshot) => {
          tip_items.value = tip_items.value.slice(0,0); 
snapshot.docs.forEach(i=>{tip_items.value.push(i.data())})


},
  (error) => {
console.log(error)
  });


 
});
 //yuborish tugadi

let delete_item = async (name)=>{
if(confirm(`${name} nomli tovar o'chirilsinmi ?` ) ){
await deleteDoc(doc(db, "brands", name));}
}











</script>
<style scoped>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css";
.adder_textarea{
  resize: none;
}
.loading{
  height: 400px;
}
.Table-img{
  width: 100px;
  height: 100px;
  border-radius: 20px;
  transition: 0.5s ease all;
}
.Table-img:active{
  transform: scale(4);
}
.table_title{
  font-size: 14px;
  text-align: center;
  max-width: 50px!important;

}
.lupa{
  position: absolute;
  left: 8px;
  top: 30%;
  color: rgb(58, 58, 58);
}
.search_section{
  position: relative;
}
.search_section_value{
padding-left: 35px;
}
</style>
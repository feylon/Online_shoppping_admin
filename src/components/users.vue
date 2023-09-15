<template>
    <div class="h5 mt-2">Foydalanuvchilar</div>
    


    <div class="container">
        <table :class="store.document.dark ? 'table-dark table-striped ':''" class="table">
      <thead>
    <tr>
      <th class="text-center" scope="col">#</th>
      <th class="text-center" scope="col">F. I</th>
      <th class="text-center" scope="col">Yoshi</th>
      <th class="text-center" scope="col">Email</th>
      <th class="text-center" scope="col">Puli</th>
      <th class="text-center" scope="col">Profil rasmi</th>
      <th class="text-center" scope="col">Aktivligi</th>


    </tr>
  </thead>
  <tbody>
    <tr v-for="(i,j) in data" scope="row">
      <th class="text-center" >{{ j + 1 }}</th>
      <td class="text-center h6">{{ i.familiya }} {{ i.ism }}</td>
      <td class="text-center">{{ i.yoshi }}</td>
      <td class="text-center">
       {{ i.email }}
      </td>
      <td class="text-center"><b>{{ i.money }}</b> so'm</td>
      <td class="text-center">
<img class="profil_pic" :src="i.url" alt="">

      </td>
<td class="class-center ">
    <input v-model="active"  @change="unactive(i.useruid)" class="form-check-input m-auto ms-3" type="checkbox" :value="i.active?'true':'false'" id="flexCheckDefault" :checked="i.active">
  <!-- <button @click="deleter((i.useruid))"  class="btn btn-outline-danger">
    <i class="far fa-trash-can"></i>
  </button> -->
</td>
    </tr>
  </tbody>

  </table>
    </div>
    </template>
    <script setup>

import   {global_funksiya} from "../../store/index.js";
let store = global_funksiya();
import { ref,onMounted } from 'vue';
import {useRouter} from "vue-router";
/* Google firebase */
import { getAuth, deleteUser } from "firebase/auth";
const auth = getAuth();
import { doc, onSnapshot,collection, query, updateDoc   } from "firebase/firestore";

import {db} from "../../google//index.js";
let router = useRouter();
let data = ref([]);
let path = ref(query(collection(db, "admin_sale_history")));
let route = useRouter();
let active = ref("")
onMounted(()=>{
    const q = query(collection(db, "users"));
 onSnapshot(q, (querySnapshot) => {
  data.value = [];
    querySnapshot.forEach((doc) => {
    //   console.log(doc.id);
      if(store.user.useruid != doc.id){
        let obj = doc.data();
        obj.useruid = doc.id;
        data.value.push(obj);

}
});
data.value = data.value.reverse()
    });


});

let unactive = async (useruid)=>{
    const washingtonRef = doc(db, "users", useruid);

await updateDoc(washingtonRef, {
  active: active.value
});

}


</script>
    <style scoped>
.profil_pic{
    width: 80px!important;
    height: 80px!important;
    border-radius: 50%;
    /* display: none!important; */
}

</style>
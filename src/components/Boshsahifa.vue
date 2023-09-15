<template>
 <div class="">
<div class="h5">Oxirgi to'lovlar</div>

<table :class="store.document.dark ? 'table-dark table-striped ':''" class="table">
      <thead>
    <tr>
      <th class="text-center" scope="col">#</th>
      <th class="text-center" scope="col">Xarajat miqdori</th>
      <th class="text-center" scope="col">Vaqti</th>
      <th class="text-center" scope="col">Mahsulotlar</th>
      <th class="text-center" scope="col">Foydalanuvchi</th>
      <th class="text-center" scope="col">Ismi</th>

    </tr>
  </thead>
  <tbody>
    <tr v-for="(i,j) in data" scope="row">
      <th class="text-center" >{{j + 1}}</th>
      <td class="text-center">{{i.summa}}</td>
      <td class="text-center">{{i.time}}</td>
      <td class="text-center">
        <button @click="prevod(i.sale_done)" class="btn btn-primary">
        <i class="fas fa-info"></i>
       </button>
      </td>
      <td class="text-center">{{ i.email }}</td>
      <td class="text-center">{{i.ismi}}</td>

    </tr>
  </tbody>

  </table>
</div>


</template>
<script setup>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router"
import { global_funksiya } from "../../store";
let store = global_funksiya();
import { doc, onSnapshot,collection, query, where, getDocs  } from "firebase/firestore";
import { db } from '../../google/index.js';
let data = ref([]);
let path = ref(query(collection(db, "admin_sale_history")));
let route = useRouter();
onMounted(()=>{
    const q = query(collection(db, "admin_sale_history"));
 onSnapshot(q, (querySnapshot) => {
  data.value = [];
    querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
data.value.push(doc.data());
});
data.value = data.value.reverse()
    });
// Later ...

// Stop listening to changes

})

let prevod = (obj)=>{
store.prevod = obj;
route.push("/sale_done");
}
</script>
<style scoped></style>
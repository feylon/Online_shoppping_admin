<template>
<div class="h5">Kirish tarixi</div>
<table class="table" :class="store.document.dark ? 'table-dark table-striped ':''" >
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col" class="text-center">Login nomi</th>
      <th scope="col" class="text-center">IP Address</th>
      <th class="text-center" scope="col">Vaqti</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(i,j) in time" :key="j">
      <th scope="row">{{j + 1}}</th>
      <td class="text-center">Jamshid</td>
      <td class="text-center">{{ i.api  }}</td>
      <td class="text-center">{{ new Date(i["time"]).toLocaleString() }}</td>
    
    </tr>
  </tbody>
</table>   
 
</template>
<script setup>
import ref1 from "../../boshqa/index.js";
import { getDatabase,  set,push,child, get,onValue  } from "firebase/database";
import {auth,database} from "../../google/index.js";

import { ref } from "vue";
import { global_funksiya } from '../../store';
let store = global_funksiya();



let items = ref([]);
let time = ref([]);
let all = ref([]);
const db = getDatabase();
// 'admin_history/SCtDiEK9DBVNONRaquJoWovMgJo1'
let getdata = async ()=>
{ const dbref = ref1(db);
    get(child(dbref,"admin_history/SCtDiEK9DBVNONRaquJoWovMgJo1"+"/")).then(snapshot=>{
      
        if(snapshot.exists()){
      items.value = snapshot.val();    
        for(let i in items.value ){;time.value.push(items.value[i])}

         time.value = time.value.reverse();
        }
        else{
            console.log("Ma'lumot mavjud emas");
        }
    }).catch(i=>{
        console.log(i)
    })
}
getdata()


</script>
<style scoped></style>
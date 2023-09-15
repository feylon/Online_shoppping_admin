<template>
 <header class="header">
      <nav class="nav">
        <a href="#" class="nav_logo">Online Shopping</a>

        <ul class="nav_items">
          <li style="display: none;" class="nav_item">
            <a href="#" class="nav_link">Home</a>
            <a href="#" class="nav_link">Product</a>
            <a href="#" class="nav_link">Services</a>
            <a href="#" class="nav_link">Contact</a>
          </li>
        </ul>

        <button @click="show = true" class="button" id="form-open">Login</button>
      </nav>
    </header>

    <!-- Home -->
    <section class="home" :class="show ? 'show':''">
      <div class="form_container">
        <i @click="show = false" class="uil uil-times form_close"></i>
        <!-- Login From -->
        <div class="form login_form">
          <form @submit.prevent="log_in">
            <h2>Login</h2>

            <div class="input_box">
              <input v-model="login" type="email" placeholder="Elektron pochtani kiriting" required />
              <i class="uil uil-envelope-alt email"></i>
            </div>
            <div class="input_box">
              <input  v-model="password"  :type="show_password? 'text' : 'password'" placeholder="Parolni kiriting" required />
              <i class="uil uil-lock password"></i>
              <i @click="show_password = !show_password" class="uil  pw_hide" :class="show_password ? 'uil-eye' : 'uil-eye-slash'"></i>
            </div>

            <div class="option_field">
              <span class="checkbox">
                <input  type="checkbox" id="check" />
                <label for="check">Eslab qolish</label>
              </span>
              <a href="#" class="forgot_pw">Parolni unitdingizmi?</a>
            </div>

            <button type="submit"  class="button">Kirish</button>

           
          </form>
        </div>

       
      </div>
    </section>



</template>
<script setup>
import {useRouter} from "vue-router";

import { getAuth, signInWithEmailAndPassword, } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import {ref} from "vue";
import ref1 from "../../boshqa/index";
import { getDatabase,  set,push } from "firebase/database";
import {auth,database} from "../../google/index.js";
import   {global_funksiya} from "../../store/index.js";
import {db1} from "../../boshqa/index2.js";

import { getStorage,getDownloadURL,uploadBytes  } from "firebase/storage";




let store = global_funksiya();
const db = getDatabase();




let api = ref()
var auth1 = getAuth();
let router = useRouter();
let show = ref(false);
let show_password = ref(false);
let login = ref("");
let password = ref("");
let time = new Date();

let admin = ref(false);


const ipAddressAPI = 'https://api.ipify.org?format=json';

fetch(ipAddressAPI)
  .then(response => response.json())
  .then(data => {
    const ipAddress = data.ip;
    api.value = ipAddress;
    
  })
  .catch(error => {
    console.error('Error fetching IP address:', error);
  });






let log_in = ()=>{
//   if( login.value == "jamshid@gmail.com" && password.value == "jamshid@gmail.com")
// { window.auth = true;
//   console.log(window.auth) ;
 
//   router.push("/home");return;}
//  else{alert("Login xato")}
 
//  return;
  signInWithEmailAndPassword(auth1, login.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    
    function loginsend(time) {

push(ref1(db, 'admin_history/' + user.uid), {
  time : time.toString(),
  api : api.value
 


});
}
store.auth = true;
    loginsend(time);
    const unsub = onSnapshot(doc(db1, "users", user.uid), (doc) => {

        
   
 if( doc.data().admin)
    {  
      store.admin = doc.data();
      store.admin.uid = user.uid;
      const storage = getStorage();
      store.user.user_profil_picture = store.admin.url;
    getDownloadURL(window.ref(storage, `users/${user.uid}/profile.jpg`))
  .then((url) => {
    
   store.user.user_profil_picture = url;
   store.user.useruid = user.uid;
   store.menus = [true,false,false,false,false];
   router.push("/home");
  })
  .catch((error) => {
   console.log(error);

   store.user.user_profil_picture = store.admin.url;
  });

      }
   else {
    throw new Error("Adminda xatolik")
   } });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("login yoki parol xato",errorMessage);
    if(errorCode == "auth/network-request-failed") 
    alert("Internetga ulanmagansiz")
    

  });

}




</script>
<style scoped>
@import "./css/login_page.css";
</style>
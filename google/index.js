import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyC8oxJJ6poa7qok65TW7SzlNMKfcz7EqQ0",
  authDomain: "onlineshopping-97a8f.firebaseapp.com",
  databaseURL: "https://onlineshopping-97a8f-default-rtdb.firebaseio.com",
  projectId: "onlineshopping-97a8f",
  storageBucket: "onlineshopping-97a8f.appspot.com",
  messagingSenderId: "566797354988",
  appId: "1:566797354988:web:ea74bc20ab900afa40e2c9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const database = getDatabase(app);
export {storage,db,auth,database};
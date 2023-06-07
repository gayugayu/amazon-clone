
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore  } from 'firebase/firestore/lite';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEBrceGNGRm9ibHsHRU4em6ck9IMu5Xz8",
  authDomain: "clone-46494.firebaseapp.com",
  projectId: "clone-46494",
  storageBucket: "clone-46494.appspot.com",
  messagingSenderId: "658058210726",
  appId: "1:658058210726:web:29d170bf45ab7b1a9f3367",
  measurementId: "G-73C8RWTQKN"
};


const app = initializeApp(firebaseConfig);



const db = getFirestore(app);
  const auth = getAuth(app)

  export {db,auth}
  export default app
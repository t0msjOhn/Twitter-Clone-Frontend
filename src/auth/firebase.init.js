import { initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyDa7-5vjugWKiAH6ZWrUQIrZlf_ItfX7Tw",
  authDomain: "twitterclone-c6ffe.firebaseapp.com",
  projectId: "twitterclone-c6ffe",
  storageBucket: "twitterclone-c6ffe.appspot.com",
  messagingSenderId: "768320434465",
  appId: "1:768320434465:web:90fad27f9e4f2b8ae4ce60",
  measurementId: "G-8XLG01Z7DQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC73e4VeJ7o80laGQz4Uh4DtQgi0y-3fIc",
  authDomain: "auth-dev-8006d.firebaseapp.com",
  projectId: "auth-dev-8006d",
  storageBucket: "auth-dev-8006d.appspot.com",
  messagingSenderId: "123584678748",
  appId: "1:123584678748:web:622eb5414b16e440930f99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()
export const db=getFirestore(app)
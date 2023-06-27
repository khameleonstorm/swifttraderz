import { initializeApp, getApps, getApp } from '@firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu5g0eCS20BUFYwHVXvdQdsUEHdI1Dn8A",
  authDomain: "swift-traderz.firebaseapp.com",
  projectId: "swift-traderz",
  storageBucket: "swift-traderz.appspot.com",
  messagingSenderId: "968336355560",
  appId: "1:968336355560:web:d50ef6d10481f3be37d95d"
};
// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp(); 

// init services
  const db = getFirestore(app)
  const Auth = getAuth(app)
  const storage = getStorage(app);

  
  export { db, storage, Auth }
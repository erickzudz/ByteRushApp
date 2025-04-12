// firebase/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDiLCfdRtrgqXLJqspw9wYtPwTj6pjaeh8",
  authDomain: "byterush-dde66.firebaseapp.com",
  projectId: "byterush-dde66",
  storageBucket: "byterush-dde66.appspot.com",
  messagingSenderId: "115250462693",
  appId: "1:115250462693:android:77fa25665348a390dd390c"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta auth y db para usar en login/register y Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

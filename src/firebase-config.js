import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCokSc0aFfEIfhG6pD-Ot-a8i9i93Yo7Vw",
  authDomain: "notes-1bca3.firebaseapp.com",
  projectId: "notes-1bca3",
  storageBucket: "notes-1bca3.appspot.com",
  messagingSenderId: "316648294491",
  appId: "1:316648294491:web:1cd7b4dd5f4f0448f0177e",
  measurementId: "G-BJ0GMBG07L"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
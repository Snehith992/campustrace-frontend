import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5yDbBqprYSpUz9bcXg3--34L5p47FJvM",
  authDomain: "campustrace-c87a2.firebaseapp.com",
  projectId: "campustrace-c87a2",
  storageBucket: "campustrace-c87a2.firebasestorage.app",
  messagingSenderId: "920805873694",
  appId: "1:920805873694:web:524d2998b85f5e4bf0f60f",
  measurementId: "G-9VX3QMCQ8K"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider =
  new GoogleAuthProvider();
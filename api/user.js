import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { firebaseConfig } from "../firebase/config.js";
const auth = getAuth();
const app = initializeApp(firebaseConfig);

export const registerUser = async (payload) => {
  try {
    await createUserWithEmailAndPassword(auth, payload.email, payload.password);

    console.log(userCredential.user, "user credential");
  } catch (error) {
    alert(error.message);
  }
};

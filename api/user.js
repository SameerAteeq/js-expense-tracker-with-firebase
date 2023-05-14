import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { firebaseConfig } from "../firebase/config.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

const db = getFirestore();
const auth = getAuth();
const app = initializeApp(firebaseConfig);

//Register User
export const registerUser = async (payload) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );
    return userCredential.user;
  } catch (error) {
    alert(error.message);
  }
};

//SignIN User

export const signIn = async (payload) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );
    return userCredential.user;
  } catch (error) {
    alert(error.message);
  }
};

// Adding Data to firestore
export const AddUserToFirestore = async (user, userData) => {
  await setDoc(doc(db, "users", user.uid), userData);
};

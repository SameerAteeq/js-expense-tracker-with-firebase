import { AddUserToFirestore, registerUser, signIn } from "../api/user.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { firebaseConfig } from "../firebase/config.js";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();
//Getting all values
const signUpForm = document.getElementById("signup-form");
const name = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const SignInemail = document.getElementById("SignInemail");
const SignInpassword = document.getElementById("SignInpassword");
const loginForm = document.getElementById("login-form");

if (signUpForm) {
  signUpForm.addEventListener("submit", createUser);
}

// Create User

async function createUser(e) {
  e.preventDefault();
  const obj = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  if (!obj.name || !obj.email || !obj.password) {
    alert("All fields are required");
    return;
  }

  console.log(obj);
  try {
    const user = await registerUser(obj);
    await AddUserToFirestore(user, obj);
    alert("User created successfully");
    window.location.href = "../html files/login.html";
  } catch (error) {
    alert(error.message);
  }
}

//Login User

if (loginForm) {
  loginForm.addEventListener("submit", loginUser);
}

async function loginUser(e) {
  e.preventDefault();
  const Userobj = {
    email: SignInemail.value,
    password: SignInpassword.value,
  };
  try {
    const user = await signIn(Userobj);
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "../html files/dashboard.html";
    return user;
  } catch (error) {
    alert(error.message);
  }
}

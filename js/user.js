import { registerUser } from "../api/user.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

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

//Create User
async function createUser(e) {
  e.preventDefault();
  const obj = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  const ref = collection(db, "users");
  if (obj.name && obj.email && obj.password !== "") {
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        if (user) {
          try {
            setDoc(doc(db, `users`, user.uid), {
              ...obj,
            });
          } catch (err) {
            console.log(err);
          }
          window.location.href = "../html files/dashboard.html";
        }

        alert("User created successfully");
      })
      .catch((err) => {
        alert(err.message);
      });
  } else {
    alert("All fields are required");
    return;
  }
}

//Login User

if (loginForm) {
  loginForm.addEventListener("submit", loginUser);
}

function loginUser(e) {
  e.preventDefault();
  const Userobj = {
    email: SignInemail.value,
    password: SignInpassword.value,
  };
  // SIGIN USER
  signInWithEmailAndPassword(auth, Userobj.email, Userobj.password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user, "User");
      localStorage.setItem("user", JSON.stringify(user));
      alert("User Login");
      window.location.href = "../html files/dashboard.html";
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
  console.log(Userobj);
}

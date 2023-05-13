import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDmypgPyYmV_Xyfge4o7y8_TMIY7D-8za8",
  authDomain: "js-expense-tracker-7dace.firebaseapp.com",
  projectId: "js-expense-tracker-7dace",
  storageBucket: "js-expense-tracker-7dace.appspot.com",
  messagingSenderId: "328741205351",
  appId: "1:328741205351:web:4cebec961b80fe7810abc2",
};

// Initialize Firebase
export const firebaseClient = initializeApp(firebaseConfig);

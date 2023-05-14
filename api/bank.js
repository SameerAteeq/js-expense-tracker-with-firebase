import { getUniqueId } from "../helper.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { firebaseClient } from "../firebase/config.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
const db = getFirestore();
const user = JSON.parse(localStorage.getItem("user"));
const myModal = document.getElementById("myModal");

// Add Bank Account
export const addBankAccount = async (payload) => {
  const { amount, userId, bankName } = payload;
  const bankId = getUniqueId();
  const ref = collection(db, "bankAccounts");
  try {
    const accountDetails = {
      bankId,
      bankName,
      amount: +amount,
      userId,
    };
    if (amount < 0) {
      alert("Enter valid amount");
    } else {
      await setDoc(doc(db, `bankAccounts`, bankId), {
        ...accountDetails,
      });
      alert("Your bank account created successfully");
      const modalInstance = bootstrap.Modal.getInstance(myModal);
      modalInstance.hide();
    }
  } catch (error) {
    console.log(error);
    alert("Error saving Account data to database:", error);
    throw new Error("error");
  }
};

// Get My Bank Accounts
export const getMybankAccounts = async (callback) => {
  try {
    const q = query(
      collection(db, "bankAccounts"),
      where("userId", "==", user.uid)
    );

    const unsub = onSnapshot(q, (querySnapshot) => {
      let bankAccounts = [];
      querySnapshot.forEach((doc) => {
        bankAccounts.push({ id: doc.id, ...doc.data() });
      });
      callback(bankAccounts);
    });

    // Return the unsubscribe function in case you need to unsubscribe from the snapshot listener later
    return () => {
      unsub();
    };
  } catch (error) {
    throw new Error("error");
  }
};

//Get bank Account by ID
export const getMyBankAccountById = async (bankAccountId) => {
  const docRef = doc(db, "bankAccounts", bankAccountId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const bankAccountData = docSnap.data();
    return { id: docSnap.id, ...bankAccountData };
  } else {
    return null;
  }
};

// // Update bank balance
export const updateBankBalance = async (payload) => {
  const { bankId, type, amount } = payload;
  try {
    const docRef = doc(db, "bankAccounts", bankId);
    const account = await getMyBankAccountById(bankId);

    if (type === "INCOME") {
      await updateDoc(docRef, {
        amount: account.amount + amount,
      });
    } else if (type === "EXPENSE" && amount > account.amount) {
      alert("Your do not have sufficient balance for this transacton");
    } else if (type === "EXPENSE") {
      await updateDoc(docRef, {
        amount: account.amount - amount,
      });
    } else {
      alert("Invalid Type");
    }
  } catch (error) {
    console.log(error.message);
    throw new Error("error");
  }
};

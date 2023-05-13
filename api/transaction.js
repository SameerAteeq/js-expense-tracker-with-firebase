import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import { getUniqueId } from "../helper.js";
import { getMyBankAccountById, updateBankBalance } from "./bank.js";

const db = getFirestore();
const user = JSON.parse(localStorage.getItem("user"));

//Add Transactions
export const addTransaction = async (payload) => {
  console.log(payload, "payload");
  const time = new Date().toLocaleString();
  const dateObj = new Date(time);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const ref = collection(db, "transactions");
  try {
    const id = getUniqueId();
    const account = await getMyBankAccountById(payload?.bankId);

    if (payload?.type === "EXPENSE" && payload?.amount > account.amount) {
      alert("You can't add this transaction");
    } else if (payload?.amount < 0) {
      alert("Please add valid amount");
    } else if (!Number(payload?.amount)) {
      alert("Please add valid amount");
    } else {
      await setDoc(doc(db, `transactions`, id), {
        ...payload,
        formattedDate,
        amount: +payload?.["amount"],
      });

      await updateBankBalance({
        type: payload?.["type"],
        amount: +payload["amount"],
        bankId: payload["bankId"],
      });
      alert("Your transaction added successfully");
    }
  } catch (error) {
    console.log(error.messsage);
    alert("ERROR:", error.message);
    throw new Error("error");
  }
};

// Get Transaction
export const listTransactions = async (callback) => {
  try {
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", user.uid)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let transactionList = [];
      querySnapshot.forEach((doc) => {
        transactionList.push({ id: doc.id, ...doc.data() });
      });
      callback(transactionList);
    });
    return () => {
      unsub();
    };
  } catch (error) {
    throw new Error("error");
  }
};

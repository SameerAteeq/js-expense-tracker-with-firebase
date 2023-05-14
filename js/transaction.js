// import { getMybankAccounts } from "../api/bank.js";
import { getMyBankAccountById, getMybankAccounts } from "../api/bank.js";
import { addTransaction, listTransactions } from "../api/transaction.js";

//Getting Values
const user = JSON.parse(localStorage.getItem("user"));
const addBtn = document.getElementById("add-btn");
const bankSelectEle = document.getElementById("bank-select");

const expenseBtn = document.getElementById("expense-btn");
const incomeBtn = document.getElementById("income-btn");
const amountInput = document.getElementById("amount-input");
const categories = document.querySelectorAll(".d-flex.gap-4 > div");
let transactionType = "";

expenseBtn.addEventListener("click", () => {
  transactionType = "EXPENSE";
  expenseBtn.classList.add("border-primary");
  incomeBtn.classList.remove("border-primary");
});

incomeBtn.addEventListener("click", () => {
  transactionType = "INCOME";
  incomeBtn.classList.add("border-primary");
  expenseBtn.classList.remove("border-primary");
});

if (addBtn) {
  addBtn.addEventListener("click", AddTransaction);
}

function getSelectedCategory() {
  let selectedCategory = "";
  categories.forEach((category) => {
    if (category.classList.contains("selected")) {
      selectedCategory = category.querySelector("span").textContent;
    }
  });
  return selectedCategory;
}

//Selecting category
categories.forEach((category) => {
  category.addEventListener("click", () => {
    categories.forEach((category) => {
      category.classList.remove("selected");
    });
    category.classList.add("selected");
  });
});

//Adding Transaction
async function AddTransaction(e) {
  const amount = amountInput.value;
  const bankId = bankSelectEle.value;
  const account = await getMyBankAccountById(bankId);
  const category = getSelectedCategory();
  const type = transactionType;

  if (amount && category && bankId && type) {
    addTransaction({
      userId: user.uid,
      amount: amount,
      category: category,
      bankId: bankId,
      type: type,
      bankName: account.bankName,
    });

    // reset input fields and selected category
    amountInput.value = "";
    expenseBtn.classList.remove("border-primary");
    incomeBtn.classList.remove("border-primary");
    bankSelectEle.value = "Paying from Bank";
    categories.forEach((category) => {
      category.classList.remove("selected");
    });
  } else {
    alert("Please enter all details");
  }
}

//Render data in table
async function renderTable(data) {
  const unsub = await listTransactions((transactionList) => {
    const table = document.getElementById("table");
    const tableBody = document.querySelector("#table tbody");
    tableBody.innerHTML = "";
    if (!transactionList.length) {
      table.classList.add("d-none");
    }
    transactionList.forEach((item, index) => {
      const row = document.createElement("tr");

      const numberCell = document.createElement("td");
      numberCell.textContent = index + 1;
      row.appendChild(numberCell);

      const bankIdCell = document.createElement("td");

      bankIdCell.textContent = item.bankName;
      row.appendChild(bankIdCell);

      const amountCell = document.createElement("td");
      amountCell.classList.add("text-secondary");
      amountCell.textContent = item.category;
      row.appendChild(amountCell);

      const typeCell = document.createElement("td");
      typeCell.classList.add("text-secondary");
      typeCell.textContent = item.formattedDate;
      row.appendChild(typeCell);

      const timeCell = document.createElement("td");
      if (item.type === "EXPENSE") {
        timeCell.classList.add("text-danger");
      } else {
        timeCell.classList.add("text-success");
      }
      timeCell.textContent = `Rs - ${item.amount} PKR`;
      row.appendChild(timeCell);

      tableBody.appendChild(row);
    });
  });
}
window.onload = renderTable();

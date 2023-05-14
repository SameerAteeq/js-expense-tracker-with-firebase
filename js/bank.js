import { addBankAccount, getMybankAccounts } from "../api/bank.js";
const bankContainer = document.getElementById("bank-container");
const bankSelectEle = document.getElementById("bank-select");
const add_account = document.getElementById("add-account");
const accountName = document.getElementById("account-name");
const accountAmount = document.getElementById("account-amount");
const TotalbankAmount = document.getElementById("totalBankAmount");
const Total = document.getElementById("total");
const cash = document.getElementById("cash");
const savings = document.getElementById("savings");
const user = JSON.parse(localStorage.getItem("user"));
const openModal = document.getElementById("open-modal");
const bankAccountsDiv = document.getElementById("bankAccounts-div");
// Add bank Account
if (add_account) {
  add_account.addEventListener("click", addAccount);
}
async function addAccount(e) {
  await addBankAccount({
    bankName: accountName.value,
    amount: accountAmount.value,
    userId: user.uid,
  });
}

//Get bank Accounts
async function userBanksAccounts() {
  const bankAccountsDiv = document.getElementById("bank-accounts");
  const unsub = await getMybankAccounts((bankAccounts) => {
    //Clearing
    bankContainer.innerHTML = "";
    bankSelectEle.innerHTML = "";

    const FirstoptionElement = document.createElement("option");
    FirstoptionElement.textContent = "Paying from bank";
    bankSelectEle.appendChild(FirstoptionElement);

    if (!bankAccounts?.length > 0) {
      openModal.innerText = "Add Account";
      bankAccountsDiv?.classList.add("d-none");
    } else {
      openModal.innerText = "Add more+";
      bankContainer.classList.add("d-block");
    }
    bankAccounts?.forEach((bank) => {
      const bankDiv = document.createElement("div");
      bankDiv.classList.add("d-flex", "justify-content-between", "p-2");
      const bankAmount = document.createElement("span");
      const bankName = document.createElement("span");
      bankDiv.classList.add("d-flex", "justify-content-between", "p-2");

      bankName.id = "bank-name";
      bankName.innerText = bank.bankName;

      bankAmount.id = "bank-amount";
      bankAmount.innerText = `PKR ${bank.amount}`;

      //Create bank options
      const optionElement = document.createElement("option");
      optionElement.value = bank.bankId;
      optionElement.textContent = `${bank.bankName}`;

      //Bank total Amount
      const bankTotal = bankAccounts.reduce((acc, curr) => {
        return parseInt(acc + Number(curr.amount));
      }, 0);

      TotalbankAmount.textContent = bankTotal;
      Total.textContent = `PKR ${
        Number(bankTotal) +
        Number(cash.textContent) +
        Number(savings.textContent)
      }`;
      //Appending data...
      bankDiv.appendChild(bankName);
      bankDiv.appendChild(bankAmount);
      bankSelectEle.appendChild(optionElement);
      bankContainer.appendChild(bankDiv);
    });
  });
}
window.onload = userBanksAccounts();

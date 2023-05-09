
function displayAccounts() {
    let bankAccountsString = "";
    let i;
    for (i = 0; i < BankAccount.accountInfoList.length; i++) {
        const bankAccount = BankAccount.accountInfoList[i];
        bankAccountsString += "Account name:   " + bankAccount.name + "   Balance:  " + bankAccount.balance + "\n";
    }
    let outputText = document.getElementById("text-output");
    outputText.value = bankAccountsString;
}

window.onload = function () {

    BankAccount.loadAccountsList();
    displayAccounts();

    let createAccountButton = document.getElementById("button-create-account");

    createAccountButton.addEventListener("click", function () {
        let accountNameText = document.getElementById("text-account-name");
        let depositText = document.getElementById("text-deposit");
        const initialDeposit = parseFloat(depositText.value);
        if (isNaN(initialDeposit)) {
            alert("Deposit must be a number")
            return "Deposit not a Number!";
        }
        else if(initialDeposit<=0){
            alert("Deposit must be a positive number")
            return "Deposit not a positive number!";
        }
        else {
            BankAccount.accountInfoList.push(new BankAccount(accountNameText.value, initialDeposit));

            BankAccount.saveAccountsList();
            displayAccounts();
        }

    });

    let depositButton = document.getElementById("button-deposit");
    let debitButton = document.getElementById("button-debit");

    depositButton.addEventListener("click", () => window.location = "./transaction.html");
    debitButton.addEventListener("click", () => window.location = "./transaction.html");
};

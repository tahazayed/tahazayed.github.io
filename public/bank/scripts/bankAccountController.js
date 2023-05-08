
class BankAccount {
    static accountInfoList = [];
    name;
    deposite;

    constructor(name, deposite) {
        this.name = name;
        this.deposite = deposite;
    }
}

window.onload = function () {

    let createAccountButton = document.getElementById("create-account-button");

    createAccountButton.addEventListener("click", function () {
        let accountNameText = document.getElementById("account-name-text");
        let depositeText = document.getElementById("deposite-text");
        BankAccount.accountInfoList.push(new BankAccount(accountNameText.value, depositeText.value));

        let bankAccountsString = "";
        let i;
        for (i = 0; i < BankAccount.accountInfoList.length; i++) {
            const bankAccount = BankAccount.accountInfoList[i];
            bankAccountsString += "Account name:   " + bankAccount.name + "   Balance:  " + bankAccount.deposite + "\n";
        }
        let outputText = document.getElementById("text-output");
        outputText.value = bankAccountsString;
    });

};

class BankAccount {
    static accountInfoList = [];
    name;
    balance;

    constructor(name, deposite) {
        this.name = name;
        this.balance = deposite;
    }

    static loadAccountsList() {
        if (localStorage.getItem("accountsList") != null) {
            BankAccount.accountInfoList = JSON.parse(localStorage.getItem("accountsList"));
        }
    }

    static saveAccountsList() {
        localStorage.setItem("accountsList", JSON.stringify(BankAccount.accountInfoList));
    }

    static adjustBalance(amount, index) {

        if (amount > 0) {
            BankAccount.accountInfoList[index].balance += amount;
        }
        else {
            amount = Math.abs(amount);
            if (amount <= BankAccount.accountInfoList[index].balance) {
                BankAccount.accountInfoList[index].balance -= amount;
                alert(amount);
            } else {
                alert("Insufficient funds!");
                return false;
            }
        }
        BankAccount.saveAccountsList();
        return true;
    }

}
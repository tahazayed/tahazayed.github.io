function fillAccountList(accountSelect) {
    BankAccount.loadAccountsList();

    for (let i = 0; i < BankAccount.accountInfoList.length; i++) {
        let option = document.createElement("option");
        option.text = BankAccount.accountInfoList[i].name;
        option.value = i;
        accountSelect.add(option);
    }
}

window.onload = function () {
    const accountSelect = document.getElementById('select-account');
    fillAccountList(accountSelect);

    accountSelect.addEventListener("change", (event) => {
        var selectElement = event.target;

        var selectValue = selectElement.value;

        if (selectValue == -1) {
            document.getElementById("button-submit").disabled = true;
        }
        else {
            document.getElementById("button-submit").disabled = false;
        }
    });

    const submitButton = document.getElementById("button-submit");
    submitButton.addEventListener("click", () => {
        const amountText = document.getElementById("text-amount");
        const amount = parseFloat(amountText.value);
        if (isNaN(amount)) {
            alert("Amount must be a number")
            return "Amount not a Number!";
        }
        else if (amount == 0) {
            alert("Amount can not be 0")
            return "Amount can not be 0!";
        }
        else {
            const selectedValue = parseInt(accountSelect.value);

            const results = BankAccount.adjustBalance(amount, selectedValue);
           
            if (results) {
                window.location = "./accountinfo.html?index=" + accountSelect.value;
            }


        }
    });


};
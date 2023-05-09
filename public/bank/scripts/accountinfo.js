window.onload = () => {

    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('index')) {

        BankAccount.loadAccountsList();


        let accountNameLabel = document.getElementById("label-account-name");

        let accountBalanceLabel = document.getElementById("label-account-balance");
        const index = parseInt(urlParams.get('index'));
      
        if (index >= 0 && index <= BankAccount.accountInfoList.length) {
            accountBalanceLabel.innerText = BankAccount.accountInfoList[index].balance;
            accountNameLabel.innerText = BankAccount.accountInfoList[index].name;
        }
        else {
            alert("Account does not exist!")
        }
    }

}
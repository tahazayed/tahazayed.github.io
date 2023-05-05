function calcTip() {

    // Enter your code here to make Tip Calculator work
    let subtotal = parseFloat(document.getElementById("subtotal").value)
    if (isNaN(subtotal)) {
      alert("Subtotal must be a number")
      return 'Subtotal not a Number!';
    }

    let tip = parseFloat(document.getElementById("tip").value)
    if (isNaN(tip)) {
      alert("Tip must be a number")
      return 'Tip not a Number!';
    }
    document.getElementById("total").innerHTML = ((1 + tip / 100.0) * subtotal).toLocaleString('en-US', { style: 'currency', currency: 'USD', });
  }
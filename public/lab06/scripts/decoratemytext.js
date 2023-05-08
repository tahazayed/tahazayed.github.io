"use strict";

window.onload = function () {
    let textInput = document.getElementById("text-input");
    let biggerDecorationsButton = document.getElementById("bigger-decorations-button");

    biggerDecorationsButton.addEventListener("click", function () {
        // textInput.style.fontSize = "24pt";
        setInterval(increaseFontSize, 500);
    });

    let blingCheckbox = document.getElementById("bling-checkbox");

    blingCheckbox.addEventListener("change", function (event) {
        var checkbox = event.target;
        if (checkbox.checked) {
            textInput.style.fontWeight = "bold";
            textInput.style.color = "green";
            textInput.style.textDecoration = "underline";
            document.body.style.backgroundImage = "url('../public/lab06/images/hundred-dollar-bill.jpg')";
        }
        else {

            textInput.style.fontWeight = "normal";
            textInput.style.color = "";
            textInput.style.textDecoration = "none";
            document.body.style.backgroundImage = "";
        }

    });

    function increaseFontSize() {
        let textInput = $("#text-input");
        let currentFontSize = parseInt(textInput.css("font-size")); // Retrieve current font size
        fontSize = currentFontSize + 2;
        textInput.css("font-size", fontSize + "px");
    }

    let igpayAtinlayButton = document.getElementById("igpay-atinlay-button");
    igpayAtinlayButton.addEventListener("click", function () {
        var text = textInput.value;
        var words = text.split(" ");
        var pigLatinWords = words.map(function (word) {
            if (/^[aeiou]/i.test(word)) {
                return word + "ay";
            } else {
                var consonantCluster = word.match(/^[^aeiou]+/i)[0];
                return word.slice(consonantCluster.length) + consonantCluster + "ay";
            }
        });
        textInput.value = pigLatinWords.join(" ");
    });

    let malkovitchButton = document.getElementById("malkovitch-button");
    malkovitchButton.addEventListener("click", function () {
        let text = textInput.value;
        let words = text.split(" ");
        let malkovitchWords = words.map(function (word) {
            if (word.length >= 5) {
                return "Malkovich";
            } else {
                return word;
            }
        });
        textInput.value = malkovitchWords.join(" ");
    });

    let italicButton = document.getElementById("italic-button");
    if (italicButton != null)
        italicButton.addEventListener("click", function () {
            toggleStyle("italic");
        });


    function toggleStyle(style) {
        let output = document.getElementById("output");
        let classList = output.classList;
        if (classList.contains(style)) {
            classList.remove(style);
        } else {
            classList.add(style);
        }
        output.innerText = textInput.value;
    }

};

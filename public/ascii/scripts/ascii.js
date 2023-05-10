$(document).ready(function () {
    const DEFAULT_INTERVAL = 150;

    // set defaults
    let speed = DEFAULT_INTERVAL;
    let frameLength = 0;
    let index = 0;
    let startInterval = null;
    let isRunning = false;
    let firstFrame = null;
    let frame = null;

    function startAnimation() {
        if (startInterval) {
            clearInterval(startInterval);
        }
        if (frame === "" || frame === null) {
            firstFrame = null;
            frame = null;
            return;
        }
        startInterval = setInterval(function () {
            $("#text-area").val(frame[index++]);
            if (index === frameLength) {
                index = 0;
            }
        }, speed);
        isRunning = true;
    }

    function stopAnimation() {
        if (!startInterval) {
            return;
        }
        clearInterval(startInterval);
        $("#text-area").val(firstFrame);
        isRunning = false;
    }

    $("#button-start").on("click", function () {
        $(this).prop("disabled", true);
        $("#button-stop").prop("disabled", false);
        startAnimation();
    });

    $("#button-stop").on("click", function () {
        $("#button-start").prop("disabled", false);
        $(this).prop("disabled", true);
        index = 0;
        stopAnimation();
    });

    $("#select-animation").on("change", function () {
        let allFrames = ANIMATIONS[$(this).val()];
        frame = allFrames.split("=====\n");
        frameLength = frame.length;
        firstFrame = frame[0];
        $("#text-area").val(firstFrame);
        index = 0;
        if (isRunning) {
            stopAnimation();
            startAnimation();
        }
    });


    $("#checkbox-turbo").on("change", function () {
        speed = $(this).prop("checked") ? DEFAULT_INTERVAL * 0.5 : DEFAULT_INTERVAL;
        if (isRunning) {
            stopAnimation();
            startAnimation();
        }
    });

    // change font-size in textarea by adding a predefined className
    $("#select-fontsize").on("change", function () {
        switch ($(this).val()) {
            case "Tiny":
                $("#text-area").prop('class', "tiny");
                break;
            case "Medium":
                $("#text-area").prop('class', "medium");
                break;
            case "Large":
                $("#text-area").prop('class', "large");
                break;
            case "Extra Large":
                $("#text-area").prop('class', "xl");
                break;
            case "XXL":
                $("#text-area").prop('class', "xxl");
                break;
            default:
                $("#text-area").prop('class', "small");
                break;
        }
        if (isRunning) {
            stopAnimation();
            startAnimation();
        }
    });




});

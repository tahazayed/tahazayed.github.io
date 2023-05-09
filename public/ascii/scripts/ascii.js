$(document).ready(function(){
    const DEFAULT_INTERVAL = 200;

    // set defaults
    let speed = DEFAULT_INTERVAL;
    let frameLength = 0;
    let index = 0;
    let startInterval = null;
    let isRunning = false;
    let firstFrame = null;
    let frame = null;

    // DOM elements
    let textArea = document.getElementById("text-area");
    let startBtn = document.getElementById("start");
    let stopBtn = document.getElementById("stop");
    let animation = document.getElementById("animation");
    let speedBox = document.getElementById("turbo");
    let fontSize = document.getElementById("fontsize");

    // change animation
    function changeAnimation() {
        let allFrames = ANIMATIONS[animation.value];
        frame = allFrames.split("=====\n");
        frameLength = frame.length;
        firstFrame = frame[0];
        textArea.value = firstFrame;
        index = 0;
    }

    // toggle turbo speed
    function changeSpeed() {
        speed = speedBox.checked ? 50 : DEFAULT_INTERVAL;
        if (isRunning) {
            startAnimation();
        }
    }

    // change font-size in textarea by adding a predefined className
    function changeSize() {
        switch (fontSize.value) {
            case "Tiny":
                textArea.className = "tiny";
                break;
            case "Medium":
                textArea.className = "medium";
                break;
            case "Large":
                textArea.className = "large";
                break;
            case "Extra Large":
                textArea.className = "xl";
                break;
            case "XXL":
                textArea.className = "xxl";
                break;
            default:
                textArea.className = "small";
                break;
        }
    }

    // start animation
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
            textArea.value = frame[index++];
            if (index === frameLength) {
                index = 0;
            }
        }, speed);
        isRunning = true;
    }

    // stop animation
    function stopAnimation() {
        if (!startInterval) {
            return;
        }
        clearInterval(startInterval);
        textArea.value = firstFrame;
        isRunning = false;
    }

    // start on click
    function onStart() {
        startBtn.disabled = true;
        stopBtn.disabled = false;
        startAnimation();
    }

    // stop on click
    function onStop() {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        index = 0;
        stopAnimation();
    }

    startBtn.onclick = onStart;
    stopBtn.onclick = onStop;
    animation.onchange = changeAnimation;
    speedBox.onchange = changeSpeed;
    fontSize.onchange = changeSize;

});

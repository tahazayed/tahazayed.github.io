$(document).ready(function () {

    let lost = false;
    let startClicked = false;

    $('.boundary').each((idx, e) => {
        $(e).mouseover(() => { if (startClicked) youLose(); });
    });

    $('#start').on("click", () => {
        lost = false;
        startClicked = true;
        $('.boundary').removeClass("youlose");
    })


    $('#end').on("mouseover", () => {
        if (!lost && startClicked) {
            $('#status').text("You Win :]");
            startClicked = false;
        }
    })

    $('#maze').on("mouseleave", () => {
        if (startClicked) {
            youLose();
        }
    });

});

function youLose() {
    $('.boundary').addClass("youlose")
    lost = true;
    $('#status').text("Sorry, you lost. :[");
    startClicked = false;
}
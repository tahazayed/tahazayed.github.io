$(document).ready(
    function () {
        $("#view_button").click(getPicture);
    });

function getPicture() {
    $.ajax({
        url: "https://api.nasa.gov/planetary/apod",
        type: "GET",
        data: {
            api_key: "HAI8yceW0yUSWNtQv938yAgC5EyMB10w2iK6hyNx",
            date: $("#date").val()
        },
        dataType: "json",
        "success": showPicture,
        "error": noPicture
    });
};
function showPicture(data) {
    $("#pic").attr("src", data.url);
    $("h2.title").text(data.title);
};

function noPicture(error) {
    alert(error.responseText);
};
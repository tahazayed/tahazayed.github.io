window.onload = function () {
    const viewButton = document.getElementById("view_button");
    viewButton.onclick = getPicture;

    const dateText = document.getElementById("date");

    function getPicture() {

        // encode to scape spaces
        const esc = encodeURIComponent;
        const url = 'https://api.nasa.gov/planetary/apod?';
        const params = {
            api_key: "HAI8yceW0yUSWNtQv938yAgC5EyMB10w2iK6hyNx",
            date: dateText.value
        }
        // this line takes the params object and builds the query string
        const query = Object.keys(params)
            .map(k => `${esc(k)}=${esc(params[k])}`)
            .join('&');

        fetch(url + query)
            .then(response => response.json())
            .then(data => showPicture(data))
            .catch(err => noPicture());
    }

    function showPicture(data) {
        const picDom = document.getElementById('pic');
        picDom.src = data.url;
        const titleDom = document.getElementById('title');
        titleDom.innerText = data.title;
    }

    function noPicture(error) {
        alert(error);
    }
}

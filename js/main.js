// Base Url : https://api.giphy.com/v1/gifs
// API-Key: <%=api_key%>

// For Search : https://api.giphy.com/v1/gifs/search



// Collect HTML elements
const searchBar = document.querySelector("#main_gif");
const imageContainer = document.querySelector(".gifs-container");

const trendingButton = document.querySelector("#trendingButton");
const randomButton = document.querySelector("#randomButton");

const gifCategory = document.querySelector("#category");
const categories = document.querySelector(".categories");

const mainBody = document.querySelector(".main");
const randomGIF = document.querySelector("#randomimage");
const randomBox = document.querySelector(".randomGIF");

const key = "";

// Search GIF
searchBar.addEventListener("input", () => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${searchBar.value}`;

    // Fetch JSON data from base url !
    fetch(url)
        .then(response => response.json())
        .then((result) => {
            console.log(result); //Response will be actual JSON DATa

            const gifData = result.data;
            console.log(gifData);

            let html = "";
            for (let i = 0; i < gifData.length; i++) {
                html += `<div class="container">
                            <img ondblclick="download(this)" data-image-name="${gifData[i].title}" data-image-url="${gifData[i].images.looping.mp4}" src="${gifData[i].images.preview_webp.url}"
                                alt="news image">
                    </div>`
            }

            imageContainer.innerHTML = html;
        })
        .catch(error => console.error(`Something went wrong - ${error}`));
})


// Trending GIF's
trendingButton.addEventListener("click", () => {
    // Fetch JSON data from base url !
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${key}`)
        .then(response => response.json())
        .then((result) => {
            console.log(result); //Response will be actual JSON DATa

            const gifData = result.data;
            console.log(gifData);

            let html = "";
            for (let i = 0; i < gifData.length; i++) {
                html += `<div class="container">
                              <img ondblclick="download(this)" data-image-name="${gifData[i].title}" data-image-url="${gifData[i].images.looping.mp4}" src="${gifData[i].images.preview_webp.url}"
                                  alt="news image">
                        </div>`
            }

            imageContainer.innerHTML = html;
        })
        .catch(error => console.error(`Something went wrong - ${error}`));
})

// @TODO - Random GIF

randomButton.addEventListener("click", () => {
    // CSS PART !
    mainBody.classList.toggle("active");
    randomGIF.classList.toggle("active");
    categories.classList.toggle("active");

    // Fetch JSON data from base url !
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=${key}`)
        .then(response => response.json())
        .then((result) => {
            console.log(result); //Response will be actual JSON DATa

            imageContainer.innerHTML = "";

            randomGIF.src = result.data.images.preview_webp.url;
            randomGIF.setAttribute("data-image-name", result.data.title);
            randomGIF.setAttribute("data-image-url", result.data.images.looping.mp4);


            randomGIF.addEventListener("dblclick", () => {
                download(randomGIF);
            })
            // result.data.images.preview_webp.url
        })
        .catch(error => console.error(`Something went wrong - ${error}`));
})




// Category wise GIF's


gifCategory.addEventListener("input", () => {


    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${gifCategory.value}`)
        .then(response => response.json())
        .then((result) => {
            console.log(result); //Response will be actual JSON DATa

            const gifData = result.data;
            console.log(gifData);

            let html = "";
            for (let i = 0; i < gifData.length; i++) {
                html += `<div class="container">
                            <img ondblclick="download(this)" data-image-name="${gifData[i].title}" data-image-url="${gifData[i].images.looping.mp4}" src="${gifData[i].images.preview_webp.url}" alt="news image">
                        </div>`
            }

            imageContainer.innerHTML = html;
        })
        .catch(error => console.error(`Something went wrong - ${error}`));
})



// Download Function !

function download(element) {
    console.log("Clicked :", element);
    console.log("Image Name :", element.dataset.imageName);
    console.log("Image URL :", element.dataset.imageUrl);


    // Use axois to download GIF !

    axios({
            url: element.dataset.imageUrl,
            method: 'GET',
            responseType: 'blob'
        })
        .then((response) => {
            const url = window.URL
                .createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${element.dataset.imageName}.mp4`);
            document.body.appendChild(link);
            link.click();
        })
}


// Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err));
    });
}

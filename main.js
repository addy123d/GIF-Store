// Base Url : https://api.giphy.com/v1/gifs
// API-Key: <%=yourownapikey%>

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

// Search GIF
searchBar.addEventListener("input",()=>{
    const url = `https://api.giphy.com/v1/gifs/search?api_key=eisycQlpcWXRn38ebyMigXiu2VSB992i&q=${searchBar.value}`;

    // Fetch JSON data from base url !
    fetch(url)
    .then(response => response.json())
    .then((result) => {
        console.log(result); //Response will be actual JSON DATa

        const gifData = result.data;
        console.log(gifData);

        let html = "";
        for(let i = 0; i< gifData.length; i++){
            html += `<div class="container">
                            <img src="${gifData[i].images.preview_webp.url}"
                                alt="news image">
                    </div>`
        }

        imageContainer.innerHTML = html;
    })
    .catch(error=>console.error(`Something went wrong - ${error}`));
})


// Trending GIF's
trendingButton.addEventListener("click",()=>{
      // Fetch JSON data from base url !
      fetch('https://api.giphy.com/v1/gifs/trending?api_key=eisycQlpcWXRn38ebyMigXiu2VSB992i')
      .then(response => response.json())
      .then((result) => {
          console.log(result); //Response will be actual JSON DATa
  
          const gifData = result.data;
          console.log(gifData);
  
          let html = "";
          for(let i = 0; i< gifData.length; i++){
              html += `<div class="container">
                              <img src="${gifData[i].images.preview_webp.url}"
                                  alt="news image">
                      </div>`
          }
  
          imageContainer.innerHTML = html;
      })
      .catch(error=>console.error(`Something went wrong - ${error}`));
})

// @TODO - Random GIF
randomButton.addEventListener("click",()=>{
    // CSS PART !
    mainBody.classList.toggle("active");
    randomGIF.classList.toggle("active");
    categories.classList.toggle("active");

    // Fetch JSON data from base url !
    fetch('https://api.giphy.com/v1/gifs/random?api_key=eisycQlpcWXRn38ebyMigXiu2VSB992i')
    .then(response => response.json())
    .then((result) => {
        console.log(result); //Response will be actual JSON DATa

        imageContainer.innerHTML = "";

        randomGIF.src = result.data.images.preview_webp.url;
        // result.data.images.preview_webp.url
    })
    .catch(error=>console.error(`Something went wrong - ${error}`));
})


// Category wise GIF's

gifCategory.addEventListener("input",()=>{
    // console.log(`Category : ${gifCategory.value}`);

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=eisycQlpcWXRn38ebyMigXiu2VSB992i&q=${gifCategory.value}`)
    .then(response => response.json())
    .then((result) => {
        console.log(result); //Response will be actual JSON DATa

        const gifData = result.data;
        console.log(gifData);

        let html = "";
        for(let i = 0; i< gifData.length; i++){
            html += `<div class="container">
                            <img src="${gifData[i].images.preview_webp.url}"
                                alt="news image">
                    </div>`
        }

        imageContainer.innerHTML = html;
    })
    .catch(error=>console.error(`Something went wrong - ${error}`));
})

// Categories - Anime, art & design, memes, news & politics,food & drink


    


const IMAGE = 'https://image.tmdb.org/t/p/w500';

const API_KEY = 'd8bf019d0cca372bd804735f172f67e8';

const SEARCH_URL = 'https://api.themoviedb.org/3/search/multi?api_key=d8bf019d0cca372bd804735f172f67e8&language=en-US&query=';

const header = document.querySelector(".header")
const moviesContainer = document.querySelector(".movies__container");

const searchInput = document.getElementById("search__input");
const searchBtn = document.getElementById("search__btn");

const selectMovieBox = document.querySelector(".movie__box")


const trendingUrl= 'https://api.themoviedb.org/3/trending/all/day?api_key=d8bf019d0cca372bd804735f172f67e8';



    
 

showTrendingMovies(trendingUrl)

searchBtn.addEventListener("click", handleClick)

function handleClick(e){
   
    e.preventDefault()
    header.textContent=  searchInput.value;
      moviesContainer.innerHTML = '';
    const searchTerm = searchInput.value;

    const getUrl = SEARCH_URL + searchTerm + '&include_adult=false'
    
   getMovies(getUrl)
  
    
}

async function getMovies(url) {
    const response = await fetch(url);
    const data = await response.json();
    fetchedData(data)
   

}




function fetchedData(data) {
  
    const results = data.results;
    results.forEach(getInfo)

}

function getInfo(movie){
const imgPath = IMAGE + movie.poster_path;
const title = movie.title;
if(title === undefined){
    moviesContainer.classList.remove('movie__box')
} else if(movie.poster_path === null) {
    moviesContainer.classList.remove('movie__box')
}

else{


const movieBox = document.createElement("div");
movieBox.setAttribute("class", "movie__box");
   const htmlElements = `
   <div class="img__box">
       <img src=${imgPath} alt="">
   </div>
   <div class="movie__box__text">
       <p class="title">${title}</p><span class="ratings">${movie.vote_average}</span>
   `;
   movieBox.innerHTML = htmlElements;
   moviesContainer.appendChild(movieBox);
  
}

}

async function showTrendingMovies(tUrl) {
    const response = await fetch(tUrl);
    const data = await response.json();
   fetchTrending(data)
   

}

function fetchTrending(data) {
    const trendingMovieList = data.results
    trendingMovieList.forEach(showTrending)
}



function showTrending(movie) {
    const imgPath = IMAGE + movie.poster_path;
const title = movie.title;
if(title === undefined){
    moviesContainer.classList.remove('movie__box')
} else if(movie.poster_path === null) {
    moviesContainer.classList.remove('movie__box')
 }


else{


const movieBox = document.createElement("div");
movieBox.setAttribute("class", "movie__box");
   const htmlElements = `
   <div class="img__box">
       <img src=${imgPath} alt="">
   </div>
   <div class="movie__box__text">
       <p class="title">${title}</p><span class="ratings">${movie.vote_average}</span>
   `;
   movieBox.innerHTML = htmlElements;
   moviesContainer.appendChild(movieBox);
  
}
}




// function showInfo() {
//     console.log("movie box")
// }




   




















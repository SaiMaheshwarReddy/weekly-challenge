const IMAGE = 'https://image.tmdb.org/t/p/w500';

const API_KEY = 'd8bf019d0cca372bd804735f172f67e8';



const SEARCH_URL = 'https://api.themoviedb.org/3/search/multi?api_key=d8bf019d0cca372bd804735f172f67e8&language=en-US&query=';



const header = document.querySelector(".header")
const container = document.querySelector(".container")
const moviesContainer = document.querySelector(".movies__container");
const modalBox = document.querySelector(".modal__box");

const searchInput = document.getElementById("search__input");
const form = document.getElementById("form");
const modalContainer = document.querySelector(".modal__container");
const movieBoxBtn = document.querySelector(".movie__box");
const closeModal = document.getElementById("closeModal");

const selectMovieBox = document.querySelector(".movie__box")
var searchTerm;

const trendingUrl= 'https://api.themoviedb.org/3/trending/all/day?api_key=d8bf019d0cca372bd804735f172f67e8';


// https://image.tmdb.org/t/p/w500/uQtqiAu2bBlokqjlURVLEha6zoi.jpg
    
 //modal





showTrendingMovies(trendingUrl)

form.addEventListener("submit",
(e)=>{
   e.preventDefault();
    handleClick();
}
)





function handleClick(){
   
   
    header.textContent=  searchInput.value;
      moviesContainer.innerHTML = '';
    if(searchInput.value == "" || searchInput.value == " " || searchInput.value == "  " || searchInput.value == "   " || searchInput.value == "    "){
       alert("Enter a valid Movie name")
       window.location.reload();
    }
    searchTerm = searchInput.value;

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
    console.log(results)
    let output = '';
    results.forEach((movie) => {
        const imgPath = IMAGE + movie.poster_path;
const title = movie.title;
if(title === undefined){
    moviesContainer.classList.remove('movie__box')
} else if(movie.poster_path === null) {
    moviesContainer.classList.remove('movie__box')
}

else{
    

    output += `
    <div class="movie__box" onclick= "showMovieInfo(${movie.id})">
    <div class="img__box">
        <img src=${imgPath} alt="">
    </div>
    <div class="movie__box__text">
        <p class="title">${title}</p>
        </div>
        </div>
    `;
 
    moviesContainer.innerHTML = output


  
}

    })

}



async function showTrendingMovies(tUrl) {
    const response = await fetch(tUrl);
    const data = await response.json();
    // console.log(data.results)
   fetchTrending(data)
//    setTimeout( movieInfo(data.results), 2000);
  

}

function fetchTrending(data) {
    const trendingMovieList = data.results
let output = '';
    trendingMovieList.forEach(movie => {
        const imgPath = IMAGE + movie.poster_path;
        const title = movie.title;
        if(title === undefined){
            moviesContainer.classList.remove('movie__box')
        } else if(movie.poster_path === null) {
            moviesContainer.classList.remove('movie__box')
         }
        
        
        else{
        
          output += `
           <div class="movie__box" onclick= "showMovieInfo(${movie.id})">
           <div class="img__box">
               <img src=${imgPath} alt="">
           </div>
           <div class="movie__box__text">
               <p class="title">${title}</p>
               </div>
               </div>
           `;
        
           moviesContainer.innerHTML = output
        
        }
    })


console.log(trendingMovieList)
    
}



// function showTrending(movie, output) {
   
// }





function showMovieInfo(id) {
    modalContainer.classList.toggle("appear");
    console.log(id)
 let eachMovieURL = 'https://api.themoviedb.org/3/movie/' + id +  '?api_key=d8bf019d0cca372bd804735f172f67e8&language=en-US'
 

    fetch(eachMovieURL).then(res => res.json())
    .then(data => {
        console.log(data)
let modalinfo = '';
let backdrop = IMAGE + data.backdrop_path;
modalinfo += `
<div class="modal__wrapper">
<i class="fas fa-times" " id="closeModal" onclick= "closeModalFunc()"></i>
<div class="img">
    <img src=${backdrop} alt="">
</div>
<h2 class="modal__title">
${data.title}
   
</h2>
<span><b>Rating: </b>${data.vote_average}</span>
<p>${data.overview}</p>
</div>
`

modalContainer.innerHTML = modalinfo;
   


    }).catch(err => console.log(err))

}
// setTimeout(()=> {
//     closeModal.addEventListener("click", ()=> {
       
//     })
// }, 2000)

function closeModalFunc() {
    modalContainer.classList.toggle("appear");
}

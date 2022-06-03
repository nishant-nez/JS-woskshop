const button = document.querySelector(".btn");
const movieTitle = document.querySelector(".titleName");
const movieId = document.querySelector(".idName");
const movieDirector = document.querySelector(".directorName");
const movieImdb = document.querySelector(".imdbName");
const movieMeta = document.querySelector(".metaName");
const movieRotten = document.querySelector(".rottenName");
const trailerLink = document.querySelector(".trailerLink");
const posterLink = document.querySelector(".poster-link");
const changeBg = document.querySelector(".bg-btn");
const container = document.querySelector(".container");
const changeClr = document.querySelector(".btn-color");

async function fetchData(searchText) {
  movieDirector.innerHTML = "loading..";
  movieTitle.innerHTML = "loading..";
  movieId.innerHTML = "loading..";
  movieImdb.innerHTML = "loading..";
  movieMeta.innerHTML = "loading..";
  movieRotten.innerHTML = "loading..";
  posterLink.src = "https://c.tenor.com/Yg6M6s-Mt4kAAAAC/load-loading.gif";

  let data = await fetch(`https://imdb-api.com/en/API/SearchMovie/k_m7mem5hv/${searchText}`);
  let jsonData = await data.json();
  console.log(jsonData);
  let id = jsonData.results[0].id;
  console.log(id);
  let imgLink = jsonData.results[0].image;

  let ratings = await fetch(`https://imdb-api.com/API/Ratings/k_m7mem5hv/${id}`);
  let ratingsJson = await ratings.json();
  console.log(ratingsJson);
  let mTitle = ratingsJson.fullTitle;
  console.log(mTitle);
  let imdb = ratingsJson.imDb;
  console.log(imdb);
  let meta = ratingsJson.metacritic;
  console.log(meta);
  let rotten = ratingsJson.rottenTomatoes;
  console.log(rotten);

  let trailer = await fetch(`https://imdb-api.com/API/Trailer/k_m7mem5hv/${id}`);
  let trailerJson = await trailer.json();
  console.log(trailerJson);
  let tLink = trailerJson.link;

  let cast = await fetch(`https://imdb-api.com/en/API/FullCast/k_m7mem5hv/${id}`);
  let castJson = await cast.json();
  console.log(castJson);
  let director = castJson.directors.items[0].name;
  console.log(director);

  movieDirector.innerHTML = director;
  movieTitle.innerHTML = mTitle;
  movieId.innerHTML = id;
  movieImdb.innerHTML = imdb;
  movieMeta.innerHTML = meta;
  movieRotten.innerHTML = rotten;
  posterLink.src = imgLink;
  trailerLink.href = tLink;
}

const searchMovie = () => {
  let searchText = document.querySelector("#search-box").value;
  fetchData(searchText);
};

const changeBgImg = () => {
  let imgId = Math.floor(Math.random() * 901);
  console.log("clicked" + imgId);
  let link = `url(https://picsum.photos/id/${imgId}/1600/740)`;
  document.body.style.backgroundImage = link;
  // id++;
};

const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const changeColor = () => {
  let colorGrad =
    "linear-gradient(" +
    Math.random() * 360 +
    "deg, " +
    getRandomColor() +
    " 0%, " +
    getRandomColor() +
    " 100%)";
  console.log("clicked0", colorGrad);
  posterLink.style.boxShadow = "none";
  container.style.background = colorGrad;
};

button.addEventListener("click", searchMovie);
changeBg.addEventListener("click", changeBgImg);
changeClr.addEventListener("click", changeColor);

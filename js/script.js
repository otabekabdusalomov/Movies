"use strict";

let elForm = document.querySelector(".form");
let elheader = document.querySelector(".header");
let elResult = document.querySelector(".movies__result");
let elLists = document.querySelector(".movies__list");
let elInput = document.querySelector(".form-control");
const elList = document.querySelector(".list");
const elPrevBtn = document.querySelector(".prev-btn");
const elNextBtn = document.querySelector(".next-btn");
const elPaginationList = document.querySelector(".pagination");
let elHover = document.querySelector(".overlay1");
const API_KEY = "9318adfa";

// let newBtnMovie = [];

// const renderMore = function (filmsArray, element) {
//   filmsArray.forEach((movie) => {
//     // CREATE
//     let newCard = document.createElement("div");
//     let nevImgBox = document.createElement("div");
//     let newImg = document.createElement("img");
//     let newCardBody = document.createElement("div");
//     let newCardTitle = document.createElement("h5");
//     let newCardGenres = document.createElement("ul");
//     let newDesc = document.querySelector("p");
//     let newBtnWrapp = document.createElement("div");
//     let newBtn = document.createElement("button");
//     let newplanBtn = document.createElement("button");

//     movie.genres.forEach((genre) => {
//       let newGenre = document.createElement("li");
//       newGenre.textContent = genre;
//       newCardGenres.appendChild(newGenre);
//     });

//     // SET ATTRIBUTE
//     newCard.setAttribute("class", "card1");
//     nevImgBox.setAttribute("class", "img-box1");
//     newImg.setAttribute("class", "card-img-top1");
//     newImg.setAttribute("src", movie.poster);
//     newCardBody.setAttribute("class", "card-body1");
//     newCardTitle.setAttribute("class", "card-title");
//     newDesc.setAttribute("class", "card-desc");
//     newBtnWrapp.classList.add("button-wrapp1");
//     newBtn.setAttribute("class", "morebtn btn btn-primary button mx-2");
//     newplanBtn.setAttribute("class", "bookbtn btn button");

//     // TEXT CONTENT
//     // elResult.textContent = films.length;
//     newDesc.textContent = movie.overview;
//     newCardTitle.textContent = movie.title;
//     newBtn.textContent = "Watch Triler";
//     newplanBtn.textContent = "Bookmark";

//     //DATASET
//     // newBtn.dataset.btnId = movie.id;
//     newplanBtn.dataset.checkId = movie.id;

//     // APPEND
//     element.appendChild(newCard);
//     newCard.appendChild(nevImgBox);
//     nevImgBox.appendChild(newImg);
//     newCard.appendChild(newCardBody);
//     newCardBody.appendChild(newCardTitle);
//     newCardBody.appendChild(newCardGenres);
//     newCardBody.appendChild(newDesc);
//     newCardBody.appendChild(newBtnWrapp);
//     newBtnWrapp.appendChild(newBtn);
//     newBtnWrapp.appendChild(newplanBtn);
//     console.log("boldi");
//   });
// };

//RENDER films
const renderFilms = function (filmsArray, element) {
  filmsArray.forEach((movie) => {
    // CREATE
    let newCard = document.createElement("div");
    let nevImgBox = document.createElement("div");
    let newImg = document.createElement("img");
    let newCardBody = document.createElement("div");
    let newCardTitle = document.createElement("h5");
    // let newCardGenres = document.createElement("ul");
    let newBtnWrapp = document.createElement("div");
    let newBtn = document.createElement("button");
    let newplanBtn = document.createElement("button");

    // SET ATTRIBUTE
    newCard.setAttribute("class", "card");
    newCard.style.width = "18rem";
    nevImgBox.setAttribute("class", "img-box");
    newImg.setAttribute("class", "card-img-top");
    newImg.setAttribute("src", movie.Poster);
    newCardBody.setAttribute("class", "card-body");
    newCardTitle.setAttribute("class", "card-title");

    newBtnWrapp.classList.add("button-wrapp");
    newBtn.setAttribute("class", "morebtn btn btn-primary button mx-2");
    newplanBtn.setAttribute("class", "bookbtn btn button");

    // TEXT CONTENT
    elResult.textContent = filmsArray.length;
    newCardTitle.textContent = movie.Title;
    newBtn.textContent = "More";
    newplanBtn.textContent = "Bookmark";

    //DATASET
    newBtn.dataset.btnId = movie.Title;
    newplanBtn.dataset.checkId = movie.Title;

    // APPEND
    element.appendChild(newCard);
    newCard.appendChild(nevImgBox);
    nevImgBox.appendChild(newImg);
    newCard.appendChild(newCardBody);
    newCardBody.appendChild(newCardTitle);
    newCardBody.appendChild(newBtnWrapp);
    newBtnWrapp.appendChild(newBtn);
    newBtnWrapp.appendChild(newplanBtn);
  });
};

let search = "iron man";
let page = 1;

const getmovies = async function () {
  const response = await fetch(
    `https://omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${page}`
  );
  var data = await response.json();
  var films = data.Search;

  if (data.Response === "True" && data.Search.length > 0) {
    elLists.innerHTML = null;
    renderFilms(films, elLists);
  }


  // if (films.Response === "True" && films.Search.length > 0) {
  //   renderMovies(films.Search, elList);
  // }

  page === 1 ? (elPrevBtn.disabled = true) : (elPrevBtn.disabled = false);

  const totalPageResult = Math.ceil(data.totalResults / 10);

  page === totalPageResult
    ? (elNextBtn.disabled = true)
    : (elNextBtn.disabled = false);

  elPaginationList.innerHTML = null;

  for (let i = 1; i <= totalPageResult; i++) {
    let htmlLi = `
      <li class="page-item page-link">${i}</li>
    `;

    if (page == i) {
      htmlLi = `
      <li class="page-item page-link active">${i}</li>
    `;
    } else {
      htmlLi = `
      <li class="page-item page-link">${i}</li>
    `;
    }
    elPaginationList.insertAdjacentHTML("beforeend", htmlLi);
  }
};

getmovies();

input.addEventListener("change", () => {
  page = 1;
  search = elInput.value;
  console.log("boldii");
  getmovies();

});



elPrevBtn.addEventListener("click", () => {
  page--;
  getmovies();
});

elNextBtn.addEventListener("click", () => {
  page++;
  getmovies();
});

elPaginationList.addEventListener("click", function (evt) {
  page = Number(evt.target.textContent);
  getmovies();
});





// // console.log(films);
// //CARD BTN
// // let newnMovie = [];
// elList.addEventListener("click", function (evt) {
//   if (evt.target.matches(".bookbtn")) {
//     // let newcheckId = evt.target.dataset.checkId * 1;
//     // let newnMovie = films.find((movie) => movie.Title * 1 === newcheckId);
//     // if (!newBtnMovie.includes(newnMovie)) {
//     //   newBtnMovie.push(newnMovie);
//     // }
//     // renderMore(newnMovie,)
//     // elBookmarkdesc.textContent = newBtnMovie.length;
//     // window.localStorage.setItem("localBoocmark", JSON.stringify(newBtnMovie));
//   } else if (evt.target.matches(".morebtn")) {
//     let newBtnId = evt.target.dataset.btnId;
//     // console.log(films.find((movie) => movie.Title == newBtnId));;
//     console.log(films);
//     elHover.classList.add("overlay");
//     elList.innerHTML = null;
//     elheader.classList.remove("none")
//     renderMore(newnMovie, elheader);
//     renderFilms(films, elList);
//     console.log(newnMovie);
//   }
// });



// elHover.addEventListener("click", function () {
//   newnMovie.pop();
//   elHover.classList.remove("overlay");
//   elheader.classList.add("none")
//   elList.innerHTML = null;
//   renderFilms(films, elList);
//   console.log(newnMovie);
// });

var slider = tns({
  container: '.my-slider',
  items: 3,
  autoplay: true,
  autoplayTimeout: 1500,
  swipeAngle: false,
  speed: 600,
  edgePadding: 80,
  navAsThumbnails: true,
});

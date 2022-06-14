`// "use strict";`

let elForm = document.querySelector(".form");
let elheader = document.querySelector(".header");
let elResult = document.querySelector(".movies__result");
let elList = document.querySelector(".movies__list");
let elSelect = document.querySelector(".select");
let elInput = document.querySelector(".form-control");
let elBtnBookmark = document.querySelector(".bookmarc");
let elBookmarkList = document.querySelector(".boocmark__list");
let elBookmarkdesc = document.querySelector(".bookmark-desc");
let elHover = document.querySelector(".overlay1");

const localBoocmark = JSON.parse(window.localStorage.getItem("localBoocmark"));
let newBtnMovie = [];

const renderMore = function (filmsArray, element) {
  filmsArray.forEach((movie) => {
    // CREATE
    let newCard = document.createElement("div");
    let nevImgBox = document.createElement("div");
    let newImg = document.createElement("img");
    let newCardBody = document.createElement("div");
    let newCardTitle = document.createElement("h5");
    let newCardGenres = document.createElement("ul");
    let newDesc = document.querySelector("p");
    let newBtnWrapp = document.createElement("div");
    let newBtn = document.createElement("button");
    let newplanBtn = document.createElement("button");

    movie.genres.forEach((genre) => {
      let newGenre = document.createElement("li");
      newGenre.textContent = genre;
      newCardGenres.appendChild(newGenre);
    });

    // SET ATTRIBUTE
    newCard.setAttribute("class", "card1");
    nevImgBox.setAttribute("class", "img-box1");
    newImg.setAttribute("class", "card-img-top1");
    newImg.setAttribute("src", movie.poster);
    newCardBody.setAttribute("class", "card-body1");
    newCardTitle.setAttribute("class", "card-title");
    newDesc.setAttribute("class", "card-desc");
    newBtnWrapp.classList.add("button-wrapp1");
    newBtn.setAttribute("class", "morebtn btn btn-primary button mx-2");
    newplanBtn.setAttribute("class", "bookbtn btn button");

    // TEXT CONTENT
    // elResult.textContent = films.length;
    newDesc.textContent = movie.overview;
    newCardTitle.textContent = movie.title;
    newBtn.textContent = "Watch Triler";
    newplanBtn.textContent = "Bookmark";

    //DATASET
    // newBtn.dataset.btnId = movie.id;
    newplanBtn.dataset.checkId = movie.id;

    // APPEND
    element.appendChild(newCard);
    newCard.appendChild(nevImgBox);
    nevImgBox.appendChild(newImg);
    newCard.appendChild(newCardBody);
    newCardBody.appendChild(newCardTitle);
    newCardBody.appendChild(newCardGenres);
    newCardBody.appendChild(newDesc);
    newCardBody.appendChild(newBtnWrapp);
    newBtnWrapp.appendChild(newBtn);
    newBtnWrapp.appendChild(newplanBtn);
    console.log("boldi");
  });
};

// FUNCTION NEW OPTION
const generateGenres = function (films) {
  const filteredGenres = [];

  films.forEach((film) => {
    film.genres.forEach((genre) => {
      if (!filteredGenres.includes(genre)) {
        filteredGenres.push(genre);
      }
    });
  });

  filteredGenres.forEach((genre) => {
    let newOption = document.createElement("option");
    newOption.value = genre;
    newOption.textContent = genre;
    elSelect.appendChild(newOption);
  });
};

//RENDER films
const renderFilms = function (filmsArray, element) {
  filmsArray.forEach((movie) => {
    // CREATE
    let newCard = document.createElement("div");
    let nevImgBox = document.createElement("div");
    let newImg = document.createElement("img");
    let newCardBody = document.createElement("div");
    let newCardTitle = document.createElement("h5");
    let newCardGenres = document.createElement("ul");
    let newBtnWrapp = document.createElement("div");
    let newBtn = document.createElement("button");
    let newplanBtn = document.createElement("button");

    movie.genres.forEach((genre) => {
      let newGenre = document.createElement("li");
      newGenre.textContent = genre;
      newCardGenres.appendChild(newGenre);
    });

    // SET ATTRIBUTE
    newCard.setAttribute("class", "card");
    newCard.style.width = "18rem";
    nevImgBox.setAttribute("class", "img-box");
    newImg.setAttribute("class", "card-img-top");
    newImg.setAttribute("src", movie.poster);
    newCardBody.setAttribute("class", "card-body");
    newCardTitle.setAttribute("class", "card-title");

    newBtnWrapp.classList.add("button-wrapp");
    newBtn.setAttribute("class", "morebtn btn btn-primary button mx-2");
    newplanBtn.setAttribute("class", "bookbtn btn button");

    // TEXT CONTENT
    elResult.textContent = films.length;
    newCardTitle.textContent = movie.title;
    newBtn.textContent = "More";
    newplanBtn.textContent = "Bookmark";

    //DATASET
    newBtn.dataset.btnId = movie.id;
    newplanBtn.dataset.checkId = movie.id;

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
renderFilms(films, elList);
generateGenres(films);

//SELECT value btn
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let selectValue = elSelect.value;
  elList.innerHTML = null;
  let selectFilmsArray = films.filter(
    (film) => selectValue === "all" || film.genres.includes(selectValue)
  );
  renderFilms(selectFilmsArray, elList);
  elResult.textContent = selectFilmsArray.length;
});

//SEARCH btn
elInput.addEventListener("keyup", () => {
  elList.innerHTML = null;
  let inputValue = elInput.value;
  let selectFilmsArray = [];

  for (let movie of films) {
    if (
      inputValue.toLowerCase() ===
      movie.title.slice(0, inputValue.length).toLowerCase()
    ) {
      elList.innerHTML = null;
      selectFilmsArray.push(movie);
    }
  }
  elResult.textContent = selectFilmsArray.length;
  renderFilms(selectFilmsArray, elList);
  generateGenres(selectFilmsArray);
});

// //CARD BTN
let newnMovie = [];
elList.addEventListener("click", function (evt) {
  if (evt.target.matches(".bookbtn")) {
    let newcheckId = evt.target.dataset.checkId * 1;
    let newnMovie = films.find((movie) => movie.id * 1 === newcheckId);
    if (!newBtnMovie.includes(newnMovie)) {
      newBtnMovie.push(newnMovie);
    }
    elBookmarkdesc.textContent = newBtnMovie.length;
    window.localStorage.setItem("localBoocmark", JSON.stringify(newBtnMovie));
  } else if (evt.target.matches(".morebtn")) {
    let newBtnId = evt.target.dataset.btnId * 1;
    newnMovie[0] = films.find((movie) => movie.id * 1 === newBtnId);
    elHover.classList.add("overlay");
    elList.innerHTML = null;
    elheader.classList.remove("none")
    renderMore(newnMovie, elheader);
    renderFilms(films, elList);
    console.log(newnMovie);
  }
});

elHover.addEventListener("click", function () {
  newnMovie.pop();
  elHover.classList.remove("overlay");
  elheader.classList.add("none")
  elList.innerHTML = null;
  renderFilms(films, elList);
  console.log(newnMovie);
});

"use strict";

haalFilmsOp();

async function haalFilmsOp() {
  const response = await fetch("films.json");

  if (response.ok) {
    const films = await response.json();
    initFilmNav(films);
  } else {
    document.getElementById("nietGevonden").hidden = false;
  }
}

function initFilmNav(films) {
  let filmIndex = 0;
  updateFilmDisplay(films, filmIndex);

  const buttonIds = ["vorige", "volgende"];

buttonIds.forEach((buttonId, index) => {
  document.getElementById(buttonId).addEventListener("click", () => {
    filmIndex += index === 0 ? -1 : 1;
    updateFilmDisplay(films, filmIndex);
  });
});
}

function updateFilmDisplay(films, filmIndex) {
  const film = films[filmIndex];
  const { titel, beschrijving, cast, foto, genres, regisseurs, rating } = film;

  Object.entries({ titel, beschrijving, foto }).forEach(([key, value]) => {
    document.getElementById(key)[key === "foto" ? "src" : "innerText"] = value;
  });

  ["cast", "genres", "regisseurs"].forEach((key) => { 
    const container = document.getElementById(key);
    container.innerHTML = "";
    film[key].forEach((value) => {
      const item = document.createElement("li");
      item.innerText = value;
      container.appendChild(item);
    });
  });

  document.getElementById("vorige").disabled = filmIndex === 0;
  document.getElementById("volgende").disabled = filmIndex === films.length - 1;

  const ratingContainer = document.getElementById("rating");
  ratingContainer.innerHTML = "";
  for (let i = 0; i < rating; i++) {
    const sterAfbeelding = document.createElement("div");
    sterAfbeelding.classList.add("ster");
    ratingContainer.appendChild(sterAfbeelding);
  }
}

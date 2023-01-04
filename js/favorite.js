//all consts and variables here
const url = "https://themealdb.com/api/json/v1/1/";
const searchValue = document.getElementsByClassName("searchtext--Box");
const ul = document.querySelector(".searchResults--suggestions");
const list = document.getElementById("clickableList");
const a = document.querySelector("link");
const displaySection = document.querySelector(".display--Section");
const searchButton = document.querySelector(".search--Button");
const viewDetails = document.querySelector(".btn-2");
const addToFav = document.querySelector(".btn-3");
let markUp = "";

//runs on page load. fetches data from the localstorage
window.addEventListener("load", function () {
  let ll = Object.keys(localStorage);
  if (ll == "") {
    displaySection.innerHTML =
      "No favorite added yet. Go to home page and search for some recipe and add them to favorite";
    displaySection.style.textAlign = "center";
  }
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    fetchDataForList(value);
  }
});

//fetches data from one list
const fetchDataForList = async function (parameter) {
  if (parameter != "") {
    let res = await fetch(`${url}lookup.php?i=${parameter}`);
    let data = await res.json();
    console.log(data);
    renderFormSearchResults(data.meals[0]);
  } else {
    //clearData();
  }
};

//renders form search results
const renderFormSearchResults = async function (data) {
  markUp = `<div class="display--section--list">
    <div>
      <img src="${data.strMealThumb}/preview" width="86%"/>
    </div>
    <div class="list--text--details">
    Meal Name: ${data.strMeal}<br />
     Category: ${data.strCategory} <br /> Country : ${data.strArea} <br /> Tags : ${data.strTags}   
    </div>
    <div class="list--button--details">
      <button class="btn-2" data-id="${data.idMeal}">View details</button><br />
      <button class="btn-4" data-id="${data.idMeal}">Remove From Favorites</button>
    </div>  
      </div>`;

  displaySection.insertAdjacentHTML("beforeend", markUp);
};

//clears dom data whenever data
function clearData() {
  markUp = "";

  displaySection.innerHTML = "";
}

//detects button click when clicked
displaySection.addEventListener("click", function (event) {
  console.log("Click event listener called");
  let currentUrl = window.location.href;
  let url = currentUrl.split("viewFavorites.html")[0];
  let button = event.target;
  let dataAttribute = button.dataset.id;
  if (event.target.className == "btn-4") {
    let button = event.target;
    let dataAttribute = button.dataset.id;
    if (dataAttribute != undefined) {
      localStorage.removeItem(dataAttribute);
      location.reload(false);
      alert("Successfully removed from favorite");
    }
  } else if (event.target.className == "btn-2") {
    let newUrl = url + "viewDetails.html#" + dataAttribute;
    console.log(newUrl);
    window.location.href = newUrl;
  } else {
    console.log("Hitting other place");
  }
});

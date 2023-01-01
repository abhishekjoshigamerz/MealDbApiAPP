const url = "https://themealdb.com/api/json/v1/1/";
const searchValue = document.getElementsByClassName("searchtext--Box");
const ul = document.querySelector(".searchResults--suggestions");
const list = document.getElementById("clickableList");
const a = document.querySelector("link");
const displaySection = document.querySelector(".display--Section");
const searchButton = document.querySelector(".search--Button");
const viewDetails = document.querySelector(".btn-2");
const addToFav = document.querySelector(".btn-3");

let markUp = ``;
searchValue[0].addEventListener("input", function (params) {
  //alert(searchValue[0].value);
  //console.log(params);
  fetchData(searchValue[0].value);
});

const fetchData = async function (parameter) {
  if (parameter != "") {
    let res = await fetch(`${url}search.php?s=${parameter}`);
    let data = await res.json();
    renderSearchList(data.meals);
  } else {
    clearData();
  }
  // // console.log(res);
  // let data = await res.json();
  // console.log(data);
};

const renderSearchList = async function (data) {
  clearData();
  for (let i = 0; i < data.length; i++) {
    markUp += `<a href="#${data[i].idMeal}" class="link" ><li class="search--list" data-id="${data[i].strMeal} id="#clickableList">${data[i].strMeal}</li></a>`;
    // li.appendChild(document.createTextNode(data[i].strMeal));
    // ul.appendChild(li);
  }

  ul.insertAdjacentHTML("beforeend", markUp);
};

function clearData() {
  markUp = "";
  ul.innerHTML = "";
  displaySection.innerHTML = "";
}

const showDataById = async function (Id) {
  let newUrl = url + "lookup.php?s=" + Id;
  let res = await fetch(`${url}lookup.php?i=${Id}`);
  console.log(res);
  let data = await res.json();
  console.log(data.meals[0]);
  renderOneList(data.meals[0]);
};

const renderOneList = async function (data) {
  clearData();
  console.log("Line 54", data);
  markUp += `<div class="display--section--list">
  <div>
    <img src="${data.strMealThumb}/preview" width="86%"/>
  </div>
  <div class="list--text--details">
  Meal Name: ${data.strMeal}<br />
   Category: ${data.strCategory} <br /> Country : ${data.strArea} <br /> Tags : ${data.strTags}   
  </div>
  <div class="list--button--details">
    <button class="btn-2">View details</button><br />
    <button class="btn-3">Add to Favorite</button>
  </div>  
    </div>`;

  displaySection.insertAdjacentHTML("beforeend", markUp);
};

searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  fetchDataForList(searchValue[0].value);
});

const renderFormSearchResults = async function (data) {
  clearData();
  for (let i = 0; i < data.length; i++) {
    markUp += `<div class="display--section--list">
    <div>
      <img src="${data[i].strMealThumb}/preview" width="86%"/>
    </div>
    <div class="list--[i]text--details">
    Meal Name: ${data[i].strMeal}<br />
     Category: ${data[i].strCategory} <br /> Country : ${data[i].strArea} <br /> Tags : ${data[i].strTags}   
    </div>
    <div class="list--button--details">
      <button class="btn-2" data-id="${data[i].idMeal}">View details</button><br />
      <button class="btn-3" data-id="${data[i].idMeal}">Add to Favorite</button>
    </div>  
      </div>`;
  }

  displaySection.insertAdjacentHTML("beforeend", markUp);
};

const fetchDataForList = async function (parameter) {
  if (parameter != "") {
    let res = await fetch(`${url}search.php?s=${parameter}`);
    let data = await res.json();
    console.log(data.meals);
    renderFormSearchResults(data.meals);
  } else {
    clearData();
  }
};

displaySection.addEventListener("click", function (event) {
  let currentUrl = window.location.href;

  let button = event.target;
  let dataAttribute = button.dataset.id;
  if (event.target.className == "btn-3") {
    if (dataAttribute != undefined) {
      localStorage.setItem(dataAttribute, dataAttribute);
      alert("Successfully added to favorite");
    }
  } else if (event.target.className == "btn-2") {
    let newUrl = currentUrl + "viewDetails.html#" + dataAttribute;
    console.log(newUrl);
    window.location.href = newUrl;
  } else {
    console.log("No button");
  }
});

const addToFavorite = async function () {};

window.addEventListener("hashchange", function () {
  var url = window.location.href; // get the full URL
  var hashFragment = url.split("#")[1]; // split the URL at the "#" symbol and get the second part
  clearData();
  showDataById(hashFragment);
});

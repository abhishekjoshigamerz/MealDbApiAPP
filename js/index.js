//all consts and variables here
const url = "https://themealdb.com/api/json/v1/1/";
const searchValue = document.getElementsByClassName("searchtext--Box");
const ul = document.querySelector(".searchResults--suggestions");
const list = document.getElementById("clickableList");
const a = document.querySelector("link");
const searchFormParentDiv = document.querySelector(".search");
const displaySection = document.querySelector(".display--Section");
const searchButton = document.querySelector(".search--Button");
const viewDetails = document.querySelector(".btn-2-link");
const addToFav = document.querySelector(".btn-3");

let markUp = ``;

//detects changes in input field
searchValue[0].addEventListener("input", function (params) {
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
};
//when list is being clicked we show the results using event propogation here.
searchFormParentDiv.addEventListener("click", function (event) {
  console.log(event.target.className);
  if (event.target.className == "search--list") {
    let list = event.target.dataset.id;
    clearData();
    showDataById(list);
  } else {
  }
});
//shows list items in search form
const renderSearchList = async function (data) {
  clearData();
  for (let i = 0; i < data.length; i++) {
    markUp += `<a href="#${data[i].idMeal}" class="link" ><li class="search--list" data-id="${data[i].idMeal}" id="#clickableList">${data[i].strMeal}</li></a>`;
  }

  ul.insertAdjacentHTML("beforeend", markUp);
};

//clears dom data whenever called
function clearData() {
  markUp = "";
  ul.innerHTML = "";
  displaySection.innerHTML = "";
}

//shows data by id  the api
const showDataById = async function (Id) {
  let newUrl = url + "lookup.php?s=" + Id;
  let res = await fetch(`${url}lookup.php?i=${Id}`);

  let data = await res.json();

  renderOneList(data.meals[0]);
};

//renders one item on being clicked in suggestion list
const renderOneList = async function (data) {
  searchValue.value = data.strMeal;
  let button = `<button class="btn-3" data-id="${data.idMeal}">Add to Favorite</button>`;
  if (localStorage.getItem(data.idMeal)) {
    button = `<button class="btn-4" data-id="${data.idMeal}">Remove from Favorite</button>`;
  }
  markUp += `<div class="display--section--list">
  <div>
    <img src="${data.strMealThumb}/preview" width="86%"/>
  </div>
  <div class="list--text--details">
  Meal Name: ${data.strMeal}<br />
   Category: ${data.strCategory} <br /> Country : ${data.strArea} <br /> Tags : ${data.strTags}   
  </div>
  <div class="list--button--details">
  <a class="btn-2-link-link" href="viewDetails.html#${data.idMeal}" data-id="${data.idMeal}">View details</a><br />
    ${button}
  </div>  
    </div>`;

  displaySection.insertAdjacentHTML("beforeend", markUp);
};

//detects form submission
searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  fetchDataForList(searchValue[0].value);
});

//render whole list of data
const renderFormSearchResults = async function (data) {
  clearData();
  for (let i = 0; i < data.length; i++) {
    let button = `<button class="btn-3" data-id="${data[i].idMeal}">Add to Favorite</button>`;
    if (localStorage.getItem(data[i].idMeal)) {
      button = `<button class="btn-4" data-id="${data[i].idMeal}">Remove from Favorite</button>`;
    }
    markUp += `<div class="display--section--list">
    <div>
      <img src="${data[i].strMealThumb}/preview" width="86%"/>
    </div>
    <div class="list--[i]text--details">
    Meal Name: ${data[i].strMeal}<br />
     Category: ${data[i].strCategory} <br /> Country : ${data[i].strArea} <br /> Tags : ${data[i].strTags}   
    </div>
    <div class="list--button--details">
      <a class="btn-2-link" data-id="${data[i].idMeal}">View details</a><br />
      ${button}
    </div>  
      </div>`;
  }

  displaySection.insertAdjacentHTML("beforeend", markUp);
};

//fetches data for one list
const fetchDataForList = async function (parameter) {
  if (parameter != "") {
    let res = await fetch(`${url}search.php?s=${parameter}`);
    let data = await res.json();
    renderFormSearchResults(data.meals);
  } else {
    clearData();
  }
};

//detects add to favorite click or view details buttons is clicked
displaySection.addEventListener("click", function (event) {
  let button = event.target;
  let dataAttribute = button.dataset.id;
  let url = window.location.href;
  if (event.target.className == "btn-3") {
    if (dataAttribute != undefined) {
      localStorage.setItem(dataAttribute, dataAttribute);
      alert("Successfully added to favorite");

      location.reload(false);
      window.location.href = url;
    }
  } else if (event.target.className == "btn-4") {
    localStorage.removeItem(dataAttribute);
    alert("Removed item from favorites");
    window.location.href = url;
  } else {
    console.log("No button");
  }
});

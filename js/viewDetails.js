//all contants and variables
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
let isFavorite = false;
//runs when page is loaded
window.addEventListener("load", function () {
  let url = window.location.href;
  let id = url.split("#")[1];
  getData(id);
});

//fetches data on the basis of id.
const getData = async function (id) {
  let res = await fetch(`${url}lookup.php?i=${id}`);
  let data = await res.json();
  console.log(data.meals);
  renderResultWithDetails(data.meals[0]);
};

//shows/renders data in html page
function renderResultWithDetails(data) {
  let ingredients = {};

  for (let i = 1; i < 21; i++) {
    const key = `strIngredient${i}`;
    const key2 = `strMeasure${i}`;
    const value = data[key];
    const valueMeasure = data[key2];
    if (value) {
      ingredients[value] = valueMeasure;
    }
  }

  let html = "";
  for (const key in ingredients) {
    html += `<p>${key} : ${ingredients[key]}</p>`;
  }

  let button = `<button class="btn-4" data-id="${data.idMeal}">Add to Favorite</button>`;
  if (localStorage.getItem(data.idMeal)) {
    isFavorite = true;
    button = `<button class="btn-4" data-id="${data.idMeal}">Remove From Favorites</button>`;
  }

  markUp += `<div class="result--Details">
    <div class="detail--intro">
        <div class="detail--img"><img src="${data.strMealThumb}" /></div>
        <div class="detail--desc text-center">
            <h2 >${data.strMeal}</h2>
            <h4>Tags: ${data.strTags}</h4>
            <h4>Category: ${data.strCategory}</h4>
            <h4>Area: ${data.strArea}</h4>
            <h4>Ingredients</h4>
            <p class="ml-2 mr-2">${html}</p> 
            <br />
            <h5><a href="${data.strSource}" target='_blank' ">Original Source</a> </h5>
            ${button}    
            
        </div>
    </div>
    <div class="detail--cooking">
    <h2 class="text-center">How to Cook</h2>
    ${data.strInstructions}
    </div>
  </div>`;

  displaySection.insertAdjacentHTML("beforeend", markUp);
}

//displays section here detects which button has been clicked
displaySection.addEventListener("click", function (event) {
  let button = event.target;
  let dataAttribute = button.dataset.id;
  if (isFavorite) {
    if (dataAttribute != undefined && event.target.className == "btn-4") {
      localStorage.removeItem(dataAttribute);
      location.reload(false);
      alert("Successfully removed from favorite");
    }
  } else {
    if (dataAttribute != undefined && event.target.className == "btn-4") {
      localStorage.setItem(dataAttribute, dataAttribute);
      location.reload(false);
      alert("Successfully added to favorite");
    }
  }
});

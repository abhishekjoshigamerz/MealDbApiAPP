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

const getData = async function (id) {
  let res = await fetch(`${url}lookup.php?i=${id}`);
  let data = await res.json();
  console.log(data.meals);
  renderResultWithDetails(data.meals[0]);
};

function renderResultWithDetails(data) {
  markUp += `<div class="result--Details">
    <div class="detail--intro">
        <div class="detail--img"><img src="${data.strMealThumb}" /></div>
        <div class="detail--desc text-center"><h2 >${data.strMeal}</h2>
        <h4>Tags: ${data.strTags}</h4>
        <h4>Category: ${data.strCategory}</h4>
        <h4>Area: ${data.strArea}</h4>
        </div>
    </div>
    
  </div>`;

  displaySection.insertAdjacentHTML("beforeend", markUp);
}

window.addEventListener("load", function () {
  let url = window.location.href;
  let id = url.split("#")[1];
  getData(id);
});

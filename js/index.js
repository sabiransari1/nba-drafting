let container = document.getElementById("container");
let URL = "https://www.balldontlie.io/api/v1/games";
let data = new Array();
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let search = document.getElementById("search");

window.addEventListener("load", () => {
  getData(URL, parmas);
});

let queryParams = {
  page: 1,
  per_page: 10,
};

let parmas = new URLSearchParams(queryParams);

// fetch

const getData = async (URL, parmas) => {
  try {
    let res = await fetch(`${URL}?${parmas}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    res = await res.json();

    data.push(res.data);
    productCard(res.data);
  } catch (error) {
    console.log(error);
  }
};

// card
const productCard = (data) => {
  container.innerHTML = null;

  data.forEach((item) => {
    let mainDiv = document.createElement("div");
    mainDiv.setAttribute("id", "mainDiv");

    let cardDiv = document.createElement("div");
    cardDiv.setAttribute("id", "cardDiv");

    let img = document.createElement("img");
    img.setAttribute(
      "src",
      "https://sialifehospital.com/wp-content/uploads/2021/04/testimonial-1.png"
    );
    img.setAttribute("id", "img");

    let fullName = document.createElement("h3");
    fullName.innerText = `${item.home_team.full_name}`;

    // let position = document.createElement("p");
    // position.innerText = `${item.home_team.position}`;

    let teamDetailsBtn = document.createElement("button");
    teamDetailsBtn.setAttribute("id", "teamDetailsBtn");
    teamDetailsBtn.innerText = `Team Details`;

    // =====================================================================================
    let flag = true;
    teamDetailsBtn.onclick = function () {
      if (flag) {
        teamDetailsDiv.style.display = "block";
        flag = false;
      } else {
        teamDetailsDiv.style.display = "none";
        flag = true;
      }
    };

    let teamDetailsDiv = document.createElement("div");
    mainDiv.setAttribute("id", "teamDetailsDiv");

    teamDetailsDiv.style.display = "none";

    let teamName = document.createElement("h3");
    teamName.innerText = `Team: ${item.home_team.name}`;

    let abbr = document.createElement("h3");
    abbr.innerText = `Abbr: ${item.home_team.abbreviation}`;

    let conference = document.createElement("h3");
    conference.innerText = `Conference: ${item.home_team.conference}`;

    let division = document.createElement("h3");
    division.innerText = `Division: ${item.home_team.division}`;

    let city = document.createElement("h3");
    city.innerText = `City: ${item.home_team.city}`;

    teamDetailsDiv.append(teamName, abbr, conference, division, city);
    // =====================================================================================

    cardDiv.append(img, fullName, teamDetailsBtn, teamDetailsDiv);
    mainDiv.append(cardDiv);
    container.append(mainDiv);
  });
};

// pagination
previous.onclick = () => {
  queryParams.page = queryParams.page - 1;
  let parmas = new URLSearchParams(queryParams);
  getData(URL, parmas);
};

next.onclick = () => {
  queryParams.page = queryParams.page + 1;
  let parmas = new URLSearchParams(queryParams);
  getData(URL, parmas);
};

search.onchange = () => {
  queryParams.search = search.value;
  let parmas = new URLSearchParams(queryParams);
  getData(URL, parmas);
};

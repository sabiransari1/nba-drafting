let URL = "https://www.balldontlie.io/api/v1/games";
let firstdate = document.getElementById("firstdate");
let seconddate = document.getElementById("seconddate");
let data = new Array();

firstdate.addEventListener("input", () => {
  queryParams.start_date = firstdate.value;
  console.log(firstdate.value);
  let parmas = new URLSearchParams(queryParams);
  getData(URL, parmas);
});

seconddate.addEventListener("input", () => {
  queryParams.end_date = seconddate.value;
  console.log(seconddate.value);
  let parmas = new URLSearchParams(queryParams);
  getData(URL, parmas);
});

let queryParams = {
  page: 1,
  per_page: 10,
  start_date: "",
  end_date: "",
};

let parmas = new URLSearchParams(queryParams);

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
    console.log(res.data);
    productCard(res.data);
  } catch (error) {
    console.log(error);
  }
};

const productCard = (data) => {
  container.innerHTML = null;

  data.forEach((item) => {
    let mainDiv = document.createElement("div");
    mainDiv.setAttribute("id", "mainDiv");

    let cardDiv = document.createElement("div");
    cardDiv.setAttribute("id", "cardDiv");

    let fullName = document.createElement("h3");
    fullName.innerText = `${item.home_team.full_name}`;

    cardDiv.append(fullName, teamDetailsBtn, teamDetailsDiv);
    mainDiv.append(cardDiv);
    container.append(mainDiv);
  });
};

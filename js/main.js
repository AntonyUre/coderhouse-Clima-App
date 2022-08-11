// clave de api
const API_KEY = "e8d8e36405e49666a199b1545524fbe5";
// link de api
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
//link de google maps
const MAPS_URL = "https://api.openweathermap.org/data/2.5/forecast";

// Contenedores
const temp = document.querySelector(".card__date");
const form = document.getElementById("search-form");
const searchBox = document.getElementById("searchbox");
const boxMap = document.querySelector(".right");

async function getWeather() {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${WEATHER_URL}?q=${searchBox.value}&lang=es&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        console.log(response);
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

// document.addEventListener('keypress', function(event){
// 	if(event.key){
//     console.log(event.key)
// 	}
// });

function onSubmit(event) {
  event.preventDefault();
  let value = searchBox.value;
  console.log(value);
  time();
}

form.addEventListener("submit", onSubmit, true);

function printMap(res) {
  console.log("printMap");
  let lat = res.data.coord.lat;
  console.log(lat);
  let lon = res.data.coord.lon;
  console.log(lon);
  let ifrm = document.createElement("iframe");
  ifrm.setAttribute(
    "src",
    `https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d62414.9511018945!2d${lon}!3d${lat}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2spe!4v1658433513389!5m2!1ses-419!2spe`
  );
  boxMap.innerHTML = "";
  boxMap.appendChild(ifrm);
}

// Imprimir la informacion del clima
function printCard(res) {
  temp.innerHTML = `
  <div class="card__item">
    <div class="card__img-container">
    <div><h2>${res.data.main.temp}° C</h2></div>
      <img class="card__logo" src="http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png" alt="Logo OpenWeather" />
    </div>
    <div class="card__text-container">
      <div><h2>${res.data.name} - ${res.data.sys.country}</h2></div>
      <div><h2>H ${res.data.main.humidity}</h2></div>
      <div><h2>Temperatura${res.data.weather[0].description}</h2></div>
    </div>
  </div>`;
  printMap(res);
}

const time = async () => {
  const res = await getWeather();
  printCard(res);
};

// prueba de mapa
function mapaTest(x, y) {
  console.log("Se imprimio el mapa");
  let ifrm = document.createElement("iframe");
  ifrm.setAttribute(
    "src",
    `https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d62414.9511018945!2d${y}!3d${x}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2spe!4v1658433513389!5m2!1ses-419!2spe`
  );
  boxMap.innerHTML = "";
  boxMap.appendChild(ifrm);
}

// Inicio de obtener ubicación

const getLocation = async () => {
  let urlApi = "https://ipinfo.io?token=849ad9412151af";
  let response = await axios
    .get(urlApi)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
  console.log(response);
  let cor = response.loc.split(",");
  const x = cor[0];
  const y = cor[1];
  console.log(x + " + " + y);
  mapaTest(x, y);
};

// Fin de obtener ubicación

window.onload = function () {
  // alert('hola')
  if (searchBox.value === "") {
    getLocation(); //latitud(horizontal) y longitud(vertical)
  } else {
  }
};

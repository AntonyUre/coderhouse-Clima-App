// clave de api
const API_KEY = "e8d8e36405e49666a199b1545524fbe5";
// link de api
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
// link de google maps
const MAPS_URL = "https://api.openweathermap.org/data/2.5/forecast";

// Contenedores
const temp = document.querySelector(".card__date");
const form = document.getElementById("search-form");
const searchBox = document.getElementById("searchbox");
const boxMap = document.querySelector(".right");

async function getWeather(city) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${WEATHER_URL}?q=${
          searchBox.value || city
        }&lang=es&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function onSubmit(event) {
  event.preventDefault();
  if (searchBox.value === "") {
    alert("esta vacio");
    getLocation();
  }
  let value = searchBox.value;
  console.log(value);
  time();
}

form.addEventListener("submit", onSubmit, true);

function fecha(startPosition) {
  console.log(startPosition + " Funciona la fecha");
  searchBox.value = startPosition;
  let res = startPosition;
  printCard(res);
}

function printMap(res) {
  let lat = res.data.coord.lat;
  // console.log(lat);
  let lon = res.data.coord.lon;
  // console.log(lon); 
  let ifrm = document.createElement("iframe");
  ifrm.setAttribute(
    "src",
    `https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d62414.9511018945!2d${lon}!3d${lat}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2spe!4v1658433513389!5m2!1ses-419!2spe`
  );
  boxMap.innerHTML = "";
  boxMap.appendChild(ifrm);
}

// Imprimir la informacion del clima
async function printCard(city) {
  let res = await getWeather(city);
  let timestamp = res.data.dt;
  let date = new Date(timestamp * 1000);
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let hour = date.getHours();
  let min = date.getMinutes()

  if (res.data.name.length >= 1) {
    notificacionTrue()
  } else { 
    notificacionFalse()
  }
  // <div><p>${day + "/" + month + "/" + year + " " + hour + ":" + min}</p></div>
  // let sec = date.getSeconds();
  // console.log(
  //   day + "-" + month + "-" + year + " " + hour + ":" + min + ":" + sec
  // );

  temp.innerHTML = `
  <div class="card__card">
    <div class="card__img-container">
    <div class="card__card--data">
    <h2>${res.data.main.temp}° C</h2>
    <h3>${res.data.name} - ${res.data.sys.country}</h3>
    </div>
    
      <img class="card__logo" src="http://openweathermap.org/img/wn/${
        res.data.weather[0].icon
      }@2x.png" alt="Logo OpenWeather" />
    </div>

    <div class="card__text-container">
      
      <div class="card__card--items">
      <img src="../img/termometro.png">
      <p>${res.data.main.temp_min} min</p>
      </div>
      <div class="card__card--items">
      <img src="../img/termometro.png">
      <p>${res.data.main.temp_max} max</p>
      </div>
      <div class="card__card--items">
      <img src="../img/wind.png">
      <p>${res.data.wind.speed} km/h</p>
      </div>
      <div class="card__card--items">
      <img src="../img/nublado.png">
      <p>${res.data.weather[0].description}</p>
      </div>
    </div>
  </div>`;
  printMap(res);
}

const time = async () => {
  const res = await getWeather();
  printCard(res);
};
function mapaTest(x, y, startPosition) {
  searchBox.value = startPosition;
  let res = startPosition;
  printCard(res);
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
  const startPosition = response.city;
  let cor = response.loc.split(",");
  const x = cor[0];
  const y = cor[1];
  mapaTest(x, y, startPosition);
  onSubmit();
  
};
// Fin de obtener ubicación

// Start sweet alert
function notificacionTrue() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Se detecto tu ubicación",
    showConfirmButton: false,
    timer: 2000,
  });
}
function notificacionFalse() {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Se detecto tu ubicación",
    showConfirmButton: false,
    timer: 2000,
  });
}
//End sweet alert

window.onload = function () {
  // alert('hola')
  getLocation();
};

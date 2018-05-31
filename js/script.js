
//Fonction pour récupérer la valeur d'un cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var result = decodedCookie.match(new RegExp(cname + '="([^;]+)"'));

     if (result){
       return result[1];
     }else{
      return null;
     }

}

function convertKToC(kelvin){
  return kelvin - 273.15;
}

function convertMStoKM(ms){
  return ms * 3.6;
}

function degreeToCardinalDirection(degree) {
  const val = Math.floor(0.5 + (degree / 22.5)),
        cardinalDirection =  [
        {direction: "N", html: "&#8593"},
        {direction: "NNE", html: "&#8593"},
        {direction: "NE", html: "&#8593"},
        {direction: "ENE", html: "&#8593"},
        {direction: "E", html: "&#8593"},
        {direction: "ESE", html: "&#8593"},
        {direction: "SE", html: "&#8593"},
        {direction: "SSE", html: "&#8593"},
        {direction: "S", html: "&#8593"},
        {direction: "SSW", html: "&#8593"},
        {direction: "SW", html: "&#8593"},
        {direction: "WSW", html: "&#8593"},
        {direction: "W", html: "&#8593"},
        {direction: "WNW", html: "&#8593"},
        {direction: "NW", html: "&#8593"},
        {direction: "NNW", html: "&#8593"}];

  return cardinalDirection[(val % 16)];
}

function getComment(number){
  if (number == 8){
    return "Beau temps pour grimper !";
  }else{
    return "Temps couci-couça, se réferer à Ugo pour sortir";
  }
}

const secteurs = [
{name: "La couleuvre", direction: "O"},
{name: "La chandelle", direction: "S"},
{name: "Les 4 miss", direction: "S"},
{name: "Les 4 miss", direction: "SE"},
{name: "La crouzade", direction: "SO"},
{name: "La crete des vires", direction: "E"},
{name: "Les caunes", direction: "SE"}
];
//Si le cookie météo n'existe pas
if(getCookie("weather") == null){

  request = new XMLHttpRequest();
  request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=Narbonne&appid=419b33319df5e5dc4bad59a9686556ae', false);
  request.send();

  // Begin accessing JSON data here
  var data = JSON.stringify(request.response);

  if (request.status >= 200 && request.status < 400) {

    var now = new Date();
    var exp = new Date(now.getTime() + 600*1000);
    document.cookie = 'weather=' + data + '; expires='+ exp.toUTCString();

  } else {
    console.log('Request error');
  }

  console.log("cookie expiré, requete envoyée !");
}


 var weather = JSON.parse(getCookie("weather").replace(/\\/g, ""));

 document.getElementById('weatherIcon').src = "http://openweathermap.org/img/w/"+ weather.weather[0].icon +".png";
 document.getElementById('tempMin').innerHTML = convertKToC(weather.main.temp_min) + "°C";
 document.getElementById('tempMax').innerHTML = convertKToC(weather.main.temp_max) + "°C";
 document.getElementById('windSpeed').innerHTML = parseInt(convertMStoKM(weather.wind.speed)) + " km/h";
 document.getElementById('windDirection').innerHTML = degreeToCardinalDirection(weather.wind.deg);
 document.getElementById('comment').innerHTML = getComment(parseInt(weather.weather[0].id.toString()[0]));

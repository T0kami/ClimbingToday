function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var result = decodedCookie.match(new RegExp(cname + '=([^;]+)'));

     if (result){
       return result[1];
     }else{
      return null;
     }

}

if(getCookie("weather") == null){

  request = new XMLHttpRequest();
  request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=Narbonne&appid=419b33319df5e5dc4bad59a9686556ae', true);
  request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.stringify(this.response);

    if (request.status >= 200 && request.status < 400) {
      var now = new Date();
      var exp = new Date(now.getTime() + 600*1000);
      document.cookie = 'weather=' + data + '; expires='+ exp.toUTCString();


    } else {
      console.log('error');
    }
  }

  request.send();
  console.log("cookie expirés, requete envoyée !");
}


 var weather = JSON.parse(JSON.parse(getCookie("weather")));
 document.getElementById('weatherIcon').src = "http://openweathermap.org/img/w/"+ weather.weather[0].icon +".png";

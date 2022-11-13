
let latitude, longitude, country;

const PROXY = "https://erproxy.herokuapp.com/";

getLocation();

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      alert("GeoLocation is not supported by this browser.");
    }
  }

function showPosition(position) {
    latitude =  position.coords.latitude;
    longitude = position.coords.longitude;
    getCountry();
}

function getCountry(){
    fetch(
        "https://secure.geonames.org/countryCode?lat=" +
          latitude +
          "&lng=" +
          longitude +
          "&username=onehadith"
      )
        .then((response) => response.text())
        .then((data) => {
            country = data;
            getPrayerTimes();
        });
}


function getPrayerTimes(){
      var timestamp = Math.floor(Date.now() / 1000);

      var prayerUrl = "https://api.aladhan.com/v1/timings/" + timestamp;
      
      var prayer_url = geturl(prayerUrl, {
        latitude: latitude,
        longitude: longitude,
        method: 3
      });

      var hadithUrl = PROXY + "https://onehadith.org";
      var hadithfUrl = hadithUrl + "/api/random";
      var hadith_url = geturl(hadithfUrl, { lan: "al"});
      fetch(hadith_url).then((response) => response.json()).then((data) => {
        console.log(data);
        document.getElementById("hadith").innerHTML = data.hadith + "<br>" + data.grade;
      });


      let url = `https://onehadith.org/api/random?lan=en&country=${country}&timestamp=${timestamp}`;
        
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            let dtm = data.timings;
                fetch(prayer_url).then((response) => response.json())
                .then((data2) => {
                    if(dtm == false){

                        document.getElementById("imsakuN").innerText = "Imsak:";
                        document.getElementById("lindjaDiellitN").innerText = "Sunrise: ";
                        document.getElementById("drekaN").innerText = "Dhuhr: ";
                        document.getElementById("ikindiaN").innerText = "Asr: ";
                        document.getElementById("akshamiN").innerText = "Maghrib: ";
                        document.getElementById("jaciaN").innerText = "Isha: ";
                        document.getElementById("sabahuN").innerText = "Fajr: ";
                        document.getElementById("imsakuT").innerText = data2.data.timings.Imsak;
                        const myArray = String(data2.data.timings.Sunrise).split(":");
                        if(Number(myArray[0]) < 10){                      
                          document.getElementById("lindjaDiellitT").innerText = "0" + data2.data.timings.Sunrise;
                        } else {
                          document.getElementById("lindjaDiellitT").innerText = data2.data.timings.Sunrise;
                        }
                        document.getElementById("drekaT").innerText = data2.data.timings.Dhuhr;
                        document.getElementById("ikindiaT").innerText =data2.data.timings.Asr;
                        document.getElementById("akshamiT").innerText = data2.data.timings.Maghrib;
                        document.getElementById("jaciaT").innerText = data2.data.timings.Isha;
                        document.getElementById("sabahuT").innerText = data2.data.timings.Fajr;
                    }
                    document.getElementById("sabahuN").innerText = "Sabahu: ";
                    document.getElementById("sabahuT").innerText = data2.data.timings.Fajr;
                    document.getElementById("hijri").innerText = "Hijri: " + data2.data.date.hijri.date;
                    document.getElementById("weekday").innerText = "Weekday: " + data2.data.date.gregorian.weekday.en;
                    document.getElementById("holiday").innerText = "Holiday: " + (data2.data.date.hijri.holidays[0] ?? "No holiday");
                    document.getElementById("month").innerText = "Month: " + data2.data.date.hijri.month.en;
                    document.getElementById("midnight").innerText = "Midnight: " + data2.data.timings.Midnight;
                    
                })
                .catch((error) => {
                  console.error("Error:", error);
                });

            if(dtm != false) {
                document.getElementById("imsakuN").innerText = "Imsaku: ";
                document.getElementById("lindjaDiellitN").innerText = "Lindja e diellit: ";
                document.getElementById("drekaN").innerText = "Dreka: ";
                document.getElementById("ikindiaN").innerText = "Ikindia: ";
                document.getElementById("akshamiN").innerText = "Akshami: ";
                document.getElementById("jaciaN").innerText = "Jacia: ";
                document.getElementById("imsakuT").innerText = data.timings.imsak;
                const myArray = String(data.timings.sunrise).split(":");
                if(Number(myArray[0]) < 10){                      
                  document.getElementById("lindjaDiellitT").innerText = "0" + data.timings.sunrise;
                } else {
                  document.getElementById("lindjaDiellitT").innerText = data.timings.sunrise;
                }
                document.getElementById("drekaT").innerText = data.timings.dhuhr;
                document.getElementById("ikindiaT").innerText = data.timings.asr;
                document.getElementById("akshamiT").innerText = data.timings.maghrib;
                document.getElementById("jaciaT").innerText = data.timings.isha;
                document.getElementById("georgian").innerText = "Gregorian: " + data.timings.day + "-" + data.timings.month + "-" + new Date().getFullYear();
              }
            document.getElementById("loading").classList.add("hidden");
            document.getElementById("main").classList.remove("hidden");
          })
          .catch((error) => {
            document.getElementById("loading").innerText = "An error occurred\n\n" + error.message;
          });


          let date = new Date();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          let year = date.getFullYear();
          let hour = date.getHours();
          let minute = date.getMinutes();
          let seconds = date.getSeconds();

          if(hour < 10){
            hour = "0" + hour;
          }
          if(seconds < 10){
            seconds = "0" + seconds;
          }
      }


function geturl(url, data) {
  url += "?";
  for (const [key, value] of Object.entries(data)) {
    if(value != null){
      url += key + "=" + value + "&";
    }
  }
  return url.slice(0, -1);
}


if (!("Notification" in window)) {
  // Check if the browser supports notifications
  //alert("This browser does not support desktop notification");
} else if (Notification.permission === "granted") {
  // Check whether notification permissions have already been granted;
  // if so, create a notification
  // …
} else if (Notification.permission !== "denied") {
  // We need to ask the user for permission
  Notification.requestPermission().then((permission) => {
    // If the user accepts, let's create a notification
    if (permission === "granted") {
      const notification = new Notification("Thanks for enabling notifications!");
      // …
    }
  });
}

// ! Make this also run in background scripts

function checkTimes(){

  let time = new Date();
  let hours = time.getHours() + ":" + time.getMinutes();
  let a = "Imsaku: " + hours;
  let b = "Sabahu: " + hours;
  let c = "Lindja e diellit: " + hours;
  let d = "Dreka: " + hours;
  let e = "Ikindia: " + hours;
  let f = "Akshami: " + hours;
  let g = "Jacia: " + hours;

  let a1 = document.getElementById("imsaku").innerText;
  let a2 = document.getElementById("sabahu").innerText;
  let a3 = document.getElementById("lindjaDiellit").innerText;
  let a4 = document.getElementById("dreka").innerText;
  let a5 = document.getElementById("ikindia").innerText;
  let a6 = document.getElementById("akshami").innerText;
  let a7 = document.getElementById("jacia").innerText;

  if(a == a1){
    let notification = new Notification("Imsaku ka hyrë " + hours);
  }
  if(b == a2){
    let notification = new Notification("Sabahu ka hyrë " + hours);
  }
  if(c == a3){
    let notification = new Notification("Sapo ka lindur dielli " + hours);
  }
  if(d == a4){
    let notification = new Notification("Dreka ka hyrë " + hours);
  }
  if(e == a5){
    let notification = new Notification("Ikindia ka hyrë " + hours);
  }
  if(f == a6){
    let notification = new Notification("Akshami ka hyrë " + hours);
  }
  if(g == a7){
    let notification = new Notification("Jacia ka hyrë " + hours);
  }

  let b1 = "Imsak: " + hours;
  let b2 = "Fajr: " + hours;
  let b3 = "Sunrise: " + hours;
  let b4 = "Dhuhr: " + hours;
  let b5 = "Asr: " + hours;
  let b6 = "Maghrib: " + hours;
  let b7 = "Isha: " + hours;

  if(b1 == a1){
    let notification = new Notification("Imsak has started " + hours);
  }
  if(b2 == a2){
    let notification = new Notification("Fajr has started " + hours);
  }
  if(b3 == a3){
    let notification = new Notification("Sunrise just happend " + hours);
  }
  if(b4 == a4){
    let notification = new Notification("Dhurh has started " + hours);
  }
  if(b5 == a5){
    let notification = new Notification("Asr has started " + hours);
  }
  if(b6 == a6){
    let notification = new Notification("Maghrib has started " + hours);
  }
  if(b7 == a7){
    let notification = new Notification("Isha has started " + hours);
  }
}

setInterval(() => {
  checkTimes();
}, 60000);

var getFirstBrowserLanguage = function () {
  var nav = window.navigator,
  browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
  i,
  language;

  // support for HTML 5.1 "navigator.languages"
  if (Array.isArray(nav.languages)) {
    for (i = 0; i < nav.languages.length; i++) {
      language = nav.languages[i];
      if (language && language.length) {
        return language;
      }
    }
  }

  // support for other well known properties in browsers
  for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
    language = nav[browserLanguagePropertyKeys[i]];
    if (language && language.length) {
      return language;
    }
  }

  return null;
};

function refreshData(){
  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("main").classList.add("hidden");
  getPrayerTimes();
}
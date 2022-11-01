
let latitude, longitude, country;

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

      let url = `https://onehadith.org/api/random?lan=en&country=${country}&timestamp=${timestamp}`;
        
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            let dtm = data.timings;
                fetch(prayer_url).then((response) => response.json())
                .then((data2) => {
                    if(dtm == false){

                        document.getElementById("imsaku").innerText = "Imsak:" + data2.data.timings.Imsak;
                        document.getElementById("lindjaDiellit").innerText = "Sunrise: " + data2.data.timings.Sunrise;
                        document.getElementById("dreka").innerText = "Dhuhr: " + data2.data.timings.Dhuhr;
                        document.getElementById("ikindia").innerText = "Asr: " + data2.data.timings.Asr;
                        document.getElementById("akshami").innerText = "Maghrib: " + data2.data.timings.Maghrib;
                        document.getElementById("jacia").innerText = "Isha: " + data2.data.timings.Isha;
                        document.getElementById("sabahu").innerText = "Fajr: " + data2.data.timings.Fajr;
                    }
                    document.getElementById("sabahu").innerText = "Sabahu: " + data2.data.timings.Fajr;
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
                document.getElementById("imsaku").innerText = "Imsaku: " +  data.timings.imsak;
                document.getElementById("lindjaDiellit").innerText = "Lindja e diellit: " + data.timings.sunrise;
                document.getElementById("dreka").innerText = "Dreka: " + data.timings.dhuhr;
                document.getElementById("ikindia").innerText = "Ikindia: " + data.timings.asr;
                document.getElementById("akshami").innerText = "Akshami: " + data.timings.maghrib;
                document.getElementById("jacia").innerText = "Jacia: " + data.timings.isha;
                document.getElementById("georgian").innerText = "Gregorian: " + data.timings.day + "-" + data.timings.month + "-" + new Date().getFullYear();
            }
            
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      
          

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
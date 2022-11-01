


let date = new Date();

let formatedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

getData(formatedDate);

// Get the data from Online API
function getData(date){
    $.ajax({
        url: "https://erproxy.herokuapp.com/https://takvimi-ks.com/data.php",
        dataType: "json",
        cache: false,
        data: "dataG=" + date,
        success: function (data) {
           console.log(data);/**/
        },
      });
}    

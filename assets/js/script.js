
const paprikaCoinList = [];
const coinGeckoList = [];

// data for search autocomplete
var data = { };



function init() {
    getCoinList();

}

init();

// look into adding symbol link instead of 'null'
function getCoinList() {
    fetch('https://api.coinpaprika.com/v1/coins').then(function(response) {
        return response.json();
    }).then(function(info) {
        console.log(info);
        info.forEach(coin => {
            data[coin.name] = null;
            data[coin.symbol] = null
        });

    })
}





// ------- jQuery initializations for Materialize components ---------- //

// M.AutoInit();

$(document).ready(function(){
    $('.sidenav').sidenav({
        menuWidth: 300,
        closeOnClick: true,
        edge: 'right',
    });
  });


//   var data = {
//     "Apple": 'APL',
//     "Microsoft": null,
//     "Google": 'https://placehold.it/250x250'
//   }

$(document).ready(function(){
$('input.autocomplete').autocomplete({
   data,
});
});
       
// ------- Twitter Feed Fetch -------- //
fetch("https://twitter32.p.rapidapi.com/", {
    method: "GET",
    "headers": {
        "x-rapidapi-key": "9ce9da8239mshfdc240a5706e6dbp1a372ajsnf408cd27ddc9",
		"x-rapidapi-host": "twitter32.p.rapidapi.com"
    }
})
    .then(response => {
        console.log(response);
    })
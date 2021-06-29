
const paprikaCoinList = [];
const coinGeckoList = [];

// data for search autocomplete
var data = { };



function init() {
    getCoinList();

}

init();

function getCoinList() {
    fetch('https://api.coinpaprika.com/v1/coins').then(function(response) {
        return response.json();
    }).then(function(info) {
        console.log(info);
        info.forEach(coin => {
            data[coin.name] = null;
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
       


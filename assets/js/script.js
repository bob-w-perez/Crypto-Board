var queryEl = document.getElementById('autocomplete-input');


const paprikaCoinList = [];
const coinGeckoList = [];

// data for search autocomplete
var data = { };



function init() {
    getCoinList();
    makeTermGlossary();
}

init();

// look into adding symbol link instead of 'null'
function getCoinList() {
    fetch('https://api.coinpaprika.com/v1/tickers').then(function(response) {
        return response.json();
    }).then(function(info) {
        // console.log(info);
        info.forEach(coin => {
            data[coin.name] = null;
            data[coin.symbol] = null;
        });

    })
}


// would be good to have the alphabetized
function makeTermGlossary() {
    fetch('https://api.coinpaprika.com/v1/tags').then(function(response) {
        return response.json();
    }).then(function(info) {
        console.log(info);
        info.forEach(term => {
            let termItem = document.createElement('li');
            let itemHeadCollapse = document.createElement('div');
            let itemBodyCollapse = document.createElement('div');
            // let itemBodyCollapseSpan = document.createElement('span');

            itemHeadCollapse.textContent = term.name;
            termItem.classList.add('collapsible-header');
            termItem.append(itemHeadCollapse);

            itemBodyCollapse.classList.add('collapsible-body');

            itemBodyCollapse.textContent = term.description;
            // itemBodyCollapse.append(itemBodyCollapseSpan);
            termItem.append(itemBodyCollapse);

            $('#term-glossary').append(termItem);
        });
    })
}
=======
queryEl.addEventListener("keypress", function(event){
    console.log('activated')
    if(event.key === 'Enter'){
        
        var query = queryEl.value.toLowerCase();
        console.log(query);
        var apiUrl = 'https://api.coinpaprika.com/v1/tickers';

        fetch(apiUrl).then(function(response) {
            return response.json();
        }).then(function(data) {
            const coins = data;
            var coin = {
                name: 'placeholder',
                symbol: 'placeholder',
                price: 'placeholder',
                mktcap: 'placeholder',
                ath: 'placeholder',
                volume: 'placeholder',
                rank: 'placeholder',
                supply: 'placeholder'
            }

            for(i=0; i<coins.length; i++){
                if(coins[i].name.toLowerCase() === query || coins[i].symbol.toLowerCase() === query){
                    coin.name = coins[i].name;
                    coin.symbol = coins[i].symbol;
                    coin.price = coins[i].quotes.USD.price;
                    coin.mktcap = coins[i].quotes.USD.market_cap;
                    coin.ath = coins[i].quotes.USD.ath_price;
                    coin.volume = coins[i].quotes.USD.volume_24h;
                    coin.rank = coins[i].rank;
                    coin.supply = coins[i].circulating_supply;
                    
                    console.log('activated base')
                    break;
                }
            }
            // return coin;
            console.log(coin); 
        })
    }
    





})

































// ------- jQuery initializations for Materialize components ---------- //

// M.AutoInit();

$(document).ready(function(){
    $('.sidenav').sidenav({
        menuWidth: 300,
        closeOnClick: true,
        // edge: 'right',
    });
  });


$(document).ready(function(){
$('input.autocomplete').autocomplete({
   data,
});
});
      
$(document).ready(function(){
    $('.collapsible').collapsible();
  });
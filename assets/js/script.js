var queryEl = document.getElementById('autocomplete-input');
var coins = null;
var activeCoins = [];

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
        coins = info;
        console.log(coins);
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


function genCoinCard(coin){
    var coinsArea = document.getElementById('card-space');

    var name = coin.name;
    

    var coinString = "<p>Name: "+coin.name+"</p>"+
                    "<p>Symbol: "+coin.symbol+"</p>"+
                    "<p>Price: "+coin.price+"</p>"+
                    "<p>Market Cap: "+coin.mktcap+"</p>"+
                    "<p>All time high: "+coin.ath+"</p>"+
                    "<p>24H Volume: "+coin.volume+"</p>"+
                    "<p>Rank: "+coin.rank+"</p>"+
                    "<p>Supply: "+coin.supply;

    var newCoin = document.createElement('div');
    newCoin.innerHTML = "<div class=\"row\"><div class=\"col s12 m6\"><div class=\"card\"><div class=\"card-image\"><img src=\"../assets/images/favicon-1.png\"><span class=\"card-title\">Card Title</span><a class=\"btn-floating halfway-fab waves-effect waves-light red\"><i class=\"material-icons\">add</i></a></div><div class=\"card-content\"><p>"+coinString+"</p></div></div></div></div>";

    coinsArea.appendChild(newCoin);




}



queryEl.addEventListener("keypress", function(event){
    console.log('activated')


    if(event.key === 'Enter' && coins){
        var query = queryEl.value.toLowerCase();
        
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
                if(!activeCoins.includes(coins[i].name)){
                    

                    coin.name = coins[i].name;
                    coin.symbol = coins[i].symbol;
                    coin.price = coins[i].quotes.USD.price;
                    coin.mktcap = coins[i].quotes.USD.market_cap;
                    coin.ath = coins[i].quotes.USD.ath_price;
                    coin.volume = coins[i].quotes.USD.volume_24h;
                    coin.rank = coins[i].rank;
                    coin.supply = coins[i].circulating_supply;
                    
                    
                    activeCoins.push(coin.name);
                    console.log(activeCoins);
                    genCoinCard(coin);
                    break;
                }
                
            }
        }

        

        // return coin;
        console.log(coin); 
        
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

       
// ------- Twitter Feed Fetch -------- //
var hashtag = 'doge';
var startDate = '2021-06-29';
var endDate = '2021-06-30';


var endPoint = "/getSearch?" + "hashtag=" + hashtag + "&start_date=" + startDate + "&end_date=" + endDate;

function twitterfetch() {
    fetch("https://twitter32.p.rapidapi.com" + endPoint, {
    method: "GET",
    "headers": {
        "x-rapidapi-key": "9ce9da8239mshfdc240a5706e6dbp1a372ajsnf408cd27ddc9",
		"x-rapidapi-host": "twitter32.p.rapidapi.com"
    }
})
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(data => {
        console.log(data.data.tweets);
    })
}

//Add Event listener for twitterFetch function

      
$(document).ready(function(){
    $('.collapsible').collapsible();
  });


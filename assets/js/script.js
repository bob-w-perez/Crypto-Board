var queryEl = document.getElementById('autocomplete-input');
var searchFormEl = document.getElementById('search-form');
var twit = document.querySelector('#tweet-bar');
var coins = null;
var activeCoins = [];

const paprikaCoinList = [];
const coinGeckoList = [];

// data for search autocomplete
var data = { };

var chartCount;


function init() {
    chartCount = 0;
    getCoinList();
    makeTermGlossary();
    
}

init();


// look into adding symbol link instead of 'null'
function getCoinList() {
    fetch('https://api.coinpaprika.com/v1/tickers').then(function(response) {
        return response.json();
    }).then(function(info) {
        coins = info;
        info.forEach(coin => {
            data[coin.name] = null;
            data[coin.symbol] = null;
        });
        retrieveActiveCoins();

    })
}


// would be good to have the alphabetized
function makeTermGlossary() {
    fetch('https://api.coinpaprika.com/v1/tags').then(function(response) {
        return response.json();
    }).then(function(info) {
        // console.log(info);
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


function genCoinCard(coin, coinIcon){
    //------ chart addition ----//
    // this may cause issues when deleting chart from page, but not sure...
    chartCount++;
    
    var chartTargetId = 'chart-target' + chartCount;
    // ------- end chart addition ------//
 

    var coinsArea = document.getElementById('card-space');

    var name = coin.name;

    var coinString = //"<img class='coin-icon' src=" + coinIcon+"/>" +
                    "<p><b>Name:</b> "+coin.name+"</p>"+
                    "<p><b>Symbol:</b> "+coin.symbol+"</p>"+
                    "<p><b>Price:</b> $"+coin.price.toLocaleString('en-US', {maximumFractionDigits: 2})+"</p>"+
                    "<p><b>Market Cap:</b> $"+coin.mktcap.toLocaleString('en-US', {maximumFractionDigits: 2})+"</p>"+
                    "<p><b>All time high:</b> $"+coin.ath.toLocaleString('en-US', {maximumFractionDigits: 2})+"</p>"+
                    "<p><b>24H Volume:</b> $"+coin.volume.toLocaleString('en-US', {maximumFractionDigits: 2})+"</p>"+
                    "<p><b>Rank:</b> "+coin.rank+"</p>"+
                    "<p><b>Supply:</b> "+coin.supply.toLocaleString()+"</p>"+
                    '<div class="card-buttons"><a data-name='+ coin.name +' class="tweet-button waves-effect waves-light btn-small"><i class="material-icons right">chat</i>Twitter Feed</a><a data-name='+ coin.name +' class="close-button waves-effect waves-light btn-small">Close</a>';

    var newCoin = document.createElement('div');
    newCoin.classList.add('coin-card')
    newCoin.innerHTML = "<div class=\"card\"><div class=\"card-image\"><div id="+ chartTargetId +"></div><a class=\"btn-floating btn-large halfway-fab waves-effect waves-light white\"><img src="+ coinIcon+ "></a></div><div class=\"card-content amber lighten-3\"><p>"+coinString+"</p></div></div>";

    $(coinsArea).prepend(newCoin);

    //------ chart addition ----//
    var chartWrapper = document.createElement('div');
    chartWrapper.classList.add('canvas-wrapper', 'grey'); //  'darken-3'
    var coinChart = document.createElement('canvas');
    coinChart.classList.add('grey');
    coinChartId = coin.name + '-chart';
    coinChart.setAttribute('id', coinChartId);
    chartWrapper.append(coinChart);
    
    var chartTarget = document.getElementById(chartTargetId);
    chartTarget.append(chartWrapper);
    getChartData(coin.name.toLowerCase(), coinChartId);
    // ------- end chart addition ------//


}

//------------- Local Storage -----------//

function storeActiveCoins(activeCoins) {

    localStorage.setItem('stored-coins', JSON.stringify(activeCoins))

}

function retrieveActiveCoins() {
    var storedCoins = JSON.parse(localStorage.getItem('stored-coins'));

    if (storedCoins){
        storedCoins.forEach(coin => {
            var newCoin = coin.toLowerCase();

            addNewCoin(newCoin);
        })
    }
}

//------------- END Local Storage -----------//



function addNewCoin(newCoin) {
    if(coins){
        var query = newCoin;
        
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
                    storeActiveCoins(activeCoins);
                    getCoinIconData(coins[i].name.toLowerCase(), coin)
                    // genCoinCard(coin);
                    break;
                }
                
            }
        }

        

        // return coin;
        // console.log(coin); 
        
        
    }
    
}

// ------- Get list of coin icons ------------ //
function getCoinIconData(coinName, coin) {
    var coinIcon;
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=' + coinName).then(function(response) {
        return response.json();
    }).then(function(info) {
        coinIcon = info[0].image;
        genCoinCard(coin, coinIcon);

    });

}


// ------- END get list of coin ----------- //
// ------- Chart data and Make chart ----------- //
function getChartData(coinName, chartId) {
    
    var price = [];
    var day = [];

    fetch('https://api.coingecko.com/api/v3/coins/'+ coinName + '/market_chart?vs_currency=usd&days=30&interval=daily').then(function(response) {
        return response.json();
    }).then(function(info) {
        // console.log(info);
        for (i = 0; i < info.prices.length; i++){
            day.push(info.prices[i][0]);
            price.push(info.prices[i][1]);
           
        };
        return [price, day, (coinName[0].toUpperCase()+coinName.substring(1))];
    }).then(function(chartData){
        makeChart(chartData[0], chartData[1], chartData[2], chartId);
    })
    
    
}


function makeChart(price, day, coinName, chartId){
    var ctx = document.getElementById(chartId);
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: day,
            datasets: [{
                label: coinName + ' price (last 30 days)',
                data: price,
                backgroundColor: '#27DA1B',
                borderColor: '#27DA1B'
                }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: false,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: coinName + ' (past 30 days)',
                    color: '#FFFFFF',
                    font: {
                        size: 20,
                        weight: 800,
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return '$' + value;
                        },
                        color: '#FFFFFF',
                        precision: 5,
                    }
                }
            }    
        }
    }
    )
}

// ------- END Chart data and Make chart ----------- //



// -------------------------------------------------- TWITTER CARD ------------------------------------------------ //

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Card Generation ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
var tweetBar = document.querySelector("#tweet-bar");
var tweetDataContainer = [];

var fullText;
var favCount;
var quoteCount;
var replyCount;
var rtCount;

var timestamp;

var matTwitBlock = "";

function generateTwitCard() {
    for (i = 0; i < tweetDataContainer.length; i++) {
        fullText = tweetDataContainer[i].full_text;
        favCount = tweetDataContainer[i].favorite_count;
        quoteCount = tweetDataContainer[i].quote_count;
        replyCount = tweetDataContainer[i].reply_count;
        rtCount = tweetDataContainer[i].retweet_count;
        timestampArr = tweetDataContainer[i].created_at.split(" ").slice(1, 4);
        timestamp = timestampArr[0] + " " + timestampArr[1] + " " + timestampArr[2];

        matTwitBlock += '<div class="row">'
        matTwitBlock +=     '<div class="col s12 m12 l12">'
        matTwitBlock +=         '<div class="card" style="background-color: #00acee">'
        matTwitBlock +=             '<div class="card-content white-text">'
        matTwitBlock +=                 '<span class="card-title">' + timestamp + '</span>' // USERNAME HERE??
        matTwitBlock +=                 '<p>' + fullText + '</p>' // tweetDataContainer TEXT HERE
        matTwitBlock +=                 '<br/>'
        matTwitBlock +=                 '<div style="display: flex; flex-direction: row">'
        matTwitBlock +=                     '<p style="padding: 5px 20px 5px 0">' + "♥ " + favCount + '</p>' // FAV COUNT
        matTwitBlock +=                     '<p style="padding: 5px 20px 5px 0">' + "❝ " + quoteCount + '</p>' // QUOTE COUNT
        matTwitBlock +=                     '<p style="padding: 5px 20px 5px 0">' + "💬 " + replyCount + '</p>' // REPLY COUNT
        matTwitBlock +=                     '<p style="padding: 5px 20px 5px 0">' + "↪ " + rtCount + '</p>' // RT COUNT
        matTwitBlock +=                 '</div>'
        matTwitBlock +=             '<div class="card-action">'
        matTwitBlock +=         '</div>'
        matTwitBlock +=     '</div>'
        matTwitBlock += '</div>'
    }
        tweetBar.innerHTML += matTwitBlock;
}

// console.log(tweetBar.innerHTML);
// console.log(tweetDataContainer);
// console.log(tweetDataContainer[0]);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Twitter API Fetcher ~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

// MONTH ABBREVIATION CONVERSION
var monthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function monthConverter(month) {
    for (i = 0; i < monthAbbr.length; i++) {
        if (monthAbbr[i] == month) {
            return '0' + String(i + 1);
        }
    }
}

// ENDPOINT DATE DATA OBJECT
var endPointDateData = {
    startData: {
        startYear: getDates()[2],
        startMonth: monthConverter(getDates()[0]),
        startDay: getDates()[1]
    },
    endData: {
        endYear: getDates()[5],
        endMonth: monthConverter(getDates()[3]),
        endDay: getDates()[4]
    }
}


// ------- Twitter Feed Fetch -------- //

// ENDPOINT DATA OBJECT
var currentHashtag;

// TWEET FETCHER
function twitterfetch(cardHashtag) {

    var endPointData = {
        hashtag: cardHashtag,
        startDate: endPointDateData.startData.startYear + "-" + endPointDateData.startData.startMonth + "-" + endPointDateData.startData.startDay,
        endDate: endPointDateData.endData.endYear + "-" + endPointDateData.endData.endMonth + "-" + endPointDateData.endData.endDay
    }
    
    var endPoint = "/getSearch?" + "hashtag=" + endPointData.hashtag + "&start_date=" + endPointData.startDate + "&end_date=" + endPointData.endDate;

    fetch("https://twitter32.p.rapidapi.com" + endPoint, {
    method: "GET",
    "headers": {
        "x-rapidapi-key": "9ce9da8239mshfdc240a5706e6dbp1a372ajsnf408cd27ddc9",
		"x-rapidapi-host": "twitter32.p.rapidapi.com"
    }
})
    .then(response => {
        return response.json();
    })
    .then(data => {
        var tweetData = data.data.tweets;
        // console.log(data.data.tweets);

        Object.keys(tweetData).forEach(key => {
            tweetDataContainer.push(tweetData[key]);
            // console.log(tweetDataContainer[0]);
        });
        //if button clicked display Tweet
        generateTwitCard();
    })
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Generate Start/End Dates for Twitter URL ~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

// DATE GENERATOR
function getDates() {
    var today = new Date(); // Makes new date object for today
    var tomorrow = new Date(today); 
    tomorrow.setDate(tomorrow.getDate() + 1); // Makes new date object for tomorrow

    function slicify(day) {
        var stringifyDay = String(day); // Saves day object parsed as a string
        var splitDay = stringifyDay.split(" "); // Saves split string in an array
        var sliceDay = splitDay.slice(1, 4); // Saves month day and year in that order for today in an array
        return sliceDay;
    }

    days = slicify(today).concat(slicify(tomorrow)); // Joins respective date arrays
    return days; // Returns joined dates array
}

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

// ------- END jQuery initializations ---------- // 
//Add Event listener for twitterFetch function


searchFormEl.addEventListener("submit", function(event){
    // console.log('activated')
    event.preventDefault();
    var newCoin = queryEl.value.toLowerCase();
    addNewCoin(newCoin);
    queryEl.value = '';
})


document.addEventListener('scroll', function() {
    if ($(window).width() > 700){
        if($(window).scrollTop()>$('#card-space').offset().top){
            height = $('footer').offset().top - window.scrollY;
            twit.style.cssText = 'position: sticky; top: 0; height: '+height+'px;';
        } 
        else {
            twit.style.cssText ='';
        }
    }
});

    
// ------- close button AND Twitter button  event listener  ---------- //     

$(document).on('click','.close-button',function() {
    $(this).closest("div.card").remove();
    activeCoins.splice(activeCoins.indexOf(this.dataset.name),1);
    storeActiveCoins(activeCoins);

});

$(document).on('click','.tweet-button',function() {

    
    if (document.getElementById('tweet-bar').classList.contains('hidden') && currentHashtag == this.dataset.name){
        $('#tweet-bar').removeClass('hidden');
        $('#main-row').addClass('tweet-shown');
    }
    else if (document.getElementById('tweet-bar').classList.contains('hidden')) {
        $('#tweet-bar').html('');
        tweetDataContainer = [];
        matTwitBlock = ""
        $('#tweet-bar').removeClass('hidden');
        $('#main-row').addClass('tweet-shown');
        // $('#tweet-bar').empty();
        twitterfetch(this.dataset.name);
        currentHashtag = this.dataset.name;
    } else if(!document.getElementById('tweet-bar').classList.contains('hidden') && currentHashtag == this.dataset.name) {
        $('#tweet-bar').addClass('hidden');
        $('#main-row').removeClass('tweet-shown');
        // $('#tweet-bar').empty();
    } else {
        $('#tweet-bar').html('');
        tweetDataContainer = [];
        matTwitBlock = ""
        currentHashtag = this.dataset.name;
        twitterfetch(this.dataset.name);
       

    }



});


// ------- END close button listener-------- //
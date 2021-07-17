# Crypto CARDS
Project 1 for GT Bootcamp

Created by Robert Perez, Brooks Gunn, and David Ludwik




Entering the name of a currency in the search bar creates an information card containing up-to-date statistics of that assets, including a 30-day price history chart, which is then added to the card display area. The user can add as many cards as they desire and remove them just as easily to curate their ideal array of token information.  The user's card layout is saved whenever a change is made so, upon returning to the application at a later time, their selected cryptocurrencies are automatically displayed and they can stay informed of any changes to the assets they are watching. Each card's 'Twitter Feed' button pulls up a bar on the left containing a selection of recent, relevant tweets from Twitter's API. Additional features include a scrolling ticker of CoinGecko's Top Trending Coins to present the user with new potential currencies to explore, and a glossary of crypto-related terms to assist the user as they explore various assets in the crypto space.

- HTML, CSS, JavaScript, Materialize framework, jQuery, Chart.js 

## Installation

No installation required.
Go to [https://bob-w-perez.github.io/Crypto-Board/](https://bob-w-perez.github.io/Crypto-Board/) to use the application.

The code and all relevant files can be found at [https://github.com/bob-w-perez/Crypto-Board](https://github.com/bob-w-perez/Crypto-Board). 

## Usage

![Demo gif](./assets/images/crypto-demo2.gif)



## Features

- Crypto data for every supported coin is pulled from the coinpaprika API upon page load and stored in a data object. This is done in order to minimize latency of card creation. Coin icons and price history for the chart data are pulled from the CoinGecko API. Charts are created by passing historical price data into a chart object made with Chart.js. Once a coin name is entered the relevant data is then pulled from the stored coinpaprika data and combined with the Icon image and chart data from CoinGecko to populate the information card. Each card is dynamically generated and inserted into the card space. At the same time an array of active coin names is updated to include the new coin and is saved to local storage. The close button triggers the removal of the html related to displaying that card, and the coin's name is removed from array of active coins which is then removed from the locally stored currency names.

- On page load any currency names in local storage are used to render the array of information cards. 

- At the bottom of the page is a horizontally scrolling ticker that displays the top 7 trending coins from CoinGecko. The ticker functions without any javascript, made using only HTML and CSS thanks to this guide by Lewis Carey [https://codepen.io/lewismcarey/pen/GJZVoG](https://codepen.io/lewismcarey/pen/GJZVoG).

- The 'Twitter Feed' button on each card triggers a function which makes a call to the Twitter API with that card's currency name as a query. The results are rendered into 15 to 20 individual Tweet cards which are then displayed in a scrollable column to the left of the coin space.

- In the top-left corner of the page is a 'Crypto Term Glossary' which is populated with the data  from coinpaprika's /tags endpoint. This data is alphabetized and rendered as a collapsible list where all the terms are visible and clicking on a term reveals its definition.

- The page is fully responsive to various screen sizes. The cards reorganize themselves due to their flex-wrap layout, and by using a media query to switch the flex-direction of the div containing the Twitter feed and the card space to 'column-reverse', the Twitter feed renders on the bottom third of the screen giving it an ideal format for mobile viewing. (It should be noted that this works perfectly in Google Chrome but has some issues rendering correctly in safari)

## Contributing
Group project for GATech Coding Bootcamp
by Rob Perez, [Brooks Gunn](https://github.com/WorldUnfurled), and [David Ludwik](https://github.com/davidludwik2370)

Contact info for Rob:
- [Portfolio Page](https://www.robperez.net)
- rob@robperez.net
- 404.317.5336

## License
MIT License

Copyright (c) 2021 Robert Perez, Brooks Gunn, and David Ludwik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.








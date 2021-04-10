// Grab the elements for the first three coins
const name0 = document.getElementById('name-0');
const price0 = document.getElementById('price-0');
const change0 = document.getElementById('change-0');

const name1 = document.getElementById('name-1');
const price1 = document.getElementById('price-1');
const change1 = document.getElementById('change-1');

const name2 = document.getElementById('name-2');
const price2 = document.getElementById('price-2');
const change2 = document.getElementById('change-2');

// Get all assets

window
  .fetch(
    'https://data.messari.io/api/v2/assets?limit=2&fields=name,metrics/market_data/price_usd,metrics/market_data/percent_change_usd_last_24_hours'
  )
  .then((res) => res.json())
  .then((messariRes) => messariRes.data)
  .then((coins) => {

    var coinDisplay = document.querySelectorAll('.coin');

    for (let [index, coin] of Array.from(coinDisplay.entries())) {
      // Get coin's data

      var name = coins[index]['name']
      var price = '$' + parseFloat(coins[index]['metrics']['market_data']
                ['price_usd']).toFixed(2);
      var change = parseFloat(coins[index]['metrics']['market_data']
                ['percent_change_usd_last_24_hours']).toFixed(2) + '%';

      // Populate the HTML elements
      coin.querySelector('.name').innerHTML = name;
      coin.querySelector('.price').innerHTML = price;
      coin.querySelector('.change').innerHTML = change;
  }
}
  )


var favorites = []

var btnStar = document.querySelectorAll('.star');

btnStar.forEach((item) => {
  item.addEventListener('click', (event) => {
    item.classList.toggle('yellow');
    
    if (item.classList.contains('yellow')) {
      favorites.push(item.parentElement.parentElement)
      console.log(favorites)
    } else {
      favorites.indexOf(item.parentElement.parentElement) > -1 ? favorites.splice(favorites.indexOf(item), 1) : false
      console.log(favorites)
    }
  });
});
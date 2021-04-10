// Grab the elements for the first three coins
const name0 = document.getElementById("name-0")
const price0 = document.getElementById("price-0")
const change0 = document.getElementById("change-0")

const name1 = document.getElementById("name-1")
const price1 = document.getElementById("price-1")
const change1 = document.getElementById("change-1")

const name2 = document.getElementById("name-2")
const price2 = document.getElementById("price-2")
const change2 = document.getElementById("change-2")

// Get all assets


window
  .fetch("https://data.messari.io/api/v2/assets?limit=3&fields=name,metrics/market_data/price_usd,metrics/market_data/percent_change_usd_last_24_hours")
  .then(res => res.json())
  .then(messariRes => messariRes.data)
  .then(
    coins => {

        for (let [key, value] of Object.entries(coins)) {
            var name = document.getElementById("name-" + key)
            var price = document.getElementById("price-" + key)
            var change = document.getElementById("change-" + key)

            new_name = coins[key]['name']
            new_price = '$' + parseFloat(coins[key]['metrics']['market_data']['price_usd']).toFixed(2);
            new_change = parseFloat(coins[key]['metrics']['market_data']['percent_change_usd_last_24_hours']).toFixed(2)+ '%';

            name.innerHTML = new_name;
            price.innerHTML = new_price;
            change.innerHTML = new_change
        }
    }
  )

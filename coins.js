// BTC 
window
  .fetch("https://data.messari.io/api/v1/assets/btc/metrics/market-data")
  .then(res => res.json())
  .then(messariRes => messariRes.data)
  .then(
    payload => {
        document.getElementById("current-btc-price").innerHTML =
        '$' + payload.market_data.price_usd.toLocaleString();

        percent_change = parseFloat(payload.market_data.percent_change_usd_last_24_hours.toLocaleString()).toFixed(2);
        document.getElementById("btc-24h-change").innerHTML = percent_change + '%';
    }
  );

// ETH
window
  .fetch("https://data.messari.io/api/v1/assets/eth/metrics/market-data")
  .then(res => res.json())
  .then(messariRes => messariRes.data)
  .then(
    payload => {
        document.getElementById("current-eth-price").innerHTML =
        '$' + payload.market_data.price_usd.toLocaleString();

        percent_change = parseFloat(payload.market_data.percent_change_usd_last_24_hours.toLocaleString()).toFixed(2);
        document.getElementById("eth-24h-change").innerHTML = percent_change + '%';
    }
  );

// Litecoin
window
  .fetch("https://data.messari.io/api/v1/assets/ltc/metrics/market-data")
  .then(res => res.json())
  .then(messariRes => messariRes.data)
  .then(
    payload => {
        document.getElementById("current-ltc-price").innerHTML =
        '$' + payload.market_data.price_usd.toLocaleString();

        percent_change = parseFloat(payload.market_data.percent_change_usd_last_24_hours.toLocaleString()).toFixed(2);
        document.getElementById("ltc-24h-change").innerHTML = percent_change + '%';
    }
  );


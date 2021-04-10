// BTC 
window
  .fetch("https://data.messari.io/api/v1/assets/btc/metrics/market-data")
  .then(res => res.json())
  .then(messariRes => messariRes.data)
  .then(
    payload =>
      (document.getElementById("current-btc-price").innerHTML =
        '$' + payload.market_data.price_usd.toLocaleString())
  );

// ETH
window
  .fetch("https://data.messari.io/api/v1/assets/eth/metrics/market-data")
  .then(res => res.json())
  .then(messariRes => messariRes.data)
  .then(
    payload =>
      (document.getElementById("current-eth-price").innerHTML =
        '$' + payload.market_data.price_usd.toLocaleString())
  );

// Litecoin
window
  .fetch("https://data.messari.io/api/v1/assets/ltc/metrics/market-data")
  .then(res => res.json())
  .then(messariRes => messariRes.data)
  .then(
    payload =>
      (document.getElementById("current-ltc-price").innerHTML =
        '$' + payload.market_data.price_usd.toLocaleString())
  );


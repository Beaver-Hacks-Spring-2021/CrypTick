var btcPrice = document.querySelector('#btc-price');

btcPrice = 1;
// BTC
const btcPrice = document.querySelector('#btc-price');
const btc24hChange = document.querySelector('#btc-24h-change');

// ETH
const ethPrice = document.querySelector('#eth-price');
const eth24hChange = document.querySelector('#eth-24h-change');

// Litecoin
const litePrice = document.querySelector('#lite-price');
const lite24hChange = document.querySelector('#lite-24h-change');

btcPrice.innerHTML = 60000;
btc24hChange.innerHTML = 150;

ethPrice.innerHTML = 'a price';
eth24hChange.innerHTML = 'some change';

litePrice.innerHTML = 0.02;
lite24hChange.innerHTML = 10;

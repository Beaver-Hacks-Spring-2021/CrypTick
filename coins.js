window
  .fetch(
    'https://data.messari.io/api/v2/assets?limit=100&fields=name,metrics/market_data/price_usd,metrics/market_data/percent_change_usd_last_24_hours'
  )
  .then((res) => res.json())
  .then((messariRes) => messariRes.data)
  .then((coins) => {
    var coinTable = document.querySelector('.coin-data');

    for (let [index, coin] of coins.entries()) {
      // Get coin's data
      var rank = index + 1;
      var name = coins[index]['name'];
      var price =
        '$' +
        parseFloat(coins[index]['metrics']['market_data']['price_usd']).toFixed(
          2
        );
      var change =
        parseFloat(
          coins[index]['metrics']['market_data'][
            'percent_change_usd_last_24_hours'
          ]
        ).toFixed(2) + '%';

      // Add a new row with the data
      var row = coinTable.insertRow();
      row.classList.add('coin');

      rankCell = row.insertCell();
      rankCell.classList.add('center');
      rankCell.classList.add('aligned');
      rankCell.innerHTML = rank;

      nameCell = row.insertCell();
      nameCell.classList.add('left');
      nameCell.classList.add('aligned');
      nameCell.innerHTML = name;

      changeCell = row.insertCell();
      changeCell.innerHTML = change;
      changeCell.classList.add('inverted');

      priceCell = row.insertCell();
      priceCell.innerHTML = price;
      if (change.includes('-')) {
        changeCell.classList.add('negative');
      } else {
        changeCell.classList.add('positive');
      }

      starCell = row.insertCell();
      starCell.classList.add('center');
      starCell.classList.add('aligned');
      var starButton = document.createElement('i');
      starButton.classList.add('star');
      starButton.classList.add('icon');
      starButton.classList.add('link');
      starCell.appendChild(starButton);
    }})

var favorites = [];

setTimeout(function afterTwoSeconds() { 
  var btnStar = document.querySelectorAll('.star');

  btnStar.forEach((item) => {
    item.addEventListener('click', (event) => {
      item.classList.toggle('yellow');

      if (item.classList.contains('yellow')) {
        favorites.push(item.parentElement.parentElement);
        console.log(favorites);
      } else {
        favorites.indexOf(item.parentElement.parentElement) > -1
          ? favorites.splice(favorites.indexOf(item), 1)
          : false;
        console.log(favorites);
      }
    });
  });
}, 500);

function showStarred() { 
  var coins = document.querySelectorAll('.coin');
  console.log(coins);

  coins.forEach((coin) => {
    console.log('loop is working');
    star = coin.querySelector('.star')
    console.log(star);
    if (star.classList.contains('yellow')) {
      console.log(0);
    } else{
      coin.style.display = "none";   
    }
  })
}

favorites_on = document.querySelector('#favorites-tab');
favorites_on.addEventListener('click', showStarred, false);

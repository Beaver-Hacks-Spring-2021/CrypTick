window
  .fetch(
    'https://data.messari.io/api/v2/assets?limit=100&fields=name,metrics/market_data/price_usd,metrics/market_data/percent_change_usd_last_24_hours'
  )
  .then((res) => res.json())
  .then((messariRes) => messariRes.data)
  .then((coins) => {
    var coinTable = document.querySelector('.coin-data');
    console.log(coins);

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

      priceCell = row.insertCell();
      priceCell.innerHTML = price;

      starCell = row.insertCell();
      starCell.classList.add('center');
      starCell.classList.add('aligned');
      var starButton = document.createElement('i');
      starButton.classList.add('star');
      starButton.classList.add('icon');
      starButton.classList.add('link');
      starCell.appendChild(starButton);
    }
  });

setTimeout(function afterTwoSeconds() {
  var favorites = [];
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

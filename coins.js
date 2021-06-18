window
    .fetch(
      'https://data.messari.io/api/v2/assets?limit=300&fields=name,metrics/market_data/price_usd,metrics/market_data/percent_change_usd_last_24_hours'
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
        nameCell.classList.add('theName');
        nameCell.innerHTML = name;

        changeCell = row.insertCell();
        // Handle null change values
        if (change === 'NaN%') {
          changeCell.innerHTML = '0';
        } else {
          changeCell.innerHTML = change;
        }
        changeCell.classList.add('inverted');

        // Number color based on positive or negative 24hr change
        if (change.includes('-')) {
          changeCell.classList.add('negative');
        } else {
          changeCell.classList.add('positive');
        }

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
})

.then((getStarred) => {
  function afterTwoSeconds() {
    // chrome api save class to yellow
    var allCoins = document.querySelectorAll('.coin')
    allCoins.forEach((coin) => {
      let allCoinsName = coin.children[1].innerText
      // if there is something in savedArrayValues
      if (typeof savedArrayValues === 'undefined') {
      } else {
          if (savedArrayValues.includes(allCoinsName)) {
          // if true
          star = coin.querySelector('.star');
          star.classList.toggle('yellow');
          // chrome api save class to yellow   
        };
      }        
    });
  
    var btnStar = document.querySelectorAll('.star');
    btnStar.forEach((item) => {
      item.addEventListener('click', (event) => {
        item.classList.toggle('yellow');
        // chrome storage
        var coins = document.querySelectorAll('.coin');
        let starred = [];
        coins.forEach((coin) => {
          coinName = coin.children[1].outerText
          star = coin.querySelector('.star');
          if (star.classList.contains('yellow')) {
            starred.push(coinName)
          };
        });
        // chrome api
        chrome.storage.sync.set({"starred": starred }, function () {
        });
      });
    });
    //changed to 500 from 2000 to make the saved stars appear fluid
  };
      var favorites = []
  var isStarredOnly = false;

  function showStarred() {
    var coins = document.querySelectorAll('.coin');

    if (isStarredOnly) {
      coins.forEach((coin) => {
        coin.style.display = 'table-row';
      });
      isStarredOnly = false;
    } else {
      coins.forEach((coin) => {
        star = coin.querySelector('.star');

        if (star.classList.contains('yellow')) {
        } else {
          coin.style.display = 'none';
        }
      });
      isStarredOnly = true;
    }
  }

  favorites_on = document.querySelector('#favorites-tab');
  favorites_on.addEventListener('click', showStarred, false);
});


// chrome api get list of starred - no delay
chrome.storage.sync.get(['starred'], function (result) {
  savedArray = [1]
  savedArray = [result.starred]
  savedArrayValues = savedArray[0]
});
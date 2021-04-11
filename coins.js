window
  .fetch(
    'https://data.messari.io/api/v2/assets?limit=250&fields=name,metrics/market_data/price_usd,metrics/market_data/percent_change_usd_last_24_hours'
  )
  .then((res) => res.json())
  .then((messariRes) => messariRes.data)
  .then((coins) => {
    console.log(coins);
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
  });

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
}, 2000);

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

/*
	A simple, lightweight jQuery plugin for creating sortable tables.
	https://github.com/kylefox/jquery-tablesort
	Version 0.0.11
*/

(function($) {
	$.tablesort = function ($table, settings) {
		var self = this;
		this.$table = $table;
		this.$thead = this.$table.find('thead');
		this.settings = $.extend({}, $.tablesort.defaults, settings);
		this.$sortCells = this.$thead.length > 0 ? this.$thead.find('th:not(.no-sort)') : this.$table.find('th:not(.no-sort)');
		this.$sortCells.on('click.tablesort', function() {
			self.sort($(this));
		});
		this.index = null;
		this.$th = null;
		this.direction = null;
	};

	$.tablesort.prototype = {

		sort: function(th, direction) {
			var start = new Date(),
				self = this,
				table = this.$table,
				rowsContainer = table.find('tbody').length > 0 ? table.find('tbody') : table,
				rows = rowsContainer.find('tr').has('td, th'),
				cells = rows.find(':nth-child(' + (th.index() + 1) + ')').filter('td, th'),
				sortBy = th.data().sortBy,
				sortedMap = [];

			var unsortedValues = cells.map(function(idx, cell) {
				if (sortBy)
					return (typeof sortBy === 'function') ? sortBy($(th), $(cell), self) : sortBy;
				return ($(this).data().sortValue != null ? $(this).data().sortValue : $(this).text());
			});
			if (unsortedValues.length === 0) return;

			//click on a different column
			if (this.index !== th.index()) {
				this.direction = 'asc';
				this.index = th.index();
			}
			else if (direction !== 'asc' && direction !== 'desc')
				this.direction = this.direction === 'asc' ? 'desc' : 'asc';
			else
				this.direction = direction;

			direction = this.direction == 'asc' ? 1 : -1;

			self.$table.trigger('tablesort:start', [self]);
			self.log("Sorting by " + this.index + ' ' + this.direction);

			// Try to force a browser redraw
			self.$table.css("display");
			// Run sorting asynchronously on a timeout to force browser redraw after
			// `tablesort:start` callback. Also avoids locking up the browser too much.
			setTimeout(function() {
				self.$sortCells.removeClass(self.settings.asc + ' ' + self.settings.desc);
				for (var i = 0, length = unsortedValues.length; i < length; i++)
				{
					sortedMap.push({
						index: i,
						cell: cells[i],
						row: rows[i],
						value: unsortedValues[i]
					});
				}

				sortedMap.sort(function(a, b) {
					return self.settings.compare(a.value, b.value) * direction;
				});

				$.each(sortedMap, function(i, entry) {
					rowsContainer.append(entry.row);
				});

				th.addClass(self.settings[self.direction]);

				self.log('Sort finished in ' + ((new Date()).getTime() - start.getTime()) + 'ms');
				self.$table.trigger('tablesort:complete', [self]);
				//Try to force a browser redraw
				self.$table.css("display");
			}, unsortedValues.length > 2000 ? 200 : 10);
		},

		log: function(msg) {
			if(($.tablesort.DEBUG || this.settings.debug) && console && console.log) {
				console.log('[tablesort] ' + msg);
			}
		},

		destroy: function() {
			this.$sortCells.off('click.tablesort');
			this.$table.data('tablesort', null);
			return null;
		}

	};

	$.tablesort.DEBUG = false;

	$.tablesort.defaults = {
		debug: $.tablesort.DEBUG,
		asc: 'sorted ascending',
		desc: 'sorted descending',
		compare: function(a, b) {
			if (a > b) {
				return 1;
			} else if (a < b) {
				return -1;
			} else {
				return 0;
			}
		}
	};

	$.fn.tablesort = function(settings) {
		var table, sortable, previous;
		return this.each(function() {
			table = $(this);
			previous = table.data('tablesort');
			if(previous) {
				previous.destroy();
			}
			table.data('tablesort', new $.tablesort(table, settings));
		});
	};

})(window.Zepto || window.jQuery);

$('table').tablesort() 

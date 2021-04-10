document.querySelector('.changeData').addEventListener('click', changeData);

const getDataAndRender = (function getData() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://data.messari.io/api/v1/news', true);

  let out = JSON.stringify(output);

  xhr.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      const dataArr = response.Data;
      dataArr.forEach(function (data) {
        const name = data.CoinInfo.FullName;
        const imgURL = data.CoinInfo.ImageUrl;
        const price = data.DISPLAY.INR.PRICE;
        console.log(typeof data.CoinInfo.FullName);
        const img = `https://www.cryptocompare.com/${imgURL}`;
        const highDay = data.DISPLAY.INR.HIGHDAY;
        const lowDay = data.DISPLAY.INR.LOWDAY;
        output += ` <tr><td><img src=${img} width="30" height="30"></td>
            <td>${name}</td>
            <td>${price}</td>
            <td>${highDay}</td>
            <td>${lowDay}</td></tr>`;
      });
      document.querySelector('.data-back').innerHTML = output;
    }
  };
  xhr.send();
})();

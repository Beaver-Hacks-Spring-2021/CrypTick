var api_key =
  'e183bec25c117aca931861f33b989604853550c7d730b478e94afb64ca12224f';

async function fetchNews() {
  const response = await fetch(
    'https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=' + api_key
  );

  const news = await response.json();
  return news;
}

fetchNews()
  .then((news) => news.Data)
  .then((articles) => {
    console.log(articles);

    articles.forEach((article) => {
      let cover = article.imageurl;
      let url = article.url;
      let title = article.title;
      let source = article.source;
      let category = article.categories;

      let newsCard = `<a class="ui raised card centered" href=${url} target="_blank" rel="noopener noreferrer">
          <div class='image'>
            <img src=${cover} />
          </div>
          <div class='content'>
            <div class='header'>
              ${title}
            </div>
            <div class='meta'>
              <span>${source}</span>
              <span>${category}</span>
            </div>
          </div>
        </a>`;
      document
        .getElementById('articles')
        .insertAdjacentHTML('beforeend', newsCard);
    });
  })
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });

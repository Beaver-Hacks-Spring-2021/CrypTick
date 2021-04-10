window
  .fetch(
    'https://cryptopanic.com//api/v1/posts/?auth_token=9de2bfa6bd699f1fdb53c95acd6485c0edb23643&public=true'
  )
  .then((data) => {
    return data.json();
  })
  .then((res) => {
    console.log(res);
  });

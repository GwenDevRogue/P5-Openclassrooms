function main() {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");

  fetchData(id);

}


function displayData(data) {
  console.log("j'affiche mes datas dans le html");

  const titleHtml = document.getElementById('title');
  titleHtml.innerHTML = data.name;

  const priceHtml = document.getElementById('price');
  priceHtml.innerHTML = data.price;

  const descriptionHtml = document.getElementById('description');
  descriptionHtml.innerHTML = data.description;

  const itemsHtml = document.getElementById('colors');
    data.colors.forEach(element => {
    const optionHtml = document.createElement('option');
    optionHtml.value = element;
    optionHtml.innerText = element;
    itemsHtml.appendChild(optionHtml);
  });

}

function fetchData(id) {
  fetch("http://localhost:3000/api/products/" + id)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      console.log('test', data)
      displayData(data);
    })
    .catch(function (err) {
      console.log('error', err)
    });
}

main();
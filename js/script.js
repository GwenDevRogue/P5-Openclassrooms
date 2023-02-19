function main(){
  fetchData();
  
}

function displayData(data){
  console.log("j'affiche mes datas dans le html");
  let itemsHtml = document.getElementById('items');
  data.forEach(element => {
    let productHtml = document.createElement('a');
    productHtml.href = "./product.html?id=" + element._id;
    productHtml.innerHTML =`
    <article>
      <img src=${element.imageUrl} alt=${element.altTxt}>
      <h3 class="productName">${element.name}</h3>
      <p class="productDescription">${element.description}</p>      </article>
    `
    itemsHtml.appendChild(productHtml);

  });
}


function fetchData() {
  fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
    })
    .then(function(data) {
      console.log('test', data)
      displayData(data);
    })
    .catch(function(err) {
        console.log('error', err)
    });
  }

main();
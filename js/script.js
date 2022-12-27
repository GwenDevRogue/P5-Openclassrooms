function main(){
  fetchData();
  
}

function displayData(data){
  console.log("j'affiche mes datas dans le html");
  const itemsHtml = document.getElementById('items');
  data.forEach(element => {
    let productHtml = document.createElement('a');
    productHtml.href = "./product.html?id=" + element._id;
    productHtml.innerHTML = `
    <article>
      <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
      <h3 class="productName">${element.name}</h3>
      <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>      </article>
    `
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




  
  //fetch("http://localhost:3000/api/products")
    //.then(r => r.json())
   // .then(body => console.log(body))
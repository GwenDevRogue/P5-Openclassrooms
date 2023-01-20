function main() {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");

  fetchData(id);

}
// Afficher le produit

function displayData(data) {
  console.log("j'affiche mes datas dans le html");

  const imgHtml = document.createElement ('img');
  imgHtml.src = data.imageUrl;
  const imgContainer = document.getElementsByClassName('item__img');
  imgContainer[0].appendChild(imgHtml);

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
// Chercher le produit sur l'API

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

// Ajouter le produit au panier

function addToCart (){
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  const color = document.getElementById("colors").value;
  const quantity = document.getElementById("quantity").value;

  let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

  let canAddToCart = true;
  const itemToAdd = {
    id: id,
    color: color,
    quantity: parseInt(quantity),
  }

  if (color === '' || quantity === '' ){
    canAddToCart = false;
    alert('vous devez choisir une quantité et une couleur')
  }
  
  if(canAddToCart) {
    // le reste du traitement
    console.log('je peux ajouter')

    // item a rajouter dans le panier
    let itemInCart = false 

    cart.forEach((itemFromCart)=>{
      if (id === itemFromCart.id, color === itemFromCart.color){
       itemFromCart.quantity += parseInt(quantity);
       itemInCart = true;
       console.log('item in panier')
      }

    })
    console.log('itemInCart', itemInCart)
    if (itemInCart === false ){
      console.log('je push dans le panier')
      cart.push(itemToAdd);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // vérifier qu'une quantité et une couleur soient sélectionnés avant
  // de continuer le reste du processus


  // créer le panier ou récupérer celui existant
  // le panier est un tableau
  // si le localsorage existe, le tableau prend la valeur du localstorage
  
  // si l'id et la couleur sont déja présente dans le tableau
  // alors on upgrade la quantité
  // sinon rajoute l'objet créé dans le tableau
  
  // sauvegarder le localstorage
}

main();

document.addEventListener('click', function(event){
  if (event.target.id === "addToCart"){
    addToCart()
  }
  
})
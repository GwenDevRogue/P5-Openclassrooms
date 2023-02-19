function main() {
  const url = new URL(window.location.href);
  const addCart = url.searchParams.get("addCart");

  fetchData(addCart);

}

// // Changer les quantités

// function changeQuantity(product,quantity){
//   let cart = getCart();
//   let foundProduct = cart.find(p => p.id == product.id);
//   if (foundProduct != undefined) {
//     foundProduct.quantity += quantity;
//     if (foundProduct.quantity <=0) {
//       removeFromCart(foundProduct);
//     } else {
//      saveCart(cart);
//     }
//   }
// }


function fetchData() {
  fetch("http://localhost:3000/api/products/")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      console.log('test', data)
      filterData(data);
    })
    .catch(function (err) {
      console.log('error', err)
    });
}

function filterData (dataFromApi){
  cart = []
  let dataFromLocalstorage = JSON.parse(localStorage.getItem('cart')) || [];
  console.log('dataFromLocalstorage', dataFromLocalstorage)
  dataFromApi.forEach((itemFromApi)=>{
    dataFromLocalstorage.forEach((itemFromLocalstorage)=>{
      if (itemFromApi._id === itemFromLocalstorage.id){
        const itemToAdd = {};
        itemToAdd.item = itemFromApi;
        itemToAdd.quantity = itemFromLocalstorage.quantity;
        itemToAdd.color = itemFromLocalstorage.color;
        cart.push(itemToAdd)
      }
    })
  })
  console.log('cart', cart)
  displayData(cart);
}

function addToDom(filteredItem) {
  console.log(filteredItem)
  let itemsHtml = document.getElementById('cart__items');
  let htmlElem = document.createElement('article');
  htmlElem.innerHTML = `
  <article class="cart__item" data-id="${filteredItem.item._id}" data-color="${filteredItem.color}">
                <div class="cart__item__img">
                <img src=${filteredItem.item.imageUrl} alt=${filteredItem.item.altTxt}>
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${filteredItem.item.name}</h2>
                    <p>${filteredItem.color}</p>
                    <p>${filteredItem.item.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${filteredItem.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
  `;
  itemsHtml.appendChild(htmlElem);
  
  
}

function displayData(filteredCart) {
  filteredCart.forEach((filteredItem) => {
    addToDom(filteredItem)
  })
  eventsHandler(filteredCart);
  calculPrice(filteredCart);
}

// déporter le code de suppression une fois que le code est opérationnel dans eventsHandler
// afin d'eviter une fonction trop longue
//functionDeleteItem(fff){

//}

function updateLocalStorage(filteredCart){
  const localStorageValues = [];
  filteredCart.forEach((product)=> {
    let item = {}
    item.id = product.item._id;
    item.quantity = product.quantity;
    item.color = product.color;
    localStorageValues.push(item)

  })
  localStorage.setItem('cart',JSON.stringify(localStorageValues));
}

function eventsHandler(filteredCart){
  let deleteItemContainer = [...document.getElementsByClassName('deleteItem')];
  let changeItemContainer = [...document.getElementsByClassName('itemQuantity')];
  deleteItemContainer.forEach((boutonDelete, index)=>{
    boutonDelete.addEventListener('click', function(event){
      let itemHtml = deleteItemContainer[index].closest('.cart__item');
      const idItem = itemHtml.dataset.id;
      console.log(idItem);
      filteredCart.splice(index,1);
      updateLocalStorage(filteredCart);
      itemHtml.remove();
      calculPrice(filteredCart);
    })
  })
  
  changeItemContainer.forEach((inputChange, index)=>{
    inputChange.addEventListener('change', function(event){
      console.log('index', index);
      // récupérer la quantité de l'input
      // mettre a jour le panier (calcul prix total et quantité total)
      // si quantité a 0 on efface l'objet du tableau filteredCart
      // update localstorage
      // suppression du produit du Dom

    })
  })
}

function calculPrice(filteredCart){
  // calcul puis faire afficher le prix total
 
  let totalPrice = 0;
  let totalQuantity = 0;
  for(let product of filteredCart){
    totalPrice += parseInt(product.quantity) * parseFloat(product.item.price);
    totalQuantity += parseInt(product.quantity);
  }
  let totalPriceHtml = document.getElementById("totalPrice");
  totalPriceHtml.innerHTML = totalPrice;
  let totalQuantityHtml = document.getElementById("totalQuantity");
  totalQuantityHtml.innerHTML = totalQuantity;
  
}


main();

// une fois la fonction de modification des qté OK
// créer un gestionnaire d'event pour le bouton de validation du formulaire 
// neutraliser le comportement par défaut du formulaire
// dans ce gestionnaire d'vent appeler une fonction ou on va mettre notre logique de validation
// dans la fonction :
// controler la validité des champs (non vides, format email ) grace a des regex
// faire affficher les message d'erreurs en dessous des champs (va faloir cibler les zones correspondantes en html et les remplir)
// vider le localstorage
// SI PAS d'ERREUR !!
// ALORS ON EXECUTE LE RESTE (appeler l'api du back
// et lui transmettre un objet formaté contenant les id de la commande dans un tableau et les infos du formulaire)
// l'api va renvoyer un iD de commande
// faire un redirection de page ensuite vers la page de confirmation avec dans l'url l'iD de commande
// sur la page de confirmation faire afficher l'iD de commande


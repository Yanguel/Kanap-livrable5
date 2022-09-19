// Appel des fonctions présents dans le fichier "utils.js"
import { displayTotal, checkEmail, checkNom, checkPrenom } from './utils.js';

fetch(' http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((data) => {
    //------------------------------------------------------------//
    let panierLocalStorage = localStorage.getItem('produitSelectionner');

    //Création de la variable TABLEAU du local storage
    const arrayPanierLocalStorage = JSON.parse(panierLocalStorage);

    //Utilisation du parent commun <article>
    const container = document.getElementById('cart__items');

    // Création de la boucle afin de recuperer tout les elements du localstorage
    for (let i = 0; i < arrayPanierLocalStorage.length; i++) {
      //Récuperation de l'id dans le tableau.
      const produit = data.find(
        (elt) => elt._id === arrayPanierLocalStorage[i].productId,
      );
      addLineOfProductInCart(produit, arrayPanierLocalStorage[i], container);
    }

    //Gestion de la suppression
    displayTotal(arrayPanierLocalStorage, data);
    const btnSupprimer = document.querySelectorAll('.deleteItem');

    addListenersToDeleteButtons(btnSupprimer, arrayPanierLocalStorage, data);

    //Calculer la quantité d'article dans le panier.
    const itemsQuantity = document.querySelectorAll('.itemQuantity');
    addListenerToQtyButtons(itemsQuantity, arrayPanierLocalStorage, data);
  });

//Gestion du formulaire et du localStorage
document.querySelector('.cart__order__form').addEventListener('submit', (e) => {
  e.preventDefault();
  const firstName2 = document.querySelector('#firstName');
  const lastName2 = document.querySelector('#lastName');
  const emailForm = document.querySelector('#email');
  const contact = {
    firstName: checkPrenom(firstName2.value),
    lastName: checkNom(lastName2.value),
    address: document.querySelector('#address').value,
    city: document.querySelector('#city').value,
    email: checkEmail(emailForm.value),
  };

  if (contact.email && contact.firstName && contact.lastName) {
    var tableauLocalStorage = [];
    produitDuPanier();

    // Envoi de la requête à l'API
    fetch('http://localhost:3000/api/products/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact, products: tableauLocalStorage }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Mettre l'orderId récuperé par la réponse dans l'URL de redirection vers la page de confirmation
        document.location.href = 'confirmation.html?orderId=' + data.orderId;
      });
  }
  // Permet de mettre en tableau le localstorage avec l'id des produits.
  function produitDuPanier() {
    if (localStorage.getItem('produitSelectionner') !== null) {
      let localStorageProduit = JSON.parse(
        localStorage.getItem('produitSelectionner'),
      );
      for (let p = 0; p < localStorageProduit.length; p++) {
        tableauLocalStorage.push(localStorageProduit[p].productId);
      }
    }
  }
});

function addListenerToQtyButtons(itemsQuantity, arrayPanierLocalStorage, data) {
  Array.from(itemsQuantity).forEach((btn, index) => {
    btn.addEventListener('change', (e) => {
      if (e.target.value > 100) {
        alert('Le montant ne peux etre superieur à 100.');
        window.location = 'cart.html';
        return;
      }
      if (e.target.value < 0) {
        alert('Le montant ne peux etre inférieur à 0.');
        window.location = 'cart.html';
        return;
      } else {
        arrayPanierLocalStorage[index].quantity = e.target.value;
        if (parseInt(e.target.value) === 0) {
          alert('delete');
          const cartItem = e.target.closest('.cart__item');
          cartItem.remove();
        }
        localStorage.setItem(
          'produitSelectionner',
          JSON.stringify(arrayPanierLocalStorage),
        );

        // recalculer total
        displayTotal(arrayPanierLocalStorage, data);
      }
    });
  });
}

function addListenersToDeleteButtons(
  btnSupprimer,
  arrayPanierLocalStorage,
  data,
) {
  Array.from(btnSupprimer).forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      alert(`Produit supprimé`);
      const cartItem = e.target.closest('.cart__item');

      // J'enleve du tableau l'élément avec l'index correspondant.
      arrayPanierLocalStorage.splice(index, 1);
      localStorage.setItem(
        'produitSelectionner',
        JSON.stringify(arrayPanierLocalStorage),
      );
      cartItem.remove();
      displayTotal(arrayPanierLocalStorage, data);
    });
  });
}

function addLineOfProductInCart(produit, productFromCart, container) {
  const articleElt = document.createElement('article');
  articleElt.classList.add('cart__item');

  //Création des enfants
  const divImgElt = document.createElement('div');
  divImgElt.classList.add('cart__item__img');

  const imgElt = document.createElement('img');
  imgElt.alt = produit.name;
  imgElt.src = produit.imageUrl;

  const divItemContent = document.createElement('div');
  divItemContent.classList.add('cart__item__content');

  const divItemContentDescription = document.createElement('div');
  divItemContentDescription.classList.add('cart__item__content__description');

  const nomElt = document.createElement('h2');
  nomElt.textContent = produit.name;

  const pCouleur = document.createElement('p');
  pCouleur.textContent = productFromCart.color;

  const pPrice = document.createElement('p');
  pPrice.textContent = produit.price + ' €';

  const divItemContentSettings = document.createElement('div');
  divItemContentSettings.classList.add('cart__item__content__settings');

  const divSettingsQuantity = document.createElement('div');
  divSettingsQuantity.classList.add('cart__item__content__settings__quantity');

  const pQuantity = document.createElement('p');
  pQuantity.innerHTML = 'Qté : ';

  // Création de l'input "Qté"
  const inputNomber = document.createElement('input');
  inputNomber.classList.add('itemQuantity');
  inputNomber.setAttribute('type', 'number');
  inputNomber.setAttribute('name', 'itemQuantity');
  inputNomber.setAttribute('min', '1');
  inputNomber.setAttribute('max', '100');
  inputNomber.setAttribute('value', productFromCart.quantity);
  inputNomber.textContent = productFromCart.quantity;

  // Création de la div "cart__item__content__settings__delete" et de la class "deleteItem"
  const divSettingsdelete = document.createElement('div');
  divSettingsdelete.classList.add('cart__item__content__settings__delete');

  const pDelteItem = document.createElement('p');
  pDelteItem.classList.add('deleteItem');
  pDelteItem.innerHTML = 'Supprimer';

  /////////////  Ajouter une unitée à l'élément  /////////////
  //Création des enfants
  container.appendChild(articleElt);
  articleElt.appendChild(divImgElt);
  divImgElt.appendChild(imgElt);
  articleElt.appendChild(divItemContent);
  divItemContent.appendChild(divItemContentDescription);
  divItemContentDescription.appendChild(nomElt);
  divItemContentDescription.appendChild(pCouleur);
  divItemContentDescription.appendChild(pPrice);
  divItemContent.appendChild(divItemContentSettings);
  divItemContentSettings.appendChild(divSettingsQuantity);
  divSettingsQuantity.appendChild(pQuantity);
  divSettingsQuantity.appendChild(inputNomber);
  divItemContentSettings.appendChild(divSettingsdelete);
  divSettingsdelete.appendChild(pDelteItem);
}

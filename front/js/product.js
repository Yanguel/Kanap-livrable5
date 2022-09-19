//Récupere l'id du produit séléctionné
let str = window.location;
let url = new URL(str);
let search_params = new URLSearchParams(url.search);
let idItem = search_params.get('id');

// Récupération des données API concernant les canapés.
fetch(' http://localhost:3000/api/products/' + idItem)
  .then((response) => response.json())
  .then((canape) => {
    //recuperation de l'élément HTML correspondant à "ajouter au panier".
    const switchPanier = document.getElementById('addToCart');
    //Rajout des deux div pour le message d'erreur

    createDOMProduct(canape);
    // Au clique, sauvegarder et ajouter l'element dans le local Storage.
    switchPanier.addEventListener('click', () => {
      addProductToCart();
    });
  });

function createDOMProduct(canape) {
  const ligneQuantiter = document.querySelector(
    '.item__content__settings__quantity',
  );
  const ajoutDiv = document.createElement('div');
  ligneQuantiter.appendChild(ajoutDiv);
  ajoutDiv.classList.add('error');

  const ligneCouleur = document.querySelector(
    '.item__content__settings__color',
  );

  const ajoutDivCouleur = document.createElement('div');
  ligneCouleur.appendChild(ajoutDivCouleur);
  ajoutDivCouleur.classList.add('error');
  const classimg = document.getElementsByClassName('item__img');

  // Récupération d'éléments de l'API (image + nom)
  const linkelt = document.createElement('img');
  linkelt.src = canape.imageUrl;
  linkelt.alt = canape.name;

  // Recherche de l'ID
  linkelt.href = './product.html?id=' + canape._id;

  // Création des enfants
  classimg[0].appendChild(linkelt);

  // Rajout du nom du produit via l'API
  const classname = document.getElementById('title');
  classname.innerHTML = canape.name;

  // Rajout du prix via l'API
  const classprice = document.getElementById('price');
  classprice.innerHTML = canape.price;

  // Rajout de la description vie l'API
  const classdescription = document.getElementById('description');
  classdescription.innerHTML = canape.description;

  // Rajout des options de couleurs possible
  let newoption = document.getElementById('colors');
  let options = canape.colors;

  options.forEach(function (element) {
    newoption[newoption.options.length] = new Option(
      element,
      element,
      false,
      false,
    );
  });
}

function addProductToCart() {
  // Récupere les données dont nous avons besoin pour le panier.
  let optionsProduct = {
    productId: idItem,
    quantity: parseInt(document.getElementById('quantity').value),
    color: document.getElementById('colors').value,
  };
  // Gestion des conditions pour l'ajout d'article.
  let choiceError = false;

  choiceError = manageQuantite(optionsProduct, choiceError);
  choiceError = manageColor(optionsProduct, choiceError);

  if (choiceError) {
    return true;
  }
  //Transforme le localStorage en tableau.
  addToLocalStorage(optionsProduct);
  alert('Produit rajouté dans le panier.');
}

function addToLocalStorage(optionsProduct) {
  let productInLocalStorage = JSON.parse(
    localStorage.getItem('produitSelectionner'),
  );

  // Si il y a déja produit similaire dans le local storage  //
  if (productInLocalStorage) {
    const index = productInLocalStorage.findIndex(
      (elt) =>
        elt.productId === optionsProduct.productId &&
        elt.color === optionsProduct.color,
    );
    if (index > -1) {
      productInLocalStorage[index].quantity += optionsProduct.quantity;
    } else {
      productInLocalStorage.push(optionsProduct);
    }
    localStorage.setItem(
      'produitSelectionner',
      JSON.stringify(productInLocalStorage),
    );
  }

  // s'il n'y a pas "produitSelectionner" dans le local storage ALORS  : //
  else {
    productInLocalStorage = [];
    productInLocalStorage.push(optionsProduct);
    localStorage.setItem(
      'produitSelectionner',
      JSON.stringify(productInLocalStorage),
    );
  }
}

function manageColor(optionsProduct, choiceError) {
  let error = choiceError;
  const errorDivCouleur = document
    .getElementById('colors')
    .closest('div')
    .querySelector('.error');
  if (optionsProduct.color == '') {
    error = true;
    errorDivCouleur.innerHTML = 'Merci de séléctionner une couleur.';
    document.querySelector('#colors').style.color = 'red';
    errorDivCouleur.style.color = 'red';
  } else {
    errorDivCouleur.innerHTML = '';
    document.querySelector('#colors').style.color = 'black';
  }
  return error;
}

function manageQuantite(optionsProduct, choiceError) {
  let error = choiceError;
  const laQuantitee = document.querySelector('#quantity');
  const errorDiv = document
    .getElementById('quantity')
    .closest('div')
    .querySelector('.error');
  if (optionsProduct.quantity > 100 || optionsProduct.quantity <= 0) {
    error = true;

    errorDiv.innerHTML =
      'La quantité ne peux pas etre supérieur à 100 ou inférieur et égale à 0.';
    laQuantitee.style.color = 'red';
    errorDiv.style.color = 'red';
  } else {
    errorDiv.innerHTML = '';
    laQuantitee.style.color = 'black';
  }
  return error;
}

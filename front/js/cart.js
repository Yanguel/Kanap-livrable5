let urlBase = fetch(" http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((canape) => {
    //------------------------------------------------------------//

    let panierLocalStorage = localStorage.getItem("produitSelectionner");

    //Création de la variable TABLEAU du local storage
    const arrayPanierLocalStorage = JSON.parse(panierLocalStorage);

    //Utilisation du parent commun <article>
    const container = document.getElementById("cart__items");

    // Création de la boucle afin de recuperer tout les elements du localstorage
    for (let i = 0; i < arrayPanierLocalStorage.length; i++) {
      //Création de <article>
      const articleElt = document.createElement("article");
      articleElt.classList.add("cart__item");

      //Création des enfants
      const divImgElt = document.createElement("div");
      divImgElt.classList.add("cart__item__img");

      const imgElt = document.createElement("img");
      imgElt.alt = arrayPanierLocalStorage[i].altProduit;
      imgElt.src = arrayPanierLocalStorage[i].imgProduit;

      const divItemContent = document.createElement("div");
      divItemContent.classList.add("cart__item__content");

      const divItemContentDescription = document.createElement("div");
      divItemContentDescription.classList.add(
        "cart__item__content__description"
      );

      const nomElt = document.createElement("h2");
      nomElt.textContent = arrayPanierLocalStorage[i].nameProduit;

      const pCouleur = document.createElement("p");
      pCouleur.textContent = arrayPanierLocalStorage[i].color;

      const pPrice = document.createElement("p");
      pPrice.textContent = arrayPanierLocalStorage[i].prixProduit + " €";

      const divItemContentSettings = document.createElement("div");
      divItemContentSettings.classList.add("cart__item__content__settings");

      const divSettingsQuantity = document.createElement("div");
      divSettingsQuantity.classList.add(
        "cart__item__content__settings__quantity"
      );

      const pQuantity = document.createElement("p");
      pQuantity.innerHTML = "Qté : ";

      // Création de l'input "Qté"
      const inputNomber = document.createElement("input");
      inputNomber.classList.add("itemQuantity");
      inputNomber.setAttribute("type", "number");
      inputNomber.setAttribute("name", "itemQuantity");
      inputNomber.setAttribute("min", "1");
      inputNomber.setAttribute("max", "100");
      inputNomber.setAttribute("value", arrayPanierLocalStorage[i].quantity);
      inputNomber.textContent = arrayPanierLocalStorage[i].quantity;

      ////////////////////////////////////////////////////////////////////////////////////

      // Création de la div "cart__item__content__settings__delete" et de la class "deleteItem"

      const divSettingsdelete = document.createElement("div");
      divSettingsdelete.classList.add("cart__item__content__settings__delete");

      const pDelteItem = document.createElement("p");
      pDelteItem.classList.add("deleteItem");
      pDelteItem.innerHTML = "Supprimer";

      //////////////////////////   Ajouter une unitée à l'élément   //////////////////////////////////
      // Recherche de l'ID
      articleElt.href = "./product.html?id=" + canape._id;

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
    //affiche le total
    displayTotal(arrayPanierLocalStorage);

    //Gestion de la suppression
    const btnSupprimer = document.querySelectorAll(".deleteItem");

    Array.from(btnSupprimer).forEach((btn, index) => {
      btn.addEventListener("click", (e) => {
        console.log(e.target, index);
        alert("Produit supprimé");
        const cartItem = e.target.closest(".cart__item");
        const nameCanape = cartItem.querySelector("h2");
        console.log(nameCanape, index);

        // J'enleve du tableau l'élément avec l'index correspondant à la variable index
        //const elementSupprimer = arrayPanierLocalStorage.splice(cartItem, 1);
        const elementSupprimer = arrayPanierLocalStorage.splice(index, 1);
        localStorage.setItem(
          "produitSelectionner",
          JSON.stringify(arrayPanierLocalStorage)
        );
        cartItem.remove();

        displayTotal(arrayPanierLocalStorage);
        // recalculer total etc....
      });
    });

    const itemsQuantity = document.querySelectorAll(".itemQuantity");

    Array.from(itemsQuantity).forEach((btn, index) => {
      btn.addEventListener("change", (e) => {
        console.log(e.target.value, index);
        alert("Vous avez changé la quantité du produit à : " + e.target.value);
        arrayPanierLocalStorage[index].quantity = e.target.value;
        if (parseInt(e.target.value) === 0) {
          alert("delete");

          const elementSupprimer = arrayPanierLocalStorage.splice(index, 1);
          const cartItem = e.target.closest(".cart__item");
          cartItem.remove();
        }
        localStorage.setItem(
          "produitSelectionner",
          JSON.stringify(arrayPanierLocalStorage)
        );

        displayTotal(arrayPanierLocalStorage);
        // recalculer total etc....
      });
    });

    let produitPanier = localStorage.getItem("produitSelectionner");

    ///////////   Calculer le montant du panier   /////////////
    const totalPrixPanier = document.getElementById("totalPrice");

    const calculePrix = [];
    for (let p = 0; p < produitPanier; p++) {
      let prixProduitDansLePanier = arrayPanierLocalStorage[p].prixProduit;

      // Mettre les prix du panier dans le tableau totalPrixPanier
      calculePrix.push(prixProduitDansLePanier);

      //console.log(calculePrix)
    }

    // additionner les prix du tableau calculePrix
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const prixTotal = calculePrix.reduce(reducer, 0);

    //console.log(prixTotal);

    totalPrixPanier.innerHTML = prixTotal;

    function calculTotal(produits) {
      let total = 0;
      for (let i = 0; i < produits.length; i++) {
        total += produits[i].prixProduit * produits[i].quantity;
      }
      return total;
    }

    function displayTotal(produits) {
      const total = calculTotal(produits);
      document.querySelector("#totalPrice").textContent = total;
    }

    // je veux calculer le total des articles de mon panier
    function calculTotal(produits) {
      // 1 - definir un total a 0
      let total = 0;
      // 2 faire une boucle sur les elements de mon panier
      produits.forEach((produit) => {
        // dans la boucle pour chaque element calculer le prix en fonction de la quantité
        const totalProduit = produit.quantity * produit.prixProduit;
        // ajouter au total
        total = total + totalProduit;
      });
      // en fin de boucle renvoyer le total
      return total;
    }

    ///////// Calculer la quantité d'element dans le panier ////////

    const totalQuantitePanier = document.getElementById("totalQuantity");

    const tableauNombreElement = [];

    for (let n = 0; n < arrayPanierLocalStorage.length; n++) {
      let idElement = tableauNombreElement[n].quantity;

      tableauNombreElement.push(idElement);
    }

    totalQuantitePanier.textContent = tableauNombreElement.length;
  });

///////////// Vérifier que l'email est correct /////////////////

let textEmail = document.querySelector("#email");

let formulaire = {
  prenom: document.getElementById("#firstName").value,
  nom: document.getElementById("#lastName").value,
  adresse: document.getElementById("#adress").value,
  ville: document.getElementById("#city").value,
  email: document.getElementById("#email").value,
};

function validerEmail(email) {
  const regle =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regle.test(email);
}

function checkEmail(textEmail) {
  if (formulaire.email === true) {
    alert("Cette email est valide");
    return this.email;
  } else {
    alert("Merci de rentrer une adresse Email correct");
    return false;
  }
}
/////////// Enregistrer les données du formulaire

let commander = document.querySelector("#order");
let formulaireComplet = document.querySelector("cart__order__form");

commander.addEventListener("click", function (clique) {
  localStorage.setItem("formulaire rempli", formulaire);
});

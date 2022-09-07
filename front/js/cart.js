import { displayTotal, checkEmail } from "./utils.js";

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
        //console.log(e.target, index, arrayPanierLocalStorage[index]);
        alert(`Produit ${arrayPanierLocalStorage[index].nameProduit} supprimé`);
        const cartItem = e.target.closest(".cart__item");
        const nameCanape = cartItem.querySelector("h2");
        //console.log(nameCanape, index);

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
        //console.log(e.target.value, index);
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

    document.querySelector(".cart__order__form").addEventListener("submit", (e) => {
        e.preventDefault();
        //console.log('submit');
        const emailForm = document.querySelector("#email");

        if (email !== false) {
          //stocker dans localStorage
          const contact = {
            firstName: document.querySelector("#firstName").value,
            lastName: document.querySelector("#lastName").value,
            address: document.querySelector("#address").value,
            city: document.querySelector("#city").value,
            email: checkEmail(emailForm.value),
          };
          var tableauLocalStorage = [];
          function produitDuPanier (){
            if (localStorage.getItem("produitSelectionner") !== null){
              let localStorageProduit = JSON.parse(localStorage.getItem("produitSelectionner"))
              for (let p = 0; p < localStorageProduit.length; p++ ){
                tableauLocalStorage.push(localStorageProduit[p].productId)
              }
            }
          }
          produitDuPanier();
          //console.log(tableauLocalStorage);
          fetch('http://localhost:3000/api/products/order', {
            method: "POST",
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({contact, products:tableauLocalStorage}),
          })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            //console.log(data); // 201 si OK
            localStorage.setItem("order", JSON.stringify(data));
            document.location.href = "confirmation.html";
          })
      }});
  });
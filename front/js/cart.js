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

      ////////////////////////// Calculer la quantité d'element dans le panier ////////////////////////

      const totalQuantitePanier = document.getElementById("totalQuantity");

      const tableauNombreElement = [];

      for (let n = 0; n < arrayPanierLocalStorage.length; n++) {
        let idElement = arrayPanierLocalStorage[n].productId;

        tableauNombreElement.push(idElement);
      }

      totalQuantitePanier.textContent = tableauNombreElement.length;

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

    const btnSupprimer = document.querySelectorAll(".deleteItem");

    Array.from(btnSupprimer).forEach((btn, index) => {
      btn.addEventListener("click", (e) => {
        console.log(e.target, index);
        alert("supprimé");
        const cartItem = e.target.closest(".cart__item");
        const nameCanape = cartItem.querySelector("h2");
        console.log(nameCanape, index);

        // J'enleve du tableau l'élément avec l'index correspondant à la variable index
        const elementSupprimer = arrayPanierLocalStorage.splice(index, 1);

        localStorage.setItem(
          "produitSelectionner",
          JSON.stringify(arrayPanierLocalStorage)
        );
        cartItem.remove();
        console.log(elementSupprimer);
      });
    });

    // Changement Quantitée
    const btnPlusUn = document.querySelectorAll(".itemQuantity");

    Array.from(btnPlusUn).forEach((btn, index) => {
      btn.addEventListener("change", (e) => {
        console.log(e.target.value, index);
        alert("change");
        arrayPanierLocalStorage[index].quantity = e.target.value;

        // J'enleve du tableau l'élément avec l'index correspondant à la variable index

        localStorage.setItem(
          "produitSelectionner",
          JSON.stringify(arrayPanierLocalStorage)
        );
      });
    });
  });

/*
       //////////////////////////   Calculer le montant du panier   //////////////////////////////////
       const totalPrixPanier = document.getElementById("totalPrice");

       const calculePrix = [];
 
       for (let p = 0; p < arrayPanierLocalStorage.length; p++) {
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
*/

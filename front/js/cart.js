

let urlBase = fetch(" http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((canape) => {
 console.log(canape);

 //Rajouter l'API dans le localStorage
 let objLinea = JSON.stringify(canape);
 localStorage.setItem("lesCanapes",objLinea);

 //------------------------------------------------------------//


  
    //Utilisation du parent commun <article>
    const container = document.getElementById("cart__items");

    //Création de <article>
    const articleElt = document.createElement("article");
    articleElt.classList.add("cart__item");

    //Création des enfants
    const divImgElt = document.createElement("div");
    divImgElt.classList.add("cart__item__img");

    const imgElt = document.createElement("img");
    //imgElt.src = localStorage.getItem("produitSelectionner","imgProduit");
    imgElt.textContent =  localStorage.getItem("produitSelectionner","altProduit");

    const divItemContent = document.createElement("div");
    divItemContent.classList.add("cart__item__content");

    const divItemContentDescription = document.createElement("div");
    divItemContentDescription.classList.add("cart__item__content__description");

    const nomElt = document.createElement("h2");
    nomElt.textContent = localStorage.getItem("produitSelectionner","nameProduit");

    const pCouleur = document.createElement("p");
    textContent = localStorage.getItem("produitSelectionner","color");

    const pPrice = document.createElement("p");
    pPrice.textContent = localStorage.getItem("produitSelectionner","price");

    const divItemContentSettings = document.createElement("div");
    divItemContentSettings.classList.add("cart__item__content__settings");

    const divSettingsQuantity = document.createElement("div");
    divSettingsQuantity.classList.add("cart__item__content__settings__quantity");

    const pQuantity = document.createElement("p");
    pQuantity.innerHTML = "Qté : " + localStorage.getItem("produitSelectionner","quantity"); ;

    // Création de l'input "Qté"
    const inputNomber = document.createElement("input");
    inputNomber.classList.add("itemQuantity");
    inputNomber.setAttribute("type", "number");
    inputNomber.setAttribute("name", "itemQuantity");
    inputNomber.setAttribute("min", "1");
    inputNomber.setAttribute("max", "100");
    inputNomber.setAttribute("value", "42");

    const divSettingsdelete = document.createElement("div");
    divSettingsdelete.classList.add("cart__item__content__settings__delete");

    const pDelteItem = document.createElement("p");
    pDelteItem.classList.add("deleteItem");
    pDelteItem.innerHTML = "Supprimer";
    
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
    
    
  });



let urlBase = fetch(" http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((canape) => {
 console.log(canape);

 
 //---------------------Le local Storage------------------------//
 /*
 const idProduitSelectionner = response.find((element) => element._id ===id);
 
 const idForm = document.getElementById("addToCart");

 idForm.addEventListener("click", (event) => {
    event.preventDefault();
 ;

 const optionQuantite = id_ProduitSelectionner.options;
 let structureOptions =[]; 


 for (let j = 0; i < optionQuantite.length; j++) {

 const choixFormulaire = idForm.value;

 let optionProduit ={
    nomProduit: idProduitSelectionner.name,
    id_ProduitSelectionner: idProduitSelectionner._id,
    option_produit: choixFormulaire,
    quantite: 1,
    prix: id_ProduitSelectionner.price /100,
};
    
    //Déclaration de la variable "produitInStorage"
    
    let produitInStorage = JSON.parse(localStorage.getItem("_id"));
    console.log(produitInStorage);
    
    if(produitInStorage){
        
    }
//si il n'y a pas de produit dans le localstorage.
else{
    produitInStorage =[];
    produitInStorage.push(optionProduit);
    localStorage.setItem("produit", JSON.stringify(produitInStorage));
    console.log(produitInStorage);
}

}});
*/
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
    imgElt.src = canape.imageUrl;
    imgElt.alt = canape.altTxt;

    const divItemContent = document.createElement("div");
    divItemContent.classList.add("cart__item__content");

    const divItemContentDescription = document.createElement("div");
    divItemContentDescription.classList.add("cart__item__content__description");

    const nomElt = document.createElement("h2");
    nomElt.textContent = canape.name;

    const pCouleur = document.createElement("p");
    pCouleur.textContent = canape.colors;

    const pPrice = document.createElement("p");
    pPrice.textContent = canape.price;

    const divItemContentSettings = document.createElement("div");
    divItemContentSettings.classList.add("cart__item__content__settings");

    const divSettingsQuantity = document.createElement("div");
    divSettingsQuantity.classList.add("cart__item__content__settings__quantity");

    const pQuantity = document.createElement("p");
    pQuantity.innerHTML = "Qté : ";

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

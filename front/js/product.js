
let str = window.location;
let url = new URL(str);
let search_params = new URLSearchParams(url.search);
let idItem = search_params.get("id");

// Récupération des données concernant les canapés.
fetch(" http://localhost:3000/api/products/" + idItem)
  .then((response) => response.json())
  .then((canape) => {
    ///////// Création de l'évenement permettant d'ajouter la saisi au panier". /////////////

    //recuperation de l'id correspondant au "ajouter au panier"
    const switchPanier = document.getElementById("addToCart");
    
   //Rajout des deux div pour la phrase d'erreur.
   const ligneQuantiter = document.querySelector(".item__content__settings__quantity");
   const laQuantitee = document.querySelector("#quantity");
   const ajoutDiv = document.createElement("div");
   ligneQuantiter.appendChild(ajoutDiv);
   ajoutDiv.classList.add("error");

   const ligneCouleur = document.querySelector(".item__content__settings__color");
   const lacouleur = document.querySelector("#colors");
   const ajoutDivCouleur = document.createElement("div");
   ligneCouleur.appendChild(ajoutDivCouleur);
   ajoutDivCouleur.classList.add("error");
  //

    // au clique, sauvegarder et ajouter l'element dans le local Storage //
    switchPanier.addEventListener("click", () => {
      // affichage dans le local storage toutes les données dont nous avons besoin dans le panier //
      let optionsProduct = {
        productId: idItem,
        prixProduit: canape.price,
        imgProduit: canape.imageUrl,
        descriptionPrduit: canape.description,
        altProduit: canape.altTxt,
        nameProduit: canape.name,
        quantity: document.getElementById("quantity").value,
        color: document.getElementById("colors").value,
      };
      if (optionsProduct.quantity > 100 || optionsProduct.quantity < 0) {
        ajoutDiv.innerHTML = "La quantité ne peux pas etre supérieur à 100 ou inférieur à 100.";
        laQuantitee.style.color = "red";
        ajoutDiv.style.color = "red";
        return;
      }
      if (optionsProduct.quantity == 0 && optionsProduct.color == "") {
        ajoutDivCouleur.innerHTML = "Merci de séléctionner une couleur.";
        lacouleur.style.color = "red";
        ajoutDivCouleur.style.color = "red";
        ajoutDiv.innerHTML = "Merci de séléctionner une quantité.";
        laQuantitee.style.color = "red";
        ajoutDiv.style.color = "red";
        return;
      }
      if (optionsProduct.color == "" && optionsProduct.quantity != 0) {
        ajoutDivCouleur.innerHTML = "Merci de séléctionner une couleur.";
        lacouleur.style.color = "red";
        ajoutDivCouleur.style.color = "red";
        return;
      }
      if (optionsProduct.color != "" && optionsProduct.quantity == 0) {
        ajoutDiv.innerHTML = "Merci de séléctionner une quantité.";
        laQuantitee.style.color = "red";
        ajoutDiv.style.color = "red";
        return;
      } else if (optionsProduct.quantity != 0 && optionsProduct.color != "") {
        let productInLocalStorage = JSON.parse(
          localStorage.getItem("produitSelectionner")
        );

        // s'il y a un produit "produitSelectionner" dans le local storage  //
        if (productInLocalStorage) {
          productInLocalStorage.push(optionsProduct);
          localStorage.setItem(
            "produitSelectionner",
            JSON.stringify(productInLocalStorage)
          );
          alert("Produit rajouté dans le panier.");
        }
        // s'il n'y a pas "produitSelectionner" dans le local storage ALORS : //
        else {
          productInLocalStorage = [];
          productInLocalStorage.push(optionsProduct);
          console.log(productInLocalStorage);
          localStorage.setItem(
            "produitSelectionner",
            JSON.stringify(productInLocalStorage)
          );
          alert("Produit rajouté dans le panier.");
        }
      }
    });
    // --------------------------------------//

    //Création de la variable représentant la class "item__img"
    const classimg = document.getElementsByClassName("item__img");

    // Création de l'élément img + récuperation de l'image + utilisation du alt
    const linkelt = document.createElement("img");
    linkelt.src = canape.imageUrl;
    linkelt.alt = canape.name;

    // Recherche de l'ID
    linkelt.href = "./product.html?id=" + canape._id;

    //Création des enfants
    classimg[0].appendChild(linkelt);

    // Rajout du nom du produit
    const classname = document.getElementById("title");
    classname.innerHTML = canape.name;

    // Rajout du prix en fonction de l'id
    const classprice = document.getElementById("price");
    classprice.innerHTML = canape.price;

    // Rajout de la description en fonction de l'id
    const classdescription = document.getElementById("description");
    classdescription.innerHTML = canape.description;

    // Rajout des options "Vert" et "Blanc" hors de la boucle !
    let newoption = document.getElementById("colors");
    let options = canape.colors;

    options.forEach(function (element) {
      newoption[newoption.options.length] = new Option(
        element,
        element,
        false,
        false
      );
    });
  });

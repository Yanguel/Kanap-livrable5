

fetch(" http://localhost:3000/api/products")
.then((response) => response.json())
.then((data) => {
  console.log(data);

  //Utilisation du parent commun <article>
    const container = document.getElementById("cart__items") ;

    const articleElt = document.createElement("article");
    articleElt.classList.add("cart__item");
    
    const divImgElt = document.createElement("div");
    divImgElt.classList.add("cart__item__img");
    
        const imgElt = document.createElement("img");
        imgElt.src = data.imageUrl;
        imgElt.alt = data.name;
    
    
    const divItemContent = document.createElement("div");
    divItemContent.classList.add("cart__item__content");

        const divItemContentDescription = document.createElement("div");
        divItemContentDescription.classList.add("cart__item__content__description");
            
            const nomElt = document.createElement("h2");
            nomElt.textContent = data.description;

            const pCouleur = document.createElement("p");
            pCouleur.textContent = data.colors;

            const pPrice = document.createElement("p");
            pPrice.textContent = data.price;

        const divItemContentSettings = document.createElement("div");
        divItemContentSettings.classList.add("cart__item__content__settings");

            const divSettingsQuantity = document.createElement("div");
            divSettingsQuantity.classList.add("cart__item__content__settings__quantity");
               
                const pQuantity = document.createElement("p");
                pQuantity.innerHTML = "Qté : ";

                const inputNomber = document.createElement("input");
                inputNomber.classList.add("itemQuantity");
                inputNomber.setAttribute("type", "number");
                inputNomber.setAttribute("name", "itemQuantity");
                inputNomber.setAttribute("min", "1");
                inputNomber.setAttribute("max", "100");
                inputNomber.setAttribute("value", "42");

            const divSettingsdelete = document.createElement("div");
            divSettingsdelete.classList.add("cart__item__content__settings__delete");

                const pDelteItem= document.createElement("p");
                pDelteItem.classList.add("deleteItem");
                pDelteItem.innerHTML= "Supprimer";

    // Création de la boucle for afin de parcourir le tableau récupéré précédemment.
    for (let i = 0; i < data.length; i++) {
        
        
        // Recherche de l'ID
        articleElt.href = "./product.html?id=" + data._id;

      //Création des enfants 
      container.appendChild(articleElt);
      articleElt.appendChild(divImgElt);
      articleElt.appendChild(divItemContent);
      divImgElt.appendChild(imgElt);
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
  });
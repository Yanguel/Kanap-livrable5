// Récupération des données concernant les canapés.

fetch(" http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

        //Utilisation du parent commun #items
    const container = document.querySelector("#items") ;
 
    // Création de la boucle for afin de parcourir le tableau récupéré précédemment.
    for (let i = 0; i < data.length; i++) {
      const linkelt = document.createElement("a");

        // Recherche de l'ID
      linkelt.href = "./product.html?id=" + data[i]._id;

      // Création de la balise <article>
      const articleelt = document.createElement("article");

      //Création des multiples balises (img / h3 / p)
      const imageelt = document.createElement("img");
      imageelt.src = data[i].imageUrl;
      imageelt.alt = data[i].name;


      
      const h3elt = document.createElement("h3");
      h3elt.classList.add("productName");
      h3elt.textContent = data[i].name;

      const pelt = document.createElement("p");
      pelt.classList.add("productDescription");
      pelt.textContent = data[i].description;

      //Création des enfants 
      articleelt.appendChild(imageelt);
      articleelt.appendChild(h3elt);
      articleelt.appendChild(pelt);
      linkelt.appendChild(articleelt);
      container.appendChild(linkelt);
    }
  });

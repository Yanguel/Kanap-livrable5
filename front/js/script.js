// Récupération des données concernant les canapés.

fetch(" http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    


    /*   <section class="items" id="items"> 
<!--           <a href="./product.html?id=42">
                <article>
                        <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
                        <h3 class="productName">Kanap name1</h3>
                        <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
                 </article>
          </a> -->
        </section> */




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

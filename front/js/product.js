// Récupération des données concernant les canapés.
let urlbase = fetch(" http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    /* <article>
            <div class="item__img">
                <!-- <img src="../images/logo.png" alt="Photographie d'un canapé"> -->
            </div> 
    */

                  //Utilisation du parent commun Article
    const container = document.querySelector("article");
    
    // Création de la boucle for afin de parcourir le tableau récupéré précédemment.
    for (let i = 0; i < data.length; i++) {
        
        const classimg = document.getElementsByClassName("item__img");
        
        

        // Création de l'élément img + récuperation de l'image + utilisation du alt 
        const linkelt = document.createElement("img");
        linkelt.src = data[i].imageUrl;
        linkelt.alt = data[i].name;
        
        // Recherche de l'ID
        linkelt.href = "./product.html?id=" + data[i]._id;


      //Création des enfants 
        classimg[0].appendChild(linkelt)

    }
});
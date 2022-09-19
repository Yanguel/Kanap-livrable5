// Récupération des données de l'API concernant les canapés.
fetch(' http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((data) => {
    //Utilisation du parent commun #items
    const container = document.querySelector('#items');

    // Création de la boucle for afin de parcourir le tableau récupéré précédemment.
    for (let i = 0; i < data.length; i++) {
      createProductDOM(data[i], container);
    }
  });

function createProductDOM(product, container) {
  const linkelt = document.createElement('a');

  // Recherche de l'ID pour ouvrir la bonne page produit.
  linkelt.href = './product.html?id=' + product._id;

  const articleelt = document.createElement('article');

  //Création des multiples balises (img / h3 / p)
  const imageelt = document.createElement('img');
  imageelt.src = product.imageUrl;
  imageelt.alt = product.name;

  const h3elt = document.createElement('h3');
  h3elt.classList.add('productName');
  h3elt.textContent = product.name;

  const pelt = document.createElement('p');
  pelt.classList.add('productDescription');
  pelt.textContent = product.description;

  //Création des enfants
  articleelt.appendChild(imageelt);
  articleelt.appendChild(h3elt);
  articleelt.appendChild(pelt);
  linkelt.appendChild(articleelt);
  container.appendChild(linkelt);
}

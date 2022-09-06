
function calculTotalNbElementsPanier(panier){
    let total = 0
    panier.forEach(product => {
      console.log(product);
      total = total + parseInt(product.quantity);
    });
    return total;
}

function validerEmail(email) {
  const regle =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regle.test(email);
}

function checkEmail(textEmail) {
  if (validerEmail(textEmail)) {
    alert("Cette email est valide");
    return textEmail;
  } else {
    alert("Merci de rentrer une adresse Email correct");
    return false;
  }
}

function displayTotal(produits) {
  const total = calculTotal(produits);
  document.querySelector("#totalPrice").textContent = total;
  const totalElementsPanier = calculTotalNbElementsPanier(produits);
  document.querySelector("#totalQuantity").textContent = totalElementsPanier;
}

// je veux calculer le total des articles de mon panier
function calculTotal(produits) {
  // 1 - definir un total a 0
  let total = 0;
  // 2 faire une boucle sur les elements de mon panier
  produits.forEach((produit) => {
    // dans la boucle pour chaque element calculer le prix en fonction de la quantité
    const totalProduit = produit.quantity * produit.prixProduit;
    // ajouter au total
    total = total + totalProduit;
  });
  // en fin de boucle renvoyer le total
  return total;
}

export {calculTotal, calculTotalNbElementsPanier, checkEmail, displayTotal, validerEmail}
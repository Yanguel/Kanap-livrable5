// Permet de vérifier que la saisi ne contient pas de chiffre. (Regex)
function regexSansChiffre(veriftext) {
  var exp = new RegExp("^[a-zA-Z]*$","g")
  return exp.test(veriftext);
}
// Donne l'instruction si le prenom à un chiffre.
function checkPrenom(textNomPrenom) {
  if (regexSansChiffre(textNomPrenom)) {
    return textNomPrenom;
  } else {
    const firstNameElt = document.querySelector("#firstName")
    firstNameElt.style.color = "red";
    document.querySelector('#firstNameErrorMsg').innerText = 'Le Prenom ne peut pas contenir de chiffre.'
    return false;
  }
}
// Donne l'instruction si le nom à un chiffre.
function checkNom(textNomPrenom) {
  if (regexSansChiffre(textNomPrenom)) {
    return textNomPrenom;
  } else {
    const lastNameElt = document.querySelector("#lastName")
    lastNameElt.style.color = "red";
    document.querySelector('#lastNameErrorMsg').innerText = 'Le nom ne peut pas contenir de chiffre.'
    return false;
  }
}
// Fonction qui vérifie si l'email correspond au attente. (Regex)
function validerEmail(email) {
  const regle =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regle.test(email);
}
// Donne l'instruction si l'email ne correspond pas à la regex.
function checkEmail(textEmail) {
  if (validerEmail(textEmail)) {
    return textEmail;
  } else {
    const emailElt = document.querySelector("#email");
    emailElt.style.color ="red";
    document.querySelector('#emailErrorMsg').innerText = "L'adresse email n'est pas valide."
    return false;
  }
}
// Permet de calculer le nombre d'élément dans un tableau.
function calculTotalNbElementsPanier(panier){
    let total = 0
    panier.forEach(product => {
      //console.log(product);
      total = total + parseInt(product.quantity);
    });
    return total;
} 
// Permet de calculer le prix total des articles de mon panier
function calculTotal(produits, refProduits) {
  // 1 - definir un total a 0
  let total = 0;
  // 2 faire une boucle sur les elements de mon panier
  produits.forEach((produit) => {
    // dans la boucle pour chaque element calculer le prix en fonction de la quantité
    const totalProduit = produit.quantity * refProduits.find(elt => elt._id === produit.productId).price;
    // ajouter au total
    total = total + totalProduit;
  });
  // en fin de boucle renvoyer le total
  return total;
}
// Fonction qui permet d'afficher le prix total du panier et la quantité.
function displayTotal(produits, refProduits) {
  const total = calculTotal(produits, refProduits);
  document.querySelector("#totalPrice").textContent = total;
  const totalElementsPanier = calculTotalNbElementsPanier(produits);
  document.querySelector("#totalQuantity").textContent = totalElementsPanier;
}

export {calculTotal, calculTotalNbElementsPanier, checkEmail, displayTotal, validerEmail, regexSansChiffre, checkNom, checkPrenom}
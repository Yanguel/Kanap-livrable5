// Récuperer le parametre présent dans l'URL.
let str = window.location;
let url = new URL(str);
let search_params = new URLSearchParams(url.search);
let orderLocalStorage = search_params.get('orderId');

// Récuperation de l'élément HTML et affichage du numéro de commande.
let numeroOrder = document.querySelector('#orderId');
numeroOrder.innerHTML = orderLocalStorage;

localStorage.removeItem('produitSelectionner');

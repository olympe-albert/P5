// récupère orderId et orderAmount dans le localStorage
let orderId = localStorage.getItem("orderId");
console.log(orderId);
let orderAmount = localStorage.getItem("orderAmount");
console.log(orderAmount);

// affiche les informations de la commande
let orderInfos = document.getElementById("order");
let orderConfirmation = document.createElement("p");
orderInfos.appendChild(orderConfirmation);
orderConfirmation.innerHTML = "Votre commande numéro " + orderId + " d'un montant de " + orderAmount + "€ est bien enregistrée." ;

// vider le panier
window.localStorage.clear();

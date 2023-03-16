// Avec searchParams, extraire l'orderId de la page panier.
const fullUrl = window.location.href;
const url = new URL(fullUrl);
const commandNumber = url.searchParams.get("orderId");

//Afficher l'orderId sur la page confirmation
const selectOrderId = document.querySelector("#orderId");
selectOrderId.innerText = commandNumber;    
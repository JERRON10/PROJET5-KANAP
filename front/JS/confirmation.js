// Avec searchParams, extraire l'id de la page d'acceuil
const fullUrl = window.location.href;
const url = new URL(fullUrl);
const commandNumber = url.searchParams.get("orderId");

const selectOrderId = document.querySelector("#orderId");
selectOrderId.innerText = commandNumber;    
// searchParams permet d'extraire id de la page d'acceuil
const fullUrl = window.location.href;
const url = new URL(fullUrl);
const productId = url.searchParams.get("id");

// utiliser id extrait pour récupérer la description d'un produit
const reponsePageProduct = await fetch (`http://localhost:3000/api/products/${productId}`)
const pageProduct = await reponsePageProduct.json();

const imageElement = document.createElement("img");
    imageElement.src = pageProduct.imageUrl;
    imageElement.alt = pageProduct.altTxt;

const itemImg = document.querySelector(".item__img");
    itemImg.appendChild(imageElement);

const titleElement = document.querySelector("#title");
    titleElement.innerText = pageProduct.name;

const priceElement = document.querySelector("#price");
    priceElement.innerText = pageProduct.price;

const descriptionElement = document.querySelector("#description");
    descriptionElement.innerText = pageProduct.description;

// récupérer les valeurs du tableau colors d'un produit avec for...of 
for ( let color of pageProduct.colors) {
    const colorElement = document.createElement("option");
    colorElement.value = color;
    colorElement.innerText = color;

    const idColor = document.querySelector("#colors")
    idColor.appendChild(colorElement);
}
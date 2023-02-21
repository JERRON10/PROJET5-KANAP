// Avec searchParams, extraire l'id de la page d'acceuil
const fullUrl = window.location.href;
const url = new URL(fullUrl);
const productId = url.searchParams.get("id");

// utiliser id extrait pour récupérer la description d'un produit
const reponsePageProduct = await fetch(`http://localhost:3000/api/products/${productId}`)
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
for (let color of pageProduct.colors) {
    const colorElement = document.createElement("option");
    colorElement.value = color;
    colorElement.innerText = color;
    const idColor = document.querySelector("#colors");
    idColor.appendChild(colorElement);
}

class ModelChoiceProduct {
    constructor(id, color, quantity) {
        this.id = id,
            this.color = color,
            this.quantity = quantity
    }
};

// J'ajoute un eventlistener "click" sur le bouton
document.querySelector("#addToCart")
    .addEventListener("click", function () {

        // Je capture les valeurs sélectionner
        let choiceColor = document.querySelector("#colors").value;
        let choiceQuantity = document.querySelector("#quantity").value;

        let choiceProduct = new ModelChoiceProduct(
            productId,
            choiceColor,
            parseInt(choiceQuantity)
        );
        
        let chargeLS = JSON.parse(localStorage.getItem("product"));

        if (chargeLS === null && choiceColor !== "" && choiceQuantity !== 0) {
            chargeLS = [];
            chargeLS.push(choiceProduct);
            localStorage.setItem("product", JSON.stringify(chargeLS));
            console.log("test=>1")
        } else {
            let searchProduct = chargeLS.findIndex((product => product.id === choiceProduct.id &&
                product.color === choiceProduct.color));
            if (searchProduct === -1 && choiceColor !== "" && choiceQuantity !== 0) {
                chargeLS.push(choiceProduct);
                localStorage.setItem("product", JSON.stringify(chargeLS))
                console.log("test=>2");
            } else {
                chargeLS[searchProduct].quantity += choiceProduct.quantity;
                console.log("test=>3")
            }
        }
        localStorage.setItem("product", JSON.stringify(chargeLS));
        console.log("test=>final!", chargeLS);
    })







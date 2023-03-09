// Avec searchParams, extraire l'id de la page d'acceuil.
const fullUrl = window.location.href;
const url = new URL(fullUrl);
const productId = url.searchParams.get("id");

// Utiliser l'id extrait pour récupérer la description d'un produit.
const dataProduct = await collectProduct();

createImgElement();

createTitleElement();

createPriceElement();

createDescriptionElement();

// Récupérer les valeurs du tableau couleurs d'un produit avec for...of.
for (let color of dataProduct.colors) {
    createColorElement(color);
}

// Création de la classe d'un produit.
class ModelChoiceProduct {
    constructor(id, color, quantity) {
        this.id = id,
            this.color = color,
            this.quantity = quantity
    }
};

// J'ajoute un eventlistener "click" sur le bouton "Ajouter au panier".
document.querySelector("#addToCart")
    .addEventListener("click", function () {

        // Je capture les valeurs sélectionnées.
        let choiceColor = document.querySelector("#colors").value;
        let choiceQuantity = document.querySelector("#quantity").value;

        let choiceProduct = new ModelChoiceProduct(
            productId,
            choiceColor,
            parseInt(choiceQuantity)
        );

        // Je récupére les données du LocalStorage.
        let chargeLS = JSON.parse(localStorage.getItem("product"));

        // Si le LocalStorage est vide
        //  et que la couleur est différente de ""
        //  et que la quantité est différente de 0 alors ajouter le produit au tableau.
        if (chargeLS === null && choiceColor !== "" && choiceQuantity !== 0) {
            chargeLS = [];
            chargeLS.push(choiceProduct);

            // Sauvegarder dans le LS.
            localStorage.setItem("product", JSON.stringify(chargeLS));

        } else {

            //FindIndex permet de trouver un produit... si le produit n'est pas trouver
            // la méthode renvoie -1.
            let searchProduct = chargeLS.findIndex((product => product.id === choiceProduct.id &&
                product.color === choiceProduct.color));

            // ajout d'un produit si le produit n'est pas trouvé et sauvegarder
            if (searchProduct === -1 && choiceColor !== "" && choiceQuantity !== 0) {
                chargeLS.push(choiceProduct);
                localStorage.setItem("product", JSON.stringify(chargeLS));

            // Si produit trouvé incrémenter la quantité du produit trouvé.
            } else {
                chargeLS[searchProduct].quantity += choiceProduct.quantity;
            }
        }
        localStorage.setItem("product", JSON.stringify(chargeLS));
    });

async function collectProduct() {
    const reponsedataProduct = await fetch(`http://localhost:3000/api/products/${productId}`);
    const dataProduct = await reponsedataProduct.json();
    return dataProduct;
}

function createImgElement() {
    const imageElement = document.createElement("img");
    imageElement.src = dataProduct.imageUrl;
    imageElement.alt = dataProduct.altTxt;
    const itemImg = document.querySelector(".item__img");
    itemImg.appendChild(imageElement);
}

function createTitleElement() {
    const titleElement = document.querySelector("#title");
    titleElement.innerText = dataProduct.name;
}

function createPriceElement() {
    const priceElement = document.querySelector("#price");
    priceElement.innerText = dataProduct.price;
}

function createDescriptionElement() {
    const descriptionElement = document.querySelector("#description");
    descriptionElement.innerText = dataProduct.description;
}

function createColorElement(color) {
    const colorElement = document.createElement("option");
    colorElement.value = color;
    colorElement.innerText = color;
    const idColor = document.querySelector("#colors");
    idColor.appendChild(colorElement);
}
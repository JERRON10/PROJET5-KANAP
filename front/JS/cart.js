// Récupèrer les données du LS 
let chargeLS = JSON.parse(localStorage.getItem("product"));
console.log("tableauLS=>", chargeLS);

let reponsePageProduct;
let pageProduct;
let sumQuantity = 0;
let PriceProduct = 0;
let sumPrice = 0;

// boucle pour créer les élements... 
for (let i = 0; i < chargeLS.length; i++) {
    reponsePageProduct = await fetch(`http://localhost:3000/api/products/${chargeLS[i].id}`);
    pageProduct = await reponsePageProduct.json();
    console.log(pageProduct)

    let articleElement = document.createElement(`article${[i]}`);
    articleElement.className = "cart__item";
    articleElement.dataset.id = `${chargeLS[i].id}`;
    articleElement.dataset.color = `${chargeLS[i].color}`;
    let sectionCartItem = document.querySelector("#cart__items");
    sectionCartItem.appendChild(articleElement);

    let divImg = document.createElement("div");
    divImg.className = "cart__item__img";
    let articleCartItem = document.querySelector(`article${[i]}`);
    articleCartItem.appendChild(divImg);

    let imgElement = document.createElement("img");
    imgElement.src = pageProduct.imageUrl;
    imgElement.alt = pageProduct.altTxt;
    divImg.appendChild(imgElement);

    let divContent = document.createElement("div");
    divContent.className = "cart__item_content";
    articleCartItem.appendChild(divContent);

    let divDescription = document.createElement("div");
    divDescription.className = "cart__item__content__description";
    divContent.appendChild(divDescription);

    let descriptionTitle = document.createElement("h2");
    descriptionTitle.innerText = pageProduct.name;
    divDescription.appendChild(descriptionTitle);

    let descriptionCouleur = document.createElement("p")
    descriptionCouleur.innerText = chargeLS[i].color;
    divDescription.appendChild(descriptionCouleur);

    let descriptionPrice = document.createElement("p");
    descriptionPrice.innerText = `${pageProduct.price}€`;
    divDescription.appendChild(descriptionPrice);

    let divsettings = document.createElement("div");
    divsettings.className = "cart__item__content__settings";
    divContent.appendChild(divsettings);

    let divSettingsQuantity = document.createElement("div");
    divSettingsQuantity.className = "cart__item__content__settings__quantity";
    divsettings.appendChild(divSettingsQuantity);

    let settingsQuantity = document.createElement("p");
    settingsQuantity.innerText = "Qté : ";
    divSettingsQuantity.appendChild(settingsQuantity);

    let quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.className = "itemQuantity";
    quantityInput.name = "itemQuantity";
    quantityInput.min = "1";
    quantityInput.max = "100";
    quantityInput.value = chargeLS[i].quantity;
    divSettingsQuantity.appendChild(quantityInput);

    let settingsDelete = document.createElement("div");
    settingsDelete.className = "cart__item__content__settings__delete";
    divsettings.appendChild(settingsDelete);

    let settingsDeleteItem = document.createElement("p");
    settingsDeleteItem.className = "deleteItem";
    settingsDeleteItem.innerText = "supprimer";
    divsettings.appendChild(settingsDeleteItem);

    // Calcule de la quantité
    sumQuantity += chargeLS[i].quantity;
    PriceProduct = sumQuantity * pageProduct.price;
    // calcule du prix
    sumPrice += PriceProduct
}

// creation des balises pour la quantité et le prix
let totalQuantity = document.createElement("p");
totalQuantity.innerText = `${sumQuantity}`;
let spanTotalQuantity = document.querySelector("#totalQuantity");
spanTotalQuantity.appendChild(totalQuantity)

let totalPrice = document.createElement("p");
totalPrice.innerText = `${sumPrice}`;
let spanTotalPrice = document.querySelector("#totalPrice");
spanTotalPrice.appendChild(totalPrice);

// récupérer la quantité, la couleur et l'id des inputs
let selectQuantity = document.querySelectorAll(".itemQuantity");
let collectQuantity = 0;
let collectId;
let collectColor;

// ajout d'un eventListener au changement de quantité et modifier le LS 
for (let i = 0; i < selectQuantity.length; i++) {
    selectQuantity[i].addEventListener("change", function () {
        collectQuantity = parseInt(selectQuantity[i].value);
        collectId = selectQuantity[i].closest(".cart__item").dataset.id;
        collectColor = selectQuantity[i].closest(".cart__item").dataset.color;
        console.log("test modif=>", collectId, collectColor, collectQuantity);

        let search = chargeLS.findIndex(product => product.id === collectId &&
            product.color === collectColor && product.quantity !== collectQuantity);
        if (search !== -1)
            chargeLS[search].quantity = collectQuantity;
        localStorage.setItem("product", JSON.stringify(chargeLS))
        console.log("test=> recherche", search);
    })
};

// ajout d'un eventListener à chaques bouttons supprimer et supprimer au click dans le lS
let selectDelete = document.querySelectorAll(".deleteItem");
for (let i = 0; i < selectDelete.length; i++) {
    selectDelete[i].addEventListener("click", function () {
        collectId = selectDelete[i].closest(".cart__item").dataset.id;
        collectColor = selectDelete[i].closest(".cart__item").dataset.color;
        console.log("produit à supprimer", collectId, collectColor);

        for (let i = chargeLS.length - 1; i >= 0; i--) {
            if (chargeLS[i].id === collectId && chargeLS[i].color === collectColor) {
                chargeLS.splice(i, 1);
                console.log("nouveau tableau", chargeLS);
                localStorage.setItem("product", JSON.stringify(chargeLS));
            }
        }
    })
}

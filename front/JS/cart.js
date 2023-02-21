let chargeLS = JSON.parse(localStorage.getItem("product"));

console.log(chargeLS);

let reponsePageProduct;
let pageProduct;
let sumQuantity = 0;

for (let choice of chargeLS) {
    reponsePageProduct = await fetch(`http://localhost:3000/api/products/${choice.id}`)
    pageProduct = await reponsePageProduct.json();

    let articleElement = document.createElement("article");
    articleElement.className = "cart__item";
    articleElement.dataset.id = choice.id;
    articleElement.dataset.color = choice.color;
    let sectionCartItem = document.querySelector("#cart__items");
    sectionCartItem.appendChild(articleElement);

    let divImg = document.createElement("div");
    divImg.className = "cart__item__img";
    let articleCartItem = document.querySelector("article");
    articleCartItem.appendChild(divImg);

    let imgElement = document.createElement("img");
    imgElement.src = pageProduct.imageUrl;
    imgElement.alt = pageProduct.altTxt;
    divImg.appendChild(imgElement);

    let divContent = document.createElement("div");
    divContent.className = "cart__item_content";
    articleCartItem.appendChild(divContent);

    let divDescription = document.createElement("div");
    divDescription.className ="cart__item__content__description";
    divContent.appendChild(divDescription);

    let descriptionTitle = document.createElement("h2");
    descriptionTitle.innerText = pageProduct.name;
    divDescription.appendChild(descriptionTitle);

    let descriptionCouleur = document.createElement("p")
    descriptionCouleur.innerText = choice.color;
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
    quantityInput.value = choice.quantity;
    divSettingsQuantity.appendChild(quantityInput);

    let settingsDelete = document.createElement("div");
    settingsDelete.className = "cart__item__content__settings__delete";
    divsettings.appendChild(settingsDelete);
    
    let settingsDeleteItem = document.createElement("p");
    settingsDeleteItem.className = "deleteItem";
    settingsDeleteItem.innerText = "supprimer";
    divsettings.appendChild(settingsDeleteItem);

    sumQuantity += choice.quantity;
}
console.log(sumQuantity)
let totalQuantity = document.createElement("p");
totalQuantity.innerText = `${sumQuantity}`;
let spanTotalQuantity = document.querySelector("#totalQuantity");
spanTotalQuantity.appendChild(totalQuantity)

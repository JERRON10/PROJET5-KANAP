const chargeLS = chargeLocalStorage();
const dataProduct = [];


// boucle parcourant dataProduct
for (let i = 0; i < dataProduct.length; i++) {
    createArticle(i);
    createDivImg(i);
    createImgElement(i);
    createDivContent();
    createDivDescription();
    createDescription(i);
    createDivSettings();
    createDivSettingsQuantity();
    createQuantity(i);
    createSettingsDelete();
    createSettingsDeleteItem();
}

// // creation d'un article ok

// createArticle(0);
// createDivImg();
// createImgElement(0);
// createDivContent();
// createDivDescription();
// createDescription(0);
// createDivSettings();
// createDivSettingsQuantity();
// createQuantity(0);
// createSettingsDelete();
// createSettingsDeleteItem();

function chargeLocalStorage() {
    return JSON.parse(localStorage.getItem("product"));
}

function createArticle(i) {
    let articleElement = document.createElement("article");
    articleElement.className = "cart__item";
    articleElement.dataset.id = `${dataProduct[i]._id}`;
    articleElement.dataset.color = `${chargeLS[i].color}`;
    let sectionSelector = document.querySelector("#cart__items");
    sectionSelector.appendChild(articleElement);
}

function createDivImg(i) {
    let divImg = document.createElement("div");
    divImg.className = "cart__item__img";
    let articleSelector = document.querySelector("article")
    articleSelector.appendChild(divImg);
}

function createImgElement(i) {
    let imgElement = document.createElement("img");
    imgElement.src = dataProduct[i].imageUrl;
    imgElement.alt = dataProduct[i].altTxt;
    let divImgSelector = document.querySelector(".cart__item__img")
    divImgSelector.appendChild(imgElement);
}

function createDivContent() {
    let divContent = document.createElement("div");
    divContent.className = "cart__item__content";
    let articleSelector = document.querySelector(".cart__item")
    articleSelector.appendChild(divContent);
}

function createDivDescription() {
    let divDescription = document.createElement("div");
    divDescription.className = "cart__item__content__description";
    let divContentSelector = document.querySelector(".cart__item__content")
    divContentSelector.appendChild(divDescription);
}

function createDescription(i) {
    let descriptionTitle = document.createElement("h2");
    descriptionTitle.innerText = dataProduct[i].name;
    let divDescriptionSelector = document.querySelector(".cart__item__content__description");
    divDescriptionSelector.appendChild(descriptionTitle);

    let descriptionColor = document.createElement("p");
    descriptionColor.innerText = chargeLS[i].color;
    divDescriptionSelector.appendChild(descriptionColor);

    let descriptionPrice = document.createElement("p");
    descriptionPrice.innerText = `${dataProduct[i].price} €`;
    divDescriptionSelector.appendChild(descriptionPrice);
}

function createDivSettings() {
    let divsettings = document.createElement("div");
    divsettings.className = "cart__item__content__settings";
    let divContentSelector = document.querySelector(".cart__item__content")
    divContentSelector.appendChild(divsettings);
}

function createDivSettingsQuantity() {
    let divSettingsQuantity = document.createElement("div");
    divSettingsQuantity.className = "cart__item__content__settings__quantity";
    let divSettingsSelector = document.querySelector(".cart__item__content__settings")
    divSettingsSelector.appendChild(divSettingsQuantity);
}

function createQuantity(i) {
    let settingsQuantity = document.createElement("p");
    settingsQuantity.innerText = "Qté : ";
    let quantitySelector = document.querySelector(".cart__item__content__settings__quantity")
    quantitySelector.appendChild(settingsQuantity);

    let quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.className = "itemQuantity";
    quantityInput.name = "itemQuantity";
    quantityInput.min = "1";
    quantityInput.max = "100";
    quantityInput.value = chargeLS[i].quantity;
    quantitySelector.appendChild(quantityInput);
}

function createSettingsDelete() {
    let settingsDelete = document.createElement("div");
    settingsDelete.className = "cart__item__content__settings__delete";
    let divSettingsSelector = document.querySelector(".cart__item__content__settings")
    divSettingsSelector.appendChild(settingsDelete);
}

function createSettingsDeleteItem() {
    let settingsDeleteItem = document.createElement("p");
    settingsDeleteItem.className = "deleteItem";
    settingsDeleteItem.innerText = "supprimer";
    let divSettingsSelector = document.querySelector(".cart__item__content__settings__delete")
    divSettingsSelector.appendChild(settingsDeleteItem);
}
let chargeLS;
let pageProduct;
let total_quantity = 0;
let priceByProducts = 0;
let total_price = 0;
let priceTotalByProduct = 0;

// Récupére le localStorage
async function chargeLocalstorage() {
    return JSON.parse(localStorage.getItem("product"));
}

// Sauvegarde dans le localStorage
async function saveLocalstorage() {
    localStorage.setItem("product", JSON.stringify(chargeLS));
}

// Supprime une balise choisi 
async function deleteWithHtml(tag) {
    document.querySelector(tag).innerHTML = "";
}

function createProductHtmlInCartAndMangeEvents(product_to_create)
{
    // 1 - Créer l'html
    let articleElement = document.createElement(`article`);
    articleElement.className = "cart__item article" + product_to_create._id;
    articleElement.dataset.id = `${product_to_create._id}`;
    articleElement.dataset.color = `${product_to_create.color}`;
    let sectionCartItem = document.querySelector("#cart__items");
    sectionCartItem.appendChild(articleElement);

    let divImg = document.createElement("div");
    divImg.className = "cart__item__img";
    articleElement.appendChild(divImg);

    let imgElement = document.createElement("img");
    imgElement.src = product_to_create.imageUrl;
    imgElement.alt = product_to_create.altTxt;
    divImg.appendChild(imgElement);

    let divContent = document.createElement("div");
    divContent.className = "cart__item_content";
    articleCartItem.appendChild(divContent);

    let divDescription = document.createElement("div");
    divDescription.className = "cart__item__content__description";
    divContent.appendChild(divDescription);

    let descriptionTitle = document.createElement("h2");
    descriptionTitle.innerText = product_to_create.name;
    divDescription.appendChild(descriptionTitle);

    let descriptionCouleur = document.createElement("p");
    descriptionCouleur.innerText = product_to_create.color;
    divDescription.appendChild(descriptionCouleur);

    let descriptionPrice = document.createElement("p");
    descriptionPrice.innerText = `${product_to_create.price}€`;
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


    // 2 - Gérer les events
    // Maintenant que j'ai créé mon element, j'aimerais ecouter les evenements change et delete
    manageProductQuantityChanged(quantityInput);
    manageProductDeleted(settingsDeleteItem);
}

function createCartTotalPrice(total_price)
{
    let totalPrice = document.createElement("p");
    totalPrice.innerText = total_price;
    let spanTotalPrice = document.querySelector("#totalPrice");
    spanTotalPrice.appendChild(totalPrice);
}

function createCartTotalQuantity(total_quantity)
{
    // creation des balises pour la quantité et le prix
    let totalQuantity = document.createElement("p");
    totalQuantity.innerText = total_quantity;
    let spanTotalQuantity = document.querySelector("#totalQuantity");
    spanTotalQuantity.appendChild(totalQuantity);
}

function manageProductQuantityChanged(quantityInput)
{
    quantityInput.addEventListener("change", function () {
        collectQuantity = parseInt(quantityInput.value);
        collectId = quantityInput.closest(".cart__item").dataset.id;
        collectColor = quantityInput.closest(".cart__item").dataset.color;

        let search = chargeLS.findIndex(product => product.id === collectId &&
            product.color === collectColor && product.quantity !== collectQuantity);
        if (search !== -1)
            chargeLS[search].quantity = collectQuantity;
        saveLocalstorage();
        deleteWithHtml("#cart__items");
        deleteWithHtml("#totalQuantity");
        deleteWithHtml("#totalPrice");
        regener();
    });
}

// Ajout d'un eventListener à chaques bouttons delete et SUPPRIMER au click dans le lS
function manageProductDeleted(settingsDeleteItem)
{
    settingsDeleteItem.addEventListener("click", function () {
        collectId = settingsDeleteItem.closest(".cart__item").dataset.id;
        collectColor = settingsDeleteItem.closest(".cart__item").dataset.color;

        for (let i = chargeLS.length - 1; i >= 0; i--) {
            if (chargeLS[i].id === collectId && chargeLS[i].color === collectColor) {
                chargeLS.splice(i, 1);
                saveLocalstorage();
                deleteWithHtml("#cart__items");
                deleteWithHtml("#totalQuantity");
                deleteWithHtml("#totalPrice");
                regener();
            }
        }
    });
}
// Régénère l'ensemble de la page
async function init() {

    // 1 - Récupèrer les données du LocalStorage
    chargeLS = chargeLocalstorage();

    // 2 - On créer les élements et on calcul le total
    for (let i = 0; i < chargeLS.length; i++) {
        let productToCreate = await fetch(`http://localhost:3000/api/products/${chargeLS[i].id}`);

        createProductHtmlInCartAndManageEvents(productToCreate);

        total_price += chargeLS[i].quantity * productToCreate.price;
        total_quantity += chargeLS[i].quantity;
    }

    // 3 - Maintenant qu'on a les totaux on les affiche
    createCartTotalPrice(total_price);
    createCartTotalQuantity(total_quantity);
}

await init();

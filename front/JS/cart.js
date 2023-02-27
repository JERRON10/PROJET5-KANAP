let chargeLS;
let pageProduct;
let sumQuantity = 0;
let priceByProducts = 0;
let total = 0;
let priceTotalByProduct = 0;

// Récupére le localStorage
async function chargeLocalstorage() {
    chargeLS = JSON.parse(localStorage.getItem("product"));
}

// Sauvegarde dans le localStorage
async function saveLocalstorage() {
    localStorage.setItem("product", JSON.stringify(chargeLS));
}

/**
 * Supprime une balise choisi
 * @param {string} tag
 */
async function deleteWithHtml(tag) {
    document.querySelector(tag).innerHTML = "";
}

// Régénère l'ensemble de la page
async function regener() {

    // Récupèrer les données du LocalStorage 
    chargeLocalstorage();

    // boucle pour créer les élements... 
    for (let i = 0; i < chargeLS.length; i++) {
        let reponsePageProduct = await fetch(`http://localhost:3000/api/products/${chargeLS[i].id}`);
        pageProduct = await reponsePageProduct.json();

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

        let descriptionCouleur = document.createElement("p");
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

        total += chargeLS[i].quantity * pageProduct.price;

        console.log("prix par produit=>",pageProduct.price)
    }

    // récupérer la quantité, la couleur et l'id des inputs
    let collectQuantity, collectId, collectColor;

    // ajout d'un eventListener au CHANGEMENT de quantité et MAJ LS 
    let tagQuantity = document.querySelectorAll(".itemQuantity");
    for (let i = 0; i < tagQuantity.length; i++) {
        tagQuantity[i].addEventListener("change", function () {
            collectQuantity = parseInt(tagQuantity[i].value);
            collectId = tagQuantity[i].closest(".cart__item").dataset.id;
            collectColor = tagQuantity[i].closest(".cart__item").dataset.color;

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
    };

    // ajout d'un eventListener à chaques bouttons delete et SUPPRIMER au click dans le lS
    let tagDelete = document.querySelectorAll(".deleteItem");
    for (let i = 0; i < tagDelete.length; i++) {
        tagDelete[i].addEventListener("click", function () {
            collectId = tagDelete[i].closest(".cart__item").dataset.id;
            collectColor = tagDelete[i].closest(".cart__item").dataset.color;

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

    console.log("prix total par produit=>",total)


    for (let i = 0; i < chargeLS.length; i++) {
        let qte = chargeLS[i].quantity;
        sumQuantity += qte
    }

    // creation des balises pour la quantité et le prix
    let totalQuantity = document.createElement("p");
    totalQuantity.innerText = sumQuantity;
    let spanTotalQuantity = document.querySelector("#totalQuantity");
    spanTotalQuantity.appendChild(totalQuantity);

    let totalPrice = document.createElement("p");
    totalPrice.innerText = total;
    let spanTotalPrice = document.querySelector("#totalPrice");
    spanTotalPrice.appendChild(totalPrice);
}

await regener();

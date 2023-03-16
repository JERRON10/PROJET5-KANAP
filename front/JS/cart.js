// ********************************** LE PANIER ***********************************

//Les variables.
let dataproduct;
let total_quantity = 0;
let total_price = 0;
let chargeLS = await chargeLocalstorage();

await init();

// Régénère l'ensemble de la page.
async function init() {

    // 1 - Récupèrer les données du LocalStorage et réinitialiser la quantité / le prix.
    chargeLS;
    total_quantity = 0;
    total_price = 0;

    // 2 - Je crée les élements à partir du produit récupéré et je calcul le total prix et le total quantité.
    for (let i = 0; i < chargeLS.length; i++) {

        // Je Récupére les données d'un produit avec la methode fetch.
        let reponsePageProduct = await collectProduct(chargeLS[i].id);
        dataproduct = await reponsePageProduct.json();

        // Je crée les élements et ajoutes les eventlisteneurs
        createProductHtmlInCartAndMangeEvents(i, dataproduct)

        total_price += chargeLS[i].quantity * dataproduct.price;
        total_quantity += chargeLS[i].quantity;
    }

    // 3 - Maintenant qu'on a les totaux on les affiche.
    createCartTotalPrice(total_price);
    createCartTotalQuantity(total_quantity);
}

// Récupérer le localStorage.
function chargeLocalstorage() {
    return JSON.parse(localStorage.getItem("product"));
}

// Récupérer les données d'un produit avec la methode fetch.
async function collectProduct(path) {
    return await fetch(`http://localhost:3000/api/products/${path}`);
}

// Sauvegarde dans le LS.
async function saveLocalstorage(clé, valeur) {
    localStorage.setItem(clé, JSON.stringify(valeur));
}

function createCartTotalPrice(total_price) {
    let totalPrice = document.createElement("p");
    totalPrice.innerText = total_price;
    let spanTotalPrice = document.querySelector("#totalPrice");
    spanTotalPrice.appendChild(totalPrice);
}

function createCartTotalQuantity(total_quantity) {
    // Création des balises pour la quantité et le prix.
    let totalQuantity = document.createElement("p");
    totalQuantity.innerText = total_quantity;
    let spanTotalQuantity = document.querySelector("#totalQuantity");
    spanTotalQuantity.appendChild(totalQuantity);
}

function createProductHtmlInCartAndMangeEvents(index, product_to_create) {
    // 1 - Créer l'html.
    let articleElement = document.createElement("article");
    articleElement.className = "cart__item";
    articleElement.dataset.id = chargeLS[index].id;
    articleElement.dataset.color = chargeLS[index].color;
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
    divContent.className = "cart__item__content";
    articleElement.appendChild(divContent);

    let divDescription = document.createElement("div");
    divDescription.className = "cart__item__content__description";
    divContent.appendChild(divDescription);

    let descriptionTitle = document.createElement("h2");
    descriptionTitle.innerText = product_to_create.name;
    divDescription.appendChild(descriptionTitle);

    let descriptionCouleur = document.createElement("p");
    descriptionCouleur.innerText = chargeLS[index].color;
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
    quantityInput.value = chargeLS[index].quantity;
    divSettingsQuantity.appendChild(quantityInput);

    let settingsDelete = document.createElement("div");
    settingsDelete.className = "cart__item__content__settings__delete";
    divsettings.appendChild(settingsDelete);

    let settingsDeleteItem = document.createElement("p");
    settingsDeleteItem.className = "deleteItem";
    settingsDeleteItem.innerText = "supprimer";
    settingsDelete.appendChild(settingsDeleteItem);

    // 2 - Gérer les events.
    manageProductQuantityChanged(quantityInput);
    manageProductDeleted(settingsDeleteItem);
}

// Ajout d'un eventListener à chaques inputs quantités.
function manageProductQuantityChanged(quantityInput) {
    quantityInput.addEventListener("change", function () {

        let collectQuantity = parseInt(quantityInput.value);
        let collectId = quantityInput.closest(".cart__item").dataset.id;
        let collectColor = quantityInput.closest(".cart__item").dataset.color;

        let search = chargeLS.findIndex(product => product.id === collectId &&
            product.color === collectColor && product.quantity !== collectQuantity);

        if (search !== -1) {
            chargeLS[search].quantity = collectQuantity;
            saveLocalstorage("product", chargeLS);
            deleteWithHtml("#cart__items");
            deleteWithHtml("#totalQuantity");
            deleteWithHtml("#totalPrice");
            init();
        }
    });
}

// Ajout d'un eventListener à chaques bouttons delete et SUPPRIMER au click dans le LS.
function manageProductDeleted(settingsDeleteItem) {
    settingsDeleteItem.addEventListener("click", function () {

        let collectId = settingsDeleteItem.closest(".cart__item").dataset.id;
        let collectColor = settingsDeleteItem.closest(".cart__item").dataset.color;

        for (let i = chargeLS.length - 1; i >= 0; i--) {
            if (chargeLS[i].id === collectId && chargeLS[i].color === collectColor) {
                chargeLS.splice(i, 1);
                saveLocalstorage("product", chargeLS);
                deleteWithHtml("#cart__items");
                deleteWithHtml("#totalQuantity");
                deleteWithHtml("#totalPrice");
                init();
            }
        }
    });
}

// Supprime une balise.
function deleteWithHtml(tag) {
    document.querySelector(tag).innerHTML = "";
}

// ********************************* FORMULAIRE ************************************

// RegExp firstName.
let firstName = document.querySelector("#firstName");
firstName.addEventListener("change", function () {
    validFirstName(this);
})

// RegExp lastName.
let lastName = document.querySelector("#lastName");
lastName.addEventListener("change", function () {
    validLastName(this);
})

// RegExp address.
let address = document.querySelector("#address");
address.addEventListener("change", function () {
    validAddress(this);
})

// RegExp city.
let city = document.querySelector("#city");
city.addEventListener("change", function () {
    validCity(this);
})

// RegExp email.
let email = document.querySelector("#email");
email.addEventListener("change", function () {
    validEmail(this);
})

// Validation du formulaire.
let submitForm = document.querySelector("#order");
submitForm.addEventListener("click", function (e) {
    e.preventDefault();

    // Mon objet contact pour la charge utile.
    let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    };

    // Mon tableau product_id pour la charge utile.
    let products = [];
    for (let i = 0; i < chargeLS.length; i++) {
        products.push(chargeLS[i].id);
    }

    // Mon objet (charge utile) à envoyer à l'API (contact, products).
    let chargeUtile = {
        contact,
        products
    }

    // Vérifier tous les regexp pour valider. Si valide => requête POST
    // => et au final je récupére le numéro de commande (orderId).
    if ((validFirstName(firstName) && validLastName(lastName)
        && validAddress(address) && validCity(city) && validEmail(email)) == true) {

        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(chargeUtile)
        })
            .then(response => response.json())
            .then(data => window.location = `./confirmation.html?orderId=${data.orderId}`);

        // Avant la redirection sur la page confirmation, je vide le localStorage.
        localStorage.removeItem("product");

    } else {
        alert("Formulaire non valide");
    }
});

// les testes de validation.
let validFirstName = function (inputselect) {
    let FirstNameRegExp = new RegExp(
        "^[A-Za-zéèêëôï\-]{2,25}$", "g"
    );
    let testFirstName = FirstNameRegExp.test(inputselect.value);
    let firstNameErrorMessage = document.querySelector("#firstNameErrorMsg");
    if (testFirstName == false) {
        firstNameErrorMessage = document.querySelector("#firstNameErrorMsg");
        firstNameErrorMessage.innerText = "Veuillez entrer un prénom valide";
        return false;
    } else {
        firstNameErrorMessage.innerHTML = "";
        return true;
    }
}

let validLastName = function (inputselect) {
    let lastNameRegExp = new RegExp(
        "^[A-Za-zéèêëôï\-]{2,25}$", "g"
    );
    let testName = lastNameRegExp.test(inputselect.value);
    let lastNameErrorMessage = document.querySelector("#lastNameErrorMsg");
    if (testName == false) {
        lastNameErrorMessage = document.querySelector("#lastNameErrorMsg");
        lastNameErrorMessage.innerText = "Veuillez entrer un nom valide";
        return false;
    } else {
        lastNameErrorMessage.innerHTML = "";
        return true;
    }
}

let validAddress = function (inputselect) {
    let addressRegExp = new RegExp(
        "^([0-9a-zA-Z\-\w]{0,9}) ([a-zA-Z\ \-éèêï\w]*)$", "g"
    );
    let testAddress = addressRegExp.test(inputselect.value);
    let addressErrorMessage = document.querySelector("#addressErrorMsg");
    if (testAddress == false) {
        addressErrorMessage = document.querySelector("#addressErrorMsg");
        addressErrorMessage.innerText = "Veuillez entrer une adresse valide";
        return false;
    } else {
        addressErrorMessage.innerHTML = "";
        return true;
    }
}

let validCity = function (inputselect) {
    let cityRegExp = new RegExp(
        "^([A-Za-z\é\è\ê\-ôï\ ]){2,25}$", "g");
    let testCity = cityRegExp.test(inputselect.value);
    let cityErrorMessage = document.querySelector("#cityErrorMsg");
    if (testCity == false) {
        cityErrorMessage = document.querySelector("#cityErrorMsg");
        cityErrorMessage.innerText = "Veuillez entrer une ville valide";
        return false;
    } else {
        cityErrorMessage.innerHTML = "";
        return true;
    }
}

let validEmail = function (inputselect) {
    let emailRegExp = new RegExp(
        "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,4}$", "g");
    let testEmail = emailRegExp.test(inputselect.value);
    let emailErrorMessage = document.querySelector("#emailErrorMsg");
    if (testEmail == false) {
        emailErrorMessage = document.querySelector("#emailErrorMsg");
        emailErrorMessage.innerText = "Veuillez entrer un mail valide";
        return false;
    } else {
        emailErrorMessage.innerHTML = "";
        return true;
    }
}

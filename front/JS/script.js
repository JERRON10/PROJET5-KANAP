// 1 - Je récupère touts les produits dans API HTTP
const produits = await collectAllProducts();

// 2 - Utilisation d'un boucle sur tous les produits récupérés pour créer les élements et les liens.
for (let i = 0; i < produits.length; i++) {

    const imageElement = createImgElement(i);
    const nomElement = createH3Element(i);
    const descriptionElement = createPElement(i);
    const articleElement = createArticleElement(imageElement, nomElement, descriptionElement);
    // Avoir l'id du produit 
    const productId = produits[i]._id;
    const product = createAnchorElement(productId, articleElement);
    const sectionItems = document.querySelector("#items");
    sectionItems.appendChild(product);
}

async function collectAllProducts() {
    const reponse = await fetch("http://localhost:3000/api/products");
    const produits = await reponse.json();
    return produits;
}

function createImgElement(index) {
    const imageElement = document.createElement("img");
    imageElement.src = produits[index].imageUrl;
    imageElement.alt = produits[index].altTxt;
    return imageElement;
}

function createH3Element(index) {
    const nomElement = document.createElement("h3");
    nomElement.innerText = produits[index].name;
    nomElement.className = "productName";
    return nomElement;
}

function createPElement(index) {
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = produits[index].description;
    descriptionElement.className = "productDescription";
    return descriptionElement;
}

function createArticleElement(imageElement, nomElement, descriptionElement) {
    const articleElement = document.createElement("article");
    articleElement.appendChild(imageElement);
    articleElement.appendChild(nomElement);
    articleElement.appendChild(descriptionElement);
    return articleElement;
}

function createAnchorElement(productId, articleElement) {
    const product = document.createElement("a");
    // permet de distribuer l'id produit à chaques liens.
    product.href = `./product.html?id=${productId}`;
    product.appendChild(articleElement);
    return product;
}
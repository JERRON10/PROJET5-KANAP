
// const produits = fetch ("http://localhost:3000/api/products")
//     .then (produits => produits.json())
//     .then (reponse => reponse);

const reponse = await fetch ("http://localhost:3000/api/products")
const produits = await reponse.json();

const imageElement = document.createElement("img");
imageElement.src = produits[0].imageUrl;
imageElement.alt = produits[0].altTxt;
const nomElement = document.createElement("h3");
nomElement.innerText = produits[0].name;
nomElement.className = "productName";
const descriptionElement = document.createElement("p");
descriptionElement.innerText = produits[0].description;
descriptionElement.className = "productDescription";

const articleElement = document.createElement("article");
articleElement.appendChild(imageElement)
articleElement.appendChild(nomElement);
articleElement.appendChild(descriptionElement);

const product = document.createElement("a");
product.href = "./product.html?id=42";
product.appendChild(articleElement);

const sectionItems = document.querySelector("#items");
sectionItems.appendChild(product);





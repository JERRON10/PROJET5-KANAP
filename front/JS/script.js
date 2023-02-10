// Je récupère les produits et leurs caractéristiques dans API HTTP
const reponse = await fetch ("http://localhost:3000/api/products")
const produits = await reponse.json();

for (let i = 0; i<produits.length ; i++){

    const imageElement = document.createElement("img");
        imageElement.src = produits[i].imageUrl;
        imageElement.alt = produits[i].altTxt;
    
    const nomElement = document.createElement("h3");
        nomElement.innerText = produits[i].name;
        nomElement.className = "productName";
    
    const descriptionElement = document.createElement("p");
        descriptionElement.innerText = produits[i].description;
        descriptionElement.className = "productDescription";
    
    const articleElement = document.createElement("article");
        articleElement.appendChild(imageElement);
        articleElement.appendChild(nomElement);
        articleElement.appendChild(descriptionElement);
    
// Avoir l'id du produit 
    const productId = produits[i]._id;

    const product = document.createElement("a");
        // permet de distribuer l'id produit à chaque lien 
        product.href = `./product.html?id=${productId}`;
        product.appendChild(articleElement);
    
    const sectionItems = document.querySelector("#items");
        sectionItems.appendChild(product);
  
}






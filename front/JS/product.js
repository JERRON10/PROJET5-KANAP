// Avec searchParams, extraire l'id de la page d'acceuil
const fullUrl = window.location.href;
const url = new URL(fullUrl);
const productId = url.searchParams.get("id");

// utiliser id extrait pour récupérer la description d'un produit
const reponsePageProduct = await fetch(`http://localhost:3000/api/products/${productId}`)
const pageProduct = await reponsePageProduct.json();

const imageElement = document.createElement("img");
imageElement.src = pageProduct.imageUrl;
imageElement.alt = pageProduct.altTxt;

const itemImg = document.querySelector(".item__img");
itemImg.appendChild(imageElement);

const titleElement = document.querySelector("#title");
titleElement.innerText = pageProduct.name;

const priceElement = document.querySelector("#price");
priceElement.innerText = pageProduct.price;

const descriptionElement = document.querySelector("#description");
descriptionElement.innerText = pageProduct.description;

// récupérer les valeurs du tableau colors d'un produit avec for...of 
for (let color of pageProduct.colors) {
    const colorElement = document.createElement("option");
    colorElement.value = color;
    colorElement.innerText = color;
    const idColor = document.querySelector("#colors");
    idColor.appendChild(colorElement);
}

class ModelChoiceProduct {
    constructor(id, color, quantity) {
        this.id = id,
            this.color = color,
            this.quantity = quantity
    }
}

let array = [];

// J'ajoute un écouteur d'événement "click" sur le bouton
document.querySelector("#addToCart")
    .addEventListener("click", function () {

        // Je capture les valeurs sélectionner
        let choiceColor = document.querySelector("#colors").value;
        let choiceQuantity = document.querySelector("#quantity").value;

        // je recupère ma classe
        // let choiceProduct = new ModelChoiceProduct(productId,choiceColor,parseInt(choiceQuantity));
        // je recupère mon tableau
        let choiceProduct = [productId, choiceColor, parseInt(choiceQuantity)]

        // si tableau vide ... push un élément sinon ajouté +1 à la quantité
        if (array.length === 0) {
            array.push(choiceProduct);
            console.log("test=>1");
        } else {
            array.forEach(function (choice, index) {
                if (choice[0] == choiceProduct[0] && choice[1] == choiceProduct[1]) {
                    choice[2] += choiceProduct[2];
                    console.log("test=>2", array, choice);
                } else if (choice[0] == choiceProduct[0] && choice[1] != choiceProduct[1]) {
                    array.push(choiceProduct);
                    console.log("test=>3", array);
                }
            })
        }

        //     for (let choice of array){
        //         if(choice.id === choiceProduct.id && choice.color !== choiceProduct.color){
        //             array.push(choiceProduct);
        //             console.log("test=>2");
        //             break
        //         }else if(choice.id === choiceProduct.id && choice.color === choiceProduct.color){
        //             choice.quantity += choiceProduct.quantity,
        //             console.log("test=>3",choice.quantity);
        //         }
        //     }
        // }

        // let chargeLS = JSON.parse(localStorage.getItem("product"));

        // if (chargeLS === null) {
        //     chargeLS =[];
        //     chargeLS.push(choiceProduct)
        //     localStorage.setItem("product", JSON.stringify(chargeLS))
        //     console.log("test ==> 1", chargeLS)
        // }else{
        //     console.log("test=>2", chargeLS)
        // }
    })







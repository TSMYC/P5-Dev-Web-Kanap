//Réccupérer l'id du produit séléctionné
let Params = new URLSearchParams(document.location.search);
let productId = Params.get("id");
console.log(productId);

//faire un fetch pour réccupérer les informations du produit séléctionné
fetch(`http://localhost:3000/api/products/${productId}`)
    .then(function(res) {
        if(res.ok) {
            return res.json();
        }
    })
    .then(function(value) {

        console.log(value);
        insertName(value);
        insertPrice(value);
        insertDescription(value);
        insertColor(value);
        insertImage(value)
    })
    .catch(function(err){
        console.log(err);
    })

//Insertion de l'image du produit séléctionné
function insertImage(value){
    let elt = document.querySelector('article .item__img');
    elt.innerHTML = `<img src="${value.imageUrl}" alt="${value.altTxt}"/>`;
}

//Insertion du nom du produit 
function insertName(value){  
    let title = document.querySelector('title');
    let elt = document.getElementById('title');
    elt.innerHTML = `${value.name}`; 
    title.innerHTML = `${value.name}`; 
}

//Insertion du prix du produit
function insertPrice(value){
    let elt = document.getElementById('price');
    elt .innerHTML = `${value.price}`;
}

//Insertion de la description du produit
function insertDescription(value){
    let elt = document.getElementById('description');
    elt .innerHTML = `${value.description}`;
}

//Insertion des couleur du produit   
function insertColor(value){
    let elt = document.getElementById('colors');
    let color = value.colors;
    console.log(color);//Afficher les couleurs

    for (variable of color) {
        elt.innerHTML += `<option value = ${variable}> ${variable} </option>`;
    }
}

//fonction pour insérer un addEventListner
function insertEvent(elt){
    elt.addEventListener('change', function(event){
        let change = event.target.value;
        console.log(change); //Afficher la valeur modifiée
    })
    }

//Réccupérer l'input de changement de couleur et insertion d'un addEventListner
let elt1 = document.getElementById('colors');
insertEvent(elt1);

//Réccupérer l'input de changement de quantité et insertion d'un addEventListner
let elt2 = document.getElementById('quantity');
insertEvent(elt2);

//Réccupérer le panier
function getPanier() {
    let panier = localStorage.getItem("panier");
    if(panier == null){
        return [];
    }else{
        return JSON.parse(panier);
    }
}

//Enregistrer le panier
function savePanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
}

//Ajouter les produits au panier
function addPanier(product){
    let panier = getPanier();
    console.log("panier", panier);//Afficher le panier
    console.log("product", product);//Afficher les produits
    let resultat = panier.find(element=> element.id === product.id && element.color === product.color);
    if(resultat){
        resultat.quantity += parseInt(elt2.value);
    }else{
        panier.push(product);
        console.log("panier", panier);//Afficher le panier
    }
    savePanier(panier);
}

//Récupérer le boutton "ajouter au panier" et insérer un addEventListner
let elt3 = document.getElementById('addToCart');
elt3.addEventListener('click', function(){ 
    console.log("ok", elt1.value);//Afficher la couleur du produit
    console.log("ok", elt2.value);//Afficher la quantité du produit
    if(elt1.value == ''){
        alert("Veuillez choisir une couleur SVP");
    }else if (elt2.value < 1 || elt2.value > 100) {
        alert("Veuillez entrer une quantité entre 1 et 100 SVP");
    } else {
        alert("Article ajouté au panier");
        let product = {
            id : productId, 
            color : elt1.value,
            quantity : parseInt(elt2.value)
        }
        console.log(product);
        addPanier(product);
    }
})


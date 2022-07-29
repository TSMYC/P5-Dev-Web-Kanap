let Params = new URLSearchParams(document.location.search);
let productId = Params.get("id");
console.log(productId);

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
    })
    .catch(function(err){
        console.log(err);
    })


let elt = document.querySelector('article .item__img');
elt.innerHTML = `<img src="../images/logo.png" alt="Photographie d'un canapé"/>`;

function insertName(value){  
    let elt = document.getElementById('title');
    elt.innerHTML = `${value.name}`; 
}

function insertPrice(value){
    let elt = document.getElementById('price');
    elt .innerHTML = `${value.price}`;
}

function insertDescription(value){
    let elt = document.getElementById('description');
    elt .innerHTML = `${value.description}`;
}

    
function insertColor(value){
    let elt = document.getElementById('colors');
    console.log("element:",elt);
    let color = value.colors;
    console.log(color);

    for (variable of color) {
        console.log(variable)
        elt.innerHTML += `<option value = ${variable}> ${variable} </option>`;
    }
}

function insertEvent(elt){
    elt.addEventListener('change', function(event){
        let change = event.target.value;
        console.log(change);
    })
    }
    
let elt1 = document.getElementById('colors');
insertEvent(elt1);
let elt2 = document.getElementById('quantity');
insertEvent(elt2);



function getPanier() {
    let panier = localStorage.getItem("panier");
    if(panier == null){
        return [];
    }else{
        return JSON.parse(panier);
    }
}

function savePanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
}

function addPanier(product){
    let panier = getPanier();
    for (product of panier){
    if(product != id){
        product.quantity++;
    }else{
        product = 1;
        panier.push(product);
    }
    savePanier(panier);
}}

let elt3 = document.getElementById('addToCart');
elt3.addEventListener('click', function(){ 
    console.log("ok");
    if(elt1 == ''){
        alert = "Veuillez choisir une couleur SVP";
    }else if (elt2 < 0 || elt2 > 100) {
        alert = "Veuillez entrer une quantité entre 1 et 100 SVP";
    } else {
        alert = "Article ajouté au panier";
        addPanier(product);
    }
});


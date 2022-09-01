//Réccuperer le localstorage
function getPanier(){
     return JSON.parse(localStorage.getItem("panier"));
}
let panier = getPanier();

console.log(panier);//Afficher le panier

let total = 0; 
//Parcourir le panier 
for(let product of panier){
  console.log("product", product);//Afficher les produits du panier
  //Faire un fetch pour chaque produit du panier 
  fetch(`http://localhost:3000/api/products/${product.id}`)
  .then(function(res) {
      if(res.ok) {
        return res.json();
      }
  })

  .then(function(value) {
    console.log("produit", value);
    console.log(product.quantity, product.color);
    insertProduct(value, product.id, product.quantity, product.color);
    insertPrice(product.quantity, value);
    addDelete();
    changeQuantity();
    reccupererID();
  })
  .catch(function(err){
    console.log(err);
  })
}

//Inserer les caractéristique du produit
function insertProduct(value, monProduct, maQuantite, maCouleur){  
  let elt = document.getElementById('cart__items');
  elt.innerHTML += `<article class="cart__item" data-id="${monProduct}" data-color="${maCouleur}">
    <div class="cart__item__img">
      <img src="${value.imageUrl}" alt="${value.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${value.name}</h2>
        <p>${maCouleur}</p>
        <p>${value.price},00 €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${maQuantite}">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    </article>`
}

//Calculer la quantité totale des produits
function insertTotalProduct(){ 
  let total = 0;
  for (let product of panier){  
    total +=  product.quantity;
    console.log("total", total);//Afficher la quantité totale de chaque produit
  }
  return total;
}  

//Insérer la quantité totale des produits
let item = insertTotalProduct();
let totalItem = document.getElementById('totalQuantity');
totalItem.innerHTML = parseInt(item);

//Calcul et insertion du prix total des produits
function insertPrice(maQuantite, value){  
  total += maQuantite * value.price;
  console.log("total", total); //Afficher le prix total pour chaque produit
  let prix = document.getElementById('totalPrice');
  prix.innerHTML = total; 
}

//Enregistrer le panier dans le localstorage
function savePanier(panier) {
  localStorage.setItem("panier", JSON.stringify(panier));
}

//suppression du produit lors d'un clic sur le boutton supprimer
function addDelete(){  
let suppr = document.querySelectorAll('.deleteItem');
//Insérer un addEventListner sur chaque boutton supprimer pour chaque produit
suppr.forEach(element => {
  element.addEventListener('click', function() {
    let elt2 = element.closest('article'); 
    let dataId = elt2.getAttribute('data-id');
    let dataColor = elt2.getAttribute('data-color');
    let eltsuppr = panier.find(product => dataId === product.id  && dataColor === product.color);
    console.log("panierdelete", eltsuppr); //retourner l'élément cliqué
    let position = panier.indexOf(eltsuppr);
    console.log("position", position);//Retourner la position de l'élément cliqué
    panier.splice(position, 1);
    elt2.remove();
    savePanier(panier);
    location.reload();
  })
})

}

//Changer la quantité des produits
function changeQuantity(){  
let elt3 = document.querySelectorAll('input.itemQuantity');
//Insérer un addEventListner sur chaque boutton quantité pour chaque produit
elt3.forEach(element => {
  element.addEventListener('change', function(event){
    let change = event.target.value;
    let elt4 = element.closest('article');
    let dataId = elt4.getAttribute('data-id');
    let dataColor = elt4.getAttribute('data-color');
    let foundProduct = panier.find(product => dataId === product.id  && dataColor === product.color);
    if(foundProduct != undefined){ 
      foundProduct.quantity = parseInt(change);
      if (foundProduct.quantity <= 0){
        elt4.remove();
        console.log("change", change);//Afficher la quantité modifiée
      }
    }
      savePanier(panier);
      location.reload();
    })   
  })
}

//Déclaration des regex
let regex1 = new RegExp("^[a-zA-Zàéèâêîôç .'\-]+");
let regexAdress = new RegExp("^[0-9a-zA-Zàéèâêîôç .'\-]+");
let regexEmail = new RegExp("^[a-zA-Z0-9_.-]*[@]{1}[a-zA-Z0-9_.-]*[.]{1}[a-zA-Z0-9]*$")

//Déclaration des inputs et des messages d'erreurs
let firstName = document.getElementById('firstName');
let erreurFirstName = document.getElementById('firstNameErrorMsg');
let lastName = document.getElementById('lastName');
let erreurLastName = document.getElementById('lastNameErrorMsg');
let address = document.getElementById('address');
let erreurAdress = document.getElementById('addressErrorMsg');
let city = document.getElementById('city');
let erreurCity = document.getElementById('cityErrorMsg');
let email = document.getElementById('email');
let erreurEmail = document.getElementById('emailErrorMsg');

//Création de variables
let nom, prenom, monAdresse, ville, adresseMail

//Insertion des addEventlisner et des regex sur les inputs
firstName.addEventListener('change', function(event){
  let change = event.target.value;
  //Insertion du message d'erreur
  if (regex1.test(change)){
    erreurFirstName.innerHTML = "";
    nom = true;
  }else{
    erreurFirstName.innerHTML = "ceci est un message d'erreur";
    nom = false;
    }
})

lastName.addEventListener('change', function(event){
  let change = event.target.value;
  if (regex1.test(change)){
    erreurLastName.innerHTML = "";
    prenom = true;
  }else{
    erreurLastName.innerHTML = "ceci est un message d'erreur";
    prenom = false;
  }
})

address.addEventListener('change', function(event){
  let change = event.target.value;
  if (regexAdress.test(change)){
    erreurAdress.innerHTML = "";
    monAdresse = true;
  }else{
    erreurAdress.innerHTML = "ceci est un message d'erreur";
    monAdresse = false;
  }
})

city.addEventListener('change', function(event){
  let change = event.target.value;
  if (regex1.test(change)){
    erreurCity.innerHTML = "";
    ville = true;
  }else{
    erreurCity.innerHTML = "ceci est un message d'erreur";
    ville = false;
    }
})

email.addEventListener('change', function(event){
  let change = event.target.value;
  if (regexEmail.test(change)){
    erreurEmail.innerHTML = "";
    adresseMail = true;
  }else{
    erreurEmail.innerHTML = "ceci est un message d'erreur";
    adresseMail = false;
  }
})

//Vérification de la validité des inputs
function verification(){ 
  if(nom && prenom && monAdresse && ville && adresseMail){
    return true;
  }
}

//Réccupérer les ID des produits du panier dans un tableau
function reccupererID(){   
  let produit = [];
  for(let product of panier){
    produit.push(product.id);
  }
  return produit
}

let produitID = reccupererID();
console.log("produitID", produitID);//Afficher les id des produits dans un tableau



//Réccupération du boutton commander et insertion d'un addEventListner
let commande = document.getElementById('order');
commande.addEventListener('click', function(){
  if(panier < 1){
    alert("panier vide");
  }else{
    if(verification()){
      // Réccupérer les informations clients si la vérification des inputs est bonne
      let informationsClient ={
        firstName : firstName.value,
        lastName : lastName.value,
        address : address.value,
        city : city.value,
        email : email.value
      }
      console.log("contact", informationsClient);//Afficher les informations clients
      
      //Réccuperer les informations client et les id des produits dans un objet "order"
      let order={
        contact: informationsClient,
        products: produitID
      }
      console.log("order", order); //Afficher l'objet "order"

      //Faire un fetch post avec l'objet "order"
      fetch("http://localhost:3000/api/products/order", {
        method: 'POST',
        body: JSON.stringify(order),
        headers : {
          'Accept' : 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(function(res) {
        if(res.ok) {
          return res.json();
        }
      })
      .then(function(value) {
        console.log(value);
        //Rediriger vers la page confirmation
        document.location = `confirmation.html?id=${value.orderId}`;
        localStorage.removeItem('panier'); // supression du panier dans le localstorage
      })
      .catch(function(err){
        console.log(err);
      })
    }
  }
})
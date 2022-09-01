// Récupérer la variable dans l'url
let url  = document.location.href;
let geturl = new URL(url);
let id = geturl.searchParams.get("id");
console.log("id", id)

// Affichage du numero de commande
let numeroCommande = document.getElementById("orderId");
numeroCommande.innerHTML = id;
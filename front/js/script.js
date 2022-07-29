fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if(res.ok) {
            return res.json();
        }
    })
    .then(function(value) {

        console.log("json",value);
        insertProduct(value);
    })
    .catch(function(err){
        console.log(err);
    })

function insertProduct(value){
    let elt = document.getElementById('items');
    for (let variable of value) { 
        elt.innerHTML += `<a href="./product.html?id=${variable._id}">
        <article>
        <img src="${variable.imageUrl}" alt="${variable.altTxt}"/>
        <h3 class="productName">${variable.name}</h3>
        <p class="productDescription">${variable.description}</p>
        </article></a>`;
    }  
}

    

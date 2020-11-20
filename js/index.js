// page d'accueil

// récupération des données produits JSON
fetch ("http://localhost:3000/api/cameras")
.then(response => {
    response.json().then(data => {
// création des éléments html à partir du tableau récupéré
        for (let index = 0; index < data.length; index++) 
        {
            const productBlock = document.createElement("div");
            productBlock.className = "product-block";
            const linkImg = document.createElement("a");
            linkImg.setAttribute("href", "product.html?id=" + data[index]._id);
            const imgCamera = document.createElement("img");
            imgCamera.className = "product-image";
            imgCamera.setAttribute("src", data[index].imageUrl);
            linkImg.appendChild(imgCamera);
            productBlock.appendChild(linkImg);
            document.querySelector(".products").appendChild(productBlock); 
            const labelCamera = document.createElement("p");
            productBlock.appendChild(labelCamera);
            labelCamera.className = "product-label";
            labelCamera.innerHTML = data[index].name;
            const priceCamera = document.createElement("p");
            productBlock.appendChild(priceCamera);
            priceCamera.className = "product-label";
            priceCamera.innerHTML = data[index].price/100 + "€";
            const descriptionCamera = document.createElement("p");
            productBlock.appendChild(descriptionCamera);
            descriptionCamera.className = "product-label";
            descriptionCamera.innerHTML = data[index].description;
            console.log("Blocs produit créés");
        }
    })
})
.catch(error => {
    console.log("Erreur détectée : " + error)
    }
);
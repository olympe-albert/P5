// page d'accueil
// récupération des données produits JSON

let request1 = new XMLHttpRequest();
request1.onreadystatechange = function() 
    {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) 
    console.log("Requête GET ok");
    {
        let response = JSON.parse(this.responseText);
        console.log("Réponse JSON récupérée vers JS : " + response);

        for (let index = 0; index < response.length; index++) 
        {
            const productBlock = document.createElement("div");
            productBlock.className = "product-block";
            const linkImg = document.createElement("a");
            linkImg.setAttribute("href", "product.html?id=" + response[index]._id);
            const imgCamera = document.createElement("img");
            imgCamera.className = "product-image";
            imgCamera.setAttribute("src", response[index].imageUrl);
            linkImg.appendChild(imgCamera);
            productBlock.appendChild(linkImg);
            document.querySelector(".products").appendChild(productBlock); 
            const labelCamera = document.createElement("p");
            productBlock.appendChild(labelCamera);
            labelCamera.className = "product-label";
            labelCamera.innerHTML = response[index].name;
            const priceCamera = document.createElement("p");
            productBlock.appendChild(priceCamera);
            priceCamera.className = "product-label";
            priceCamera.innerHTML = response[index].price + "€";
            const descriptionCamera = document.createElement("p");
            productBlock.appendChild(descriptionCamera);
            descriptionCamera.className = "product-label";
            descriptionCamera.innerHTML = response[index].description;
            console.log("Blocs produit créés");
        }

        // response.forEach(camera => {
        //     console.log(camera.imageUrl);
        // });
    }
};
request1.open("GET", "http://localhost:3000/api/cameras");
request1.send();





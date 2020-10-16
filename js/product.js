// récupérer l'id du produit sélectionné
function getId()
{
    let finder = window.location.search;
    let id = finder.replace("?id=", "");
    return id;
};
const selectedId = getId();

// ajouter le produit sélectionné au html
let requestProduct = new XMLHttpRequest();
requestProduct.onreadystatechange = function() 
    {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) 
    {
        let response = JSON.parse(this.responseText);
        let image = document.getElementById("image");
        image.innerHTML = "<img src=" + response.imageUrl + ">";
        let label = document.getElementById("label");
        label.innerHTML = "Modèle : " + response.name;
        let price = document.getElementById("price");
        price.innerHTML = response.price +"€";
        let description = document.getElementById("description");
        description.innerHTML = response.description;
        let custom = document.getElementById("custom");
        let options = response.lenses;
        for(let i = 0; i < options.length; i++)
        {
            custom.innerHTML += "<option>" + options[i] +"</option>";
        }
        
    }
};
requestProduct.open("GET", "http://localhost:3000/api/cameras/" + selectedId);
requestProduct.send();

// ajouter un produit au panier avec localStorage


// récupérer l'id du produit sélectionné
function getId()
{
    let finder = window.location.search;
    let id = finder.replace("?id=", "");
    return id;
};
const selectedId = getId();
console.log("Id produit récupéré : " + selectedId);

// ajouter le produit sélectionné au html
let requestProduct = new XMLHttpRequest();
requestProduct.onreadystatechange = function() 
    {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) 
    {
        console.log("Requête infos produit ok");
        let response = JSON.parse(this.responseText);
        let image = document.getElementById("image");
        image.innerHTML = "<img src=" + response.imageUrl + ">";
        let label = document.getElementById("label");
        label.innerHTML = "<p>Modèle : " + response.name + "</p>";
        let price = document.getElementById("price");
        price.innerHTML = "<p>" + response.price +"€</p>";
        let description = document.getElementById("description");
        description.innerHTML = "<p>" + response.description + "</p>";
        let custom = document.getElementById("custom");
        let options = response.lenses;
        for(let i = 0; i < options.length; i++)
        {
            custom.innerHTML += "<option>" + options[i] +"</option>";
        }
        console.log("Infos produit insérées");
    }
};
requestProduct.open("GET", "http://localhost:3000/api/cameras/" + selectedId);
requestProduct.send();

// ajouter un produit au panier avec localStorage
function addProduct()
{
    let product = selectedId;
    let cartContent = [];
    if(JSON.parse(localStorage.getItem("cartContent")) === null)
    {
        cartContent = [];
        console.log("cartContent initial vide");
    }
    else
    {
        cartContent = JSON.parse(localStorage.getItem("cartContent"));
        console.log("cartContent initial : " + cartContent);
    };
    cartContent.push(product);
    localStorage.setItem("cartContent", JSON.stringify(cartContent));
    console.log("cartContent JSON stocké en localStorage : " + JSON.stringify(cartContent));
};

let addToCart = document.getElementById("addtocart");
addToCart.addEventListener("click", function(x)
{
    addProduct();
    alert("produit ajouté au panier");
    x.preventDefault();
    x.stopPropagation();
});

let cartContent = localStorage.getItem("cartContent");
console.log("Nouveau cartContent : " + cartContent);


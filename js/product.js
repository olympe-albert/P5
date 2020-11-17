// récupérer l'id du produit sélectionné à partir de l'url
function getId()
{
    let finder = window.location.search;
    let id = finder.replace("?id=", "");
    return id;
};
const selectedId = getId();
console.log("Id produit récupéré : " + selectedId);

// ajouter le produit sélectionné au html avec requête à l'API
fetch("http://localhost:3000/api/cameras/" + selectedId)
.then(response => {
    response.json().then(data => {
        console.log("Requête infos produit ok");
        let image = document.getElementById("image");
        image.innerHTML = "<img src=" + data.imageUrl + ">";
        let label = document.getElementById("label");
        label.innerHTML = "<p>Modèle : " + data.name + "</p>";
        let price = document.getElementById("price");
        price.innerHTML = "<p>" + data.price +"€</p>";
        let description = document.getElementById("description");
        description.innerHTML = "<p>" + data.description + "</p>";
        let custom = document.getElementById("custom");
        let options = data.lenses;
        for(let i = 0; i < options.length; i++)
        {
            custom.innerHTML += "<option>" + options[i] +"</option>";
        }
        console.log("Infos produit insérées");
    })
.catch(error => console.log("Erreur détectée : " + error));
});

// ajouter un produit au panier avec localStorage
function addProduct()
{
    let product = selectedId;
    let cartContent = [];
    // si panier JSON initial vide -> tableau cartContent vide
    if(JSON.parse(localStorage.getItem("cartContent")) === null)
    {
        cartContent = [];
        console.log("cartContent initial vide");
    }
    // si panier JSON initial rempli -> tableau cartContent avec ids produits
    else
    {
        cartContent = JSON.parse(localStorage.getItem("cartContent"));
        console.log("cartContent initial : " + cartContent);
    };
    cartContent.push(product);
    localStorage.setItem("cartContent", JSON.stringify(cartContent)); // tableau cartContent stocké en JSON dans localStorage
    console.log("cartContent JSON stocké en localStorage : " + JSON.stringify(cartContent));
};

// événement ajout de produit au clic 
let addToCart = document.getElementById("addtocart");
addToCart.addEventListener("click", function(x)
{
    addProduct();
    alert("produit ajouté au panier");
    x.preventDefault();
    x.stopPropagation();
});

// let cartContent = localStorage.getItem("cartContent");
// console.log("Nouveau cartContent : " + cartContent);


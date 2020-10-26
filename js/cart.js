// récupère le contenu du localStorage
let cartContent = localStorage.getItem("cartContent");

// déclaration des tableaux pour le prix du panier
let productPrices = [];
let cartPrice = [];

// affiche le panier
function showCart()
{
    // si panier vide
    if(cartContent === null)
    {
        const emptyCart = document.createElement("p");
        const cart = document.getElementById("cart");
        cart.appendChild(emptyCart);
        emptyCart.innerHTML = "Votre panier est vide";
    }
    // si produits sélectionnés
    else
    {
        // parse le contenu du localStorage
        const ids = JSON.parse(cartContent);
        for (let i = 0; i < ids.length; i++)
        {
            const fetchPromise = fetch("http://localhost:3000/api/cameras/" + ids[i]);
            fetchPromise.then(response =>
                {
                    return response.json();
                }).then(ids =>
                    {
                        // affiche les produits
                        let productLabel = document.createElement("p");
                        let cart = document.getElementById("cart");
                        cart.appendChild(productLabel);
                        productLabel.innerHTML = ids.name;
                        let productPrice = document.createElement("p");
                        cart.appendChild(productPrice);
                        productPrice.innerHTML = ids.price + "€";
                        // calcule les totaux intermédiaires du panier
                        productPrices.push(ids.price);
                        let sumOfPrices = productPrices.reduce(function(x, y)
                        {
                            return x + y;
                        }, 0);
                        cartPrice.push(sumOfPrices);
                        return cartPrice;
                    })
                .then(cartPrice =>
                    // affiche les totaux intermédiaires du panier
                    {
                        let totalPrice = document.createElement("p");
                        totalPrice.className = "totalprice";
                        let cart = document.getElementById("cart");
                        cart.appendChild(totalPrice);
                        totalPrice.innerHTML = cartPrice[cartPrice.length - 1];
                    });
        }
    }
};

showCart();

setTimeout (function()
// supprime les totaux intermédiaires et affiche le total du panier
{
    let allPrices = document.querySelectorAll(".totalprice");
    let arrayAllPrices = Array.from(allPrices);
    let lastPrice = arrayAllPrices[arrayAllPrices.length - 1].innerHTML;
    allPrices.forEach(e => e.parentNode.removeChild(e))
    let totalPrice = document.createElement("p");
    let cart = document.getElementById("cart");
    cart.appendChild(totalPrice);
    totalPrice.innerHTML = "Prix total : " + lastPrice + "€";
}, 100);
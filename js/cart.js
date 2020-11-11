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
                        // affiche les produits et leur prix
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
// stockage du montant de la commande
    localStorage.setItem("orderAmount", lastPrice);
    console.log("Montant commande stocké : " + lastPrice);
}, 100);

// formulaire de contact

// déclaration des regex
let regexText = /^[A-Za-zçàêéèîïÀÊÉÈÎÏ\s-]{2,}$/;
let regexAddress = /^[A-Za-zçàêéèîïÀÊÉÈÎÏ0-9\s-]{2,}$/;
let regexMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)*$/;

// récupération des champs du formulaire
let firstName = document.getElementById("firstname");
let lastName = document.getElementById("lastname");
let address = document.getElementById("address");
let city = document.getElementById("city");
let mail = document.getElementById("mail");

// création du tableau de produits
let products = [];
let ids = JSON.parse(cartContent);
products.push(ids);

// fonction de validation du formulaire
function validateForm()
{
    // si un champ requis est manquant
    if(firstName.validity.valueMissing || lastName.validity.valueMissing || address.validity.valueMissing || city.validity.valueMissing || mail.validity.valueMissing)
    {
        let alert = document.getElementById("alert");
        alert.innerHTML = "Veuillez remplir tous les champs.";
        alert.style.color = "#FF0000";
        console.log("Missing value here");
        return false;
    }
    // si un champ est mal rempli
    else if(regexText.test(firstName.value) == false || regexText.test(lastName.value) == false || regexAddress.test(address.value) == false || regexText.test(city.value) == false || regexMail.test(mail.value) == false)
    {
        let alert = document.getElementById("alert");
        alert.innerHTML = "Veuillez remplir les champs correctement.";
        alert.style.color = "#FF0000";
        console.log("Wrong value here");
        return false;
    }
    else
    {
        let alert = document.getElementById("alert");
        alert.innerHTML = "Merci !";
        return true;
    }
};

// fonction de création de contact
function createContact()
{
    let contact = {
    firstName : firstName.value, 
    lastName : lastName.value, 
    address : address.value, 
    city : city.value, 
    email : mail.value
    };
    return contact;
}

// fonction POST products et contact à l'API
function sendAndReceiveData(contact, products)
{
    let fetchPostPromise = fetch("http://localhost:3000/api/cameras/order",
    {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({contact, products})
    });
    fetchPostPromise.then(response =>
        {
            return response.json(); 
        }).then(backData => 
            {
            console.log("Numéro de commande :" + backData.orderId);
            localStorage.setItem("orderId", backData.orderId);
            });
};

// au clic sur le bouton d'envoi...

let sendInput = document.getElementById("send");
sendInput.addEventListener('click', function(e)
{
    // ... validation du formulaire
    validateForm(); 
    e.preventDefault();
    // ... création d'un objet contact - POST à l'API - redirection page de commande
    if(validateForm()==true)
    {
    console.log("Formulaire validé");
    contact = createContact();
    console.log("Contact créé");
    sendAndReceiveData(contact, products);
    setTimeout (function()
    {
        window.location = "./order.html"
    }, 500)
    }
    else
    {
        console.log("Formulaire non-validé");
    }
});
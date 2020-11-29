// récupère le contenu du localStorage
let cartContent = localStorage.getItem("cartContent");

// déclaration des tableaux pour le prix du panier
let productPrices = [];
let cartPrice = [];

// action si panier vide
function emptyCart()
{
    if(cartContent === null)
    {
        const emptyCart = document.createElement("p");
        const cart = document.getElementById("cart");
        cart.appendChild(emptyCart);
        emptyCart.innerHTML = "Votre panier est vide";
        console.log("Panier vide");
        return true;
    }
    return false;
};

// option vider le panier
function clearCart()
{
    let productsInfos = document.querySelectorAll("#cart p");
    productsInfos.forEach(e => e.parentNode.removeChild(e));
};

let clearCartInput = document.getElementById("clearcart");
clearCartInput.addEventListener("click", function(e)
{
    window.localStorage.clear();
    e.preventDefault();
    e.stopPropagation();
    clearCart();
    let emptyCart = document.createElement("p");
    let cart = document.getElementById("cart");
    cart.appendChild(emptyCart);
    emptyCart.innerHTML = "Votre panier est vide";
    console.log("Panier vidé");
});


// requête GET à l'API si produits sélectionnés
function getCart()
{if(!emptyCart())
    {
        const ids = JSON.parse(cartContent); // parse le contenu du localStorage
        for (let i = 0; i < ids.length; i++)
        {
            fetch("http://localhost:3000/api/cameras/" + ids[i])
            .then(response => {
                response.json().then(ids => {
                    console.log("Requête ok");
                    showCart(ids); // appel de l'affichage du panier
                });
            })
            .catch(error => {
                console.log("Erreur lors de la requête : " + error);
            });
        }
    }
}

// fonction d'affichage du panier
function showCart(ids)
{
// affiche les produits et leur prix
    let productLabel = document.createElement("p");
    let cart = document.getElementById("cart");
    cart.appendChild(productLabel);
    productLabel.innerHTML = ids.name;
    let productPrice = document.createElement("p");
    cart.appendChild(productPrice);
    productPrice.innerHTML = ids.price/100 + "€";
// calcule les totaux intermédiaires du panier (voir suite setTimeout)
    productPrices.push(ids.price/100);
    let sumOfPrices = productPrices.reduce(function(x, y)
    {
        return x + y;
    }, 0);
    cartPrice.push(sumOfPrices);
    console.log("Totaux intermédiaires calculés : " + cartPrice);
    let totalPrice = document.createElement("p");
    totalPrice.className = "totalprice";
    cart.appendChild(totalPrice);
    totalPrice.innerHTML = cartPrice[cartPrice.length - 1];
};

getCart();

setTimeout (function()
// supprime les totaux intermédiaires et affiche le total du panier
{
    let allPrices = document.querySelectorAll(".totalprice");
    let arrayAllPrices = Array.from(allPrices);
    if(arrayAllPrices[arrayAllPrices.length - 1] == null)
    {
        console.log("Pas de total à traiter")
    }
    else
    {
        let lastPrice = arrayAllPrices[arrayAllPrices.length - 1].innerHTML;
        console.log("Valeur dernier total intermédiaire enregistrée : " + lastPrice);
        allPrices.forEach(e => e.parentNode.removeChild(e))
        let finalPrice = document.createElement("p");
        let cart = document.getElementById("cart");
        cart.appendChild(finalPrice);
        finalPrice.innerHTML = "Prix total : " + lastPrice + "€";
        console.log("Affichage du total du panier");
    // stockage du montant de la commande
        localStorage.setItem("orderAmount", lastPrice);
        console.log("Montant commande stocké : " + lastPrice);
    };
    
}, 300);

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

// fonction de création de l'objet contact pour POST
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

// création du tableau de produits pour POST
let products = [];
let ids = JSON.parse(cartContent);
products.push(ids);

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
    fetchPostPromise.catch(error => {
        console.log("Erreur lors de POST : " + error);
    });
};

// au clic sur le bouton d'envoi...

let sendInput = document.getElementById("send");
sendInput.addEventListener('click', function(e)
{
    // ... validation du formulaire
    validateForm(); 
    e.preventDefault();
    // ... création d'un objet contact 
    if(validateForm()==true)
    {
    console.log("Formulaire validé");
    contact = createContact();
    console.log("Contact créé");
    // ... POST à l'API
    sendAndReceiveData(contact, products);
    // ... redirection page de commande
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
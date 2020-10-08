// page d'accueil
// récupération des données produits JSON

let request1 = new XMLHttpRequest();
request1.onreadystatechange = function() 
    {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) 
    {
        let response = JSON.parse(this.responseText);
        let label1 = document.getElementById("label1");
        label1.innerHTML = "Modèle : " + response.name;
        let price1 = document.getElementById("price1");
        price1.innerHTML = response.price +"€";
        let description1 = document.getElementById("description1");
        description1.innerHTML = response.description;
        
    }
};
request1.open("GET", "http://localhost:3000/api/cameras/5be1ed3f1c9d44000030b061");
request1.send();

let request2 = new XMLHttpRequest();
request2.onreadystatechange = function() 
    {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) 
    {
        let response = JSON.parse(this.responseText);
        let label2 = document.getElementById("label2");
        label2.innerHTML = "Modèle : " + response.name;
        let price2 = document.getElementById("price2");
        price2.innerHTML = response.price +"€";
        let description2 = document.getElementById("description2");
        description2.innerHTML = response.description;
        
    }
};
request2.open("GET", "http://localhost:3000/api/cameras/5be1ef211c9d44000030b062");
request2.send();

let request3 = new XMLHttpRequest();
request3.onreadystatechange = function() 
    {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) 
    {
        let response = JSON.parse(this.responseText);
        let label3 = document.getElementById("label3");
        label3.innerHTML = "Modèle : " + response.name;
        let price3 = document.getElementById("price3");
        price3.innerHTML = response.price +"€";
        let description3 = document.getElementById("description3");
        description3.innerHTML = response.description;
        
    }
};
request3.open("GET", "http://localhost:3000/api/cameras/5be9bc241c9d440000a730e7");
request3.send();

let request4 = new XMLHttpRequest();
request4.onreadystatechange = function() 
    {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) 
    {
        let response = JSON.parse(this.responseText);
        let label4 = document.getElementById("label4");
        label4.innerHTML = "Modèle : " + response.name;
        let price4 = document.getElementById("price4");
        price4.innerHTML = response.price +"€";
        let description4 = document.getElementById("description4");
        description4.innerHTML = response.description;
        
    }
};
request4.open("GET", "http://localhost:3000/api/cameras/5be9c4471c9d440000a730e8");
request4.send();

let request5 = new XMLHttpRequest();
request5.onreadystatechange = function() 
    {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) 
    {
        let response = JSON.parse(this.responseText);
        let label5 = document.getElementById("label5");
        label5.innerHTML = "Modèle : " + response.name;
        let price5 = document.getElementById("price5");
        price5.innerHTML = response.price +"€";
        let description5 = document.getElementById("description5");
        description5.innerHTML = response.description;
        
    }
};
request5.open("GET", "http://localhost:3000/api/cameras/5be9c4c71c9d440000a730e9");
request5.send();






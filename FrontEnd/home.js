// Vide le contenu de la gallerie
document.querySelector(".gallery").innerHTML = "";

const sectionPortfolio = document.getElementById('portfolio');
const divGallery = document.querySelector(".gallery");

// Création du menu filtres en insérant le code HTML

const createFiltres = document.createElement("div");
createFiltres.id = "filtres";
sectionPortfolio.insertBefore(createFiltres, divGallery);
const divFiltres = document.getElementById("filtres");
divFiltres.innerHTML = `<div id="tous">Tous</div>
                        <div id="objets">Objets</div>
                        <div id="apparts">Appartements</div>
                        <div id="hotels">Hôtels & restaurants</div>`;
const divTous = document.getElementById("tous");
const divObjets = document.getElementById("objets");
const divApparts = document.getElementById("apparts");
const divHotels = document.getElementById("hotels");

// Définition des styles du menu filtres

divFiltres.style.display = "flex";
divFiltres.style.justifyContent = "center";
divFiltres.style.marginBottom = "50px";

let stylesFiltres = {
    "fontFamily": "Syne",
    "fontSize": "16px",
    "fontStyle": "normal",
    "fontWeight": "700",
    "color": "#1D6154",
    "border": "1px solid #1D6154",
    "borderRadius": "60px",
    "marginRight": "10px",
    "padding": "10px",
    "textAlign": "center",
    "hover": 'textDecoration: "underline"'
};

Object.assign(divTous.style, stylesFiltres);
Object.assign(divObjets.style, stylesFiltres);
Object.assign(divApparts.style, stylesFiltres);
Object.assign(divHotels.style, stylesFiltres);
divTous.style.padding = "10px 30px";
divObjets.style.padding = "10px 20px";

// Style du filtre actif, par défaut : tous

let styleFiltreActif = {
    "color": "#FFFFFF",
    "backgroundColor": "#1D6154"
};

Object.assign(divTous.style, styleFiltreActif);

// Style du filtre inactif

let styleFiltreInactif = {
    "color": "#1D6154",
    "backgroundColor": "#FFFFFF"
}

// Requête fetch pour récupérer l'ensemble des travaux

fetch("http://localhost:5678/api/works")
    .then(data => data.json())
    .then(jsonListWorks => {
        for (let jsonWorks of jsonListWorks) {
            let work = new Works(jsonWorks);
            console.log(work);
            divGallery.appendChild(document.createElement('figure')).appendChild(document.createElement('img'));
            divGallery.querySelector("figure:last-child").appendChild(document.createElement('figcaption'));
            divGallery.querySelector("figure:last-child").setAttribute("id", work.id);
            divGallery.querySelector("figure:last-child").setAttribute("class", work.category.name);
            divGallery.querySelector("figure:last-child img").setAttribute("crossorigin", "");
            divGallery.querySelector("figure:last-child img").setAttribute("src", work.imageUrl);
            divGallery.querySelector("figure:last-child img").setAttribute("alt", work.title);
            divGallery.querySelector("figure:last-child figcaption").append(work.title);
            // Ci-dessous dans les commentaires : manière plus rapide d'ajouter les élements à la gallerie
            //document.querySelector(".gallery").innerHTML += `<figure>
            //<img src="${work.imageUrl}" alt="${work.title}" crossorigin>
            //<figcaption>${work.title}</figcaption>
            //</figure>`
        }
    })

    .catch(function (err) {
        // Une erreur est survenue
    });

// Styles de soulignage des filtres au passage de la souris

divObjets.onmouseover = function() 
    {
        this.style.textDecoration = "underline";
    }

divObjets.onmouseout = function() 
    {
        this.style.textDecoration = "none";
    }

divTous.onmouseover = function() 
    {
        this.style.textDecoration = "underline";
    }

divTous.onmouseout = function() 
    {
        this.style.textDecoration = "none";
    }

divApparts.onmouseover = function() 
    {
        this.style.textDecoration = "underline";
    }

divApparts.onmouseout = function() 
    {
        this.style.textDecoration = "none";
    }

divHotels.onmouseover = function() 
    {
        this.style.textDecoration = "underline";
    }

divHotels.onmouseout = function() 
    {
        this.style.textDecoration = "none";
    }

// Fonction qui filtre les travaux en fonction du filtre cliqué retardée pour que le fetch ait le temps de se charger

setTimeout(function () {
    const allWorks = divGallery.innerHTML;
        divObjets.addEventListener('click', function () {
        divGallery.innerHTML = allWorks;
        Object.assign(divTous.style, styleFiltreInactif);
        Object.assign(divApparts.style, styleFiltreInactif);
        Object.assign(divHotels.style, styleFiltreInactif);
        Object.assign(divObjets.style, styleFiltreActif);
        const selectNonObjets = divGallery.querySelectorAll("figure");
        const monSet = new Set();
        for (let i = 0; i < selectNonObjets.length; i++) {
            console.log(selectNonObjets[i].id);
            if (selectNonObjets[i].classList != "Objets") {
                console.log(selectNonObjets[i].id);
                monSet.add(selectNonObjets[i].id)
            }
        } console.log(monSet);
        for (let item of monSet) {
            divGallery.removeChild(document.getElementById(item));
        }
    })

    divApparts.addEventListener('click', function () {
        divGallery.innerHTML = allWorks;
        Object.assign(divTous.style, styleFiltreInactif);
        Object.assign(divApparts.style, styleFiltreActif);
        Object.assign(divHotels.style, styleFiltreInactif);
        Object.assign(divObjets.style, styleFiltreInactif);
        const selectNonApparts = divGallery.querySelectorAll("figure");
        const monSet = new Set();
        for (let i = 0; i < selectNonApparts.length; i++) {
            console.log(selectNonApparts[i].id);
            if (selectNonApparts[i].classList != "Appartements") {
                console.log(selectNonApparts[i].id);
                monSet.add(selectNonApparts[i].id)
            }
        } console.log(monSet);
        for (let item of monSet) {
            divGallery.removeChild(document.getElementById(item));
        }
    })

    divHotels.addEventListener('click', function () {
        divGallery.innerHTML = allWorks;
        Object.assign(divTous.style, styleFiltreInactif);
        Object.assign(divApparts.style, styleFiltreInactif);
        Object.assign(divHotels.style, styleFiltreActif);
        Object.assign(divObjets.style, styleFiltreInactif);
        const selectNonHotels = divGallery.querySelectorAll("figure");
        const monSet = new Set();
        for (let i = 0; i < selectNonHotels.length; i++) {
            console.log(selectNonHotels[i].id);
            if (selectNonHotels[i].classList != "Hotels & restaurants") {
                console.log(selectNonHotels[i].id);
                monSet.add(selectNonHotels[i].id)
            }
        } console.log(monSet);
        for (let item of monSet) {
            divGallery.removeChild(document.getElementById(item));
        }
    })

    divTous.addEventListener('click', function () {
        divGallery.innerHTML = allWorks;
        Object.assign(divTous.style, styleFiltreActif);
        Object.assign(divApparts.style, styleFiltreInactif);
        Object.assign(divHotels.style, styleFiltreInactif);
        Object.assign(divObjets.style, styleFiltreInactif);
        }
    )

}, 1200);

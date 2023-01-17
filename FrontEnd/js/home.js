// Vide le contenu de la gallerie
document.querySelector(".gallery").innerHTML = "";
let allWorks = "";
let allCategories = "";
const sectionPortfolio = document.getElementById('portfolio');
const divGallery = document.querySelector(".gallery");

// Requête fetch pour récupérer l'ensemble des travaux

fetch("http://localhost:5678/api/works")
    .then(data => data.json())
    .then(jsonListWorks => {
        for (let jsonWorks of jsonListWorks) {
            let work = new Works(jsonWorks);
            divGallery.appendChild(document.createElement('figure')).appendChild(document.createElement('img'));
            divGallery.querySelector("figure:last-child").appendChild(document.createElement('figcaption'));
            divGallery.querySelector("figure:last-child").setAttribute("id", "galerie" + work.id);
            divGallery.querySelector("figure:last-child").setAttribute("class", work.category.name);
            divGallery.querySelector("figure:last-child img").setAttribute("crossorigin", "");
            divGallery.querySelector("figure:last-child img").setAttribute("src", work.imageUrl);
            divGallery.querySelector("figure:last-child img").setAttribute("alt", work.title);
            divGallery.querySelector("figure:last-child figcaption").append(work.title);
        }
        allWorks = divGallery.innerHTML;
    })

    .catch(function (err) {
        // Une erreur est survenue
        alert("Erreur " + err + "lors de la requête pour récupérer l'ensemble des travaux");
    });

// Création du menu filtres avec createElement et appendChild

const createFiltres = document.createElement("div");
createFiltres.id = "filtres";
sectionPortfolio.insertBefore(createFiltres, divGallery);
const divFiltres = document.getElementById("filtres");
let filtreTous = document.createElement("div");
filtreTous.id = "tous";
filtreTous.innerHTML = "Tous";
divFiltres.appendChild(filtreTous);
const divTous = document.getElementById("tous");

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
};

Object.assign(divTous.style, stylesFiltres);
divTous.style.padding = "10px 30px";

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

// Styles de soulignage des filtres au passage de la souris

divTous.onmouseover = function () {
    this.style.textDecoration = "underline";
}

divTous.onmouseout = function () {
    this.style.textDecoration = "none";
}

// Requête fetch pour récupérer toutes les catégories

fetch("http://localhost:5678/api/categories")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (jsonlisteCategories) {
        for (let listeCategories of jsonlisteCategories) {
            let categories = new Categories(listeCategories);
            divFiltres.appendChild(document.createElement('div')).id = categories.id;
            document.getElementById(`${categories.id}`).innerHTML = categories.name;
            document.getElementById(`${categories.id}`).setAttribute("class", "filtres");
            Object.assign(document.getElementById(`${categories.id}`).style, stylesFiltres);
            document.getElementById(`${categories.id}`).style.padding = "10px 20px";
            document.getElementById(`${categories.id}`).onmouseover = function () {
                this.style.textDecoration = "underline";
            }
            document.getElementById(`${categories.id}`).onmouseout = function () {
                this.style.textDecoration = "none";
            }
        }
        allCategories = jsonlisteCategories;
        afficheFiltres();
    })
    .catch(function (err) {
        alert("Erreur " + err + "lors de la requête pour obtenir les catégories");
    });

// Fonction qui filtre les travaux en fonction du filtre cliqué

function afficheFiltres() {
    document.querySelectorAll(".filtres").forEach(filtre => {
        filtre.addEventListener('click', function () {
            divGallery.innerHTML = allWorks; // à chaque clic sur un filtre, on charge l'ensemble des travaux
            Object.assign(divTous.style, styleFiltreInactif);
            for (let i of allCategories) {
                if (i.name === filtre.innerText) {
                    Object.assign(document.getElementById(i.id).style, styleFiltreActif);
                } else {
                    Object.assign(document.getElementById(i.id).style, styleFiltreInactif);
                }
            }
            const selectNonFiltres = divGallery.querySelectorAll("figure");
            const monSet = new Set();
            for (let i = 0; i < selectNonFiltres.length; i++) {
                if (selectNonFiltres[i].classList != filtre.innerText) {
                    monSet.add(selectNonFiltres[i].id)
                }
            }
            for (let item of monSet) {
                // on supprime tous les travaux qui n'appartiennent pas au filtre sélectionné
                divGallery.removeChild(document.getElementById(item)); 
            }


        })
    })

    divTous.addEventListener('click', function () {
        divGallery.innerHTML = allWorks;
        Object.assign(divTous.style, styleFiltreActif);
        for (let i of allCategories) {
            Object.assign(document.getElementById(i.id).style, styleFiltreInactif);
        }
    }
    )
}
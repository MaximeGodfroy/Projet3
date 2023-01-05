let modale = null;
const cible = document.getElementById("modale");
const divGalerieModale = document.querySelector(".galerie-modale");

fetch("http://localhost:5678/api/works")
    .then(data => data.json())
    .then(jsonListWorks => {
        for (let jsonWorks of jsonListWorks) {
            let work = new Works(jsonWorks);
            divGalerieModale.appendChild(document.createElement('figure')).appendChild(document.createElement('img'));
            divGalerieModale.querySelector("figure:last-child").appendChild(document.createElement('figcaption'));
            divGalerieModale.querySelector("figure:last-child").setAttribute("id", work.id);
            divGalerieModale.querySelector("figure:last-child").setAttribute("class", work.category.name);
            divGalerieModale.querySelector("figure:last-child img").setAttribute("crossorigin", "");
            divGalerieModale.querySelector("figure:last-child img").setAttribute("src", work.imageUrl);
            divGalerieModale.querySelector("figure:last-child img").setAttribute("alt", work.title);
            divGalerieModale.querySelector("figure:last-child figcaption").append("éditer");
            afficheFiltres();
        }
    })

    .catch(function (err) {
        // Une erreur est survenue
});

const ouvrirModale = function (e) {
    e.preventDefault();
    cible.style.display = null;
    cible.removeAttribute("aria-hidden");
    cible.setAttribute("aria-model", "true");
    modale = cible;
    modale.addEventListener("click", fermerModale);
    modale.querySelector(".js-fermer-modale").addEventListener("click", fermerModale);
    modale.querySelector(".js-stop-modale").addEventListener("click", stopPropagation);    
}

const fermerModale = function (e) {
    if (modale === null) return;
    e.preventDefault();
    modale.style.display = "none";
    modale.setAttribute("aria-hidden", "true");
    modale.removeAttribute("aria-model");
    modale.removeEventListener("click", fermerModale);
    modale.querySelector(".js-fermer-modale").removeEventListener("click", fermerModale);
    modale.querySelector(".js-stop-modale").addEventListener("click", stopPropagation);
    modale = null;
}

const stopPropagation = function (e) {
    e.stopPropagation();
}

document.querySelectorAll(".js-modale").forEach(a => {
    a.addEventListener("click", ouvrirModale)
})






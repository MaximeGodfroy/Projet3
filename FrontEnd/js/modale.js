// Vide le contenu de la gallerie
document.querySelector(".gallery").innerHTML = "";
let allWorks = "";
let allCategories = "";
const sectionPortfolio = document.getElementById('portfolio');
const divGallery = document.querySelector(".gallery");
const divGalerieModale = document.getElementById("galerie-modale");

// Requête fetch pour récupérer l'ensemble des travaux et les ajouter dans la section galerie et la fenêtre modale

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
            divGalerieModale.appendChild(document.createElement('figure')).appendChild(document.createElement('img'));
            divGalerieModale.querySelector("figure:last-child").appendChild(document.createElement('div')).setAttribute("class", "poubelles");
            divGalerieModale.querySelector("div:last-child").setAttribute("id", "poubelle" + work.id);
            divGalerieModale.querySelector("div:last-child").appendChild(document.createElement('i')).setAttribute("class", "fa-regular fa-trash-can fa-2xs");
            divGalerieModale.querySelector("figure:last-child").appendChild(document.createElement('figcaption'));
            divGalerieModale.querySelector("figure:last-child").setAttribute("id", "galerie-modale" + work.id);
            divGalerieModale.querySelector("figure:last-child").setAttribute("class", work.category.name);
            divGalerieModale.querySelector("figure:last-child img").setAttribute("crossorigin", "");
            divGalerieModale.querySelector("figure:last-child img").setAttribute("src", work.imageUrl);
            divGalerieModale.querySelector("figure:last-child img").setAttribute("alt", work.title);
            divGalerieModale.querySelector("figure:last-child figcaption").append("éditer");
        }
        divGalerieModale.querySelector("figure:first-child").appendChild(document.createElement('div'));
        divGalerieModale.querySelector("div:last-child").appendChild(document.createElement('i')).setAttribute("class", "fa-solid fa-up-down-left-right fa-2xs");
        divGalerieModale.querySelector("div:last-child").id = "move";
        allWorks = divGallery.innerHTML;
        supprimerTravail();
    })

    .catch(function (err) {
        // Une erreur est survenue
        alert("Erreur " + err + "lors de la requête de récupération des travaux");
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

let tableauNomCategorie = [];

fetch("http://localhost:5678/api/categories")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (jsonlisteCategories) {
        for (let listeCategories of jsonlisteCategories) {
            let categories = new Categories(listeCategories);
            tableauNomCategorie.push(categories.name);
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

let travauxFiltres = "";

function afficheFiltres() {
    document.querySelectorAll(".filtres").forEach(filtre => {
        filtre.addEventListener('click', function () {
            divGallery.innerHTML = allWorks;
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
                divGallery.removeChild(document.getElementById(item));
            }
            travauxFiltres = divGallery.innerHTML;
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

let modale = null;
const cible = document.getElementById("modale");

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
    modale.querySelector(".js-stop-modale").removeEventListener("click", stopPropagation);
    modale = null;
}

const stopPropagation = function (e) {
    e.stopPropagation();
}

document.querySelectorAll(".js-modale").forEach(a => {
    a.addEventListener("click", ouvrirModale)
})

function supprimerTravail() {

    document.querySelectorAll(".poubelles").forEach(poubelle => {
        poubelle.addEventListener('click', function () {
            let confirmation = confirm("Voulez-vous vraiment supprimer ce travail ?");
            if (confirmation) {
                const idPoubelle = poubelle.id.split("poubelle")[1]; // on récupère l'id de la poubelle
                const url = "http://localhost:5678/api/works/" + idPoubelle;
                fetch(url, {
                    method: "DELETE",
                    headers: {
                        'Accept': '/',
                        'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                    }
                })
                    .then(function (res) {
                        if (res.ok) {
                            const idGalerieModalePoubelle = "galerie-modale" + idPoubelle;
                            const idGaleriePoubelle = "galerie" + idPoubelle;
                            let divGalerieAvantAjout = divGallery.innerHTML;
                            if (document.querySelector(`#${idGaleriePoubelle}`) === null) { // cas où la photo à supprimer n'apparait pas dans le filtre
                                divGallery.innerHTML = allWorks;
                                divGallery.removeChild(document.getElementById(idGaleriePoubelle));
                                allWorks = divGallery.innerHTML;
                                divGallery.innerHTML = travauxFiltres;
                            } else {
                                if (divGalerieAvantAjout !== travauxFiltres) { // Cas où aucun filtre n'est sélectionné (filtre tous)
                                    divGallery.removeChild(document.getElementById(idGaleriePoubelle));
                                    allWorks = divGallery.innerHTML;
                                } else { // Cas où le filtre sélectionné contient la photo à supprimer
                                    divGallery.innerHTML = allWorks;
                                    divGallery.removeChild(document.getElementById(idGaleriePoubelle));
                                    allWorks = divGallery.innerHTML;
                                    divGallery.innerHTML = travauxFiltres;
                                    divGallery.removeChild(document.getElementById(idGaleriePoubelle));
                                    travauxFiltres = divGallery.innerHTML;
                                }
                            }
                            divGalerieModale.removeChild(document.getElementById(idGalerieModalePoubelle));
                            alert("Le travail a bien été supprimé");
                        }
                    }
                    )
                    .catch(function (err) {
                        // Une erreur est survenue
                        alert(`Erreur ${err}`);
                    });
            } else {
                alert("Aucun travail n'a été supprimé");
            }
        })
    })
}

let modale2 = null;
const cible2 = document.getElementById("modale2");

const ouvrirModale2 = function (e) {
    e.preventDefault();
    modale.style.display = "none";
    modale.setAttribute("aria-hidden", "true");
    modale.removeAttribute("aria-model");
    cible2.style.display = null;
    cible2.removeAttribute("aria-hidden");
    cible2.setAttribute("aria-model", "true");
    modale2 = cible2;
    modale2.addEventListener("click", fermerModale2);
    modale2.querySelector(".js-fermer-modale2").addEventListener("click", fermerModale2);
    modale2.querySelector(".js-retour").addEventListener("click", function () {
        if (modale2 === null) return;
        e.preventDefault();
        modale2.style.display = "none";
        modale2.setAttribute("aria-hidden", "true");
        modale2.removeAttribute("aria-model");
        modale2.removeEventListener("click", fermerModale2);
        modale2.querySelector(".js-fermer-modale2").removeEventListener("click", fermerModale2);
        modale2.querySelector(".js-retour").removeEventListener("click", fermerModale2);
        modale2.querySelector(".js-stop-modale2").removeEventListener("click", stopPropagation);
        modale2 = null;
        annuleTelechargementPhoto();
        document.querySelector("#alertes-erreurs > p").innerText = "";
        cible.style.display = null;
        cible.removeAttribute("aria-hidden");
        cible.setAttribute("aria-model", "true");
        modale = cible;
        modale.addEventListener("click", fermerModale);
        modale.querySelector(".js-fermer-modale").addEventListener("click", fermerModale);
        modale.querySelector(".js-stop-modale").addEventListener("click", stopPropagation);
    });
    modale2.querySelector(".js-stop-modale2").addEventListener("click", stopPropagation);

}

const fermerModale2 = function (e) {
    if (modale2 === null) return;
    e.preventDefault();
    modale2.style.display = "none";
    modale2.setAttribute("aria-hidden", "true");
    modale2.removeAttribute("aria-model");
    modale2.removeEventListener("click", fermerModale2);
    modale2.querySelector(".js-fermer-modale2").removeEventListener("click", fermerModale2);
    modale2.querySelector(".js-retour").removeEventListener("click", fermerModale2);
    modale2.querySelector(".js-stop-modale2").removeEventListener("click", stopPropagation);
    modale2 = null;
    annuleTelechargementPhoto();
    document.querySelector("#alertes-erreurs > p").innerText = "";
}

document.querySelector(".js-modale2").addEventListener("click", ouvrirModale2);


function recupExtension(chemin) {
    let regex = /[^.]*$/i;
    let resultats = chemin.match(regex);
    return resultats[0];
}

let imageTelechargee = "";

document.getElementById("myfile").addEventListener("change", function () {

    document.querySelector("#alertes-erreurs > p").innerText = "";

    const fichierTelecharge = document.getElementById("myfile").files[0];

    if (recupExtension(fichierTelecharge.name) == "png" || recupExtension(fichierTelecharge.name) == "jpg") {
        if (fichierTelecharge.size < 4194305) {

            const image = document.createElement('img');
            image.id = "image-telechargee";
            image.src = URL.createObjectURL(fichierTelecharge);
            image.style = "max-height: 100%";
            document.getElementById("ajout-image").getElementsByTagName("i")[0].setAttribute("style", "display: none");
            document.getElementById("ajout-image").getElementsByTagName("label")[0].setAttribute("style", "display: none");
            document.getElementById("ajout-image").getElementsByTagName("input")[0].setAttribute("style", "display: none");
            document.getElementById("ajout-image").getElementsByTagName("p")[0].setAttribute("style", "display: none");
            imageTelechargee = fichierTelecharge;
            return document.getElementById("ajout-image").appendChild(image).setAttribute("crossorigin", "");


        } else {
            document.querySelector("#alertes-erreurs > p").innerText = "Erreur : Le fichier est trop volumineux";
        }
    } else {
        document.querySelector("#alertes-erreurs > p").innerText = "Erreur : Seuls les formats .jpg et .png sont valides";
    }

});

function annuleTelechargementPhoto() { // on vide le formulaire
    if (document.getElementById("image-telechargee") === document.getElementById("ajout-image").lastChild) {
        document.getElementById("ajout-image").getElementsByTagName("i")[0].removeAttribute("style", "display: none");
        document.getElementById("ajout-image").getElementsByTagName("label")[0].removeAttribute("style", "display: none");
        document.getElementById("ajout-image").getElementsByTagName("input")[0].removeAttribute("style", "display: none");
        document.getElementById("ajout-image").getElementsByTagName("p")[0].removeAttribute("style", "display: none");
        document.getElementById("ajout-image").removeChild(document.getElementById("image-telechargee"));
        document.getElementById("titre-photo").value = "";
        document.getElementById("categorie-photo").value = "";
    } else {
        return null;
    }
};

function recupNomCategorie(id) {
    id = id - 1;
    return tableauNomCategorie[id];
}

document.getElementById("valider").addEventListener("click", function valider() {
    if (validerFormulaire()) {
        let nomCategorie = recupNomCategorie(document.getElementById("categorie-photo").value);
        let formData = new FormData();
        formData.append("image", imageTelechargee);
        formData.append("title", document.getElementById("titre-photo").value);
        formData.append("category", document.getElementById("categorie-photo").value);
        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            body: formData,
        })
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function (work) {
                if (document.getElementById("tous").style.color === "rgb(255, 255, 255)") { // Cas où le filtre sélectionné est tous
                    divGallery.appendChild(document.createElement('figure')).appendChild(document.createElement('img'));
                    divGallery.querySelector("figure:last-child").appendChild(document.createElement('figcaption'));
                    divGallery.querySelector("figure:last-child").setAttribute("id", "galerie" + work.id);
                    divGallery.querySelector("figure:last-child").setAttribute("class", nomCategorie);
                    divGallery.querySelector("figure:last-child img").setAttribute("crossorigin", "");
                    divGallery.querySelector("figure:last-child img").setAttribute("src", work.imageUrl);
                    divGallery.querySelector("figure:last-child img").setAttribute("alt", work.title);
                    divGallery.querySelector("figure:last-child figcaption").append(work.title);
                    allWorks = divGallery.innerHTML;
                } else {
                    if (document.getElementById(document.getElementById("categorie-photo").value).style.color !== "rgb(255, 255, 255)") { // cas où la photo à ajouter n'apparaitra pas dans le filtre
                        divGallery.innerHTML = allWorks;
                        divGallery.appendChild(document.createElement('figure')).appendChild(document.createElement('img'));
                        divGallery.querySelector("figure:last-child").appendChild(document.createElement('figcaption'));
                        divGallery.querySelector("figure:last-child").setAttribute("id", "galerie" + work.id);
                        divGallery.querySelector("figure:last-child").setAttribute("class", nomCategorie);
                        divGallery.querySelector("figure:last-child img").setAttribute("crossorigin", "");
                        divGallery.querySelector("figure:last-child img").setAttribute("src", work.imageUrl);
                        divGallery.querySelector("figure:last-child img").setAttribute("alt", work.title);
                        divGallery.querySelector("figure:last-child figcaption").append(work.title);
                        allWorks = divGallery.innerHTML;
                        divGallery.innerHTML = travauxFiltres;
                    } else { // Cas où le filtre sélectionné contiendra la photo à ajouter
                        divGallery.innerHTML = allWorks;
                        divGallery.appendChild(document.createElement('figure')).appendChild(document.createElement('img'));
                        divGallery.querySelector("figure:last-child").appendChild(document.createElement('figcaption'));
                        divGallery.querySelector("figure:last-child").setAttribute("id", "galerie" + work.id);
                        divGallery.querySelector("figure:last-child").setAttribute("class", nomCategorie);
                        divGallery.querySelector("figure:last-child img").setAttribute("crossorigin", "");
                        divGallery.querySelector("figure:last-child img").setAttribute("src", work.imageUrl);
                        divGallery.querySelector("figure:last-child img").setAttribute("alt", work.title);
                        divGallery.querySelector("figure:last-child figcaption").append(work.title);
                        allWorks = divGallery.innerHTML;
                        divGallery.innerHTML = travauxFiltres;
                        divGallery.appendChild(document.createElement('figure')).appendChild(document.createElement('img'));
                        divGallery.querySelector("figure:last-child").appendChild(document.createElement('figcaption'));
                        divGallery.querySelector("figure:last-child").setAttribute("id", "galerie" + work.id);
                        divGallery.querySelector("figure:last-child").setAttribute("class", nomCategorie);
                        divGallery.querySelector("figure:last-child img").setAttribute("crossorigin", "");
                        divGallery.querySelector("figure:last-child img").setAttribute("src", work.imageUrl);
                        divGallery.querySelector("figure:last-child img").setAttribute("alt", work.title);
                        divGallery.querySelector("figure:last-child figcaption").append(work.title);
                        travauxFiltres = divGallery.innerHTML;
                    }
                }
                divGalerieModale.appendChild(document.createElement('figure')).appendChild(document.createElement('img'));
                divGalerieModale.querySelector("figure:last-child").appendChild(document.createElement('figcaption'));
                divGalerieModale.querySelector("figure:last-child").setAttribute("id", "galerie-modale" + work.id);
                divGalerieModale.querySelector("div:last-child").appendChild(document.createElement('i')).setAttribute("class", "fa-regular fa-trash-can fa-2xs");
                divGalerieModale.querySelector("figure:last-child").setAttribute("class", nomCategorie);
                divGalerieModale.querySelector("figure:last-child img").setAttribute("crossorigin", "");
                divGalerieModale.querySelector("figure:last-child img").setAttribute("src", work.imageUrl);
                divGalerieModale.querySelector("figure:last-child img").setAttribute("alt", work.title);
                divGalerieModale.querySelector("figure:last-child figcaption").append("éditer");
                if (modale2 === null) return;
                modale2.style.display = "none";
                modale2.setAttribute("aria-hidden", "true");
                modale2.removeAttribute("aria-model");
                modale2.removeEventListener("click", fermerModale2);
                modale2.querySelector(".js-fermer-modale2").removeEventListener("click", fermerModale2);
                modale2.querySelector(".js-retour").removeEventListener("click", fermerModale2);
                modale2.querySelector(".js-stop-modale2").removeEventListener("click", stopPropagation);
                modale2 = null;
                document.querySelector("#alertes-erreurs > p").innerText = "";
                document.getElementById("ajout-image").getElementsByTagName("i")[0].removeAttribute("style", "display: none");
                document.getElementById("ajout-image").getElementsByTagName("label")[0].removeAttribute("style", "display: none");
                document.getElementById("ajout-image").getElementsByTagName("input")[0].removeAttribute("style", "display: none");
                document.getElementById("ajout-image").getElementsByTagName("p")[0].removeAttribute("style", "display: none");
                document.getElementById("ajout-image").removeChild(document.getElementById("image-telechargee"));
                document.getElementById("titre-photo").value = "";
                document.getElementById("categorie-photo").value = "";
                alert("Votre travail a bien été ajouté");
            })
            .catch(function (err) {
                // Une erreur est survenue
                console.log(err);
            });
    } else {
        return null;
    }
});

function validerFormulaire() { //valide ou non les éléments du formulaire en retournant true ou false
    let formulaire = false;
    let valeur = document.getElementById("titre-photo").value;
    valeur = valeur.trim(); // enlève espaces avant et après string
    if (document.getElementById("image-telechargee") === document.getElementById("ajout-image").lastChild) { // cherche si l'image est présente dans le formulaire
        if (valeur.length > 0) {
            if (document.getElementById("categorie-photo").value != "") { //catégorie choisie ?
                formulaire = true;
            } else {
                document.querySelector("#alertes-erreurs > p").innerText = "Veuillez choisir une catégorie";
                formulaire = false;
            }
        } else {
            document.querySelector("#alertes-erreurs > p").innerText = "Veuillez renseigner un titre";
            formulaire = false;
        }
    } else {
        document.querySelector("#alertes-erreurs > p").innerText = "Veuillez choisir une photo";
        formulaire = false;
    }
    return formulaire;
};




const pTexte = document.querySelector(".texte");

//for(let i=0;i<4;i++){
//      pTexte.appendChild(document.createElement('figure'))
//.appendChild(document.createElement('img'));
//pTexte.querySelector("figure:last-child").appendChild(document.createElement('figcaption'));
//pTexte.querySelector("figure:last-child img").setAttribute("crossorigin", "");
//pTexte.querySelector("figure:last-child img").setAttribute("src", "http://localhost:5678/images/abajour-tahina1651286843956.png");
//pTexte.querySelector("figure:last-child figcaption").append("titre");
//}

fetch("http://localhost:5678/api/works")
    .then(data => data.json())
    .then(jsonListWorks => {
        //console.log(jsonListWorks);
        for (let jsonWorks of jsonListWorks) {
            let work = new Works(jsonWorks);
            //console.log(work.title);
            //console.log(work.imageUrl);
                pTexte.appendChild(document.createElement('figure')).appendChild(document.createElement('img'));
                pTexte.querySelector("figure:last-child").appendChild(document.createElement('figcaption'));
                pTexte.querySelector("figure:last-child img").setAttribute("crossorigin", "");
                pTexte.querySelector("figure:last-child img").setAttribute("src", work.imageUrl);
                pTexte.querySelector("figure:last-child img").setAttribute("alt", work.title);
                pTexte.querySelector("figure:last-child figcaption").append(work.title);
            //document.querySelector(".texte").innerHTML += `<figure>
            //<img src="${work.imageUrl}" alt="${work.title}" crossorigin>
            //<figcaption>${work.title}</figcaption>
            //</figure>`
        }
    })

    .catch(function (err) {
        // Une erreur est survenue
    });
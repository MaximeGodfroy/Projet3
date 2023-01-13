document.getElementById("form").addEventListener('submit', async function (e) {
    e.preventDefault();
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let user = {
        "email": email.value,
        "password": password.value
    }
    console.log(user);
    let reponse = "";
    await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(function (res) {
            if (res.ok) {
                reponse = true;
                return res.json();
            }
        })
        .then(function (value) {
            console.log(value.token);
            sessionStorage.setItem("token", value.token);
            window.location.assign("index_edit.html");
        })
        .catch(function (err) {
            // Une erreur est survenue
            reponse = false;
        });
        if (reponse) {
            alert("Vous êtes bien connecté");
        } else {
            alert("Erreur dans l’identifiant ou le mot de passe");
        }
});

document.getElementById("form").addEventListener('submit', function (e) {
    e.preventDefault();
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let user = {
        "email": email.value,
        "password": password.value
    }
    let reponse = "";
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(function (res) {
            if (res.ok) {
                alert("Vous êtes bien connecté");
                return res.json();
            }
        })
        .then(function (value) {
            sessionStorage.setItem("token", value.token);
            window.location.assign("index_edit.html");
        })
        .catch(function (err) {
            // Une erreur est survenue
            alert("Erreur dans l’identifiant ou le mot de passe");
        });
});

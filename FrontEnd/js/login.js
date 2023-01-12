document.getElementById("form").addEventListener('submit', async function () {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let user = {
        "email": email.value,
        "password": password.value
    }
    console.log(user);
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
                alert("Vous vous êtes bien connecté");
                return res.json();
            }
        })
        .then(function (value) {
            console.log(value.token);
            sessionStorage.setItem("token", value.token);
        })
        .catch(function (err) {
            // Une erreur est survenue
            alert("Erreur dans l’identifiant ou le mot de passe");
        });
});

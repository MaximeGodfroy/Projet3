let token = "";

document.getElementById("form").addEventListener('submit', function(e){
    e.preventDefault();
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let user = {
        "email": email.value,
        "password": password.value
      }
      console.log(user);
    fetch("http://localhost:5678/api/users/login", {
	method: "POST",
	headers: { 
'Accept': 'application/json', 
'Content-Type': 'application/json' 
},
	body: JSON.stringify(user)
})
    .then(function(res){
    if(res.ok){
        return res.json();
    }
})
    .then(function(value){
        return token = value.token;
    })
    .catch(function (err) {
        // Une erreur est survenue
        alert("Le nom d'utilisateur et le mot de passe ne correspondent pas");
    });
}  
);

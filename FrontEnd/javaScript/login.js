// Création de l’objet connexion
const infoConnexion = {
    email: document.querySelector("#email"),
    motDePasse: document.querySelector("#pass"),
    envoyer: document.querySelector("#envoyer"),
 };

 let boutonLogin = infoConnexion.envoyer.addEventListener("click", (a) =>  {
    a.preventDefault(); 

    const chargeUtile = JSON.stringify({
        email: infoConnexion.email.value,
        password: infoConnexion.motDePasse.value,
    })

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { 
            Accept: "application/json",
            "Content-Type": "application/json" 
        },
        body: chargeUtile,
    })
    .then((response) => response.json())
        .then((data) => {
            sessionStorage.setItem("Token", data.token);

            if (data.message || data.error) {
                alert("Erreur dans l\'identifiant ou le mot de passe");
            } else {
                sessionStorage.setItem("isConnected", JSON.stringify(true));
                window.location.replace("index.html");
            }
        })

 })
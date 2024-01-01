// Création de l’objet connexion
const infoConnexion = {
    email: document.querySelector("#email"),
    motDePasse: document.querySelector("#pass"),
    envoyer: document.querySelector("#envoyer"),
 }
 let messageErreur = document.getElementById("messageErreur")
 let boutonLogin = infoConnexion.envoyer.addEventListener("click", (connexion) =>  {
    connexion.preventDefault()

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
                messageErreur.style.display = 'block'
            } else {
                messageErreur.style.display = 'none'
                sessionStorage.setItem("isConnected", JSON.stringify(true));
                window.location.replace("index.html");
            }
        })
 })
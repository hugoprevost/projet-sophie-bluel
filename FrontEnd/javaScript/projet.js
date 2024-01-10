const blockImage = document.querySelector(".gallery")



// gestion des filtres

// bouton tous
function btnTous(){
  //Display Objects//
  let baliseBtnTous = document.getElementById("tous")
  let baliseBtnObjets = document.getElementById("objets")
  let baliseBtnAppartements = document.getElementById("appartements")
  let baliseBtnHotels = document.getElementById("hotels")
  const boutonTous = document.querySelectorAll('div.gallery figure')
  boutonTous.forEach((element) => {
      element.style.display = 'block'
      baliseBtnTous.classList.add("btn-filtre-selection")
      baliseBtnObjets.classList.add("btn-filtre")
      baliseBtnAppartements.classList.add("btn-filtre")
      baliseBtnHotels.classList.add("btn-filtre")
      baliseBtnTous.classList.remove("btn-filtre")
      baliseBtnObjets.classList.remove("btn-filtre-selection")
      baliseBtnAppartements.classList.remove("btn-filtre-selection")
      baliseBtnHotels.classList.remove("btn-filtre-selection")
  });
}
var bouton = document.getElementById('tous')
bouton.addEventListener('click',btnTous)

// bouton objets
function btnObjets(){
  //Display Objects//
  const boutonObjets = document.querySelectorAll('div.gallery figure')
  let baliseBtnTous = document.getElementById("tous")
  let baliseBtnObjets = document.getElementById("objets")
  let baliseBtnAppartements = document.getElementById("appartements")
  let baliseBtnHotels = document.getElementById("hotels")
  boutonObjets.forEach((element) => {
    const categoryId = element.getAttribute('category-id')
    if (categoryId === '1') {
      element.style.display = 'block'
      baliseBtnTous.classList.add("btn-filtre")
      baliseBtnObjets.classList.add("btn-filtre-selection")
      baliseBtnAppartements.classList.add("btn-filtre")
      baliseBtnHotels.classList.add("btn-filtre")
      baliseBtnTous.classList.remove("btn-filtre-selection")
      baliseBtnObjets.classList.remove("btn-filtre")
      baliseBtnAppartements.classList.remove("btn-filtre-selection")
      baliseBtnHotels.classList.remove("btn-filtre-selection")
    } else {
      element.style.display = 'none'
    }
  });
}
var bouton = document.getElementById('objets')
bouton.addEventListener('click',btnObjets)

// bouton appartements
function btnAppartements(){
  //Display Objects//
  let baliseBtnTous = document.getElementById("tous")
  let baliseBtnObjets = document.getElementById("objets")
  let baliseBtnAppartements = document.getElementById("appartements")
  let baliseBtnHotels = document.getElementById("hotels")
  const boutonAppartements = document.querySelectorAll('div.gallery figure')
  boutonAppartements.forEach((element) => {
    const categoryId = element.getAttribute('category-id')
    if (categoryId === '2') {
      element.style.display = 'block'
      baliseBtnTous.classList.add("btn-filtre")
      baliseBtnObjets.classList.add("btn-filtre")
      baliseBtnAppartements.classList.add("btn-filtre-selection")
      baliseBtnHotels.classList.add("btn-filtre")
      baliseBtnTous.classList.remove("btn-filtre-selection")
      baliseBtnObjets.classList.remove("btn-filtre-selection")
      baliseBtnAppartements.classList.remove("btn-filtre")
      baliseBtnHotels.classList.remove("btn-filtre-selection")
    } else {
      element.style.display = 'none'
    }
  });
}
var bouton = document.getElementById('appartements')
bouton.addEventListener('click',btnAppartements)

// bouton hotel
function btnHotels(){
  //Display Objects//
  let baliseBtnTous = document.getElementById("tous")
  let baliseBtnObjets = document.getElementById("objets")
  let baliseBtnAppartements = document.getElementById("appartements")
  let baliseBtnHotels = document.getElementById("hotels")
  const boutonHotel = document.querySelectorAll('div.gallery figure')
  boutonHotel.forEach((element) => {
    const categoryId = element.getAttribute('category-id')
    if (categoryId === '3') {
      element.style.display = 'block'
      baliseBtnTous.classList.add("btn-filtre")
      baliseBtnObjets.classList.add("btn-filtre")
      baliseBtnAppartements.classList.add("btn-filtre")
      baliseBtnHotels.classList.add("btn-filtre-selection")
      baliseBtnTous.classList.remove("btn-filtre-selection")
      baliseBtnObjets.classList.remove("btn-filtre-selection")
      baliseBtnAppartements.classList.remove("btn-filtre-selection")
      baliseBtnHotels.classList.remove("btn-filtre")
    } else {
      element.style.display = 'none'
    }
  });
}
var bouton = document.getElementById('hotels')
bouton.addEventListener('click',btnHotels)

// Vérification connexion

const connecte = document.getElementById("connexion")
const nonConnecte = document.getElementById("horsConnexion")
const modeEdition = document.getElementById("edition")
const edition = document.getElementById("edition-portfolio-texte")
const filtreEdition = document.getElementById("filtre")

if (JSON.parse(sessionStorage.getItem("isConnected"))) {
  connecte.style.display = 'none'
  nonConnecte.style.display = 'block'
  modeEdition.style.display ='flex'
  edition.style.display ='flex'
  filtreEdition.style.display ='none'
    
} else {
  connecte.style.display = 'block'
  nonConnecte.style.display = 'none'
  modeEdition.style.display ='none'
  edition.style.display ='none'
  filtreEdition.style.display ='flex'
}

// Suppression du status de connexion 
nonConnecte.addEventListener("click", (deconnexion) => {
  deconnexion.preventDefault()
  sessionStorage.removeItem("Token")
  sessionStorage.removeItem("isConnected")
  window.location.replace("index.html")
})
const blockImage = document.querySelector(".gallery")

function creationBlockProjet(work) {
  const projet = document.createElement('figure')
  const projetCaption = document.createElement('figcaption')
  const projetImage = document.createElement('img')

  projetImage.src = work.imageUrl
  projetImage.alt = work.title
  projetCaption.innerHTML = work.title
  projet.setAttribute('data-id', work.id);
  projet.setAttribute('category-id', work.categoryId)
  
  projet.appendChild(projetImage)
  projet.appendChild(projetCaption)    

  return projet;
}

fetch('http://localhost:5678/api/works')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((work) => {
      const projet = creationBlockProjet(work);
      blockImage.appendChild(projet);
    });
  });

  //let baliseBtn = document.getElementById("tous");
  //baliseBtn.classList.add("btn-filtre-selection")
  //baliseBtn.classList.remove("btn-filtre")

// gestion des filtres

// bouton tous
function btnTous(){
  //Display Objects//
  let baliseBtnTous = document.getElementById("tous");
  let baliseBtnObjets = document.getElementById("objets");
  let baliseBtnAppartements = document.getElementById("appartements");
  let baliseBtnHotels = document.getElementById("hotels");
  const boutonTous = document.querySelectorAll('div.gallery figure');
  boutonTous.forEach((element) => {
      element.style.display = 'block';
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
var bouton = document.getElementById('tous');
bouton.addEventListener('click',btnTous);

// bouton objets
function btnObjets(){
  //Display Objects//
  const boutonObjets = document.querySelectorAll('div.gallery figure');
  let baliseBtnTous = document.getElementById("tous");
  let baliseBtnObjets = document.getElementById("objets");
  let baliseBtnAppartements = document.getElementById("appartements");
  let baliseBtnHotels = document.getElementById("hotels");
  boutonObjets.forEach((element) => {
    const categoryId = element.getAttribute('category-id');
    if (categoryId === '1') {
      element.style.display = 'block';
      baliseBtnTous.classList.add("btn-filtre")
      baliseBtnObjets.classList.add("btn-filtre-selection")
      baliseBtnAppartements.classList.add("btn-filtre")
      baliseBtnHotels.classList.add("btn-filtre")
      baliseBtnTous.classList.remove("btn-filtre-selection")
      baliseBtnObjets.classList.remove("btn-filtre")
      baliseBtnAppartements.classList.remove("btn-filtre-selection")
      baliseBtnHotels.classList.remove("btn-filtre-selection")
    } else {
      element.style.display = 'none';
    }
  });
}
var bouton = document.getElementById('objets');
bouton.addEventListener('click',btnObjets);

// bouton appartements
function btnAppartements(){
  //Display Objects//
  let baliseBtnTous = document.getElementById("tous");
  let baliseBtnObjets = document.getElementById("objets");
  let baliseBtnAppartements = document.getElementById("appartements");
  let baliseBtnHotels = document.getElementById("hotels");
  const boutonAppartements = document.querySelectorAll('div.gallery figure');
  boutonAppartements.forEach((element) => {
    const categoryId = element.getAttribute('category-id');
    if (categoryId === '2') {
      element.style.display = 'block';
      baliseBtnTous.classList.add("btn-filtre")
      baliseBtnObjets.classList.add("btn-filtre")
      baliseBtnAppartements.classList.add("btn-filtre-selection")
      baliseBtnHotels.classList.add("btn-filtre")
      baliseBtnTous.classList.remove("btn-filtre-selection")
      baliseBtnObjets.classList.remove("btn-filtre-selection")
      baliseBtnAppartements.classList.remove("btn-filtre")
      baliseBtnHotels.classList.remove("btn-filtre-selection")
    } else {
      element.style.display = 'none';
    }
  });
}
var bouton = document.getElementById('appartements');
bouton.addEventListener('click',btnAppartements);

// bouton hotel
function btnHotels(){
  //Display Objects//
  let baliseBtnTous = document.getElementById("tous");
  let baliseBtnObjets = document.getElementById("objets");
  let baliseBtnAppartements = document.getElementById("appartements");
  let baliseBtnHotels = document.getElementById("hotels");
  const boutonHotel = document.querySelectorAll('div.gallery figure');
  boutonHotel.forEach((element) => {
    const categoryId = element.getAttribute('category-id');
    if (categoryId === '3') {
      element.style.display = 'block';
      baliseBtnTous.classList.add("btn-filtre")
      baliseBtnObjets.classList.add("btn-filtre")
      baliseBtnAppartements.classList.add("btn-filtre")
      baliseBtnHotels.classList.add("btn-filtre-selection")
      baliseBtnTous.classList.remove("btn-filtre-selection")
      baliseBtnObjets.classList.remove("btn-filtre-selection")
      baliseBtnAppartements.classList.remove("btn-filtre-selection")
      baliseBtnHotels.classList.remove("btn-filtre")
    } else {
      element.style.display = 'none';
    }
  });
}
var bouton = document.getElementById('hotels');
bouton.addEventListener('click',btnHotels);

    
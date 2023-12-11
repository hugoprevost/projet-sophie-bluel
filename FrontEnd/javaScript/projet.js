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


// gestion des filtres

// bouton tous
function btnTous(){
  //Display Objects//
  const boutonTous = document.querySelectorAll('div.gallery figure');
  boutonTous.forEach((element) => {
    const categoryId = element.getAttribute('category-id');
      element.style.display = 'block';
  });
}
var bouton = document.getElementById('tous');
bouton.addEventListener('click',btnTous);

// bouton objets
function btnObjets(){
  //Display Objects//
  const boutonObjets = document.querySelectorAll('div.gallery figure');
  boutonObjets.forEach((element) => {
    const categoryId = element.getAttribute('category-id');
    if (categoryId === '1') {
      element.style.display = 'block';
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
  const boutonAppartements = document.querySelectorAll('div.gallery figure');
  boutonAppartements.forEach((element) => {
    const categoryId = element.getAttribute('category-id');
    if (categoryId === '2') {
      element.style.display = 'block';
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
  const boutonHotel = document.querySelectorAll('div.gallery figure');
  boutonHotel.forEach((element) => {
    const categoryId = element.getAttribute('category-id');
    if (categoryId === '3') {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  });
}
var bouton = document.getElementById('hotels');
bouton.addEventListener('click',btnHotels);

    
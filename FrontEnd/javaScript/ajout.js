const ajout = document.querySelector('#ajout');
const ajoutProjet = document.querySelector('#ajout-content');
const modalPhoto = document.querySelector('#ajout-photo');
const fermer = document.querySelector('#fermerAjout');


function affichageAjout() {
    ajout.style.display = 'block';
}

function fermerAjout() {
    ajout.style.display = 'none';
}

fermer.addEventListener('click', fermerAjout);

modalPhoto.addEventListener('click', function(e) {
  e.stopPropagation();
});
  
ajoutProjet.addEventListener('click', function(e) {
  e.stopPropagation();
});

ajout.addEventListener('click', fermerAjout);


//Add photo button//

const newPhotoBtn = document.querySelector('#new-photo');
const returnBtn = document.querySelector('#ajout-return');
const photoClose = document.querySelector("#fermerAjout2");


newPhotoBtn.addEventListener('click', function() {
  ajoutProjet.style.display = 'none';
  modalPhoto.style.display = 'block';
});

returnBtn.addEventListener('click', function(){
  ajoutProjet.style.display = 'flex';
  modalPhoto.style.display = 'none';
})

photoClose.addEventListener('click', fermerAjout);


//ADD WORKS TO THE MODAL//

const imagesModalContainer = document.querySelector('.gallery-ajout')

function createModalWorkFigure(work) {
  const figure = document.createElement('figure')
  const figureImage = document.createElement('img')
  const deleteIcon = document.createElement('i') 
        
  figureImage.src = work.imageUrl
  figureImage.alt = work.title
  figure.setAttribute('data-id', work.id); // Add a data-id attribute to store the work ID
  deleteIcon.className = "fa-regular fa-trash-can" 

  figure.appendChild(figureImage)
  figure.appendChild(deleteIcon)

  // Add a delete event when clicking on the "delete" icon
  deleteIcon.addEventListener('click', (event) => {
    event.preventDefault();
    deleteWorkById(work.id);
  });

  return figure;
}

fetch('http://localhost:5678/api/works')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((work) => {
      const figure = createModalWorkFigure(work);
      imagesModalContainer.appendChild(figure);
    });
  });


  function deleteWorkById(workId) {
  const token = sessionStorage.getItem("Token");
  const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce travail ?");
  if (confirmation) {
    fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: {
        "Accept" : 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok){
      throw new error ('La supression du travai à echoué.');
    }
    const modalWorkToRemove = document.querySelector(`figure[data-id="${workId}"]`);
    if (modalWorkToRemove) {
      modalWorkToRemove.remove();
      
    const galleryWorkToRemove = document.querySelector(`figure[data-id="${workId}"]`);
    if (galleryWorkToRemove) {
        galleryWorkToRemove.remove();
    } else {
        console.error('Élément à supprimer non trouvé dans la galerie principale');
      }
    } 
  })
  .catch(error => console.error(error));
  }    
}  

//Check form filled//

const titre = document.getElementById('ajout-photo-titre');
const category = document.getElementById('photo-category');
const imageInput = document.getElementById('image');
const submitButton = document.getElementById('ajout-valider');

function checkForm() {
  if (titre.value !== '' && category.value !== '' && imageInput.value !== '') {
    submitButton.style.backgroundColor = '#1D6154';
  } else {
    submitButton.style.backgroundColor = '';
    }
  }

titre.addEventListener('input', checkForm);
category.addEventListener('change', checkForm);
imageInput.addEventListener('change', checkForm);


//ADD NEW WORK//

const btnValider = document.getElementById("ajout-valider");
btnValider.addEventListener("click", addNewWork);

function addNewWork(event) {
  event.preventDefault(); 

  const token = sessionStorage.getItem("Token");

  const titre = document.getElementById("ajout-photo-titre").value;
  const category = document.getElementById("photo-category").value;
  const image = document.getElementById("image").files[0];


  if(!titre || !category || !image) {
    alert('Veuillez remplir tous les champs du formulaire.')
    return;
  }

  //check if the image does not exceed 4mo//
  if (image.size > 4 * 1024 * 1024) {
    alert("La taille de l'image ne doit pas dépasser 4 Mo.");
    return;
  }
  
  const formData = new FormData();
  formData.append("title", titre);
  formData.append("category", category);
  formData.append("image", image);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      "Accept" : 'application/json', 
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(response => response.json()) 
  .then(work => {
    //create and add the new work to the gallery//
    const figure = createWorkFigure(work);
    const gallery = document.querySelector('.gallery');
    gallery.appendChild(figure);
  
    //create and add the new work to the modal gallery//
    const figureModal = createModalWorkFigure(work);
    const galleryModal = document.querySelector('.gallery-ajout');
    galleryModal.appendChild(figureModal);
  
    alert('Le nouvel travail a été ajouté avec succès.');
  })
  .catch(error => console.error(error));
}
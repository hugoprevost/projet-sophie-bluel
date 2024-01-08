const ajout = document.querySelector('#ajout')
const ajoutProjet = document.querySelector('#ajout-contenu')
const ajoutPhoto = document.querySelector('#ajout-photo')
const fermer = document.querySelector('#fermerAjout')


function affichageAjout() {
    ajout.style.display = 'block'
}

function fermerAjout() {
    ajout.style.display = 'none'
}

fermer.addEventListener('click', fermerAjout)

ajoutPhoto.addEventListener('click', function(e) {
  e.stopPropagation()
});
  
ajoutProjet.addEventListener('click', function(e) {
  e.stopPropagation()
});

ajout.addEventListener('click', fermerAjout);


//Bouton pour ajouter un nouveau projet//

const nouvellePhotoBouton = document.querySelector('#nouvelle-photo')
const boutonRetour = document.querySelector('#ajout-retour')
const fermerPhoto = document.querySelector("#fermerAjout2")


nouvellePhotoBouton.addEventListener('click', function() {
  ajoutProjet.style.display = 'none'
  ajoutPhoto.style.display = 'block'
});

boutonRetour.addEventListener('click', function(){
  ajoutProjet.style.display = 'flex'
  ajoutPhoto.style.display = 'none'
})

fermerPhoto.addEventListener('click', fermerAjout)


//Ajout d'un projet//

const encartGallerieAjout = document.querySelector('.gallerie-ajout')

function encartAjoutProjet(work) {
  const creationFigure = document.createElement('figure')
  const creationImage = document.createElement('img')
  const supprimeIcon = document.createElement('i') 
        
  creationImage.src = work.imageUrl
  creationImage.alt = work.title
  // Attribution de l'ID du projet
  creationFigure.setAttribute('data-id', work.id)
  supprimeIcon.className = "fa-regular fa-trash-can" 

  creationFigure.appendChild(creationImage)
  creationFigure.appendChild(supprimeIcon)

  // Ajout de l'icon suppression sur le nouveau projet
  supprimeIcon.addEventListener('click', (event) => {
    event.preventDefault()
    supressionProjet(work.id)
  });

  return creationFigure
}

const works = [];
fetch('http://localhost:5678/api/works')
  .then((response) => response.json())
  .then((data) => {
    displayWorks(data)
    works = data
  })

  function displayWorks(works){
    encartGallerieAjout.innerHTML=''
    works.forEach((work) => {
      const creationFigure = encartAjoutProjet(work)
      encartGallerieAjout.appendChild(creationFigure)
    })
  }

  function supressionProjet(workId) {
  const identification = sessionStorage.getItem("Token")
  const confirmationSupression = confirm("Êtes-vous sûr de vouloir supprimer ce travail ?")
  if (confirmationSupression) {
    fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: {
        "Accept" : 'application/json',
        "Authorization" : `Bearer ${identification}`
      }
    })
    .then(response => {
      if (!response.ok){
      throw new error ('La supression du travai à échoué.')
    }
    const presentWorks = works.filter((work)=> work.id !== workId)
    displayWorks(presentWorks);
  })
  .catch(error => console.error(error))
  }
}  

//Vérification d'un nouveau projet

const titre = document.getElementById('photo-titre')
const categori = document.getElementById('photo-categori')
const image = document.getElementById('image')
const bouttonValide = document.getElementById('ajout-valider')

function checkForm() {
  if (titre.value !== '' && categori.value !== '' && image.value !== '') {
    bouttonValide.style.backgroundColor = '#1D6154'
  } else {
    bouttonValide.style.backgroundColor = ''
    }
  }

titre.addEventListener('input', checkForm)
categori.addEventListener('change', checkForm)
image.addEventListener('change', checkForm)


//Validation de l'ajout

const validerBoutton = document.getElementById("ajout-valider")
validerBoutton.addEventListener("click", ajoutNouveauProjet)

function ajoutNouveauProjet(event) {
  event.preventDefault()

  const identification = sessionStorage.getItem("Token")

  const titre = document.getElementById("photo-titre").value
  const categori = document.getElementById("photo-categori").value
  const image = document.getElementById("image").files[0]


  if(!titre || !categori || !image) {
    alert('Veuillez remplir tous les champs du formulaire.')
    return
  }

  //Vérification de la taille de l'image
  if (image.size > 4 * 1024 * 1024) {
    alert("La taille de l'image est trop lourd, 4Mo maximum")
    return
  }
  
  const informationProjet = new FormData()
  informationProjet.append("title", titre)
  informationProjet.append("category", categori)
  informationProjet.append("image", image)

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: informationProjet,
    headers: {
      "Accept" : 'application/json', 
      "Authorization" : `Bearer ${identification}`
    }
  })
  .then(response => response.json()) 
  .then(work => {
    //ajout du projet dans la gallerie
    const creationFigure = createWorkFigure(work)
    const gallerie = document.querySelector('.gallery')
    gallerie.appendChild(creationFigure)
  
    //ajout du projet dans l'encart d'ajout de projet
    const encartProjet = encartAjoutProjet(work)
    const gallerieAjout = document.querySelector('.gallerie-ajout')
    gallerieAjout.appendChild(encartProjet) 
  })
  .catch(error => console.error(error));
  alert('Le nouveau projet a été ajouté avec succès.')
}

//affichage image aperçu
const imageApercu = document.getElementById("image")
const imageLabel = document.getElementById("ajout-image")
const imageTexte = document.querySelector("#formulaire-photo > p")
const iconeImage = document.querySelector("#iImage")

imageApercu.addEventListener("change", function () {
  const imageSelectionne = imageApercu.files[0]

  const apercuImage = document.createElement("img")
  apercuImage.src = URL.createObjectURL(imageSelectionne)
  apercuImage.style.maxHeight = "100%"
  apercuImage.style.width = "auto"

  imageLabel.style.display = "none"
  imageTexte.style.display = "none"
  imageApercu.style.display = "none"
  iImage.style.display = "none"
  document.getElementById("formulaire-photo").appendChild(apercuImage)
})
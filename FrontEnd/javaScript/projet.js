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
    
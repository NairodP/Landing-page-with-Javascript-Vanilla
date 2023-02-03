function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");
const modalbgContent = document.querySelector(".content");


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// close modal form
function closeModal() {

  // Ajout de la class "content-off" afin de déclencher l'animation de fermeture du modal d'inscription
  modalbgContent.classList.add("content-off");
  setTimeout(function() {
    modalbg.style.display = "none";
  }, 450);
  setTimeout(function() {
    modalbgContent.classList.remove("content-off");
  }, 500);
}

// delete active class when we are in home page
const links = document.querySelectorAll('.nav-link');
    
if (links.length) {
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      links.forEach((link) => {
          link.classList.remove('active');
          link.style.display = "block";
      });
      e.preventDefault();
      link.classList.add('active');
      const spans = link.querySelectorAll('a.nav-link span');
      spans.forEach((span) => {
        if (span.textContent === "Accueil") {
          link.style.display = "none";
        }
      });
    });
  });
}

// Quand le formulaire complet est envoyé, msg de confirmation
function validate() {

  const first = document.forms["reserve"]["first"].value;
  const last = document.forms["reserve"]["last"].value;
  const email = document.forms["reserve"]["email"].value;
  const birthdate = document.forms["reserve"]["birthdate"].value;
  const quantity = document.forms["reserve"]["quantity"].value;

  const checkbox1 = document.getElementById("checkbox1").value;
  const checkbox2 = document.getElementById("checkbox2").value;


  // Si tout est valide, soumission
  alert("Merci ! Votre réservation a été reçue.");
  return true;
}

// Gestion des erreures dans le formumaire


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
  setTimeout(function () {
    modalbg.style.display = "none";
  }, 450);
  setTimeout(function () {
    modalbgContent.classList.remove("content-off");
  }, 500);
}

// delete active class when we are in home page
const links = document.querySelectorAll(".nav-link");

if (links.length) {
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      links.forEach((link) => {
        link.classList.remove("active");
        link.style.display = "block";
      });
      e.preventDefault();
      link.classList.add("active");
      const spans = link.querySelectorAll("a.nav-link span");
      spans.forEach((span) => {
        if (span.textContent === "Accueil") {
          link.style.display = "none";
        }
      });
    });
  });
}

// Vérification de la validité des différents champs du formulaire et soumission de msgs d'erreur dans le cas contraire
function validate() {

  // vérifie si le prénom et le nom ont des valeurs correctes (que du texte)
  function checkFirstLast() {
    let first = document.forms["reserve"]["first"].value;
    let last = document.forms["reserve"]["last"].value;
    let regexpCheckFirstLast = /^[a-zA-Z\u00C0-\u00FF-]+$/;
    if (regexpCheckFirstLast.test(first) && regexpCheckFirstLast.test(last)) {
      console.log("Les valeurs des inputs sont valides");
    } else {
      console.log("Les valeurs des inputs ne sont pas valides");
    }
  }

  // Vérifie si l'adresse email est valide
  function isValidEmail() {
    let email = document.forms["reserve"]["email"].value;

    let emailRegexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailRegexp.test(email)) {
      console.log("L'email est valide");
    } else {
      console.log("L'email n'est pas valide");
    }
  }

  // Vérifie que la personne est majeure
  function checkAge() {
    let birthdate = new Date(document.forms["reserve"]["birthdate"].value);
    let today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    let m = today.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
    if (age >= 18) {
      console.log("La personne est majeure.");
    } else {
      console.log("La personne n'est pas majeure.");
    }
  }

  // Vérifie qu'un chiffre/nombre entre 0 et 99 est entrée
  let quantity = document.forms["reserve"]["quantity"].value;
  if (quantity >= 0 && quantity <= 99 && !isNaN(quantity)) {
    console.log("La valeur entrée est valide.");
  } else {
    console.log("La valeur entrée n'est pas valide.");
  }

  // Vérifie qu'au moins un input de type "radio" est sélectionné
  function checkRadioSelection() {
    let radioInputs = document.querySelectorAll('input[type="radio"]');
    for (let i = 0; i < radioInputs.length; i++) {
      if (radioInputs[i].checked) {
        return true;
      }
    }
    return false;
  }
  if (checkRadioSelection()) {
    console.log("Au moins un bouton radio est sélectionné");
  } else {
    console.log("Aucun bouton radio n'est sélectionné");
  }

  // Vérifie que les terms sont acceptés
  let checkbox = document.getElementById("checkbox1");
  if (checkbox.checked) {
    console.log("La case à cocher est cochée.");
  } else {
    console.log("La case à cocher n'est pas cochée.");
  }

  // Si tout est valide, soumission
  alert("Merci ! Votre réservation a été reçue.");
  return true;
}

// Gestion des erreures dans le formumaire

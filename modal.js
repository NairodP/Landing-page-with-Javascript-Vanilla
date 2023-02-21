
// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelectorAll(".close");
const modalbgContent = document.querySelector(".content");

// My DOM Elements
const links = document.querySelectorAll(".nav-link");
const modalBody = document.querySelector(".modal-body");
const form = document.getElementById("form-modal");
const formDataElements = document.querySelectorAll(".formData");
const birthdate = document.querySelector('input[name="birthdate"]');
const dateElement = birthdate.parentNode;
const quantity = document.querySelector('input[name="quantity"]');
const quantityElement = quantity.parentNode;
const radioButtons = document.querySelectorAll('input[type="radio"]');
const termsCheckbox = document.getElementById("checkbox1");
const containerConfirmation = document.querySelector(".container-confirmation");

// Nav
const hamburgerButton = document.querySelector(".nav-toggler");
const navigation = document.querySelector("nav");
const mobNav = document.querySelector(".mobile-nav");

hamburgerButton.addEventListener("click", toggleNav);

function toggleNav() {
  hamburgerButton.classList.toggle("active");
  navigation.classList.toggle("active");

  // if (navigation.classList == "active") {
  //   mobNav.style.position = "fixed";
  // }
  // else {
  //   mobNav.style.position = "absolute";
  // }
}

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
  if (checkEmptyFields()) {
    // Ajout de la class "content-off" afin de déclencher l'animation de fermeture du modal d'inscription
    modalbgContent.classList.add("content-off");

    // Fait aparaitre de nouveau le formulaire
    modalBody.style.display = "block";
    // containerConfirmation.remove();

    setTimeout(function () {
      modalbg.style.display = "none";
    }, 450);
    setTimeout(function () {
      modalbgContent.classList.remove("content-off");
    }, 500);

    // Supprime toutes les valeurs dans les inputs

    // Récupération de tous les inputs de la page
    const inputs = document.querySelectorAll("input");

    // Parcourir tous les inputs
    inputs.forEach((input) => {
      // Vérifier le type de l'input et réinitialiser la valeur
      switch (input.type) {
        case "text":
          input.value = "";
          break;
        case "email":
          input.value = "";
          break;
        case "date":
          input.value === todayDefault;
          break;
        case "number":
          input.value = "";
          break;
        case "checkbox":
          input.checked = false;
          break;
        default:
          break;
      }
    });
  } else {
    // Ajout de la class "content-off" afin de déclencher l'animation de fermeture du modal d'inscription
    modalbgContent.classList.add("content-off");
    setTimeout(function () {
      modalbg.style.display = "none";
    }, 450);
    setTimeout(function () {
      modalbgContent.classList.remove("content-off");
    }, 500);
  }
}

// Nav : Enleve la classe active lorsque l'on est sur la page d'accueil
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

// FORM //

// RegExp
const regexpMap = {
  first: /^[a-zA-Z\u00C0-\u00FF-]+$/, // Uniquement lettres Maj/Min et "-"
  last: /^[a-zA-Z\u00C0-\u00FF-]+$/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/,
};
const dateFormat = /^(1923|19[2-9][0-9]|20[0-2][0-3])-\d{2}-\d{2}$/; // AAAA-MM-JJ avec AAAA compris entre 1923 et 2023
const quantityRegExp = /^([0-9]|[0-9][0-9])$/; // Nbr seulement compris entre 0 et 99 inclus, pas de caractères spéciaux

// Errors Msg
const errorMessageMap = {
  first: "Le champ doit contenir uniquement des lettres",
  last: "Le champ doit contenir uniquement des lettres",
  email: "L'adresse email n'est pas valide",
};
const underageError = "Inscription ouverte aux majeurs uniquement";
const dateFormatError =
  "La date de naissance doit être écrite sous ce format JJ / MM / AAAA";
const suitableFormatYearError = "Votre année de naissance n'est pas correcte";
const quantityError = "La valeur doit être positive et comprise entre 0 et 99";
const radioError = "Veuillez sélectionner 1 tournoi";
const termsError = "Les conditions d'utilisation doivent être acceptées";
const defaultError = "Le champ doit être rempli";

//
formDataElements.forEach((formDataElement) => {
  const inputElement = formDataElement.querySelector("input");

  inputElement.addEventListener("change", checkFLE); // FLE = First, Last, Email

  function checkFLE() {
    let errorMessageFLE = "";
    const regexp = regexpMap[inputElement.name];

    if (regexp && !regexp.test(inputElement.value)) {
      errorMessageFLE = errorMessageMap[inputElement.name];
    }

    if (
      inputElement.name === "first" ||
      inputElement.name === "last" ||
      inputElement.name === "email"
    ) {
      if (inputElement.value == 0) {
        errorMessageFLE = defaultError;
      } else if (
        inputElement.name === "first" ||
        inputElement.name === "last"
      ) {
        if (inputElement.value.length < 2) {
          errorMessageFLE = "Le champ doit contenir au minimum 2 caractères";
        }
      }
    }
    if (errorMessageFLE) {
      formDataElement.setAttribute("data-error-visible", "true");
      formDataElement.setAttribute("data-error", errorMessageFLE);
      return false;
    } else {
      formDataElement.removeAttribute("data-error-visible");
      formDataElement.removeAttribute("data-error");
      return true;
    }
  }
});

//
let todayDefault = new Date().toISOString().substring(0, 10);
birthdate.value = todayDefault;
birthdate.addEventListener("change", checkAge);
function checkAge(e) {
  let birthdateValue = e.target.value;
  let suitableYear = birthdate.value.substring(0, 4); // Récup AAAA pour voir si compris entre 1923 et 2023 inclus
  if (!birthdateValue || birthdate.value === todayDefault) {
    dateElement.setAttribute("data-error-visible", "true");
    dateElement.setAttribute("data-error", defaultError);
    return false;
  } else if (suitableYear <= 1922 || suitableYear >= 2024) {
    dateElement.setAttribute("data-error-visible", "true");
    dateElement.setAttribute("data-error", suitableFormatYearError);
    return false;
  } else if (!dateFormat.test(birthdateValue)) {
    dateElement.setAttribute("data-error-visible", "true");
    dateElement.setAttribute("data-error", dateFormatError);
    return false;
  }

  const today = new Date(); // Vérif si personne majeure
  birthdateValue = new Date(birthdateValue);
  let age = today.getFullYear() - birthdateValue.getFullYear();
  const m = today.getMonth() - birthdateValue.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthdateValue.getDate())) {
    age--;
  }
  if (age < 18) {
    dateElement.setAttribute("data-error-visible", "true");
    dateElement.setAttribute("data-error", underageError);
    return false;
  } else {
    dateElement.removeAttribute("data-error-visible");
    dateElement.removeAttribute("data-error");
    return true;
  }
}

//
quantity.addEventListener("blur", checkQuantity);
function checkQuantity(event) {
  const value = event.target.value;
  if (value === "") {
    event.target.value = "0";
    quantityElement.removeAttribute("data-error-visible");
    quantityElement.removeAttribute("data-error");
    return true;
  }
  const isValid = quantityRegExp.test(value);
  if (!isValid) {
    quantityElement.setAttribute("data-error-visible", "true");
    quantityElement.setAttribute("data-error", quantityError);
    return false;
  } else {
    quantityElement.removeAttribute("data-error-visible");
    quantityElement.removeAttribute("data-error");
    return true;
  }
}

// Vérifie si au moins 1 tournoi est sélectionné
function validRadioButton() {
  let isChecked = false;
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      isChecked = true;
      break;
    }
  }
  if (!isChecked) {
    for (let i = 0; i < radioButtons.length; i++) {
      radioButtons[i].parentNode.setAttribute("data-error-visible", "true");
      radioButtons[i].parentNode.setAttribute("data-error", radioError);
      return false;
    }
  } else {
    for (let i = 0; i < radioButtons.length; i++) {
      radioButtons[i].parentNode.removeAttribute("data-error-visible");
      radioButtons[i].parentNode.removeAttribute("data-error");
      return true;
    }
  }
}

// Vérifie si la case terms est "checked"
termsCheckbox.addEventListener("click", toggleCheck);
function toggleCheck() {
  if (termsCheckbox.hasAttribute("checked")) {
    termsCheckbox.removeAttribute("checked");
    return false;
  } else {
    termsCheckbox.setAttribute("checked", "");
    return true;
  }
}
// Vérifie le changement de valeur de la case terms
termsCheckbox.addEventListener("change", termsCheck);
function termsCheck() {
  if (
    termsCheckbox.checked ||
    termsCheckbox.parentNode.hasAttribute("data-error-visible")
  ) {
    termsCheckbox.parentNode.removeAttribute("data-error-visible");
    termsCheckbox.parentNode.removeAttribute("data-error");
  } else {
    termsCheckbox.parentNode.setAttribute("data-error-visible", "true");
    termsCheckbox.parentNode.setAttribute("data-error", termsError);
  }
}

// Verif si tous les champs sont remplis
function checkEmptyFields() {
  let hasError = false;

  formDataElements.forEach((formDataElement) => {
    const inputElement = formDataElement.querySelector("input");

    if (inputElement.value.trim() === "") {
      formDataElement.setAttribute("data-error-visible", "true");
      formDataElement.setAttribute("data-error", defaultError);
      hasError = true;
    } else {
      formDataElement.removeAttribute("data-error-visible");
      formDataElement.removeAttribute("data-error");
    }
    if (birthdate.value == todayDefault) {
      dateElement.setAttribute("data-error-visible", "true");
      dateElement.setAttribute("data-error", defaultError);
      hasError = true;
    }
    if (!validRadioButton()) {
      hasError = true;
    }
    if (termsCheckbox.parentNode.hasAttribute("data-error-visible")) {
      hasError = true;
    }
  });

  return !hasError;
}

//
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!checkEmptyFields()) {
    let btnSubmit = document.querySelector(".btn-submit");

    // alert("formulaire incomplet ! \nVeuillez remplir l'intégralité des champs");

    btnSubmit.classList.add("nope-anim");

    setTimeout(function () {
      btnSubmit.classList.remove("nope-anim");
    }, 400);

    return false;
  } else {
    // Cache le formulaire
    modalBody.style.display = "none";

    // Donne une height à content
    modalbgContent.style.height = "100%";

    // Créer un nouvel élément "div"
    const div = document.createElement("div");
    div.className = "container-confirmation";

    // Ajouter un élément "p" avec le texte "Merci pour votre inscription"
    const p = document.createElement("p");
    p.className = "para-confirmation appear";
    p.innerText = "Merci pour \n votre inscription !";
    div.appendChild(p);

    // Ajouter un élément "button" avec le texte "Fermer"
    const button = document.createElement("button");
    button.id = "close-btn-confirmation";
    button.innerText = "Fermer";
    div.appendChild(button);

    // Insérer le nouvel élément "div" après la balise "span"
    const span = document.querySelector(".close");
    span.parentNode.insertBefore(div, span.nextSibling);

    const submitForm = document.querySelector("#close-btn-confirmation");
    submitForm.addEventListener("click", closeModal);
  }
});

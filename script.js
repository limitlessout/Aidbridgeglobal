// =========================
// MENU MOBILE
// =========================

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if(menuToggle && nav){

  // OUVRIR / FERMER MENU

  menuToggle.addEventListener("click", (e) => {

    e.stopPropagation();

    nav.classList.toggle("active");

  });

  // FERMER APRÈS CLIC SUR UN LIEN

  document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("active");

    });

  });

  // FERMER SI CLICK EXTÉRIEUR

  document.addEventListener("click", (e) => {

    if(
      !nav.contains(e.target) &&
      !menuToggle.contains(e.target)
    ){

      nav.classList.remove("active");

    }

  });

}

// =========================
// HEADER AU SCROLL
// =========================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

  if(window.scrollY > 50){

    header.classList.add("scrolled");

  }else{

    header.classList.remove("scrolled");

  }

});

// =========================
// ANIMATION AU SCROLL
// =========================

const sections = document.querySelectorAll(".section");

const revealSections = () => {

  sections.forEach(section => {

    const sectionTop =
      section.getBoundingClientRect().top;

    const trigger =
      window.innerHeight - 120;

    if(sectionTop < trigger){

      section.classList.add("show");

    }

  });

};

window.addEventListener(
  "scroll",
  revealSections
);

window.addEventListener(
  "load",
  revealSections
);

// =========================
// FORMULAIRE CONTACT
// =========================

const form = document.getElementById("contact-form");

if(form){

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const status =
      document.getElementById("form-status");

    const name =
      document.getElementById("name").value;

    const email =
      document.getElementById("email").value;

    const message =
      document.getElementById("message").value;

    status.innerHTML =
      "Envoi en cours...";

    try{

      const response = await fetch(
        "/.netlify/functions/send-email",
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify({
            name,
            email,
            message
          })

        }
      );

      if(response.ok){

        status.innerHTML =
          "Message envoyé avec succès ✅";

        form.reset();

      }else{

        status.innerHTML =
          "Erreur lors de l’envoi ❌";

      }

    }catch(error){

      console.error(error);

      status.innerHTML =
        "Erreur de connexion ❌";

    }

  });

}
// =========================
// SCROLL REVEAL SAFE
// =========================

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){

  reveals.forEach((element) => {

    const windowHeight = window.innerHeight;

    const revealTop =
      element.getBoundingClientRect().top;

    const revealPoint = 100;

    if(revealTop < windowHeight - revealPoint){

      element.classList.add("active");

    }

  });

}

window.addEventListener(
  "scroll",
  revealOnScroll
);

revealOnScroll();

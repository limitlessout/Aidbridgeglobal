const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav a");

/* OUVERTURE MENU */

menuToggle.addEventListener("click", (e) => {

  e.stopPropagation();

  navbar.classList.toggle("active");

});

/* FERMETURE APRÈS CLIC */

navLinks.forEach(link => {

  link.addEventListener("click", () => {

    navbar.classList.remove("active");

  });

});

/* FERMETURE SI CLIC À L'EXTÉRIEUR */

document.addEventListener("click", (e) => {

  if(
    !navbar.contains(e.target) &&
    !menuToggle.contains(e.target)
  ){

    navbar.classList.remove("active");

  }

});

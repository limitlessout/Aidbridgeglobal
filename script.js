const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav a");
const header = document.querySelector("header");
const sections = document.querySelectorAll(".section");

/* MENU MOBILE */

menuToggle.addEventListener("click", (e) => {

  e.stopPropagation();

  navbar.classList.toggle("active");

});

/* FERMER MENU APRÈS CLIC */

navLinks.forEach(link => {

  link.addEventListener("click", () => {

    navbar.classList.remove("active");

  });

});

/* FERMER SI CLIC EXTÉRIEUR */

document.addEventListener("click", (e) => {

  if(
    !navbar.contains(e.target) &&
    !menuToggle.contains(e.target)
  ){

    navbar.classList.remove("active");

  }

});

/* NAVBAR SCROLL */

window.addEventListener("scroll", () => {

  if(window.scrollY > 50){

    header.classList.add("scrolled");

  }else{

    header.classList.remove("scrolled");

  }

});

/* ANIMATIONS AU SCROLL */

function revealSections(){

  sections.forEach(section => {

    const sectionTop = section.getBoundingClientRect().top;

    const triggerBottom = window.innerHeight * 0.85;

    if(sectionTop < triggerBottom){

      section.classList.add("show");

    }

  });

}

window.addEventListener("scroll", revealSections);

revealSections();

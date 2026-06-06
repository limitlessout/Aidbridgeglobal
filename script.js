// =========================
// MENU MOBILE
// =========================

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (menuToggle && nav) {

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("active");
  });

  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
      nav.classList.remove("active");
    }
  });

}


// =========================
// HEADER AU SCROLL
// =========================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (!header) return;

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});


// =========================
// REVEAL ANIMATION (.reveal)
// =========================

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {

  const windowHeight = window.innerHeight;

  reveals.forEach((el) => {

    const top = el.getBoundingClientRect().top;
    const trigger = windowHeight - 100;

    if (top < trigger) {
      el.classList.add("active");
    }

  });

}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


// =========================
// FORMULAIRE CONTACT (NETLIFY)
// =========================

const form = document.getElementById("contact-form");

if (form) {

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const status = document.getElementById("form-status");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    status.innerHTML = "Envoi en cours...";

    try {

      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      if (response.ok) {
        status.innerHTML = "Message envoyé avec succès ✅";
        form.reset();
      } else {
        status.innerHTML = "Erreur lors de l’envoi ❌";
      }

    } catch (error) {
      console.error(error);
      status.innerHTML = "Erreur de connexion ❌";
    }

  });

}

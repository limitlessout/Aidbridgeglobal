// MENU MOBILE

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

// OUVERTURE MENU

if (menuToggle && nav) {

  menuToggle.addEventListener("click", () => {

    nav.classList.toggle("active");

  });

}

// FERMER MENU APRÈS CLIC

if (nav) {

  document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("active");

    });

  });

}

// FERMER MENU SI CLICK EXTÉRIEUR

document.addEventListener("click", (e) => {

  if (
    nav &&
    menuToggle &&
    !nav.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {

    nav.classList.remove("active");

  }

});

// HEADER AU SCROLL

window.addEventListener("scroll", () => {

  const header = document.querySelector("header");

  if (header) {

    if (window.scrollY > 50) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  }

});

// FORMULAIRE CONTACT

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

      const response = await fetch(
        "/.netlify/functions/send-email",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name,
            email,
            message
          })

        }
      );

      if (response.ok) {

        status.innerHTML =
          "Message envoyé avec succès ✅";

        form.reset();

      } else {

        status.innerHTML =
          "Erreur lors de l’envoi ❌";

      }

    } catch (error) {

      status.innerHTML =
        "Erreur de connexion ❌";

      console.error(error);

    }

  });

}

// MENU MOBILE

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// FERMER MENU APRÈS CLIC

document.querySelectorAll("nav a").forEach(link => {

  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });

});

// FERMER SI CLICK À L’EXTÉRIEUR

document.addEventListener("click", (e) => {

  if(
    !nav.contains(e.target) &&
    !menuToggle.contains(e.target)
  ){
    nav.classList.remove("active");
  }

});

// HEADER SCROLL

window.addEventListener("scroll", () => {

  const header = document.querySelector("header");

  header.classList.toggle(
    "scrolled",
    window.scrollY > 50
  );

});

// FORMULAIRE BREVO

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

      if(response.ok){

        status.innerHTML =
          "Message envoyé avec succès ✅";

        form.reset();

      } else {

        status.innerHTML =
          "Erreur lors de l’envoi ❌";

      }

    } catch(error){

      status.innerHTML =
        "Erreur de connexion ❌";

    }

  });

}

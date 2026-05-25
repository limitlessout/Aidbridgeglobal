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

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const status = document.getElementById("form-status");

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  status.innerHTML = "Envoi en cours...";

  try {

    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

          "api-key": "TON_API_KEY_ICI"

        },

        body: JSON.stringify({

          sender: {
            name: "AG-AIDBRIDGE GLOBAL",
            email: "contact@aidbridgeglobal.com"
          },

          to: [
            {
              email: "TON_GMAIL@gmail.com"
            }
          ],

          replyTo: {
            email: email,
            name: name
          },

          subject: "Nouveau message depuis AG-AIDBRIDGE GLOBAL",

          htmlContent: `

            <h2>Nouveau message reçu</h2>

            <p><strong>Nom :</strong> ${name}</p>

            <p><strong>Email :</strong> ${email}</p>

            <p><strong>Message :</strong></p>

            <p>${message}</p>

          `

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

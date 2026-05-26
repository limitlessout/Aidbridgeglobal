const fetch = require("node-fetch");

exports.handler = async (event) => {

  const data = JSON.parse(event.body);

  try {

    // =========================
    // EMAIL VERS TOI
    // =========================

    await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

          "api-key": process.env.BREVO_API_KEY

        },

        body: JSON.stringify({

          sender: {
            name: "AG-AIDBRIDGE GLOBAL",
            email: "contact@aidbridgeglobal.com"
          },

          to: [
            {
              email: "limitlessout@gmail.com"
            }
          ],

          replyTo: {
            email: data.email,
            name: data.name
          },

          subject:
            "Nouveau message depuis AG-AIDBRIDGE GLOBAL",

          htmlContent: `

            <div style="
              font-family:Arial,sans-serif;
              padding:30px;
              background:#07152d;
              color:white;
            ">

              <img
                src="https://aidbridgeglobal.com/assets/5fd55583-764a-4786-9a5a-6eed698a6c3c.jpeg"
                style="
                  width:180px;
                  margin-bottom:20px;
                "
              >

              <h2 style="color:#d4af37;">
                Nouveau message reçu
              </h2>

              <p>
                <strong>Nom :</strong>
                ${data.name}
              </p>

              <p>
                <strong>Email :</strong>
                ${data.email}
              </p>

              <p>
                <strong>Message :</strong>
              </p>

              <p>
                ${data.message}
              </p>

            </div>

          `

        })

      }

    );

    // =========================
    // AUTO-RÉPONSE CLIENT
    // =========================

    await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

          "api-key": process.env.BREVO_API_KEY

        },

        body: JSON.stringify({

          sender: {
            name: "AG-AIDBRIDGE GLOBAL",
            email: "contact@aidbridgeglobal.com"
          },

          to: [
            {
              email: data.email
            }
          ],

          subject:
            "Nous avons bien reçu votre message",

          htmlContent: `

            <div style="
              font-family:Arial,sans-serif;
              background:#07152d;
              color:white;
              padding:40px;
              text-align:center;
            ">

              <img
                src="https://aidbridgeglobal.com/assets/5fd55583-764a-4786-9a5a-6eed698a6c3c.jpeg"
                style="
                  width:180px;
                  margin-bottom:25px;
                "
              >

              <h1 style="
                color:#d4af37;
                margin-bottom:20px;
              ">
                Merci ${data.name}
              </h1>

              <p style="
                font-size:16px;
                line-height:1.8;
                max-width:700px;
                margin:auto;
              ">

                Nous avons bien reçu votre message
                et notre équipe vous répondra
                dans les meilleurs délais.

              </p>

              <p style="
                margin-top:30px;
                color:#d4af37;
                font-weight:bold;
              ">

                AG-AIDBRIDGE GLOBAL LTD

              </p>

              <p>
                Bridging Opportunities. Building Futures.
              </p>

            </div>

          `

        })

      }

    );

    return {

      statusCode: 200,

      body: JSON.stringify({
        message: "Emails envoyés"
      })

    };

  } catch (error) {

    console.log(error);

    return {

      statusCode: 500,

      body: JSON.stringify({
        error: error.message
      })

    };

  }

};

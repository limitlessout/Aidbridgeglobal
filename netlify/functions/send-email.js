exports.handler = async (event) => {

  const data = JSON.parse(event.body);

  try {

    const response = await fetch(
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
              email: "TON_GMAIL@gmail.com"
            }
          ],

          replyTo: {
            email: data.email,
            name: data.name
          },

          subject: "Nouveau message depuis le site",

          htmlContent: `

            <h2>Nouveau message reçu</h2>

            <p><strong>Nom :</strong> ${data.name}</p>

            <p><strong>Email :</strong> ${data.email}</p>

            <p><strong>Message :</strong></p>

            <p>${data.message}</p>

          `

        })

      }

    );

    return {

      statusCode: 200,

      body: JSON.stringify({
        message: "Email envoyé"
      })

    };

  } catch(error){

    return {

      statusCode: 500,

      body: JSON.stringify({
        error: error.message
      })

    };

  }

};

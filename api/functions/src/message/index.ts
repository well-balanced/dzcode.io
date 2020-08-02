import * as functions from "firebase-functions";

export const sendEmail = functions.firestore
  .document("messages/{messageId}")
  .onCreate(async (snapshot, _context) => {
    try {
      // -----------------INITIALIZATION--------------------
      const Mailgun = require("mailgun-js");
      const api_key = functions.config().mailgun.key;
      const domain = functions.config().mailgun.domain;
      const mailgun = Mailgun({ apiKey: api_key, domain: domain });

      // SETUP EMAIL SETTINGS
      const notifiedEmail: string = functions.config().mailgun.notifiedEmail;
      const sendingEmail: string = functions.config().mailgun.sendingEmail;

      // --------------------SEND EMAIL--------------------
      const contactMessage = snapshot.data();
      if (contactMessage) {
        // FORMATE MESSAGES
        const { name, email, subject, message, createdAt } = contactMessage;
        // sendingEmail MESSAGE
        const userMessage = {
          to: email,
          from: sendingEmail,
          subject: "Message Received",
          text: `Hello ${name},I received your message. I will get back to you as soon as possible.`,
        };
        // notifiedEmails MESSAGE
        const notificationMessage = {
          from: sendingEmail,
          to: notifiedEmail,
          subject: "New Message Sent",
          text: `there is a new message sent. 
        At: ${createdAt}
        from: ${name}, email: ${email}
        about: ${subject}
        message: ${message}
        `,
        };
        const handleMessaging = (error: any, body: any) => {
          console.log(body);
        };

        // SEND EMAILS
        mailgun.messages().send(notificationMessage, handleMessaging);
        mailgun.messages().send(userMessage, handleMessaging);
      }
    } catch (error) {
      console.log(error);
    }
  });

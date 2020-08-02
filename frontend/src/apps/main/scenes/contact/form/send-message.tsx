import axios from "axios";

interface SendMessageParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendMessage = async ({
  name,
  email,
  subject,
  message,
}: SendMessageParams) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "http://localhost:8080",
      "Access-Control-Allow-Origin": "https://dzcode.io",
    };
    await axios.post(
      // "http://localhost:5001/dzcode-io/us-central1/api/contact",
      "https://us-central1-dzcode-io.cloudfunctions.net/api/contact",
      { name, email, subject, message },
      { headers },
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

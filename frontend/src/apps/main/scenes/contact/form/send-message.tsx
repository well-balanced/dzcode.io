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
      "Access-Control-Allow-Origin": "*",
    };
    await axios.post(
      // "https://us-central1-dzcode-io.cloudfunctions.net/api/contact",
      "http://localhost:5001/dzcode-io/us-central1/api/contact",
      { name, email, subject, message },
      { headers: headers },
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

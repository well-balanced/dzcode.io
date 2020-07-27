import * as functions from "firebase-functions";
import postEmail from "./email";
import cors from "cors";
import express, { Application } from "express";
import { sendEmail } from "./message";

const app: Application = express();
var whitelist = [
  "https://staging.dzcode.io",
  "https://www.dzcode.io",
  "http://localhost:8080",
];
var corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.post("/contact", cors(corsOptions), postEmail);

export const api = functions.https.onRequest(app);
export const sendMessage = sendEmail;

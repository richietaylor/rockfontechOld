/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// export const googleAPI = onRequest((request, response) => {
//   const express = require("express");

//   const { google } = require("googleapis");

//   const app = express();
//   const port = 443;
//   //This allows us to parse the incoming request body as JSON
//   app.use(express.json());

//   // With this, we'll listen for the server on port 8080
//   app.listen(port, () => console.log(`Listening on port ${port}`));

//   async function authSheets() {
//       //Function for authentication object
//       const auth = new google.auth.GoogleAuth({
//         keyFile: "keys.json",
//         scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//       });
    
//       //Create client instance for auth
//       const authClient = await auth.getClient();
    
//       //Instance of the Sheets API
//       const sheets = google.sheets({ version: "v4", auth: authClient });
    
//       return {
//         auth,
//         authClient,
//         sheets,
//       };
//     }

//     app.get("/", async (req: any, res: { send: (arg0: any) => void; }) => {
//       const { sheets } = await authSheets();
//       // console.log(req)
//       // console.log(res)
    
//       // Read rows from spreadsheet
//       const getRows = await sheets.spreadsheets.values.get({
//         spreadsheetId: id,
//         range: "Sheet1",
//       });
    
//       res.send(getRows.data);
//     });
    
//     const id = "1dB3Y_FnAzSqJFGSHEqWjPFuKQvlKuO60CZ7fSRcb_1o";
// });

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  const number = Math.round(Math.random() * 100);
  response.send(number.toString());
});

// const functions = require('firebase-functions');

// exports.randomNumber = functions.https.onRequest((request: any, response: { send: (arg0: (radix?: number | undefined) => string) => void; }) => {
//     const number = Math.round(Math.random() * 100);
//     response.send(number.toString);
// });

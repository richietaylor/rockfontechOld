
// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
// import { google, sheets_v4 } from 'googleapis';
import { google  } from 'googleapis';
import * as fs from 'fs';
import * as functions from 'firebase-functions';
import { Request, Response } from 'express';

const CREDENTIALS_PATH = './googleAPIKeys.json'; // Adjust this
// const CREDENTIALS_PATH = '../../keys/credentials.json';  // Adjust this path as needed

export const getGoogleSheetData = functions.https.onRequest (async (req: Request, res: Response) => {
    // Check for GET request
    if (req.method !== 'GET') {
        res.status(405).send('Method not allowed');
        return;
    }

    // Extract query parameters
    // const spreadsheetId = req.query.spreadsheetId as string;
    const spreadsheetId = '1dB3Y_FnAzSqJFGSHEqWjPFuKQvlKuO60CZ7fSRcb_1o';
    const range = req.query['range'] as string || 'A1:Z100';

    // Load service account credentials
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));

    // Authenticate with the service account
    const client = new google.auth.JWT(
        credentials.client_email,
        undefined,
        credentials.private_key,
        ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    );

    // Access the Sheets API
    const sheets = google.sheets({ version: 'v4', auth: client });

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: range
        });

        res.send(response.data);
    } catch (error) {
        res.status(500).send(`Failed to fetch data from Google Sheets: ${error}`);
    }
});

// import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';
import * as path from 'path';
import * as os from 'os';
// import * as fs from 'fs';
import * as util from 'util';

// Initialize Firebase
admin.initializeApp();

const writeFile = util.promisify(fs.writeFile);

export const databaseToStorage = functions.firestore
  .document('test/{documentId}')
  .onCreate(async (snap, context) => {
    // const fileData = snap.data();
    // const zapierUrl = fileData?.zapierUrl; // Assuming zapierUrl is the field in the Firestore document
    const zapierUrl = "https://zapier.com/engine/hydrate/16455779/.eJw9zk8LgkAQh-GvEnPWSnO17daxQ9ChS0XI_hljSVfZXSkRv3uTRNf3NzzMCKq1AW0ow9Ah7OAAERjrg7AKS6OpXEVn0B2Fqfen76p6H9qm9-jmPckzxoqCRyCUanuS_jXhLILKYK1LK5qvXpkaPRnPl3APD7txLmXXGnrCUbiN8MSBLv1mJRMuU6lZnBZMx5lcJ7EUKou13kquMF_LjSbrR1_QE6HFsDg7-pW05bv2MN2n6QOsaUqp:1qhoKh:5ATQcy14IQXbBst2-ghGjK2XqbA/";

    if (!zapierUrl) {
      console.error('zapierUrl not found');
      return;
    }

    try {
      // Download the file from Zapier URL
      const response = await axios.get(zapierUrl, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');

      // Generate a temporary local path to save the downloaded file
      const tempFilePath = path.join(os.tmpdir(), 'tempfile.xls');
      
      // Write the file to the temporary path
      await writeFile(tempFilePath, buffer);

      // Initialize Firebase Storage and specify bucket if it's not the default bucket
      const bucket = admin.storage().bucket(); // if default bucket
      // const bucket = admin.storage().bucket('your-bucket-name'); // if custom bucket

      // Upload the file to Firebase Storage
      await bucket.upload(tempFilePath, {
        destination: `zapier/your_file.xls`,
      });

      console.log('File has been uploaded to Firebase Storage');

      // Optionally, you can save the URL to Firestore or perform additional operations

    } catch (error) {
      console.error('Error processing file:', error);
    }
  });


// import * as puppeteer from 'puppeteer';
// import * as admin from 'firebase-admin';
// import { Storage } from '@google-cloud/storage';
// import * as path from 'path';

// admin.initializeApp();
// const storage = new Storage();

// export const myCloudFunction = functions.runWith({
//   memory: '512MB',  // increase to 1GB or 2GB if needed
//   timeoutSeconds: 540,
//   }).https.onRequest(async (req, res) => {
//   const bucketName = 'rockfontechza.appspot.com';
//   const fileName = 'chrome.dll';
//   const tempFilePath = path.join('/tmp', 'chrome.dll');  
//   const newLocation = '.cache/puppeteer/chrome/win64-116.0.5845.96/chrome-win64/chrome.dll'; // New location in the same bucket or another bucket
//   const bucket = storage.bucket(bucketName);

//   try {
//     // Downloads the file from Firebase Storage
//     await bucket.file(fileName).download({
//       destination: tempFilePath,
//     });

//     // Upload the file to new location
//     await bucket.upload(tempFilePath, {
//       destination: newLocation,
//     });

//     res.status(200).send(`5:02 - Successfully moved file to ${newLocation}`);
//   } catch (error) {
//     console.error(`Failed to move file: ${error}`);
//     res.status(500).send(`Failed to move file: ${error}`);
//   }
// });


// export const scrapeSite = functions.runWith({
//   memory: '512MB',  // increase to 1GB or 2GB if needed
//   timeoutSeconds: 540,
//   }).https.onRequest(async (req: functions.Request, res: functions.Response) => {
//   const browser = await puppeteer.launch({
//     headless: "new",
//     // executablePath: path.resolve(__dirname, '.cache/puppeteer/chrome/win64-116.0.5845.96/chrome-win64/chrome.exe'),
//     // executablePath: '.cache/puppeteer/chrome/win64-116.0.5845.96/chrome-win64/chrome.exe',
//     args: ['--no-sandbox', '--disable-setuid-sandbox','--disable-software-rasterizer'],
//   });

//   const LOADRITE_CRED_PATH = './loadriteKeys.json'; 
//   const page = await browser.newPage();
//   const credentials: {username: string, password: string} = JSON.parse(fs.readFileSync(LOADRITE_CRED_PATH, 'utf8'));

//   try {
//     await page.goto('https://reporting.loadrite-myinsighthq.com/Reports?Type=DIY%20Reports');
//     await page.waitForSelector('#signInFormUsername', { visible: true });
//     await page.type('#signInFormUsername', credentials.username);
//     await page.waitForSelector('#signInFormPassword', { visible: true });
//     await page.type('#signInFormPassword', credentials.password);
//     await page.waitForSelector('input[type="Submit"]', { visible: true });
//     await page.click('input[type="Submit"]');

//     await page.setDefaultTimeout(500000);
//     await page.waitForSelector('#toplevel', { visible: true });
//     await page.goto('https://reporting.loadrite-myinsighthq.com/data');

//     // ... (Your scraping logic here)

//     await browser.close();
//     res.send('Scraping Done!');

//   } catch (error) {
//     await browser.close();
//     console.error(`Failed to scrape: ${error}`);
//     res.status(500).send(`Failed to scrape: ${error}`);
//   }
// });






// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// const functions = require('firebase-functions');

// exports.randomNumber = functions.https.onRequest((request: any, response: { send: (arg0: (radix?: number | undefined) => string) => void; }) => {
//     const number = Math.round(Math.random() * 100);
//     response.send(number.toString);
// });

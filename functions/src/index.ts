/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
import { google } from 'googleapis';
import * as fs from 'fs';
import * as functions from 'firebase-functions';


const CREDENTIALS_PATH = './googleAPIKeys.json'; // Adjust this
// const CREDENTIALS_PATH = '../../keys/credentials.json';  // Adjust this path as needed

export const getGoogleSheetData = functions.https.onRequest(async (req, res) => {
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


import * as puppeteer from 'puppeteer';
import * as admin from 'firebase-admin';

admin.initializeApp();


export const scrapeSite = functions.https.onRequest(async (req: functions.Request, res: functions.Response) => {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: `/root/.cache/puppeteer`,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const LOADRITE_CRED_PATH = './loadriteKeys.json'; 
  const page = await browser.newPage();
  const credentials: {username: string, password: string} = JSON.parse(fs.readFileSync(LOADRITE_CRED_PATH, 'utf8'));

  try {
    await page.goto('https://reporting.loadrite-myinsighthq.com/Reports?Type=DIY%20Reports');
    await page.waitForSelector('#signInFormUsername', { visible: true });
    await page.type('#signInFormUsername', credentials.username);
    await page.waitForSelector('#signInFormPassword', { visible: true });
    await page.type('#signInFormPassword', credentials.password);
    await page.waitForSelector('input[type="Submit"]', { visible: true });
    await page.click('input[type="Submit"]');

    await page.setDefaultTimeout(500000);
    await page.waitForSelector('#toplevel', { visible: true });
    await page.goto('https://reporting.loadrite-myinsighthq.com/data');

    // ... (Your scraping logic here)

    await browser.close();
    res.send('Scraping Done!');

  } catch (error) {
    await browser.close();
    console.error(`Failed to scrape: ${error}`);
    res.status(500).send(`Failed to scrape: ${error}`);
  }
});






// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// const functions = require('firebase-functions');

// exports.randomNumber = functions.https.onRequest((request: any, response: { send: (arg0: (radix?: number | undefined) => string) => void; }) => {
//     const number = Math.round(Math.random() * 100);
//     response.send(number.toString);
// });

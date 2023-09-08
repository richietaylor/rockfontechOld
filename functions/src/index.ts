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


import * as puppeteer from 'puppeteer';
import * as admin from 'firebase-admin';
import { Storage } from '@google-cloud/storage';
import * as path from 'path';

admin.initializeApp();
const storage = new Storage();

export const myCloudFunction = functions.runWith({
  memory: '512MB',  // increase to 1GB or 2GB if needed
  timeoutSeconds: 540,
  }).https.onRequest(async (req, res) => {
  const bucketName = 'rockfontechza.appspot.com';
  const fileName = 'chrome.dll';
  const tempFilePath = path.join('/tmp', 'chrome.dll');  
  const newLocation = '.cache/puppeteer/chrome/win64-116.0.5845.96/chrome-win64/chrome.dll'; // New location in the same bucket or another bucket
  const bucket = storage.bucket(bucketName);

  try {
    // Downloads the file from Firebase Storage
    await bucket.file(fileName).download({
      destination: tempFilePath,
    });

    // Upload the file to new location
    await bucket.upload(tempFilePath, {
      destination: newLocation,
    });

    res.status(200).send(`5:02 - Successfully moved file to ${newLocation}`);
  } catch (error) {
    console.error(`Failed to move file: ${error}`);
    res.status(500).send(`Failed to move file: ${error}`);
  }
});


export const scrapeSite = functions.runWith({
  memory: '512MB',  // increase to 1GB or 2GB if needed
  timeoutSeconds: 540,
  }).https.onRequest(async (req: functions.Request, res: functions.Response) => {
  const browser = await puppeteer.launch({
    headless: "new",
    // executablePath: path.resolve(__dirname, '.cache/puppeteer/chrome/win64-116.0.5845.96/chrome-win64/chrome.exe'),
    // executablePath: '.cache/puppeteer/chrome/win64-116.0.5845.96/chrome-win64/chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox','--disable-software-rasterizer'],
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

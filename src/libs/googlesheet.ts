/* eslint-disable @typescript-eslint/no-explicit-any */
import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const sheets = google.sheets('v4');

async function getAuthToken() {
  const auth = new GoogleAuth({
    scopes: SCOPES,
  });

  const authToken = await auth.getClient();

  return authToken;
}

async function getSpreadSheetValues({
  spreadsheetId,
  auth,
  sheetName,
  getRawData,
}: {
  spreadsheetId: string,
  auth: JSONClient,
  sheetName: string,
  getRawData: boolean,
}) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range: sheetName,
    valueRenderOption: getRawData ? 'FORMULA' : 'FORMATTED_VALUE',
  });
  return res;
}

async function updateSpreadSheetValues({
  spreadsheetId, auth, sheetName, data,
}: {
  spreadsheetId: string,
  auth: JSONClient,
  sheetName: string,
  data: any[][],
}) {
  const res = await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: sheetName,
    valueInputOption: 'USER_ENTERED',
    auth,
    requestBody: {
      range: sheetName,
      majorDimension: 'ROWS',
      values: data,
    },
  });

  return res;
}

const writeToGoogleSheet = async (data: any[][], sheetName: string) => {
  const auth = await getAuthToken() as JSONClient;

  const res = await updateSpreadSheetValues({
    spreadsheetId: process.env.SPREADSHEET_ID,
    auth,
    sheetName,
    data,
  });

  return res;
};

const readFromGoogleSheet = async (sheetName: string) => {
  const auth = await getAuthToken() as JSONClient;
  const data = await getSpreadSheetValues({
    spreadsheetId: process.env.SPREADSHEET_ID,
    auth,
    sheetName,
    getRawData: false,
  });

  return data;
};

export {
  writeToGoogleSheet,
  readFromGoogleSheet,
};

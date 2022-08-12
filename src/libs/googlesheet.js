const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

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
}) {
  const res = await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: sheetName,
    valueInputOption: 'USER_ENTERED',
    auth,
    resource: {
      range: sheetName,
      majorDimension: 'ROWS',
      values: data,
    },
  });

  return res;
}

async function appendSpreadSheetValues({
  spreadsheetId, auth, sheetName, data,
}) {
  const currentSpreadSheetValuesRes = await getSpreadSheetValues(
    {
      spreadsheetId,
      auth,
      sheetName,
      getRawData: true,
    },
  );

  if (currentSpreadSheetValuesRes.status === 200) {
    const res = await updateSpreadSheetValues(
      {
        spreadsheetId,
        auth,
        sheetName,
        data: [
          ...currentSpreadSheetValuesRes.data.values,
          ...data,
        ],
      },
    );

    return res;
  }

  return currentSpreadSheetValuesRes;
}

const writeToGoogleSheet = async (data, sheetName) => {
  const auth = await getAuthToken();

  const res = await updateSpreadSheetValues({
    spreadsheetId: process.env.SPREADSHEET_ID,
    auth,
    sheetName,
    data,
  });

  return res;
};

const appendToGoogleSheet = async (data, sheetName) => {
  const auth = await getAuthToken();

  const res = await appendSpreadSheetValues({
    spreadsheetId: process.env.SPREADSHEET_ID,
    auth,
    sheetName,
    data,
  });

  return res;
};

const readFromGoogleSheet = async (sheetName) => {
  const auth = await getAuthToken();
  const data = await getSpreadSheetValues({
    spreadsheetId: process.env.SPREADSHEET_ID,
    auth,
    sheetName,
  });

  return data;
};

module.exports = {
  writeToGoogleSheet,
  appendToGoogleSheet,
  readFromGoogleSheet,
};

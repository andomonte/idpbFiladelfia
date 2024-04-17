const { google } = require('googleapis');
const path = require('path');

const KEY_FILE_PATH = path.join('googleDrive.json');

const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: SCOPES,
});

module.exports = google.drive({ version: 'v3', auth });

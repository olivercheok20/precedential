const fs = require('fs');
const readline = require('readline');
const firebase = require("firebase/app");
const {google} = require('googleapis');
const firebaseConfig = require('./firebaseConfig');
require("firebase/firestore");

firebase.initializeApp(firebaseConfig.config);

// If modifying these scopes, delete token.json.
const SCOPES = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.metadata',
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/drive.photos.readonly',
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/spreadsheets.readonly'
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// File ID and storage path
const FILE_ID = '1AF4iA0klrmXcVOt8XcPTn3Wc38UcoFFAkb0hLRd__DM';

fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), refreshCollection);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
        });
    });
}

/**
 * Runs through the sheet and adds data to firebase.
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client. 
 */
function refreshCollection(auth) {
    // Setup firebase
    const db = firebase.firestore();

    // Iterate through sheet and update data
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
        spreadsheetId: FILE_ID,
        range: 'Sheet1!A1:Z',
    }, async (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;

        // store list of dictionary keys
        const keys = rows[0];
        rows.shift();
        
        if (rows.length) {
            rows.map((row) => {
                var mapping = generateMapping(keys, row);
                console.log(`Adding row ${mapping['serial_number']}`);
                db.collection('research').doc(mapping['serial_number'].toString()).set(mapping);
            });
        } else {
            console.log('No data found.');
        }
    });
}

////////////////////////////////////////////////
/// HELPER FUNCTIONS TO CHECK IF API WORKING ///
////////////////////////////////////////////////

/**
 * Helper function to create dictionary data.
 * @param {array} keys List of keys.
 * @param {array} values List of values
 * @return Mapping of key-values.
 */
function generateMapping(keys, values) {
    const NUMERIC_FIELDS = new Set(['abetment', 'serial_number', 'number_of_accused', 'quantity', 'fine', 'death_penalty', 'life_imprisonment', 'imprisonment_years', 'imprisonment_months', 'imprisonment_days', 'strokes_of_cane', 'months_in_reformative_training', 'concurrent_sentence', 'age']);
    var mapping = {};

    for (i = 0; i < keys.length; i++) {
        if (keys[i] == 'keywords') {
            mapping[keys[i]] = (values[i] == null) ? [] : values[i].split(',');
        }
        else if (values[i] == null) {
            mapping[keys[i]] = NUMERIC_FIELDS.has(keys[i]) ? NaN : '';
        }
        else {
            mapping[keys[i]] = NUMERIC_FIELDS.has(keys[i]) ? parseFloat(values[i]) : values[i];
        }
    }

    return mapping;
}

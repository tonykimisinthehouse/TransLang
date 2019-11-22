// const { spawn } = require('child_process');
// // const request = require('request');
// const test = require('tape');

// // Start the app
// const env = Object.assign({}, process.env, {PORT: 5000});
// const child = spawn('node', ['index.js'], {env});
//client id: 242585418173-3ubkmunjbh03urabfqgnbpgark67fsc3.apps.googleusercontent.com
//client secret= QQqEXyWvqmVAX2E0jajp6SNT

console.log("Hello");

// test('responds to requests', (t) => {
//   t.plan(4);

//   // Wait until the server is ready
//   child.stdout.on('data', _ => {
//     // Make a request to our app
//     request('http://127.0.0.1:5000', (error, response, body) => {
//       // stop the server
//       child.kill();

//       // No error
//       t.false(error);
//       // Successful response
//       t.equal(response.statusCode, 200);
//       // Assert content checks
//       t.notEqual(body.indexOf("<title>Node.js Getting Started on Heroku</title>"), -1);
//       t.notEqual(body.indexOf("Getting Started with Node on Heroku"), -1);
//     });
//   });
// });


/*******************************************     Google Sheets          ************************************************/
fs              = require('fs'),
readline        = require('readline'),
{google}        = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listMajors);
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
    if (err) return getNewToken(oAuth2Client, callback);
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
function getNewToken(oAuth2Client, callback) {
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
      if (err) return console.error('Error while trying to retrieve access token', err);
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
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMajors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1l5BsM8-ejfncXU9uLz8kn6DD4YLTGT3_pyra4LJZMto',
    range: 'A2:E2',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log('Try:');
      // Print column A
      rows.map((row) => {
        console.log(`${row[0]}: ${row[2]}`);
      });
    } else {
      console.log('No data found.');
    }
  });
}


 /**
   * Gets cell values from a Spreadsheet.
   * @param {string} spreadsheetId The spreadsheet ID.
   * @param {string} range The sheet range.
   * @return {Promise<ValueResponse>} The value response.
   */
  function getValues(spreadsheetId, range) {
    return new Promise((resolve, reject) => {
      // [START sheets_get_values]
      this.sheetsService.spreadsheets.values.get({
        spreadsheetId,
        range,
      }, (err, result) => {
        if (err) {
          // Handle error
          console.log(err);
          // [START_EXCLUDE silent]
          reject(err);
          // [END_EXCLUDE]
        } else {
          const numRows = result.values ? result.values.length : 0;
          console.log(`${numRows} rows retrieved.`);
          // [START_EXCLUDE silent]
          resolve(result);
          // [END_EXCLUDE]
        }
      });
      // [END sheets_get_values]
    });
  };


  /**
   * Appends values in a Spreadsheet.
   * @param {string} spreadsheetId The spreadsheet ID.
   * @param {string} range The range of values to append.
   * @param {object} valueInputOption Value input options.
   * @param {(string[])[]} _values A 2d array of values to append.
   * @return {Promise} The appended values response.
   */
  function appendValues(spreadsheetId, range, valueInputOption, _values) {
    return new Promise((resolve, reject) => {
      // [START sheets_append_values]
      let values = [
        [
          // Cell values ...
        ],
        // Additional rows ...
      ];
      // [START_EXCLUDE silent]
      values = _values;
      // [END_EXCLUDE]
      let resource = {
        values,
      };
      this.sheetsService.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption,
        resource,
      }, (err, result) => {
        if (err) {
          // Handle error.
          console.log(err);
          // [START_EXCLUDE silent]
          reject(err);
          // [END_EXCLUDE]
        } else {
          console.log(`${result.updates.updatedCells} cells appended.`);
          // [START_EXCLUDE silent]
          resolve(result);
          // [END_EXCLUDE]
        }
      });
      // [END sheets_append_values]
    });
  }


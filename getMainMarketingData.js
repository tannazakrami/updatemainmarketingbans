const {google} = require('googleapis');
const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
})

module.exports = async function getMainData(){
    const client = await auth.getClient();
    const googleSheets = google.sheets({version: 'v4', auth: client});
    const spreadsheetId = '1EUvrheZgzEP7l1nu51AWFPerfBA2NmpIwLJgQy9xsOo';
    let data = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'test!H3:K'
    })
    return data.data.values || undefined;
}
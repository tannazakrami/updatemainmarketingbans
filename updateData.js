const {google} = require('googleapis');
const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
})

module.exports = async function seData(arr){
    const client = await auth.getClient();
    const googleSheets = google.sheets({version: 'v4', auth: client});
    const spreadsheetId = '1EUvrheZgzEP7l1nu51AWFPerfBA2NmpIwLJgQy9xsOo';
    return new Promise((resolve, reject) => {
        googleSheets.spreadsheets.values.update({
            auth, 
            spreadsheetId,
            range: 'test!H3:K',
            valueInputOption: 'USER_ENTERED',
            resource: {range: 'test!H3:K', majorDimension: 'ROWS', values: arr}
        }, (err, resp) => {
            if(err){
                console.log('Data Error: ', err)
                reject(err)
            }
            resolve(resp);
        })
    })
}
const main = require('./getMainMarketingData');
const bans = require('./getBans');
const updateData = require('./updateData');
const cron = require('node-cron');

const getMainData = async () => {
    let mainData = await main();
    let bansData = await bans();
    let today = new Date();
    let day = String(today.getDate()).padStart(2,'0');
    let month = String(today.getMonth()+1).padStart(2,'0');
    let year = today.getFullYear();
    today = day + '.' + month + '.' + year;

    let bansArray = bansData.filter(array => array[1] == 'Бан');
    let asinsInBans = [];
    for(let array of bansArray){
        let arrayData = mainData.filter(arr => arr[1] == array[0])
        asinsInBans.push(arrayData[0]);
    }
    for(let el of asinsInBans){
        if(el[0].includes('Забанен') == false){
            el[0] = el[0] + `. Забанен ${today}`
            el[3] = "Собаки"
        }
    }
    console.log(asinsInBans);
    for(let el in mainData){
        asinsInBans.map((elem) => {
            if(mainData[el][0] == elem[0]){
                mainData[el][1] = elem[1]
            }
        })
    }
    updateData(mainData);
}

cron.schedule('0 32 6,13 * * *', () => {
    getMainData();  
})
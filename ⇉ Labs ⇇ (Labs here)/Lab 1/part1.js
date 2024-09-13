const lod = require ('lodash')

const holidays = [
    {name:"Easter", date: new Date ("2025-10-20")},
    {name:"christmas", date: new Date ("2024-12-31")},
    {name:"game day", date: new Date ("3454-12-06")},
    {name:"GTA VI release date", date: new Date ("9999-12-31")},
]

const today = new Date()
holidays.forEach(holiday =>{
    console.log((holiday.date - today)/(1000 * 60 * 60 * 24))
});

console.log(lod.sample(holidays));
console.log(lod.findIndex(holidays, {name:"christmas"}));



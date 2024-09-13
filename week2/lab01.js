//object -> {}
//array -> []
const lod = require ('lodash')

const holidays = [
    {name:"Easter", date: new Date ("2014-10-31")},
    {name:"christmas", date: new Date ("2014-11-14")},
    {name:"game day", date: new Date ("2014-12-06")}

]

const today = new Date()
holidays.forEach(holiday =>{
    console.log((holiday.date - today)/(1000 * 60 * 60 * 24))
});

console.log(lod.sample(holidays))
console.log(lod.findIndex(holidays, {name:"christmas"}))


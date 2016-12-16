var data = require("./data/output.json");
var general = data.General;
for(let each of general){
    if(each.area === 'INDIA' && each.type === 'Total'){
        console.log("Age Group is " + each['Age-group'] + " and population is " + each['Literate-persons']);
    }
}

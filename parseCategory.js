var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('./data/GR.csv');
var outstream =  stream;
var rl = readline.createInterface(instream, outstream);
//'tname','scode','dcode','area','type','Age-group','Total-persons','Total-male','Total-female','Illeterate-persons','Illeterate-male','Illeterate-female','Literate-persons'12,'Literate-male','Literate-female','El-persons','El-male','El-female','Bp-persons','Bp-male','Bp-female','P-persons','P-male','P-female','M-persons','P-male','P-female','Ms-person','Ms-male','Ms-female','Hs-person','Hs-male','Hs-female','Ntd-persons','Ntd-male','Ntd-female','Td-persons','Td-male','Td-female','G-persons','G-male','G-female','U-persons','U-male','U-female'];var eachObj = {};
var categories = [];
rl.on('line', function(line) {
  var row = line.split(',');
  if(row[3] === 'INDIA' && row[5]=="All ages" && row[4] === 'Total'){
    if(categories.length == 0){
      categories.push({
        'Literate': +row[12],
        'Literate without Education': +row[15],
        'Below Primary': +row[18],
        'Primary': +row[21],
        'Middle': +row[24],
        'Matric/Secondary': +row[27],
        'Higher secondary/Intermediate/Pre-University/Senior secondary': +row[30],
        'Non-technical diploma or certificate not equal to degree': +row[33],
        'Technical diploma or certificate not equal to degree': +row[36],
        'Graduate & above': +row[39],
        'Unclassified' : +row[42]
                     });
     }else{
        categories[0]['Literate'] =  categories[0]['Literate'] + +row[12];
        categories[0]['Literate without Education'] = categories[0]['Literate without Education'] + +row[15];
        categories[0]['Below Primary'] = categories[0]['Below Primary'] + +row[18];
        categories[0]['Primary'] = categories[0]['Primary'] + +row[21];
        categories[0]['Middle'] = categories[0]['Middle'] + +row[24];
        categories[0]['Matric/Secondary'] = categories[0]['Matric/Secondary'] + +row[27];
        categories[0]['Higher secondary/Intermediate/Pre-University/Senior secondary'] =  categories[0]['Higher secondary/Intermediate/Pre-University/Senior secondary'] + +row[30];
        categories[0]['Non-technical diploma or certificate not equal to degree'] =  categories[0]['Non-technical diploma or certificate not equal to degree'] + +row[33];
        categories[0]['Technical diploma or certificate not equal to degree'] =  categories[0]['Technical diploma or certificate not equal to degree'] + +row[36];
        categories[0]['Graduate & above'] = categories[0]['Graduate & above'] + +row[39];
        categories[0]['Unclassified'] = categories[0]['Unclassified'] + +row[42];
      }
    }
});
rl.on('close', function() {
  fs.writeFile('./data/category.json', JSON.stringify(categories,null,2),'utf-8');
});

var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('./data/GR.csv');
var outstream =  stream;
var rl = readline.createInterface(instream, outstream);
//'tname','scode','dcode','area','type','Age-group','Total-persons','Total-male','Total-female','Illeterate-persons','Illeterate-male','Illeterate-female','Literate-persons'12,'Literate-male','Literate-female','El-persons','El-male','El-female','Bp-persons','Bp-male','Bp-female','P-persons','P-male','P-female','M-persons','P-male','P-female','Ms-person','Ms-male','Ms-female','Hs-person','Hs-male','Hs-female','Ntd-persons','Ntd-male','Ntd-female','Td-persons','Td-male','Td-female','G-persons','G-male','G-female','U-persons','U-male','U-female'];var eachObj = {};
var stateGender =  Array();
var categories = [];
rl.on('line', function(line) {
  var row = line.split(',');
  categories.push( {'All' : +row[6]});
  categories.push( {'Illiterate': +row[9]});
  categories.push( {'Literate': +row[12]});
  categories.push( {'Literate without Education': +row[15]});
  categories.push( {'Below Primary': +row[18]});
  categories.push( {'Primary': +row[21]});
  categories.push( {'Mat/Sec': +row[24]});
  categories.push( {'Higher Secondary/Inter': +row[27]});
  categories.push( {'Non-technical Diploma': +row[30]});
  categories.push( {'Technical Diploma': +row[33]});
  categories.push( {'Graduate': +row[36]});
  categories.push( {'Below Priomary': +row[39]});
  categories.push( {'Unclassified': +row[42]});
  return;
});
rl.on('close', function() {
  fs.writeFile('./data/output3.json', JSON.stringify(categories,null,2),'utf-8');
});

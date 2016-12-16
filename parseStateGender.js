var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('./data/GR.csv');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);
//'tname','scode','dcode','area','type','Age-group','Total-persons','Total-male','Total-female','Illeterate-persons','Illeterate-male','Illeterate-female','Literate-persons'12,'Literate-male','Literate-female','El-persons','El-male','El-female','Bp-persons','Bp-male','Bp-female','P-persons','P-male','P-female','M-persons','P-male','P-female','Ms-person','Ms-male','Ms-female','Hs-person','Hs-male','Hs-female','Ntd-persons','Ntd-male','Ntd-female','Td-persons','Td-male','Td-female','G-persons','G-male','G-female','U-persons','U-male','U-female'];var eachObj = {};
var stateGender = new Array();
var states = {};
rl.on('line', function(line) {
  var row = line.split(',');
  if(!states.hasOwnProperty(row[3])){
    states[''+row[3]+''] = 'done';
    eachObj = {};
    eachObj['total-graduates'] = +row[39];
    eachObj['total-female-graduates'] = +row[40];
    eachObj['total-male-graduates'] = +row[41];
    eachObj['state-name'] = ''+row[3]+'';
    stateGender.push(eachObj);
  }
});
rl.on('close', function() {
  fs.writeFile('./data/output1.json', JSON.stringify(stateGender,null,2),'utf-8');
});

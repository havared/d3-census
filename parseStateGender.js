var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('./data/GR.csv');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);
//'tname','scode','dcode','area','type','Age-group','Total-persons','Total-male','Total-female','Illeterate-persons','Illeterate-male','Illeterate-female','Literate-persons'12,'Literate-male','Literate-female','El-persons','El-male','El-female','Bp-persons','Bp-male','Bp-female','P-persons','P-male','P-female','M-persons','P-male','P-female','Ms-person','Ms-male','Ms-female','Hs-person','Hs-male','Hs-female','Ntd-persons','Ntd-male','Ntd-female','Td-persons','Td-male','Td-female','G-persons','G-male','G-female','U-persons','U-male','U-female'];var eachObj = {};
var stateGender = [];
var count=0;
function findIndex(stateName){
  var i = stateGender.length;
  var index = -1;
  while(i--) {
    if(stateName == stateGender[i]['state-name']) {
        index = i;
        break;
    }
  }
  return index;
}

rl.on('line', function(line) {
  var row = line.split(',');
  if(row[4] === "Total" && row[5] === "All ages"){
    var index = findIndex(row[3]);
    eachObj = {};
    eachObj['total-graduates'] = +row[39];
    eachObj['total-female-graduates'] = +row[40];
    eachObj['total-male-graduates'] = +row[41];
    eachObj['state-name'] = row[3];
    if(index !== -1){
      var result = stateGender[index];
      result['total-graduates'] += eachObj['total-graduates'];
      result['total-female-graduates'] += eachObj['total-female-graduates'];
      result['total-male-graduates'] += eachObj['total-male-graduates'];
      stateGender[index] = result;
    }else{
      stateGender.push(eachObj);
    }
  }
});
rl.on('close', function() {
    fs.writeFile('./data/output1.json', JSON.stringify(stateGender,null,2),'utf-8');
});

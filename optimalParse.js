var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('./data/GR.csv');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);
//'tname','scode','dcode','area','type','Age-group','Total-persons','Total-male','Total-female','Illeterate-persons','Illeterate-male','Illeterate-female','Literate-persons'12,'Literate-male','Literate-female','El-persons','El-male','El-female','Bp-persons','Bp-male','Bp-female','P-persons','P-male','P-female','M-persons','P-male','P-female','Ms-person','Ms-male','Ms-female','Hs-person','Hs-male','Hs-female','Ntd-persons','Ntd-male','Ntd-female','Td-persons','Td-male','Td-female','G-persons','G-male','G-female','U-persons','U-male','U-female'];var eachObj = {};
var data = [];

function findIndex(ageGroup){
  var i = data.length;
  var index = -1;
  while(i--) {
    if(ageGroup == data[i]['age-group']) {
        index = i;
        break;
    }
  }
  return index;
}
rl.on('line', function(line) {
  eachObj = {};
  var row = line.split(',');
  if(row[3] === 'INDIA' && row[4] === 'Total'){
    eachObj['age-group'] = row[5];
    eachObj['population'] = +row[12];
    var index = findIndex(row[5])
    if(index !== -1){
      var result = data[index];
      result['population'] += eachObj['population'];
      data[index] = result;
    }else{
      data.push(eachObj);
    }
  }
});

rl.on('close', function() {
  fs.writeFile('./data/age-wise.json', JSON.stringify(data,null,2),'utf-8');
});

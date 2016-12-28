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
        'label' : 'Literate',
        'population': +row[12]
      });
      categories.push({
        'label' : 'WO Education',
        'population': +row[15]
      });
      categories.push({
        'label' : 'Below Primary',
        'population': +row[18]
      });
      categories.push({
        'label' : 'Primary',
        'population': +row[21]
      });
      categories.push({
        'label' : 'Middle',
        'population': +row[24]
      });
      categories.push({
        'label' : 'Matric/Secondary',
        'population': +row[27]
      });
      categories.push({
        'label' : 'Non-technical',
        'population': +row[33]
      });
      categories.push({
        'label' : 'Technical',
        'population': +row[36]
      });
      categories.push({
        'label' : 'Graduate',
        'population': +row[39]
      });
      categories.push({
        'label' : 'Unclassified',
        'population': +row[42]
      });
     }else{
       var index = getIndex('Literate');
       categories[index]['population'] = categories[index]['population'] + +row[12];
       index = getIndex('WO Education');
       categories[index]['population'] = categories[index]['population'] + +row[15];
       index = getIndex('Below Primary');
       categories[index]['population'] = categories[index]['population'] + +row[18];
       index = getIndex('Primary');
       categories[index]['population'] = categories[index]['population'] + +row[21];
       index = getIndex('Middle');
       categories[index]['population'] = categories[index]['population'] + +row[24];
       index = getIndex('Matric/Secondary');
       categories[index]['population'] = categories[index]['population'] + +row[27];
       index = getIndex('Non-technical');
       categories[index]['population'] = categories[index]['population'] + +row[33];
       index = getIndex('Technical');
       categories[index]['population'] = categories[index]['population'] + +row[36];
       index = getIndex('Graduate');
       categories[index]['population'] = categories[index]['population'] + +row[39];
       index = getIndex('Unclassified');
       categories[index]['population'] = categories[index]['population'] + +row[42];
     }
    }
});
rl.on('close', function() {
  fs.writeFile('./data/category.json', JSON.stringify(categories,null,2),'utf-8');
});


function getIndex(label){
  var i = categories.length;
  var index = -1;
  //console.log(categories[0]['label']);
  while(i--) {
    if(categories[i]['label'] === label) {
        index = i;
        break;
    }
  }
  return index;
}

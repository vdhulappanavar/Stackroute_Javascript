const fs = require('fs'); //this is the module we are using to access file system

let filePath = "./India2011.csv";
let filePath1 = "./IndiaSC2011.csv";
let filePath2 = "./IndiaST2011.csv";
let csvData = fs.readFileSync(filePath, 'utf8'); //the encoding is needed to interpret the data
let csvData1 = fs.readFileSync(filePath1, 'utf8');
let csvData2 = fs.readFileSync(filePath2, 'utf8');

var line = csvData.split("\n");
var line1 = csvData1.split("\n");
var line2 = csvData2.split("\n");


console.log(line.length);
console.log(line1.length);
console.log(line2.length);

/*a=[1,2,3]
console.log(a[1])*/
/*console.log(line[0].split(","));
console.log(line1[0].split(","));
console.log(line2[0].split(","));*/
var headings = line[0].split(",");
var age_group_index = headings.indexOf("Age-group");
console.log(age_group_index)
console.log(headings[9])
var literate_Persons_index = headings.indexOf("Literate - Persons")
console.log(literate_Persons_index)

console.log(headings.indexOf("Educational level"))
Education_Category_indexs = new Array()
Education_Category_dict = []

for(i=0;i<headings.length;i++){
    //console.log(headings[i])
    //console.log(headings[i].localeCompare("Educational level"))
    //console.log(headings[i].split("-")[0])
    //console.log( (headings[i].split("-")[0]).localeCompare("Educational level") )
    if((headings[i].split("-")[0]).trim().localeCompare("Educational level")==0){
        console.log(headings[i].split("-")[1])
        i=i+3
    }
}

//var Illiterate_Persons_index = Illiterate - Persons
/*var age_map_dict=[];
for(i=1;i<line.length;i++)
{
    for(j=0;j<headings.length;j++)
    {

    }
}
*/

/*const file = fs.createWriteStream('./data_merge.json');
file.write("[\n");
for(i=)
file.write("]\n");


file.end();*/


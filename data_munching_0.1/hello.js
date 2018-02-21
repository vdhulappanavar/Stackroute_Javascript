function foo(greeting) {
	console.log('Hello ', greeting)
}
foo('world');
const fs = require('fs'); //this is the module we are using to access file system

let filePath = "./India2011.csv";
let csvData = fs.readFileSync(filePath, 'utf8'); //the encoding is needed to interpret the data
console.log(typeof(csvData));
console.log(csvData.split(",")[50])
var comma_split_values = csvData.split(",");
/*for(i=0;i<100;i++){
    console.log(comma_split_values[i]);
}*/

/*var allTextLines = csvData.split(/\r\n|\n/);
var headers = csvData[0].split(',');
console.log(headers);
*/
console.log("*********************")
var line = csvData.split("\n");
//console.log(line[0])
/*for(i in line)
{
    console.log(line[i])
    console.log("_____________")
}*/

headings = line[0].split(",");
console.log(headings.length)
//console.log(line[1].split(",").length)

const file = fs.createWriteStream('./try.txt');

file.write("Hello world texting\n");
file.write("Bye world texting\n\n"); 
file.write("[\n")
for(i=1; i< 20;i++)
{
    data = line[i].split(",");
    file.write("{\n");
    //file.write("\t hey:hi\n");
    for(j in headings){
        file.write('\t"'+ headings[j] +'":"'+ data[j]+'",\n');
    }
    file.write("},\n");
}

file.end();


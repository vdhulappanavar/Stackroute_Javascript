const fs = require('fs'); //this is the module we are using to access file system

let filePath = "./India2011.csv";
let filePath1 = "./IndiaSC2011.csv";
let filePath2 = "./IndiaST2011.csv";
let csvData = fs.readFileSync(filePath, 'utf8');
let csvData1 = fs.readFileSync(filePath1, 'utf8');
let csvData2 = fs.readFileSync(filePath2, 'utf8');

var line = csvData.trim().split("\n");
var line1 = csvData1.trim().split("\n");
var line2 = csvData2.trim().split("\n");


console.log(line.length);
console.log(line1.length);
console.log(line2.length);

var headings = line[0].split(",");
var age_group_index = headings.indexOf("Age-group");
console.log(age_group_index)
var Literate_persons = headings.indexOf("Literate - Persons");
console.log(headings[9])
var literate_Persons_index = headings.indexOf("Literate - Persons")
console.log(literate_Persons_index)
console.log("######")

console.log(headings.indexOf("Educational level"))
Education_Category_indexs = new Array()
Education_Category_dict = []

for(i=0;i<headings.length;i++){
    heading_components = headings[i].split("-");
    if((heading_components[0]).trim().localeCompare("Educational level")==0){
        //console.log(heading_components)
        if(heading_components.length>3){ console.log("hi")
            heading_components = heading_components.slice( 1 , heading_components.length-1)
            //console.log(heading_components)
            //console.log(heading_components.join(" - "))
            if(!(heading_components.join(" - ") in Education_Category_dict)){
                Education_Category_dict[heading_components.join(" - ")] = 0;
            }
        }
        else if(!(heading_components[1] in Education_Category_dict))
        {
            console.log(heading_components[1])
            Education_Category_dict[heading_components[1]] = 0;
        }
        Education_Category_indexs.push(i)
        i=i+2
    }
}
console.log("dict")
console.log(Education_Category_dict)
console.log("indexes")
console.log(Education_Category_indexs)
var age_map_dict={} ;
//age_map_dict["hi"+" "] = 20;
//age_map_dict[('12'.toString())] = 20;
//age_map_dict["12"+" "] = 20;
//age_map_dict["12".toString()] = 100;
console.log(age_map_dict)
for(i=1; i<line.length;i++)
{
    data_line = line[i].split(",");
    //console.log((data_line[age_group_index]))
    if(!(data_line[age_group_index] in age_map_dict))
    {
        age_map_dict[data_line[age_group_index]]=parseInt(data_line[Literate_persons]);
    }
    else{
        age_map_dict[data_line[age_group_index]] += parseInt(data_line[Literate_persons]);
    }
}

for(i=1; i<line1.length;i++)
{
    data_line = line1[i].split(",");
    //console.log(typeof(data_line[age_group_index]))
    if(!(data_line[age_group_index] in age_map_dict))
    {
        age_map_dict[data_line[age_group_index]]=parseInt(data_line[Literate_persons]);
    }
    else{
        age_map_dict[data_line[age_group_index]] += parseInt(data_line[Literate_persons]);
    }
}

for(i=1; i<line2.length;i++)
{
    data_line = line2[i].split(",");
    //console.log(typeof(data_line[age_group_index]))
    if(!(data_line[age_group_index] in age_map_dict))
    {
        age_map_dict[data_line[age_group_index]]=parseInt(data_line[Literate_persons]);
    }
    else{
        age_map_dict[data_line[age_group_index]] += parseInt(data_line[Literate_persons]);
    }
}
console.log(age_map_dict)
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


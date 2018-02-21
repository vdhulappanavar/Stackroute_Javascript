const fs = require('fs'); 
let filePath = "./India2011.csv";
let filePath1 = "./IndiaSC2011.csv";
let filePath2 = "./IndiaST2011.csv";
let csvData = fs.readFileSync(filePath, 'utf8');
let csvData1 = fs.readFileSync(filePath1, 'utf8');
let csvData2 = fs.readFileSync(filePath2, 'utf8');

var line = csvData.trim().split("\n");
var line1 = csvData1.trim().split("\n");
var line2 = csvData2.trim().split("\n");

var headings = line[0].split(",");
var age_group_index = headings.indexOf("Age-group");
var Literate_persons = headings.indexOf("Literate - Persons");
var literate_Persons_index = headings.indexOf("Literate - Persons")

Education_Category_indexs = new Array()
Education_Category_dict = []
Education_Category_heading = new Array()

for(i=0;i<headings.length;i++){
    heading_components = headings[i].split("-");
    if((heading_components[0]).trim().localeCompare("Educational level")==0){
        if(heading_components.length>3){ 
            heading_components = heading_components.slice( 1 , heading_components.length-1)
            if(!(heading_components.join(" - ") in Education_Category_dict)){
                Education_Category_dict[heading_components.join(" - ")] = 0;
                Education_Category_heading.push(heading_components.join(" - "))
            }
        }
        else if(!(heading_components[1] in Education_Category_dict))
        {
            Education_Category_heading.push(heading_components[1])
            Education_Category_dict[heading_components[1]] = 0;
        }
        Education_Category_indexs.push(i)
        i=i+2
    }
}
var age_map_dict={} ;

for(i=1; i<line.length;i++)
{
    data_line = line[i].split(",");
    if(!(data_line[age_group_index] in age_map_dict))
    {
        age_map_dict[data_line[age_group_index]]=parseInt(data_line[Literate_persons]);
    }
    else{
        age_map_dict[data_line[age_group_index]] += parseInt(data_line[Literate_persons]);
    }
    for(j in Education_Category_heading){
        Education_Category_dict[Education_Category_heading[j]]+= parseInt(data_line[Education_Category_indexs[j]])
    }
}

for(i=1; i<line1.length;i++)
{
    data_line = line1[i].split(",");
    if(!(data_line[age_group_index] in age_map_dict))
    {
        age_map_dict[data_line[age_group_index]]=parseInt(data_line[Literate_persons]);
    }
    else{
        age_map_dict[data_line[age_group_index]] += parseInt(data_line[Literate_persons]);
    }
    for(j in Education_Category_heading){
        Education_Category_dict[Education_Category_heading[j]]+= parseInt(data_line[Education_Category_indexs[j]])
    }
}

for(i=1; i<line2.length;i++)
{
    data_line = line2[i].split(",");
    if(!(data_line[age_group_index] in age_map_dict))
    {
        age_map_dict[data_line[age_group_index]]=parseInt(data_line[Literate_persons]);
    }
    else{
        age_map_dict[data_line[age_group_index]] += parseInt(data_line[Literate_persons]);
    }
    for(j in Education_Category_heading){
        Education_Category_dict[Education_Category_heading[j]]+= parseInt(data_line[Education_Category_indexs[j]])
    }
}
//console.log(age_map_dict)
//console.log(Education_Category_dict)
const age_map_file = fs.createWriteStream('./age_map.json');
age_map_file.write("[\n");
for(i in age_map_dict){
    //console.log(age_map_dict[i])
    //age_map_file.write('{\n\t"'+i+'":'+age_map_dict[i]+'\n},\n')
    age_map_file.write('{\n\t"age-group" : "'+i+'",\n\t"number" : '+age_map_dict[i]+'},\n')
}
age_map_file.write("]\n");
age_map_file.end();

const education_category_file = fs.createWriteStream('./education_category.json');
education_category_file.write("[\n");
for(i in Education_Category_dict){
    //console.log(age_map_dict[i])
    education_category_file.write('{\n\t"Education_Category" : "'+i+'",\n\t"number" : '+Education_Category_dict[i]+'\n},\n')
}
education_category_file.write("]\n");
education_category_file.end();
const fs = require('fs'); 
var headings=[];
var age_group_index=0;
var Literate_persons =0;
Education_Category_indexs = new Array()
Education_Category_dict = []
Education_Category_heading = new Array()
var age_map_dict={} ;

function read_file(filePath){
    let csvData = fs.readFileSync(filePath, 'utf8');
    return csvData.trim().split("\n");
}

function get_education_category_values(headings)
{
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
}

function consolidate_data(line){
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

}


function get_heading_values(line){
    headings = line.split(",");
    age_group_index = headings.indexOf("Age-group");
    Literate_persons = headings.indexOf("Literate - Persons");
    get_education_category_values(headings)
}

function write_age_map_json(){
    const age_map_file = fs.createWriteStream('./age_map.json');
    age_map_file.write("[\n");
    for(i in age_map_dict){
        //console.log(age_map_dict[i])
        age_map_file.write('{\n\t"'+i+'":'+age_map_dict[i]+'\n},\n')
    }
    age_map_file.write("]\n");
    age_map_file.end();
}

function write_education_category(){
    const education_category_file = fs.createWriteStream('./education_category.json');
    education_category_file.write("[\n");
    for(i in Education_Category_dict){
        //console.log(age_map_dict[i])
        education_category_file.write('{\n\t"'+i+'":'+Education_Category_dict[i]+'\n},\n')
    }
    education_category_file.write("]\n");
    education_category_file.end();
}

function main(){
    csv_to_read = [ "./India2011.csv" , "./IndiaSC2011.csv" , "./IndiaST2011.csv" ]
    for(var i in csv_to_read ){
        var lines = read_file(csv_to_read[i])
        if(i==0){
            get_heading_values(lines[0])
        }
        consolidate_data(lines);
    }
    write_age_map_json();
    write_education_category();
}

main()



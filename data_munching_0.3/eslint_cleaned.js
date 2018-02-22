var headings=[];
var age_group_index=0;
var Literate_persons =0;
var Education_Category_indexs = new Array()
var Education_Category_dict = []
var Education_Category_heading = new Array()
var age_map_dict={} ;
var file_no =0;

function get_education_category_values(headings)
{
    for(var i=0;i<headings.length;i++){
        var heading_components = headings[i].split("-");
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
    //console.log(Education_Category_indexs)
    //console.log(Education_Category_dict)
    //console.log(Education_Category_heading)
}

function consolidate_data(line){
    
        var data_line = line.split(",");
        if(!(data_line[age_group_index] in age_map_dict))
        {
            age_map_dict[data_line[age_group_index]]=parseInt(data_line[Literate_persons]);
        }
        else{
            age_map_dict[data_line[age_group_index]] += parseInt(data_line[Literate_persons]);
        }
        for(var j in Education_Category_heading){
            //console.log(parseInt(data_line[Education_Category_indexs[j]]))
            /*console.log(parseInt(data_line[Education_Category_indexs[j]]))
            console.log(Education_Category_dict[Education_Category_heading[j]])
            console.log(data_line)
            console.log(data_line[Education_Category_indexs[j]])*/
            Education_Category_dict[Education_Category_heading[j]]+= parseInt(data_line[Education_Category_indexs[j]])
            //console.log(Education_Category_dict)
            //console.log(Education_Category_dict)
        }
    

}


function get_heading_values(line){
    headings = line.split(",");
    age_group_index = headings.indexOf("Age-group");
    Literate_persons = headings.indexOf("Literate - Persons");
    get_education_category_values(headings)
}






var csv_to_read = [ "./India2011.csv" , "./IndiaSC2011.csv" , "./IndiaST2011.csv" ]

function read_async(){
    function main(line){
        if(isheading){
            //console.log("heading")
            //console.log(line)
            if(file_no==0)
                get_heading_values(line)
            isheading = false;
        }
        else{
            consolidate_data(line);
        } 
}

    //console.log(i)
    var isheading = true;
    var fs = require('fs');
    var readline = require('readline');
    var stream = require('stream');
    //var instream = fs.createReadStream('./india2011.csv');
    var instream = fs.createReadStream(csv_to_read[file_no]);
    var outstream = new stream;
    var rl = readline.createInterface(instream, outstream);
    rl.on('line', function (line) {
        //console.log(line)

        main(line)
    });
    rl.on('close', function (line) {
        file_no++;
        //console.log("close : "+line+file_no)
        //console.log(Education_Category_dict)
        //isheading = true;
        if(file_no==3)
        {
            //console.log("to write")
            //write_age_map_json();
            // write_education_category();
        }
    });
}
read_async()
read_async()
read_async()
//read_async(0)
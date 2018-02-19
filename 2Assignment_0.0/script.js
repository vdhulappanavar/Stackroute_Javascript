function getData()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //document.getElementById("demo").innerHTML = xhttp.responseText;
           ////console.log(xhttp.responseText);
           parsedata(xhttp.responseText);
        }
    };
    xhttp.open("GET", "repo_data.json", true);
    xhttp.send();

}

function parsedata(json_data){
    var a = [
        {
            "a":"b"
        },
        {
            "c":"d"
        }
    ];
    //console.log( a[0]);
    //console.log("parsedata");
    ////console.log(json_data);
    ////console.log(JSON.parse(json_data)[0]['star']);
    table_heading="<thead class='thead-inverse'>";
    parsed_data = JSON.parse(json_data);
    //console.log(parsed_data)
    //console.log((Object.keys(parsed_data[0])));
    headings=new Array();
    for(i in parsed_data[0]){
        table_heading+= "<th>"+i+"</th>";
        headings.push(i);
    }
    for(i in headings)
        //console.log(headings[i]);
    table_heading+= "</thead>";
    //console.log(headings);
    table = document.getElementById("repo_table");
    table.innerHTML += table_heading;

    table_body="<tbody>"
    //console.log(parsed_data[0]['url'])
    for(i in parsed_data){

        //console.log(parsed_data[i])
        //console.log("testing ::: " +parsed_data[i])
        //console.log("testing ::: " +parsed_data[i]['url'])
        //console.log(parsed_data[i])
        table_body+= "<tr>"
        for(j in headings){
            //console.log(headings[j] )
            //console
            table_body+= "<td>" + parsed_data[i][headings[j]]+ "</td>";
            //console.log( headings[j] + ":" + parsed_data[i][headings[j]]+ typeof(headings[j]))
        }
        table_body+= "</tr>"
    }
    table_body+="</tbody>"
    //console.log(table_body)
    table.innerHTML+= table_body;
}

function get_info(){
    console.log("in get_info");
    console.log(validate(document.getElementById("repo_name").value));
    if(validate(document.getElementById("repo_name").value)){
        //validate_count_needed(document.getElementById('count_needed').value)
        var c = (document.getElementById("repo_table").childNodes);
        console.log(c);
        var d = c[2].childNodes;
        console.log(d);
        console.log(typeof(d[0].childNodes[0]));
        console.log(d[0].childNodes[0].innerHTML)
        for(var i =0;i<d.length;i++){
            console.log(typeof(d[i].childNode))
            console.log((d[i].childNodes[0]))
            //console.log(document.getElementById("repo_name").value)
            if(d[i].childNodes[0].innerHTML == document.getElementById("repo_name").value){
                console.log("true!!!!!!!!!!!");
                //document.getElementById("repo_output").innerHTML+="hi";
                console.log(document.getElementById('count_needed').value);
                console.log(headings)// document.getElementById('count_needed').value)
                console.log(headings.indexOf('url'))
                console.log(headings.indexOf((document.getElementById('count_needed').value).toLowerCase()))
                console.log(d[i].childNodes[headings.indexOf((document.getElementById('count_needed').value).toLowerCase())])
                //document.getElementById("repo_output").innerHTML+="hi";
                document.getElementById("repo_output").className = "alert alert-success text-center col-md-8";
                document.getElementById("repo_output").style = "padding:50px;margin:30px";
                document.getElementById("repo_output").innerHTML="<h2> No of "+document.getElementById('count_needed').value+" for "+document.getElementById("repo_name").value+" is <br>"+  d[i].childNodes[headings.indexOf((document.getElementById('count_needed').value).toLowerCase())].innerHTML+"</h2>"
                document.getElementById("repo_output").innerHTML+= "<button class='btn btn-warning' onclick='clear_repo_output()'> Clear Output</button>";
            }

        }
    }
    else{
        document.getElementById("error_msg").innerHTML =    '<div class="alert alert-danger">Wrong Repo_Url entered</div>';
        document.getElementById("repo_name").value="";
    }
}

function validate(str){    
    //var str="https://github.com/angular/material2"
    var patt = new RegExp("https://github.com/[a-z]*[0-9]*/[a-z]*[0-9]*");
    var res = patt.exec(str);
    console.log("res :::: " + res);

    return res==str;
}

function validate_count_needed(){
   
}
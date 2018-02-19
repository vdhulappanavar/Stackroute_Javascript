function get_table(){
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
    table_heading="<thead class='thead-inverse'>";
    parsed_data = JSON.parse(json_data);
    headings=new Array();
    for(i in parsed_data[0]){
        table_heading+= "<th>"+i+"</th>";
        headings.push(i);
    }
    table_heading+= "</thead>";
    table = document.getElementById("repo_table");
    table.innerHTML += table_heading;

    table_body="<tbody>"
    for(i in parsed_data){
        table_body+= "<tr>"
        for(j in headings)
            table_body+= "<td>" + parsed_data[i][headings[j]]+ "</td>";
        table_body+= "</tr>"
    }
    table_body+="</tbody>";
    table.innerHTML+= table_body;
}

function get_info(){

}

function filter_info(){
    console.log("in filter_info");
    input_value = document.getElementById("repo_name").value;
    console.log(input_value);
    
}
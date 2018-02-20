function getData()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           parsedata(xhttp.responseText);
        }
    };
    xhttp.open("GET", "repo_data.json", true);
    xhttp.send();

}
headings=new Array();
function parsedata(json_data){    
    table_heading="<thead class='thead-inverse'>";
    parsed_data = JSON.parse(json_data);    
    
    count_heading = "";
    for(i in parsed_data[0]){
        table_heading+= "<th>"+i+"</th>";
        if(i!='url' )
         count_heading +="<option value='"+i+"'>"+i+"</option>";
        headings.push(i);
    }    
    document.getElementById("count_list").innerHTML = count_heading;
    table_heading+= "</thead>";
    table = document.getElementById("repo_table");
    table.innerHTML += table_heading;
    options="";
    table_body="<tbody>"
    for(i in parsed_data){
        table_body+= "<tr id='" + parsed_data[i]['url']+"'>";
        options += "<option value='"+parsed_data[i]['url']+"'>"
        for(j in headings){
            table_body+= "<td>" + parsed_data[i][headings[j]]+"</td>"; 
            
        }           
        table_body+= "</tr>"
    }
    table_body+="</tbody>"
    //repos
    document.getElementById("repos_datalist").innerHTML = options;
    table.innerHTML+= table_body;
}

function get_info(){
    var foo = document.getElementById("repo_name").value;
    var foo1 = document.getElementById(foo)
    var foo2 = foo1.getElementsByTagName('td')
    var foo3 = foo2[headings.indexOf(document.getElementById("count_list").value)]
    document.getElementById("repo_output").className = "alert alert-info     text-center col-md-12";
    document.getElementById("repo_output").style = "padding:50px;margin:30px";
    document.getElementById("repo_output").innerHTML="<h2> No of <span class='hidden-xs'>"+document.getElementById('count_list').value+"</span><span class='visible-sm>hey</span>' for "+ foo +" is <br>"+  foo3.innerHTML+"</h2>"
    document.getElementById("repo_output").innerHTML+= "<button class='btn btn-warning' onclick='clear_repo_output()'> Clear Output</button>";
}

function validate(str){
    var patt = new RegExp("https://github.com/[a-z]*[0-9]*/[a-z]*[0-9]*");
    var res = patt.exec(str);
    return res==str;
}

function clear_repo_output(){
    document.getElementById("repo_output").className = "";
    document.getElementById("repo_output").style = "";
    document.getElementById("repo_output").innerHTML=""

}

function validate_count_needed(){
   
}

function clear_repo_output(){
    document.getElementById("repo_output").innerHTML = "";
    document.getElementById("repo_output").className="";
    document.getElementById("repo_output").styley   ="";
}
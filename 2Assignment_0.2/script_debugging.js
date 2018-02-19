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
        //count_heading +="<option value='"+i+"'>"+i+"</option>";
        console.log(i!='url')
        if(i!='url' )
         count_heading +="<option value='"+i+"'>"+i+"</option>";
        headings.push(i);
    }
    console.log(typeof(headings))
    
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
    console.log(headings.indexOf('url'))
}

function get_info(){
    console.log("in get_info");
    console.log(document.getElementById("repo_name").value)
    console.log(document.getElementById("repos_datalist").options)
    var z = document.getElementById("repos_datalist");
    //console.log(z.options[z.selectedIndex])
    /*console.log((z.options[0].value))   
    z=z.options;
    console.log(typeof(z))
    console.log(z)
    console.log(z.indexof(document.getElementById("repo_name")))*/
    console.log(document.getElementById("count_list").value)
    console.log(typeof(headings))
    console.log(headings[1])
    console.log(headings.indexOf("url"))
    console.log([headings.indexOf(document.getElementById("count_list").value)])
    //console.log(document.getElementById(document.getElementById("repo_name").value))
    console.log(document.getElementById(document.getElementById("repo_name").value).getElementsByTagName('td')[headings.indexOf(document.getElementById("count_list").value)])
    var foo = document.getElementById("repo_name").value;
    var foo1 = document.getElementById(foo)
    var foo2 = foo1.getElementsByTagName('td')
    console.log(foo2)
    console.log(headings.indexOf(document.getElementById("count_list").value))
    var foo3 = foo2[headings.indexOf(document.getElementById("count_list").value)]
    console.log("foo 3")
    console.log(foo3)
    document.getElementById("repo_output").className = "alert alert-info     text-center col-md-12";
    document.getElementById("repo_output").style = "padding:50px;margin:30px";
    document.getElementById("repo_output").innerHTML="<h2> No of "+document.getElementById('count_list').value+" for "+ foo +" is <br>"+  foo3.innerHTML+"</h2>"
    document.getElementById("repo_output").innerHTML+= "<button class='btn btn-warning' onclick='clear_repo_output()'> Clear Output</button>";
}

function validate(str){
    var patt = new RegExp("https://github.com/[a-z]*[0-9]*/[a-z]*[0-9]*");
    var res = patt.exec(str);
    return res==str;
}

function validate_count_needed(){
   
}

function clear_repo_output(){
    document.getElementById("repo_output").innerHTML = "";
    document.getElementById("repo_output").className="";
    document.getElementById("repo_output").styley   ="";
}
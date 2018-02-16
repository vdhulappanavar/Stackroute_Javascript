function getFiboSeries(){
    //console.log("getFiboSeries");
    var number = document.getElementById('fibo_input');
    /*console.log(number);
    console.log(number.value)
    console.log(typeof(number.value));*/
    fibo_limit = parseInt(number.value);
    //console.log(fibo_limit);
    first = 1 ;
    second = 1;
    third=0;
    series = first+" "+second;
    console.log(series);
    for(i=0; i< fibo_limit;i++){
        third = first+second;
        series +=" " + third;
        first = second;
        second = third;
    }
    //console.log(series);
    document.getElementById("fibo_display_div").innerHTML= series;
    //while()
}


function getFact(){ 
    console.log("fact");
    var number = parseInt(document.getElementById("fact_input").value);
    var fact = 1;
    for(i=1;i<=number;i++)
        fact=fact*i;
    document.getElementById("fact_display_div").innerHTML = fact;
}

function checkIfPalindrome(){
    console.log("checkIfPalindrome");
    var word = document.getElementById("palindrome_input").value;
    console.log(word);
    var reversed = word.split('').reverse().join('');
    console.log(reversed);
    if(word===reversed)
        document.getElementById("palindrome_result").innerHTML = "YES  " + word +" is a palindrome";
    else    
        document.getElementById("palindrome_result").innerHTML = "NO  " + word +" is not a palindrome.. the reverse is" + reversed;
}

function getPrimeSeries(){
    var number = parseInt(document.getElementById("prime_input").value);
    console.log(number);
    var foo = new Array(number-1);
    for(var i=0;i<number-1;i++)
    {
        foo[i-2] = i;
    }

    for(var i=0;i<number-1;i++)
    {
        //freq=1;
        while(foo[i]==-1)
            i++;
        freq=foo[i];
        for(var j=i;j<number-1;j=j+number)
        {

        }
    }
    /*j=0;
    frequency_num;
    while(j<number-1){
        frequency_num = foo[j];
        for(i=frequency_num-2;)
    }
    console.log(foo);*/
}

function show_input(val){
   // document.getElementById("show_input").value+= document.getElementById()
   console.log(val.innerHTML);
   document.getElementById("show_input").innerHTML+= val.innerHTML;
}

function simplecalc_getResult(){
    var to_calc = document.getElementById("show_input");
    /*console.log(to_calc);
    console.log(eval(to_calc));*/
    to_calc.innerHTML = eval(to_calc.innerHTML);
}

function clear_calc(){
    document.getElementById("show_input").innerHTML="";
}


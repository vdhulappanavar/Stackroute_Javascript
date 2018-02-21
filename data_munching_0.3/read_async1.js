var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var instream = fs.createReadStream('./india2011.csv');
//var instream = fs.createReadStream(csv_to_read[file_no])
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);
rl.on('line', function (line) {
    console.log(line);
    //main(line)
});
rl.on('close', function (line) {
    console.log('end');
});
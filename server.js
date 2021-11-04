const express = require('express');
var path = require('path');
const app = express();

app.use(express.static(path.join(__dirname,'/')))
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'DB_90057_bible_user',
        password: 'Sea12#$56',
        server: 's25.winhost.com', 
        database: 'DB_90057_bible' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query("select chapter, paragraph, sentence from bible2 where long_label=N'잠언'", function (err, result) {
            
            if (err) console.log(err)
            let verses = ''; 
            // send records as a response
             for(let i =0; i< result.recordsets[0].length; i++) {

                if(result.recordsets[0][i].paragraph==1) { 
                    thisVerse = result.recordsets[0][i].chapter + '장' +result.recordsets[0][i].paragraph + result.recordsets[0][i].sentence;
                }
                else {
                    thisVerse = result.recordsets[0][i].paragraph + result.recordsets[0][i].sentence;
                }
                
                //remove comment starting with < and end with >
                if(thisVerse.indexOf('<') > 0) {
                    let startIdx = thisVerse.indexOf('<');
                    let lastIdx = thisVerse.indexOf('>');

                    thisVerse = thisVerse.substring(0, startIdx) + thisVerse.substring(lastIdx+2); 
                }
 
                verses += thisVerse;
 
            }

             //console.log(verses);
           // res.send(result); 
           res.render('index.ejs', { data: verses}); 
           res.end;
        });
    });
});

var server = app.listen(8080, function () {
    console.log('Server is running..');
});
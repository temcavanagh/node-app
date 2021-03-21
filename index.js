// index.js
/* A simple API skeleton in Node.js using express */

const express = require('express')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// 200 Ok
app.get('/', (req, res) => res.status(200).send({message : "run: /hello , /sum?numbers=<command_seperated_numbers> or /reverse-words?sentence=<a_string>"}));


/** ----------------------  /hello - 204 No Content  ---------------------- */

app.get('/hello', (req, res) => {
    res.status(204).end()
});


/** ------------------------------  SUM  ------------------------------ */

var url = require('url');
const { parse } = require('path');

app.get('/sum', function(req, res) {  

    const numbersUrl = req.url;

    // Split function after '=' // String
    function numString(str) {
        return str.split('=')[1];
    }

    var nums = numString(numbersUrl);
    var isValid = /^[0-9,-]*$/.test(nums);
    console.log('isValid: '+isValid);

    var numIntList = nums.split(",").map(Number);


    if (numIntList.some(i => !Number.isInteger(i)) == false && nums.length != 0) {
        var outputSum=0;
        for (let i=0; i<numIntList.length; i++) {
            outputSum += numIntList[i];
        }
        res.status(200).json(outputSum).end();    
    } else if (nums.length === 0) {
        res.send(400);
    } else {
        res.send(400);
    };
  
});


/* ------------------------------  REVERSE-WORDS  ------------------------------ */

app.get('/reverse-words', function(req, res) {

    const reverseUrl = req.url;

    console.log(reverseUrl);

    // Split function after '=' // String
    function wordString(str) {
        return str.split('=')[1];
    }
    
    var stringToReverse = wordString(reverseUrl); 

    console.log(stringToReverse);
    
    stringToReverse = stringToReverse.replace(/%20/g," ");             // Replaces %20 with a space in string
    stringToReverse = stringToReverse.replace(/%23/g,"#");             // Replaces %23 with a # in string
    var reversedString = stringToReverse.replace(/[a-z]+/gi, function(s){return s.split('').reverse().join('')});
    console.log('reversedString: '+reversedString);
    
    res.send(decodeURI(reversedString));

});


// app.listen
app.listen(3000, () => console.info('Application running on port 3000'));

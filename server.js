// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function isIsoDate(string) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (dateRegex.test(string)) return true
  const date = new Date(string)
  return date.toISOString === string
}

function isUnixTimeStamp(string) {
  const numberRegex = /^\d+$/
  if (numberRegex.test(string)) return true
  // some number with leading zeroes
  if (string.length > 1 && string[0] === '0') return false
  return true
}

app.get('/api/timestamp/:date_string?', function (req, res) {
  const dateString = req.params.date_string
  let date
  if (dateString === '') {
    date = new Date()
  } else if (isIsoDate(dateString)) {
    date = new Date(dateString)
  } else if (isUnixTimeStamp(dateString)) {
    date = new Date(+dateString)
  } else {
    res.status(400)
    res.json({error: 'Invalid Date'})
    return
  }
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const isDateValid = (dateStr) => {
  if(dateStr)
    return new Date(dateStr).toString() !== "Invalid Date";
};

const createDateObject = (dateStr) => {
  if(!dateStr) {
    return new Date();
  } else {
    return new Date(dateStr);
  }
};

const createResponseObject = (date, isUnix, err) => {
  if(err)
    return { error: "Invalid Date" };
  else if(isUnix)
    return { unix: date.getTime() * 1000, utc: date.toUTCString() };
  else
    return { unix: date.getTime(), utc: date.toUTCString() };
};

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  let dateStr = req.params.date;
  let err = false;
  let isUnix = false;

  if(dateStr && !isNaN(dateStr)) {
    dateStr = dateStr / 1000;
    isUnix = true;
  }

  if(dateStr && !isDateValid(dateStr))
    err = true;
  
  let date = createDateObject(dateStr);
  let respObj = createResponseObject(date, isUnix, err);

  res.json(respObj)
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

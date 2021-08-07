const bodyParser = require("body-parser");
const edf = require("edf-parser");
const express = require("express");
const formidable = require('formidable');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/fileupload", function(req, res) {
  var form = new formidable({ multiples: true });
  form.parse(req, function(err, fields, files) {
    res.json({ fields, files });
    var reader = fs.createReadStream(files.filetoupload.path);
    var records = edf(reader);
  });
});

app.listen(3000, function() {
  console.log("Server listening at port 3000");
});

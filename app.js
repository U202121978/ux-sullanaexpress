'use strict';

// [START gae_node_request_example]
const express = require('express');
const app = express();
const mime = require('mime');
const fs = require('fs')

const pathbase = '/ux-sullana-express';

app.use(`${pathbase}/assets`, express.static(__dirname + '/app/assets'));

app.all(`${pathbase}/*`, function(req, res, next)
{
  // Set respons header (geen idee of dit compleet is)
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods","GET");
  res.header("Access-Control-Allow-Headers","X-Requested-With,Content-type,Accept,X-Access-Token,X-Key");

  // Set response contenttype
  // res.contentType('application/json');

  next();
});

function sendFile(res, fileURI, contentType) {
  var file = './app/' + fileURI;

  if (!fs.existsSync(file)) {
    file = './app/404.html';
  }

  console.log('---------------------------------------');
  console.log('__dirname', __dirname);
  console.log('file', file);
  console.log('---------------------------------------');
  fs.readFile(file, function(err, data) {
    if(err) {
      res.send("Oops! Couldn't find that file.");
    } else {
      contentType = contentType || mime.getType(file) || 'text/plain';

      // set the content type based on the file
      res.setHeader('content-type', contentType);
      res.contentType(contentType);
      res.send(data);
    }
    res.end();
  });
}

app.get(`${pathbase}/`, (req, res) => {
  sendFile(res, 'index.html');
});

app.get(`${pathbase}/:file`, (req, res) => {
  sendFile(res, req.params.file);
});


// Start the server
const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;

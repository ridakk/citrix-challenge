var express = require('express');
var compression = require('compression');
var app = express();
var http = require('http').Server(app);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/ui/dist/'));
app.use(compression());

app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
  res.send('./ui/dist/index.html');
});

http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

const path = require('path');
var express = require('express'),
  app = express();

app.use(express.static(__dirname + '/dist'));

//const forceSSL = function() {
//  return function (req, res, next) {
//    if (req.headers['x-forwarded-proto'] !== 'https') {
//      return res.redirect(['https://', req.get('Host'), req.url].join(''));
//    }
//  }
//};

//app.use(forceSSL());

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(process.env.PORT || 5000, function () {
  console.log('Express server listening on port ' + `${app.get('port') ? app.get('port') : 5000}`);
});

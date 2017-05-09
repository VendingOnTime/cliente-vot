const path = require('path'),
      express = require('express'),
      app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static(path.resolve('dist')));

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
  }
};

app.use(forceSSL());

app.get('*', function(req, res) {
  res.sendFile(path.resolve('dist', 'index.html'));
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

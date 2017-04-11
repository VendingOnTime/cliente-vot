var express = require('express'),
  app = express();
app.use(express.static('dist/out-tsc'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
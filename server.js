var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    session = require('cookie-session'),
    apiRoutes = require('./server/routes/api'),
    homeRoutes = require('./server/routes/home');

app.use(session({
  keys: [process.env.SESSION_KEY]
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use( bodyParser.json() );

app.use('/', homeRoutes);
app.use('/api', apiRoutes);

app.listen(process.env.PORT || 3000);

module.exports = app;
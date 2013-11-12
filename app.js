var mongoose    = require('./lib/database')(),
    express     = require('express'),
    jade        = require('jade'),
    app         = new express(),
    config      = require('./config')
    routes      = require('./routes');

app.configure(function() {
    app.set('view engine','jade');
    app.set('views',__dirname + '/views');
    
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: 'dev yolo cat keyboard',
    }));
    app.use(express.static(__dirname + '/bower_components'));
    app.use(express.static(__dirname + '/public'));
});

console.log(mongoose);
routes(mongoose,app);

app.listen(8080);
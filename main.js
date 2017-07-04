var express= require('express');
var app= express();
var port= process.env.PORT || 8080;
var morgan= require('morgan');
var session=require('express-session');
var mongoose= require('mongoose');
var bodyParser= require('body-parser');
var configDB= require('./config/database.js');
var passport=require('passport');
var flash=require('connect-flash');
var expressValidator=require('express-validator');
var path= require('path');
mongoose.connect(configDB.url);
var db=mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('The database is open on port 27017');
});
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.use(session({
  secret:'simpleloginsystem',
  saveUninitialized: true,
  resave: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


app.set('view engine', 'pug');
require('./apps/routes.js')(app,passport)
app.listen(port,(req,res)=>{
  console.log("Server started and listening 8080");
});

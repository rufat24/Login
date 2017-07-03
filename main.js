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
mongoose.connect(configDB.url);
var db=mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('The database is open on port 27017');
});
app.use(express.static(__dirname));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(session({
  app.set('view engine', 'pug');
  secret:'simpleloginsystem',
  saveUninitialized: true,
  resave: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.set('view engine', 'pug');
require('./apps/routes.js')(app,passport)
app.listen(port,(req,res)=>{
  console.log("Server started and listening 8080");
});

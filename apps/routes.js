var User = require('./models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


module.exports= function(app){
  app.get('/', (req,res)=>{
    res.render('login',{title:"Login"});
  })
  app.get('/register',(req,res)=>{
    var errors=[];
    res.render('register',{errors:errors});
  });
  app.post('/registeruser', (req,res)=>{
    var username=req.body.username;
    var password=req.body.password;
    var password2=req.body.password2;
    var email=req.body.email;
    var fullname=req.body.fullname;
    console.log(password);
    console.log(password2);
    //Validation of all inputs in registration
    req.checkBody('fullname', 'Name is required').notEmpty();
	  req.checkBody('email', 'Email is required').notEmpty();
	  req.checkBody('email', 'Email is not valid').isEmail();
	  req.checkBody('username', 'Username is required').notEmpty();
	  req.checkBody('password', 'Password is required').notEmpty();
	  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors=req.validationErrors();
    console.log(errors);
    if(errors){
        res.render('register',{errors:errors,username:username, email:email,name:fullname});
    }else{
      var newUser = new User({
  			fullname: fullname,
  			email:email,
  			username: username,
  			password: password
		  });

		  User.createUser(newUser, (err, user)=>{
			     if(err) throw err;
			     console.log(user);
		  });
      req.flash('success_msg', "you are registered");
    }
    res.redirect("/");
    /*var newUser= new User();
    newUser.username=username;
    newUser.password=password;
    newUser.save((err)=>{
      if(err) throw err;
    });
    res.send('Success');*/
  })
}

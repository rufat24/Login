var User = require('./models/user');

module.exports= function(app){
  app.get('/', (req,res)=>{
    res.render('login',{title:"Login"});

  })
  app.get('/:username/:password', (req,res)=>{
    var newUser= new User();
    newUser.username=req.params.username;
    newUser.password=req.params.password;
    newUser.save((err)=>{
      if(err) throw err;
    });
    res.send('Success');
  })
}

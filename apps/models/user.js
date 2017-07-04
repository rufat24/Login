var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');

var userSchema=mongoose.Schema({
      username: {
        type:String,
        unique: true,
        required: true
      },
      password: {
        type:String,
        required: true
      },
      email:{
        type:String,
      },
      fullname:{
        type: String,
      }

});

module.exports = mongoose.model('User',userSchema);
module.exports.createUser = function(newUser,callback){
   bcrypt.genSalt(10,(err,salt)=>{
     bcrypt.hash(newUser.password,salt,(err,hash)=>{
       newUser.password=hash;
       newUser.save(callback);
     })
   })
}

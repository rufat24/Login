$(document).ready(()=>{
  $('.header').on('click','.reglog',function(){
    $('.login-modal').css('display','block');
  });
  $('.login-modal-header').on('click','.login-close',function(){
    $('.login-modal').css('display','none');
  })
  $('.login-modal-body').on('click','#signin',function(){

  })
  $('.login-modal-body').on('click','#register',function(){
        window.location.href="/register";
  });
  $('.register-body').on('click','.register-submit',function(){
    $.ajax({
        url: "/registeruser",
        type: "post",
        dataType: "json",
        data: JSON.stringify({
          username: $('#username').val(),
          password: $('#password').val(),
          password2: $('#password2').val(),
          email: $('#email').val(),
          fullname: $('#fullname').val(),
        }),
       contentType: "application/json",
       complete: function(data) {
         var hello=data.responseText;
         document.open();
         document.write(hello);
         document.close();
       }
    })
  });
});

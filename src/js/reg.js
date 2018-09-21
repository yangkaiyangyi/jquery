
//用户验证,判断
$(function(){
    


  
    //用户名验证
    $('.tel').keyup(function() {
		var usn = $('.tel').val();
		$.ajax({
			type: "get",
			url: "../api/reg.php",
			async: true,
			data: {
				'm': 'index',
				'a': 'verifyUserName',
				'username': usn
			},
			success: function(str) {
				console.log(str);
				var data = JSON.parse(str);
				console.log(data);
				if(!data.code) {
					$('.verifyUserNameMsg').html(data.message).css('color', 'green');
				} else {
					$('.verifyUserNameMsg').html(data.message).css('color', 'red');
				}
			}
		});
	});


    // 用户名注册

    $('.zuce').click(function() {
		var usn = $('.tel').val();
		var psw = $('.pwdf').val();
		$.ajax({
			type: "post",
			url: "../api/reg.php",
			async: true,
			data: {
				'm': 'index',
				'a': 'reg',
				'username': usn,
				'password': psw
			},
			success: function(str) {
				var data = JSON.parse(str);
				if(!data.code) {
                    alert(data.message);
                    location.href="../html/login.html"
				} else {
					alert(data.message);
                }
                

			}
		});
	});

    
    //用户登陆

$('#formBtn').click(function() {
    console.log(666)
    var usn = $('#username2').val();
    var psw = $('#password2').val();
    $.ajax({
        type: "post",
        url: "../api/reg.php",
        async: true,
        data: {
            'm': 'index',
            'a': 'login',
            'username': usn,
            'password': psw
        },
        success: function(str) {
            console.log(str);
            var data = JSON.parse(str);
            console.log(data);
            if(!data.code) {
                alert(data.message);
                location.href="../index.html"
            } else {
                alert(data.message);
                
            }

           
        }
    });
});




$('#logout').click(function() {
    console.log(1233);
    $.ajax({
        type: "get",
        url: "../api/reg.php",
        async: true,
        data: {
            'm': 'index',
            'a': 'logout'
        },
        success: function(str) {
            var data = JSON.parse(str);
            console.log(data);
            if(!data.code) {
                alert(data.message);
            } else {
                alert(data.message);
            }

           
        }
    });
});


// 注册，随机验证码
randomCode();

$('.form_code').click(function(){
    randomCode();
})
function randomCode(){
                        
    var randomAll=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    var content='';
    for(var i=0;i<6;i++){
        content+=randomAll[Math.ceil(Math.random()*(15-0)+0)];
       $('.form_code').html(content)
    
    } 
}


//   同意勾选栏
 $('#agree').click(function(){
    console.log(666)
    if($('#agree').checked){
    $(".form_btn").disabled=false;
    }
    else{
    $(".form_btn").disabled=true;
    }
});

});







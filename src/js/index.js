//输入框失去焦点
$(function(){
    //输入框，p标签影藏，出现
   
       $(".header_inner p").click(function(){
        $(".header_inner p").hide();
        })

        $('.header_search').change(function(){
             if($('.header_search').val()===''){
            $(".header_inner p").show();
       }
        })
 
});


// banner轮播图渐入渐出
$(function() {

    //代码初始化
       var size=$(".banner_img li").size();
       for (var i = 1; i <= size; i++) {
           var li="<li>"+i+"</li>";
           $(".banner_num").append(li);
       };

       //手动控制轮播效果
       $(".banner_img li").eq(0).show();
       $(".banner_num li").eq(0).addClass("active");
       $(".banner_num li").mouseover(function() {
           $(this).addClass("active").siblings().removeClass("active");
           var index = $(this).index();
           i=index;
           $(".banner_img li").eq(index).fadeIn(300).siblings().fadeOut(300);
       })

       //自动
       var i = 0;
       var t = setInterval(move, 1500);
       //核心向左的函数
       function moveLeft() {
           i--;
           if (i == -1) {
                 i = size-1;
           }
           $(".banner_num li").eq(i).addClass("active").siblings().removeClass("active");
           $(".banner_img li").eq(i).fadeIn(300).siblings().fadeOut(300);

       }
       //核心向右的函数
       function move() {
           i++;
           if (i == size) {
               i = 0;
           }
           $(".banner_num li").eq(i).addClass("active").siblings().removeClass("active");
           $(".banner_img li").eq(i).fadeIn(300).siblings().fadeOut(300);

       }
       //定时器的开始与结束
       $(".banner_out").hover(function() {
           clearInterval(t);
       }, function() {
           t = setInterval(move, 1500)
       })
       //左边按钮的点击事件
       $(".banner_out .banner_left").click(function() {
           moveLeft();
       })
       //右边按钮的点击事件
       $(".banner_out .banner_right").click(function() {
           move();
       })
   });

//  广告轮播
$(function() {

	var aLis = $('#slider_img li'); //所有的图片
	var iW = aLis.eq(0).width(); //运动的宽度

	//1、动态创建焦点
	var html = '';
	for(var i = 0; i < 3; i++) {
		html += '<span>' + i + '</span>';
	}
	console.log(html);
	$('#light').html(html);
	$('#light span').eq(0).addClass('active');

	//2、开定时器让图片动起来
	//图片统一放在右侧，第一张图片放在可视区

	$('#slider_img li').css('left', iW + 'px');
	$('#slider_img li').eq(0).css('left', 0);

	//开定时器运动
	var now = 0;
	var timer = null;

	clearInterval(timer);
	timer = setInterval(next, 3000); //每隔两秒切换一个图片

	function next() {
		//旧
		$('#slider_img li').eq(now).animate({
			'left': -iW
		}, 1000);

		now = ++now > $('#slider_img li').length - 1 ? 0 : now;
		//		//新
		$('#slider_img li').eq(now).css('left', iW + 'px');
		$('#slider_img li').eq(now).animate({
			'left': 0
		}, 1000);
		light();
	}
	//3.焦点跟随

	function light() {
		$('#light span').eq(now).addClass('active').siblings().removeClass('active');
	}

	//鼠标经过停下来
	$('#slider').hover(function() {
		clearInterval(timer);
	}, function() {
		timer = setInterval(next, 2000);
	});

	//4.点击焦点切换图片
	$('#light span').click(function(){
		
		if($(this).index()>now){
			//右侧切入
			$('#slider_img li').eq(now).animate({
			'left': -iW
		}, 1000);
			$('#slider_img li').eq($(this).index()).css('left', iW + 'px');
			$('#slider_img li').eq($(this).index()).animate({
			'left': 0
		}, 1000);
			now=$(this).index();
			light();
		}else if($(this).index()<now){
			//从左侧进入
			$('#slider_img li').eq(now).animate({
			'left': iW
		}, 1000);
			$('#slider_img li').eq($(this).index()).css('left', -iW + 'px');
			$('#slider_img li').eq($(this).index()).animate({
			'left': 0
		}, 1000);
			now=$(this).index();
			light();
		}
	});
	

	//5.点击左右按钮切换
	$('#prev').click(function() {
		//上一张
		//旧的
		$('#slider_img li').eq(now).animate({
			'left': iW
		}, 1000);
		now = --now < 0 ? $('#slider_img li').length - 1 : now;
		$('#slider_img li').eq(now).css('left', -iW + 'px');
		$('#slider_img li').eq(now).animate({
			'left': 0
		}, 1000);
	});

	$('#next').click(function() {
		//下一张
		next();
	});


});


// <!-- 吸顶菜单js区域 -->
$(function(){
	//窗口滚动时候，触发
	window.onscroll=function(){
		//滚动距离时候，变化
	if(window.scrollY>=30){
		//  _xdcd.className = '';
		$('#header_content').addClass("fixed");
		$('#header_top').css('marginBottom','85px')
	}else{
		$('#header_content').removeClass("fixed");
		$('#header_top').css('marginBottom','0');
	}
	};

})
	   
	   
   
	   
	
$(function(){
    //header个人中心点击弹窗消失
    $(".admin_off").mouseleave(function(){
        $(".admin_off").css("visibility","hidden");
    })
    $(".adminicon").on("click",function(){
        $(".admin_off").css("visibility","visible");
        $(".admin_off").fadeIn(5000) ; //滑动显现
    })
    //点击一级导航出现二级菜单及小三角
    $(".menuone_c").mouseover(function(){
        // console.log($(this).children("menutwo"));
        $(this).children().children(".headsj").css("display","block");//小箭头
        $(this).siblings().children().children(".headsj").css("display","none");
        $(this).children(".menutwobox").css("display","block");//二级菜单
        $(this).siblings().children(".menutwobox").css("display","none");
        $(this).children().children(".menutwo").css("display","block");//二级菜单
        $(this).siblings().children().children(".menutwo").css("display","none");
        $(this).children(".menumorebox").css("display","block");//更多应用菜单
        $(this).siblings().children(".menumorebox").css("display","none");
        $(".menutwo ul li a").mouseover(function () {//点击二级菜单三级出来
            $(this).parent().children(".menuthree").css("display","block");
            $(this).parent().siblings().children(".menuthree").css("display","none");
        })
    })
    $(".menutwobox").mouseleave(function(){
        $(this).css("display","none");
        $(".headsj").css("display","none");
    })
  //  点击nav菜单消失    待完善
    $("*").not($(".menutwo")&&$(".menuthree")).click(function(){
        $(".menutwo").css("display","none");
        $(".menuthree").css("display","none")
    })
  // 添加tab标签
        $(".menuthree dd a").click(function(){
            var span_text=$(this).children("span").text();
            var a_href=$(this).attr("href");
            console.log(span_text);
            console.log(a_href);
            $(".lablebox").append('<a href="'+a_href+'" class="a"><span>'+span_text+'</span><i class="iconfont icon-cuohao navch i_off" ></i></a>');
            $(".content_box").html('<iframe MARGINWIDTH=0 MARGINHEIGHT=0 HSPACE=0 VSPACE=0 FRAMEBORDER=0 SCROLLING=no src="'+a_href+'" width="100%"  height="100%" id="iframe"></iframe>')

            return false;
        })
    //点击标签栏的错号关闭当前页
    $(".navch").live("click",function(){ ///jquery 1.9(不包括1.9)以下可以
        console.log("当前页面");
        var hrefsnow=$(this).parent().prev().attr("href");
        $(this).parent().remove();//移除当前tab标签
        console.log(hrefsnow);
        $(".content_box").html('<iframe MARGINWIDTH=0 MARGINHEIGHT=0 HSPACE=0 VSPACE=0 FRAMEBORDER=0 SCROLLING=no src="'+hrefsnow+'" width="100%"  height="100%" id="iframe"></iframe>')
        //如果剩一个主页及不能关闭
        if($(".lablebox a").length<2){
            $(".lablebox").html('<a href="login.html"><span>首页</span><i class="iconfont icon-cuohao navch" ></i></a>')
            $(".content_box").html('<iframe MARGINWIDTH=0 MARGINHEIGHT=0 HSPACE=0 VSPACE=0 FRAMEBORDER=0 SCROLLING=no src="login.html" width="100%"  height="100%" id="iframe"></iframe>')
            return false;
        }
        return false;//阻止a连接跳转
    })
    //点击tab标签切换页面
    $(".lablebox a span").live("click",function(){///jquery 1.9(不包括1.9)以下可以
        var hrefsnow=$(this).parent().attr("href");
        $(".content_box").html('<iframe MARGINWIDTH=0 MARGINHEIGHT=0 HSPACE=0 VSPACE=0 FRAMEBORDER=0 SCROLLING=no src="'+hrefsnow+'" width="100%"  height="100%" id="iframe"></iframe>')
        return false;
    })
    //
    $(".lablebox a").live("click",function(){///jquery 1.9(不包括1.9)以下可以
        var hrefsnow=$(this).attr("href");
        $(".content_box").html('<iframe MARGINWIDTH=0 MARGINHEIGHT=0 HSPACE=0 VSPACE=0 FRAMEBORDER=0 SCROLLING=no src="'+hrefsnow+'" width="100%"  height="100%" id="iframe"></iframe>')
        return false;
    })
    //更多应用
   //点击更多应用一级菜单二级出来
    $(".menumorea").mouseover(function () {
        $(this).css({"background":"#2c76f1","color":"#fff"});
        $(".menumoretwo").css("display","block");
    })
    //点击更多应用二级菜单三级出来
    $(".menumoretwo .menumoretwoli").mouseover(function () {
        $(this).children("a").css({"background":"#4a8af4","color":"#fff"});
        $(this).siblings().children("a").css({"background":"#fff","color":"#000"});
        $(this).children(".menumorethree").css("display","block");
        $(this).siblings().children(".menumorethree").css("display","none");
    })
//   添加更多应用的tab标签
    $(".menumorethree dd a").click(function(){
        $(".menumorebox").css("display","none");
        var span_text=$(this).children("span").text();
        var a_href=$(this).attr("href");
        console.log(span_text);
        console.log(a_href);
        $(".lablebox").append('<a href="'+a_href+'" class="a"><span>'+span_text+'</span><i class="iconfont icon-cuohao navch i_off" ></i></a>');
        $(".content_box").html('<iframe MARGINWIDTH=0 MARGINHEIGHT=0 HSPACE=0 VSPACE=0 FRAMEBORDER=0 SCROLLING=no src="'+a_href+'" width="100%"  height="100%" id="iframe"></iframe>')
        return false;
    })
    $(".menumorebox").mouseleave(function(){
        $(this).css("display","none");
        $(".headsj").css("display","none");
    })
})
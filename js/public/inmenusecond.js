
$(".uls li dl dd").mousedown(function(){
    console.log(3333);
    // $(".threememu").text($(this).text())
    $(".threememu").css("display","block");
    $(".tablebox").css("display","none");
    $(this).parent().children().css("display","none");
})
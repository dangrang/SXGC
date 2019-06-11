$(".add_success").click(function(){
    $(this).css("border-bottom","2px solid #05a8f2");
    $(".add_success img").css("display","block");
    $(".add_error").css("border-bottom","none");
    $(".add_error img").css("display","none");
    $(".errorbox").css("display","none");
    $(".successbox").css("display","block");
})
$(".add_error").click(function(){
    $(this).css("border-bottom","2px solid #05a8f2");
    $(".add_success img").css("display","none");
    $(".add_error img").css("display","block");
    $(".add_success").css("border-bottom","none");
    $(".errorbox").css("display","block");
    $(".successbox").css("display","none");
})

//模拟上传文件的样式获取文件的路径
$("#file").change(function(){
        var filePath=$(this).val();
        var arr=filePath.split('\\');
        console.log(arr);
        var fileName=arr[arr.length-1];
        $(".showFileName1").html(fileName);
        // var file = source.files[0];
        // var total = file.size; if(window.FileReader) {
        //     var fr = new FileReader();
        //     fr.onprogress = function(e) { $(".progress1").show();
        //         $("#Progress").val((e.loaded/total)*100) };
        //     fr.onabort=function () {
        //         layer.msg("文件上传中断,请重试")
        //     };
        //     fr.onerror=function () {
        //         layer.msg("文件上传出错，请重试")
        //     };
        //     fr.onload=function () { $(".progress1").hide();
        //         layer.msg("文件上传成功")
        //     };
        //     fr.readAsDataURL(file);
        // }
})
//批量上传
$('input[name="query"]').click(function(){
    var fd = new FormData();
    var name = $("#file").val();
    if(checkData(name)){
        fd.append("name", name); //上传的参数名 参数值 k-v键值对  其实就是文件名
        fd.append("file", $("#file").get(0).files[0]);//上传的文件file   这个是文件
        $.ajax({
            // url:"http://192.168.50.71:8080/AddExcle",
            url:httpsURL+'AddExcle',
            type:"post",
            data:fd,
            cache: false,
            processData: false,
            contentType: false,
            success:function(res){
                console.log(res);
                // alert("操作成功！");
                if(res.errCode==0){
                    confirm("上传成功！");
                    var datas=res.data;
                    var str='<tr class="title">\n' +
                        '                                    <td>序号</td>\n' +
                        '                                    <td>书名</td>\n' +
                        '                                    <td>商品分类</td>\n' +
                        '                                    <td >ISBN号</td>\n' +
                        '                                    <td>版次</td>\n' +
                        '                                    <td>出版社</td>\n' +
                        '                                    <td>京东价</td>\n' +
                        '                                    <td >市场价</td>\n' +
                        '                                    <td>存储量</td>\n' +
                        '                                    <td>操作</td>\n' +
                        '                                </tr>';
                    for(var i in datas){
                        var item=parseInt(i)+1;
                        str+=' <tr><td>'+item+'</td>\n' +
                            ' <td>'+datas[i].title+'</td>\n' +
                            '<td>'+datas[i].categoryid+'</td>\n' +
                            '<td>'+datas[i].isbn+'</td>\n' +
                            '<td>'+datas[i].edition+'</td>\n' +
                            ' <td>'+datas[i].publicer+'</td>\n' +
                            '<td>'+datas[i].jdPrice+'</td>\n' +
                            '<td>'+datas[i].marketPrice+'</td>\n' +
                            '<td>'+datas[i].stockNum+'</td>\n' +
                            // '<td><a href="edit.html?booksId='+datas[i].stockNum+'">编辑</a><a class="deletebtn" id="'+datas[i].stockNum+'">删除</a><a class="deletebtn" id="'+datas[i].stockNum+'">详情</a></td>\n' +
                            '<td class="deletebtn" id="'+datas[i].wareId+'">删除</td>\n' +
                            '</tr>'
                    }
                    $(".successbox table").html(str);
                }else if(res.errCode==1){
                    var infom=res.message;
                    confirm(infom);
                }
            },
            error:function(e){
                alert("网络错误，请重试！！");
            }
        });
    }
})
//选择文件是什么格式
function checkData(fileDir){
    var suffix = fileDir.substr(fileDir.lastIndexOf("."));
    if("" == fileDir){
        alert("选择需要导入的Excel文件！");
        return false;
    }
    if(".xls" != suffix && ".xlsx" != suffix&&".csv" != suffix  ){
        alert("选择Excel格式的文件导入！");
        $('#file').val("");
        return false;
    }
    return true;
}
//错误异常
$(".add_error").click(function(){
    // console.log("返回错误列表");
    // var str="\"com.jd.bk.saf.exception.SafJosException:京东价不能大于市场价#375b461577e24bf0ac48b00170d46274(Solution reference:http://open.jd.com/home/home#/doc/common?listId=533)"
    // var str1=str.split(":");
    // var str3=str1[1].split("#");
    // var str4=str3[0];
    // console.log(str4);
    $.ajax({
        // url:'http://192.168.50.71:8080/get_expdata',
        url:httpsURL+'get_expdata',
        type: "get",
        async: true,
        headers:{},
        success: function(res) {
            console.log(res.data);
            var errordata=res.data;
            var str='<tr class="title">\n' +
                '                                    <td>序号</td>\n' +
                '                                    <td>商品序号</td>\n' +
                '                                    <td>商品描述</td>\n' +
                '                                    <td >错误信息</td>\n' +
                '                                </tr>';
            for(var i in errordata){
                var item=parseInt(i)+1;
                str+=' <tr><td>'+item+'</td>\n' +
                    ' <td>'+errordata[i].ordernum+'</td>\n' +
                    '<td>'+errordata[i].describtion+'</td>\n' +
                    '<td>'+errordata[i].exceptions+'</td>\n' +
                    '</tr>'
            }
            $(".errorbox table").html(str);
        }
    })
})
//打开页面获取数据
$(function(){

    $.ajax({
        // url:"http://192.168.50.71:8080/AddExcle",
        url:httpsURL+'get_successData',
        type: "post",
        async: true,
        headers:{},
        success:function(res){
            console.log(res);
            // alert("操作成功！");
            if(res.errCode==0){
                // confirm("上传成功！");
                var datas=res.data;
                var str='<tr class="title">\n' +
                    '                                    <th>序号</th>\n' +
                    '                                    <th>书名</th>\n' +
                    '                                    <th>商品分类</th>\n' +
                    '                                    <th >ISBN号</th>\n' +
                    '                                    <th>版次</th>\n' +
                    '                                    <th>出版社</th>\n' +
                    '                                    <th>京东价</th>\n' +
                    '                                    <th >市场价</th>\n' +
                    '                                    <th>存储量</th>\n' +
                    '                                    <th>操作</th>\n' +
                    '                                </tr>';
                for(var i in datas){
                    var item=parseInt(i)+1;
                    str+=' <tr><td>'+item+'</td>\n' +
                        ' <td>'+datas[i].title+'</td>\n' +
                        '<td>'+datas[i].categoryid+'</td>\n' +
                        '<td>'+datas[i].isbn+'</td>\n' +
                        '<td>'+datas[i].edition+'</td>\n' +
                        ' <td>'+datas[i].publicer+'</td>\n' +
                        '<td>'+datas[i].jdPrice+'</td>\n' +
                        '<td>'+datas[i].marketPrice+'</td>\n' +
                        '<td>'+datas[i].stockNum+'</td>\n' +
                        // '<td><a href="edit.html?booksId='+datas[i].stockNum+'">编辑</a><a class="deletebtn" id="'+datas[i].stockNum+'">删除</a><a class="deletebtn" id="'+datas[i].stockNum+'">详情</a></td>\n' +
                        '<td class="deletebtn" id="'+datas[i].wareId+'">删除</td>\n' +
                        '</tr>'
                }
                $(".successbox table").html(str);
            }else if(res.errCode==1){
                var infom=res.message;
                confirm(infom);
            }
        },
        error:function(e){
            alert("网络错误，请重试！！");
        }
    });
    //删除功能
    $(".deletebtn").live("click", function(e){
        // var shop_id=e.target.id;
        var shop_id=$(this).attr("id");
        console.log(shop_id);
        data={
            wareId:shop_id
        }
        var datas=JSON.stringify(data);
        console.log(datas);
        var msg = "您真的确定要删除吗？";
        if (confirm(msg)==true){
            // return true;
            //    掉接口
                $.ajax({
                    url:httpsURL+'delete_one',
                    type: "post",
                    async: true,
                    headers:{},
                    data:datas ,
                    // data:shop_id,
                    // ContentType:"application/x-www-form-urlencoded;charset=UTF-8",
                    dataType: "JSON",
                    contentType: "application/json",//此处如果定义了contentType  data必须传成json串
                    success: function(res) {
                        console.log(res);
                        if(res.jingdong_ware_write_delete_responce.code==0){
                            alert("删除成功！")
                            window.location.reload();
                        }else if(res.jingdong_ware_write_delete_responce.code!=0){
                            alert("未能成功删除数据！")
                        }
                    }
                })

        }else{
            return false;
        }
    });
})


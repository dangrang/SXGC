$(function(){
        //页面打开展示数据
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
                        // '                                    <td>操作</td>\n' +
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
                            '</tr>'
                    }
                    $("table").html(str);
                }else if(res.errCode==1){
                    var infom=res.message;
                    confirm(infom);
                }
            },
            error:function(e){
                alert("网络错误，请重试！！");
            }
        });
        //保存展示数据
        $(".savedata").click(function(){
        var bookclass=$(".bookclass").val();
        var bookname=$(".bookname").val();
        var booklong=$(".booklong").val();
        var bookwidth=$(".bookwidth").val();
        var bookheight=$(".bookheight").val();
        var bookweight=$(".bookweight").val();
        var bookimg=$(".bookimg").val();
        var bookcolorid=$(".bookcolorid").val();
        var bookcolorindex=$(".bookcolorindex").val();
        var bookpricejd=$(".bookpricejd").val();
        var bookpricenow=$(".bookpricenow").val();
        var booknumber=$(".booknumber").val();
        var bookisbn=$(".bookisbn").val();
        var bookedition=$(".bookedition").val();
        var bookpress=$(".bookpress").val();
        var comments=$(".comments").val();
        // console.log(bookclass);
        var data={
            categoryId:bookclass,
            title:bookname,
            length:booklong,
            width:bookwidth,
            height:bookheight,
            weight:bookweight,
            imgUrl:bookimg,
            colorId:bookcolorid,
            imgIndex:bookcolorindex,
            introduction:comments,
            jdPrice:bookpricejd,
            marketPrice:bookpricenow,
            stockNum:booknumber,
            isbn:bookisbn,
            edition:bookedition,
            pblicer:bookpress
        }
        console.log(data);
        for (var item in data) {
            if (data[item] == ""){
                confirm("带‘*’部分为必填项");
                return false;
            }

        }
        $.ajax({
            // url:'http://192.168.50.71:8080/upload_one',
            url:httpsURL+'upload_one',
            type: "post",
            async: true,
            headers:{},
            data: JSON.stringify(data),
            dataType: "JSON",
            contentType: "application/json",//此处如果定义了contentType  data必须传成json串
            success: function(res) {
                console.log(res);
                if(res.errCode==0){
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
                            '</tr>'
                    }
                    $("table").html(str);
                }else if(res.errCode==1){
                    var infom=res.message;
                    confirm(infom);
                }

            }
        })
    })
})
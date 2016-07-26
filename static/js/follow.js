/**
 * Created@2015/1/30.
 */

$(document).ready(function(){
    $("#focus").click(function(){
        $("#focus").addClass("down");
        $("#followers").removeClass("down");
        $("#focus_list").show();
        $("#followers_list").hide();
    });
    $("#followers").click(function(){
        $("#followers").addClass("down");
        $("#focus").removeClass("down");
        $("#followers_list").show();
        $("#focus_list").hide();
    });
    //点击我的粉丝按钮，就将datatwo的json数据写进html。
    $("#followers").one("click",function(){
        var url = window.location.href;
        json_begin("two", url);
        });
    // 我关注的点击加载更多。
    $("#loading_one").click(function(){
        var url = window.location.href;
        click_moreTen("one", url);
    });
    // 我的粉丝加载更多。
    $("#loading_two").click(function(){
        var url = window.location.href;
        click_moreTen("two", url);
    });
});

/* 这是渲染jinjia2的json数据的初始10个数据 */
/* 其中参数分别是：
num_string就是用于存放个人资料的div快，以及按钮，
以及json数据后面的append+one/two/...;loading_one/two..等等后面的one，two。。
url就是点击div快要跳转的链接。 */
function json_begin(num_string){
    var c = 0;
    var num = 10;
    var users_datas = $("#data"+num_string).text();
    var users_data = JSON.parse(users_datas);
    var len = users_data.length;
    c++;
    for(var i = (c - 1) * num; i < c * num; i++){
        if(i < len){
        var add1 =
            "<a class='follower' data-page='"+ users_data[i].page +"' style='text-decoration:none;' href='"+ users_data[i].url +"'>"+
                "<div class='page'>" +
                    "<div class='page_img left'>" +
                        "<img src='" + users_data[i].avatar_path + "'/>"+
                   "</div>" +
                   "<div class='page_body'>" +
                   "<div class='page_name'><span>" + users_data[i].nickname + "</span><span>"+ users_data[i].count +"个<i class='iconfont'>&#x5790;</i></span></div>" ;
                   if(users_data[i].sex == 'boy' ){
                       var add2="<div class='page_sex'><span><i class='iconfont man'>&#x5679;</i></span>";
                   }else {
                       var add2="<div class='page_sex'><span><i class='iconfont woman'>&#x5678;</i></span>";
                   }
                   var add3="<span>" + users_data[i].school + "</span><span>" +  users_data[i].status + "</span></div>" +
                   "<div class='page_word'>" + users_data[i].declare + "</div>" +
                "</div>"+
                "<div class='page_time'>" + users_data[i].last_seen + "</div>"+"</div>" ;
        $(".append"+num_string).append(add1 + add2 + add3);
        }
        if(len < 10){
            $("#loading_"+ num_string).text("没有更多了哦！");
        }
    }
}

/* num_string和url同json_begin.js中的，
data就是ajax请求的时候要post的数据。 */
function click_moreTen(num_string, url){
    var num, follow;
    if(num_string == "one"){
        num = $('.followed:last-child').data('page');
        follow = 'followed'
    }else{
        num = $('.follower:last-child').data('page');
        follow = 'follower'
    }
    $.ajax({
            url:url,
            type:"POST",
            data:{num: num, follow: follow}
        })
    .done(function(data){
        if(data == 'error'){
            return false;
        }
        var users = JSON.parse(data);
        $.each(users, function(index, val){
            var add1 =
                "<a class='"+ follow +"' data-page='"+ this.page +"' style='text-decoration:none;' href='"+ this.url +"'>"+
                    "<div class='page'>" +
                        "<div class='page_img left'>" +
                            "<img src='" + this.avatar_path + "'/>"+
                       "</div>" +
                       "<div class='page_body'>" +
                       "<div class='page_name'><span>" + this.nickname + "</span><span>"+ this.count +"个<i class='iconfont'>&#x5790;</i></span></div>" ;
                        if(this.sex == 'boy' ){
                            var add2="<div class='page_sex'><span><i class='iconfont man'>&#x5679;</i></span>";
                        }else {
                            var add2="<div class='page_sex'><span><i class='iconfont woman'>&#x5678;</i></span>";
                        }
                        var add3="<span>" + this.school + "</span><span>" +  this.status + "</span></div>" +
                       "<div class='page_word'>" + this.declare + "</div>" +
                    "</div>"+
                    "<div class='page_time'>" + this.last_seen + "</div>" + "</div>";
            $(".append" + num_string).append(add1 + add2 + add3);
            if(users.length < 10){
                $("#loading_"+ num_string).text("没有更多了哦！");
            }
        })
    });
}

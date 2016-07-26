/*
huangOnline.js 1.0.1
*/
$(document).ready(function () {
    $("#boy").click(function () {
        $("#boy").addClass("down");
        $("#girl").removeClass("down");
        $("#rank").removeClass("down");
        $("#boy_list").show();
        $("#girl_list").hide();
        $("#rank_list").hide();
    });
    $("#girl").click(function () {
        $("#girl").addClass("down");
        $("#boy").removeClass("down");
        $("#rank").removeClass("down");
        $("#girl_list").show();
        $("#boy_list").hide();
        $("#rank_list").hide();
    });
    $("#rank").click(function () {
        $("#rank").addClass("down");
        $("#boy").removeClass("down");
        $("#girl").removeClass("down");
        $("#rank_list").show();
        $("#boy_list").hide();
        $("#girl_list").hide();
    });
});
$(document).ready(function(){
    $(".switch_state_img").click(function(){
        $(".alert").show();
        var img_src=$("#img_switch").attr("src");
        if(img_src == "/static/img/hide.png"){
            $("#alert_img").attr("src","/static/img/show_b.png");
            $("#alert_word").text("　　您已进入在线模式，其他人在匹配系统和排行榜中都可以找到你。再点击状态按钮，可切换至隐身模式。");
        } else{
            $("#alert_img").attr("src","/static/img/hide_b.png");
            $("#alert_word").text("　　您已进入隐身模式，不会在24H中出现。不过其他人仍可在匹配系统中找到你。再点击状态按钮，可切换至公开模式。");
        }
    });
    $(".close").click(function(){
        $(".alert").hide();
        var img_src=$("#img_switch").attr("src");
        var n;
        if(img_src == "/static/img/hide.png"){
           $("#img_switch").attr("src","/static/img/show.png");
           $.ajax({
               url:"/online2",
               type: "POST",
               data: { show: 0 }   //0表示在线。
           })
           .done(function(data){
            if(data === 'error') {
                alert('加载失败，请稍候再试');
                return false;
                }
            location.reload(true);
           });
        }else {
           $("#img_switch").attr("src","/static/img/hide.png");
           $.ajax({
               url:"/online2",
               type: "POST" ,
               data: { show: -1 }    //-1表示隐身。
           })
           .done(function(data){
            if(data === 'error') {
                alert('加载失败，请稍候再试');
                return false;
                }
            location.reload(true);
            });
        }
    })
  });
// 男生点击更多js
/* $(document).ready(function(){
    var boy = 0;
    $("#loading_one").click(function(){
        $("#img_load").attr("src","/static/img/loading.gif");
        boy++;
        if(boy > 4){
            $("#loading_one").text("没有更多了");
            return false
        }
        var last_seen = $('.boy:last-child').data('id');
        //console.log(last_seen);
        $.ajax({
            url:"http://juewangpo.sinaapp.com/online",
            type:"POST",
            data:{ last_seen: last_seen, sex: 'boy'}
        })
        .done(function(data){
            $("#img_load").attr("src","");
            if(data == 'error'){
                return false;
            }
            var users = JSON.parse(data);
            $.each(users, function(index, val){
                var add =
                    "<a class='boy' data-id='"+ this.last_seen +"' style='text-decoration:none;' href='"+this.url+"'>"+
                        "<div class='pageOne'>" +
                            "<div class='page_img left'>" +
                                "<div class='posr'>" +
                                    "<img src='" + this.avatar_path + "'/>";
                var add1 = "";
                if (this.album > 0){
                    add1 = "<div class='photo_online'><i  class='iconfont camera'>&#x5791;</i></div>";
                }
                var add2 =
                                "</div>" +
                           "</div>" +
                           "<div class='page_body'>" +
                           "<div class='page_name'><span>" + this.nickname +"-" + this.album + "</span><span>"+ this.count +"个<i class='iconfont'>&#x5790;</i></span></div>" +
                           "<div class='page_sex'><span><i class='iconfont man'>&#x5679;</i></span>" +
                           "<span>" + this.school + "</span><span>" +  this.status + "</span></div>" +
                           "<div class='page_word'>" + this.declare + "</div>" +
                        "</div>"+
                        "<div class='page_time'>" + this.last_seen2 + "</div>" + "</div>" +
                    "</a>";
                $(".appendone").append(add + add1 + add2);
            });
            if (users.length < 10){
                $("#loading_one").text("没有更多了");
            }
        });
    })
}); */
//女生点击更多 js
/* $(document).ready(function(){
    var girl = 0;
    $("#loading_two").click(function(){
        $("#img_load").attr("src","/static/img/loading.gif");
        girl++;
        if(girl > 4){
            $("#loading_one").text("没有更多了");
            return false
        }
        var last_seen = $('.girl:last-child').data('id');
        $.ajax({
            url:"http://juewangpo.sinaapp.com/online",
            type:"POST",
            data:{last_seen: last_seen, sex: 'girl'}
        })
        .done(function(data){
            $("#img_load").attr("src","");
            if(data == 'error'){
                return false;
            }
            var users = JSON.parse(data);
            $.each(users, function(index, val){
                var add =
                    "<a class='girl' data-id='"+ this.last_seen +"' style='text-decoration:none;' href='"+this.url+"'>"+
                        "<div class='pageTwo'>" +
                            "<div class='page_img left'>" +
                                "<div class='posr'>" +
                                    "<img src='" + this.avatar_path + "'/>";
                var add1 = "";
                if (this.album > 0){
                    add1 = "<div class='photo_online'><i  class='iconfont camera'>&#x5791;</i></div>";
                }
                var add2 =
                                "</div>" +
                           "</div>" +
                           "<div class='page_body'>" +
                           "<div class='page_name'><span>" + this.nickname +"-" + this.album + "</span><span>"+ this.count +"个<i class='iconfont'>&#x5790;</i></span></div>" +
                           "<div class='page_sex'><span><i class='iconfont woman'>&#x5678;</i></span>" +
                           "<span>" + this.school + "</span><span>" +  this.status + "</span></div>" +
                           "<div class='page_word'>" + this.declare + "</div>" +
                        "</div>"+
                        "<div class='page_time'>" + this.last_seen2 + "</div>"+"</div>" +
                    "</a>";
                $(".appendtwo").append(add + add1 + add2);
                var a = $(".appendtwo").html( );
                storage.setItem(html_appendtwo, a); 
                
            });
            if (users.length < 10){
                $("#loading_two").text("没有更多了");
            }
        });
    });
}); */
//排行榜的 点击加载更多 js
/*  $(document).ready(function(){
    var c=0;
    var num=10;
    function loadthree() {
    $("#img_load").attr("src","");
    var users_datas = $('#datathree' ).text();
    var users_data = JSON.parse(users_datas);
	var len=users_data.length;
        c++;
        for (var i = (c - 1) * num; i < c * num; i++) {
		    if(i < len){
            var add1 =
                "<a data-pjax='pjax' style='text-decoration:none;' href='"+users_data[i].url+"'>"+
                    "<div class='page'>" +
                        "<div class='page_img left'>" +
                            "<div class='posr'>" +
                                "<img src='" + users_data[i].avatar_path + "'/>";
            var add2 = "";
                if (users_data[i].album > 0){
                    add2 = "<div class='photo_online'><i  class='iconfont camera'>&#x5791;</i></div>";
                }
            var add3 =
                            "</div>" +
					   "</div>" +
                       "<div class='page_body'>" +
                       "<div class='page_name'><span>" + users_data[i].nickname +"-" + users_data[i].album + "</span><span>"+ users_data[i].count +"个<i class='iconfont'>&#x5790;</i></span></div>" ;
					   if(users_data[i].sex == 'boy' ){
				           var add4="<div class='page_sex'><span><i class='iconfont man'>&#x5679;</i></span>";
					   }else {
					       var add4="<div class='page_sex'><span><i class='iconfont woman'>&#x5678;</i></span>";
					   }
					   var add5="<span>" + users_data[i].school + "</span><span>" +  users_data[i].status + "</span></div>" +
                       "<div class='page_word'>" + users_data[i].declare + "</div>" +
                    "</div>"+
                    "<div class='page_time'>" + users_data[i].last_seen + "</div>"+"</div>" +
                "</a>";
            $(".appendthree").append(add1 + add2 + add3 + add4 + add5);
			}else{
            $("#loading_three").text("没有更多了");
			return false;
			}
        }
    }
	loadthree();
	$("#loading_three").click(function(){
        $("#img_load").attr("src","/static/img/loading.gif");
        loadthree();
	});
}); */
$(document).ready(function(){
var storage = window.localStorage;
var pageIndexKeyRank = "listPageIndexRank";
var pageIndexKeyGirl = "listPageIndexGirl";
var pageIndexKeyBoy = "listPageIndexBoy";
/* var id_girl = "girl";
var id_boy = "boy"; */
var html_appendtwo = "hahah";
var html_appendone = "hahaha";
var html_appendthree = "hahahah";
var whichShow = "me";
var pageNumberRank = storage.getItem(pageIndexKeyRank)  || 0 ;
var pageNumberGirl = storage.getItem(pageIndexKeyGirl)  || 1 ;
var pageNumberBoy = storage.getItem(pageIndexKeyBoy)  || 1 ;
var n1 = storage.getItem(whichShow) || 5;
var html_girl = storage.getItem(html_appendtwo) || 1;
var html_boy = storage.getItem(html_appendone) || 1;
var html_rank = storage.getItem(html_appendthree) || 1;
timeDifferenceRefresh();
/* alert(html_boy);
alert(n1); */
/* 创建loadThree函数 start 用于加载排行榜 */
    var c=0;
    var num=10;
    function loadthree() {
    //$("#img_load").attr("src","");
    var users_datas = $('#datathree' ).text();
    var users_data = JSON.parse(users_datas); 
	var len=users_data.length;
        c++;
        for (var i = (c - 1) * num; i < c * num; i++) {
		    if(i < len){
            var add1 =
                "<a style='text-decoration:none;' href='"+users_data[i].url+"'>"+
                    "<div class='pageThree'>" +
                        "<div class='page_img left'>" +
                            "<div class='posr'>" +
                                "<img src='" + users_data[i].avatar_path + "'/>";
                var add2 = "";
                if (users_data[i].album > 0){
                    add2 = "<div class='photo_online'><i  class='iconfont camera'>&#x5791;</i></div>";
                }
                var add3 =
                            "</div>" +
					   "</div>" +
                       "<div class='page_body'>" +
                       "<div class='page_name'><span>" + users_data[i].nickname + "</span><span>"+ users_data[i].count +"个<i class='iconfont'>&#x5790;</i></span></div>" ;
					   if(users_data[i].sex == 'boy' ){
				           var add4="<div class='page_sex'><span><i class='iconfont man'>&#x5679;</i></span>";
					   }else {
					       var add4="<div class='page_sex'><span><i class='iconfont woman'>&#x5678;</i></span>";
					   }
					   var add5="<span>" + users_data[i].school + "</span><span>" +  users_data[i].status + "</span></div>" +
                       "<div class='page_word'>" + users_data[i].declare + "</div>" +
                    "</div>"+
                    "<div class='page_time'>" + users_data[i].last_seen + "</div>"+"</div>" +
                "</a>";
            $(".appendthree").append(add1 + add2 + add3 + add4 + add5);
			}else{
            $("#loading_three").text("没有更多了");                 
			return false;
			}
        }
    }
/* 创建loadThree函数 end 用于加载排行榜 */
/* 创建loadTwo函数 start 用于加载女生 要发n次ajax请求 */
/* function loadtwo(){
        var last_seen5 = $('.girl:last-child').data('id');
        $.ajax({
            url:"http://juewangpo.sinaapp.com/online",
            type:"POST",
            data:{last_seen: last_seen5, sex: 'girl'}
        })
        .done(function(data){
            $("#img_load").attr("src","");
            if(data == 'error'){
                return false;
            }
            var users = JSON.parse(data);
            $.each(users, function(index, val){
                var add =
                    "<a class='girl' data-id='"+ this.last_seen +"' style='text-decoration:none;' href='"+this.url+"'>"+
                        "<div class='pageTwo'>" +
                            "<div class='page_img left'>" +
                                "<div class='posr'>" +
                                    "<img src='" + this.avatar_path + "'/>";
                var add1 = "";
                if (this.album > 0){
                    add1 = "<div class='photo_online'><i  class='iconfont camera'>&#x5791;</i></div>";
                }
                var add2 =
                                "</div>" +
                           "</div>" +
                           "<div class='page_body'>" +
                           "<div class='page_name'><span>" + this.nickname +"-" + this.album + "</span><span>"+ this.count +"个<i class='iconfont'>&#x5790;</i></span></div>" +
                           "<div class='page_sex'><span><i class='iconfont woman'>&#x5678;</i></span>" +
                           "<span>" + this.school + "</span><span>" +  this.status + "</span></div>" +
                           "<div class='page_word'>" + this.declare + "</div>" +
                        "</div>"+
                        "<div class='page_time'>" + this.last_seen2 + "</div>"+"</div>" +
                    "</a>";
                $(".appendtwo").append(add + add1 + add2);
            });
            if (users.length < 10){
                $("#loading_two").text("没有更多了");
            }
        });        
    }; */
/* 创建loadTwo函数 end 用于加载女生 要发n次ajax请求 */
/* 创建loadOne函数 start 用于加载男生 要发n次ajax请求 */
/* function loadone(){
        var last_seen = $('.boy:last-child').data('id');
        //console.log(last_seen);
        $.ajax({
            url:"http://juewangpo.sinaapp.com/online",
            type:"POST",
            data:{ last_seen: last_seen, sex: 'boy'}
        })
        .done(function(data){
            $("#img_load").attr("src","");
            if(data == 'error'){
                return false;
            }
            var users = JSON.parse(data);
            $.each(users, function(index, val){
                var add =
                    "<a class='boy' data-id='"+ this.last_seen +"' style='text-decoration:none;' href='"+this.url+"'>"+
                        "<div class='pageOne'>" +
                            "<div class='page_img left'>" +
                                "<div class='posr'>" +
                                    "<img src='" + this.avatar_path + "'/>";
                var add1 = "";
                if (this.album > 0){
                    add1 = "<div class='photo_online'><i  class='iconfont camera'>&#x5791;</i></div>";
                }
                var add2 =
                                "</div>" +
                           "</div>" +
                           "<div class='page_body'>" +
                           "<div class='page_name'><span>" + this.nickname +"-" + this.album + "</span><span>"+ this.count +"个<i class='iconfont'>&#x5790;</i></span></div>" +
                           "<div class='page_sex'><span><i class='iconfont man'>&#x5679;</i></span>" +
                           "<span>" + this.school + "</span><span>" +  this.status + "</span></div>" +
                           "<div class='page_word'>" + this.declare + "</div>" +
                        "</div>"+
                        "<div class='page_time'>" + this.last_seen2 + "</div>" + "</div>" +
                    "</a>";
                $(".appendone").append(add + add1 + add2);
            });
            if (users.length < 10){
                $("#loading_one").text("没有更多了");
            }
        });       
    }; */
/* 创建loadOne函数 end 用于加载男生 要发n次ajax请求 */
if(n1 == 3){
    $("#boy_list").hide();
    $("#girl_list").hide();
    $("#rank_list").show();
    $("#rank").addClass("down");
	$("#girl").removeClass("down");
    $("#boy").removeClass("down");	
	
};
if(n1 == 2){
    $("#boy_list").hide();
    $("#girl_list").show();
    $("#rank_list").hide();
    $("#girl").addClass("down");
    $("#boy").removeClass("down");
    $("#rank").removeClass("down");
};
if(n1 == 1){
    $("#boy_list").show();
    $("#girl_list").hide();
    $("#rank_list").hide();
    $("#boy").addClass("down");
    $("#rank").removeClass("down");
    $("#girl").removeClass("down");
};
$("#boy").click(function(){
    storage.setItem(whichShow, 1);
    var a = $(".appendone").html( );
    storage.setItem(html_appendone, a);
});
$("#girl").click(function(){
    storage.setItem(whichShow, 2);
    var a = $(".appendtwo").html( );
    storage.setItem(html_appendtwo, a);
});
$("#rank").click(function(){
    storage.setItem(whichShow, 3);
    var a = $(".appendthree").html( );
    storage.setItem(html_appendthree, a);
});
if (pageNumberRank){
    pageNumberRank = parseInt(pageNumberRank, 10);
};
if (pageNumberGirl){
    pageNumberGirl = parseInt(pageNumberGirl, 10);
};
if (pageNumberBoy){
    pageNumberBoy = parseInt(pageNumberBoy, 10);
};
var pageScrollPositionKey = "listPageScrollY";
storage.setItem(pageIndexKeyRank, pageNumberRank);  
storage.setItem(pageIndexKeyGirl, pageNumberGirl);  
storage.setItem(pageIndexKeyBoy, pageNumberBoy);  
$("#loading_three").click(function(){
    loadthree();
    pageNumberRank += 1; 
    storage.setItem(pageIndexKeyRank, pageNumberRank);  
    storage.setItem(whichShow, 3); 
    });  
/* $("#loading_two").click(function(){
    pageNumberGirl += 1; 
    storage.setItem(pageIndexKeyGirl, pageNumberGirl);  
    storage.setItem(whichShow, 2); 
    });  */
    var girl = 0;
    $("#loading_two").click(function(){
        //$("#img_load").attr("src","/static/img/loading.gif");
        girl++;
        if(girl > 4){
            $("#loading_two").text("没有更多了");
            return false
        }
        var last_seen = $('.girl:last-child').data('id');
        $.ajax({
            url:"/online2",
            type:"POST",
            data:{last_seen: last_seen, sex: 'girl'}
        })
        .done(function(data){
            //$("#img_load").attr("src","");
            if(data == 'error'){
                return false;
            }
            var users = JSON.parse(data);
            $.each(users, function(index, val){
                var add =
                    "<a class='girl' data-id='"+ this.last_seen +"' style='text-decoration:none;' href='"+this.url+"'>"+
                        "<div class='pageTwo'>" +
                            "<div class='page_img left'>" +
                                "<div class='posr'>" +
                                    "<img src='" + this.avatar_path + "'/>";
                var add1 = "";
                if (this.album > 0){
                    add1 = "<div class='photo_online'><i  class='iconfont camera'>&#x5791;</i></div>";
                }
                var add2 =
                                "</div>" +
                           "</div>" +
                           "<div class='page_body'>" +
                           "<div class='page_name'><span>" + this.nickname + "</span><span>"+ this.count +"个<i class='iconfont'>&#x5790;</i></span></div>" +
                           "<div class='page_sex'><span><i class='iconfont woman'>&#x5678;</i></span>" +
                           "<span>" + this.school + "</span><span>" +  this.status + "</span></div>" +
                           "<div class='page_word'>" + this.declare + "</div>" +
                        "</div>"+
                        "<div class='page_time'>" + this.last_seen2 + "</div>"+"</div>" +
                    "</a>";
                $(".appendtwo").append(add + add1 + add2);
                var a = $(".appendtwo").html( );
                storage.setItem(html_appendtwo, a); 
                storage.setItem(whichShow, 2); 
                
            });
            if (users.length < 10){
                $("#loading_two").text("没有更多了");
            }
        });
    });
    var boy = 0;
    $("#loading_one").click(function(){
        //$("#img_load").attr("src","/static/img/loading.gif");
        boy++;
        if(boy > 4){
            $("#loading_one").text("没有更多了");
            return false
        }
        var last_seen = $('.boy:last-child').data('id');
        //console.log(last_seen);
        $.ajax({
            url:"/online2",
            type:"POST",
            data:{ last_seen: last_seen, sex: 'boy'}
        })
        .done(function(data){
            //$("#img_load").attr("src","");
            if(data == 'error'){
                return false;
            }
            var users = JSON.parse(data);
            $.each(users, function(index, val){
                var add =
                    "<a class='boy' data-id='"+ this.last_seen +"' style='text-decoration:none;' href='"+this.url+"'>"+
                        "<div class='pageOne'>" +
                            "<div class='page_img left'>" +
                                "<div class='posr'>" +
                                    "<img src='" + this.avatar_path + "'/>";
                var add1 = "";
                if (this.album > 0){
                    add1 = "<div class='photo_online'><i  class='iconfont camera'>&#x5791;</i></div>";
                }
                var add2 =
                                "</div>" +
                           "</div>" +
                           "<div class='page_body'>" +
                           "<div class='page_name'><span>" + this.nickname + "</span><span>"+ this.count +"个<i class='iconfont'>&#x5790;</i></span></div>" +
                           "<div class='page_sex'><span><i class='iconfont man'>&#x5679;</i></span>" +
                           "<span>" + this.school + "</span><span>" +  this.status + "</span></div>" +
                           "<div class='page_word'>" + this.declare + "</div>" +
                        "</div>"+
                        "<div class='page_time'>" + this.last_seen2 + "</div>" + "</div>" +
                    "</a>";
                $(".appendone").append(add + add1 + add2);
                var a = $(".appendone").html( );
                storage.setItem(html_appendone, a); 
                storage.setItem(whichShow, 1); 
            });
            if (users.length < 10){
                $("#loading_one").text("没有更多了");
            }
        });
    });
    
/* $("#loading_one").click(function(){
    pageNumberBoy += 1; 
    storage.setItem(pageIndexKeyBoy, pageNumberBoy);  
    storage.setItem(whichShow, 1); 
    });  */
  var restorePageVisitStateRank = function() {
    if(n1 == 3){
		pageNumberRank = storage.getItem(pageIndexKeyRank);

        if($.isNumeric(pageNumberRank)){
            pageNumberRank = parseInt(pageNumberRank, 10);
            for (var i = 0; i < pageNumberRank + 1 ; i += 1){
                loadthree();
            }
            //loadthree( );
            window.scrollTo(0, storage.getItem(pageScrollPositionKey)); 
            localStorage.clear( );
            $(".pageThree").click(function(){
                var a = $(".pageThree").size();
                var nn = parseInt(a/10, 10) ;
                storage.setItem(whichShow, 3);
                storage.setItem(pageIndexKeyRank, nn);				
                });
            }; 
        }else{
            loadthree( );
            return;
        }
    };
/* 	 var restorePageVisitStateBoy = function() {

		pageNumberBoy = storage.getItem(pageIndexKeyBoy);

        if($.isNumeric(pageNumberBoy)){
            pageNumberBoy = parseInt(pageNumberBoy, 10);
            for (var i = 0; i < pageNumberBoy; i += 1){
                loadone();
            }
            if(pageNumberBoy != 1){
                window.scrollTo(0, storage.getItem(pageScrollPositionKey)); 
            }else{
                window.scrollTo(0, 0);    
            };
            localStorage.clear( );
		$(".pageOne").click(function(){
			var a = $(".pageOne").size();
			var nn = parseInt(a/10, 10) ;
			storage.setItem(whichShow, 1);
			storage.setItem(pageIndexKeyBoy, nn);				
            });
        };
        return;
    }; */
/*  var restorePageVisitStateGirl = function() {

		pageNumberGirl = storage.getItem(pageIndexKeyGirl);

        if($.isNumeric(pageNumberGirl)){
            pageNumberGirl = parseInt(pageNumberGirl, 10);
            for (var i = 0; i < pageNumberGirl; i += 1){
                loadtwo();
            }
             window.scrollTo(0, storage.getItem(pageScrollPositionKey));  
            localStorage.clear( );
            alert( $(".pageTwo").size())
		$(".pageTwo").click(function(){
			var a = $(".pageTwo").size();
			var nn = parseInt(a/10, 10) ;
			storage.setItem(whichShow, 2);
			storage.setItem(pageIndexKeyGirl, nn);	
            storage.setItem(pageScrollPositionKey, $(window).scrollTop());			
            });
        };
        return;
    }; */
    var restorePageVisitStateGirl = function() {
        if(n1 == 2){
        html_girl = storage.getItem(html_appendtwo);
        $(".appendtwo").html(html_girl);
        window.scrollTo(0, storage.getItem(pageScrollPositionKey));
        storage.clear();
        $(".appendtwo").each(function(){
        var that = $(this);
        that.click(function(){
            var htmlOne = $(".appendtwo").html();  // 妈蛋，这个地方写成appendTwo了，真想抽死自己呀。
            storage.setItem(html_appendtwo, htmlOne);
            storage.setItem(whichShow, 2); 
            storage.setItem(pageScrollPositionKey, $(window).scrollTop()); 
            });            
        });            
        }else{
        return;
        };
    };
    var restorePageVisitStateBoy = function() {
        if(n1 == 1){
        html_boy = storage.getItem(html_appendone);
        $(".appendone").html(html_boy);
        window.scrollTo(0, storage.getItem(pageScrollPositionKey));
        storage.clear();
        $(".appendone").each(function(){
        var that = $(this);
        that.click(function(){
            var htmlOne = $(".appendone").html();  // 妈蛋，这个地方写成appendTwo了，真想抽死自己呀。
            storage.setItem(html_appendone, htmlOne);
            storage.setItem(whichShow, 1); 
            storage.setItem(pageScrollPositionKey, $(window).scrollTop()); 
            });            
        }); 
        }else{
        return;
        };
    };
    //由于是json数据，如果还这种方法的话，会导致每次点击加载风度哦都有数据。导致重复。。。
/*     var restorePageVisitStateRank = function() {
        if(n1 == 3){
        html_rank = storage.getItem(html_appendthree);
        $(".appendthree").html(html_rank);
        window.scrollTo(0, storage.getItem(pageScrollPositionKey));
        storage.clear();
        $(".appendthree").each(function(){
        var that = $(this);
        that.click(function(){
            var htmlOne = $(".appendthree").html();  // 妈蛋，这个地方写成appendTwo了，真想抽死自己呀。
            storage.setItem(html_appendthree, htmlOne);
            storage.setItem(whichShow, 3); 
            storage.setItem(pageScrollPositionKey, $(window).scrollTop()); 
            });            
        }); 
        }else{
        loadthree();
        return;
        };
    };  */  
    
/*         $(".girl").each(function(){
            var that = $(this);
            that.click(function(){
            var htmlTwo = $(".appendTwo").html();
            storage.setItem(html_appendtwo, htmlTwo);
            storage.setItem(whichShow, 2); 
            });            
        });    */ 
   
    restorePageVisitStateGirl( );
    restorePageVisitStateBoy( );
    restorePageVisitStateRank( );	
/*    restorePageVisitStateBoy( ); */
/*     restorePageVisitStateGirl( ); */	
    
    $(window).scroll(function() {
        storage.setItem(pageScrollPositionKey, $(window).scrollTop());
    });
     $("#refre").click(function(){
         localStorage.clear();
         window.location.reload();
     });
     
});

function timeDifferenceRefresh(){
    var time = new Date();
    var timeMinute = parseInt(time.getMinutes()); //获取当前时间的分钟
    var timeHour = parseInt(time.getHours()); //获取当前时间小时
    var timeDay = parseInt(time.getDate()); //获取当前时间天
    //alert("123");
    var timeHourBack = "hour";
    var timeDayBack = "day";  //这个地方需要定义值，不然就是无定义，则存储失效。
    var timeMinBack = "minute";

    var time_hour_back  = parseInt(window.localStorage.getItem(timeHourBack) || timeHour);
    var time_day_back =  parseInt(window.localStorage.getItem(timeDayBack) || timeDay);
    var time_minute_back =  parseInt(window.localStorage.getItem(timeMinBack) || timeMinute);

    window.localStorage.setItem(timeHourBack, timeHour);
    window.localStorage.setItem(timeDayBack, timeDay);
    window.localStorage.setItem(timeMinBack, timeMinute);

    var timeHD = ((timeHour*60 + timeMinute) - (time_hour_back*60 + time_minute_back));
//                    console.log("time_hour_back:" +time_hour_back );
//                    console.log("time_minute_back:" +time_minute_back );
//                    alert(time_hour_back*60 + time_minute_back );
    var timeDD = timeDay - time_day_back;
    if((timeDD == 0 && timeHD >=5) || (timeDD != 0) ){
         location.reload();
    }
}
//对于男生女生，可以写成一个函数的js，然后带参数调用，以免出现错误，就分开写两个，还有就是var add1，add2.add3可以拿出来申明变量后，再直接调用
//这样就是三个要放在一个 $(document).ready(function()中，会有排队问题，还不如独立出来，反正也没多大。
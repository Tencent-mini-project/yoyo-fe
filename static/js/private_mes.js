/*!
	private_msg 1.1
	author:hzhuang&skyway
    增加拉黑发送信息失败提醒！ 2015.12.09
    消息增加三角形 by skyway@15-12-15
*/
$(document).ready(function(){
    setTimeout(function(){myScroll.scrollToElement("div.mes_me:nth-last-child(1)")},200);
    function timeDifferenceRefresh(){
        var time = new Date();
        var timeMinute = parseInt(time.getMinutes()); //获取当前时间的分钟
        var timeHour = parseInt(time.getHours()); //获取当前时间小时
        var timeDay = parseInt(time.getDay()); //获取当前时间天
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
        if((timeDD == 0 && timeHD >=30) || (timeDD != 0) ){
             location.reload();
        }
    }
    //				var myScroll;
    //				function loaded () {
    //				myScroll = new IScroll('#wrapper', { bounceEasing: 'elastic', bounceTime: 1200, checkDOMChanges: true, snapThreshold: 5 });
    //									var scrollTop = $("#wrapper")[0].scrollHeight;
    //					$("#wrapper").scrollTop(scrollTop);	 */
    //				}
    //				document.addEventListener('touchmove', function (e) { e.preventDefault(); }, true);
    //				loaded();
    /* timeDifferenceRefresh(); */
    /* 		        setTimeout(function(){
        var scrollTop = $("#wrapper")[0].scrollHeight;
        $("#wrapper").scrollTop(scrollTop);
    },1000); */
    var ta = document.querySelector('textarea');
    autosize(ta);

    $("#send_mes").click(function(){
        // 被拉黑后还发送信息实时提醒，且不会发送信息
        var inBlacklist = blacklist;
        if(inBlacklist == 1){
            var clacklistalert ='<div class="blacklistalert">' +
                                                 '对不起，你的私信已被对方拒绝接收！' +
                                            '</div>';
            $(".body").append(clacklistalert);
            $("#send_textarea").val("").height("auto");//""打成"
            $("#send_mes").attr("disabled",true);
            $("#send_mes").css("color","#8E8E93");
            setTimeout(function () {
                myScroll.refresh();
                locationToDownest();
            }, 200);
            return false;
        }
        //获取头像连接
        var user_id = $('#send_mes').data('id');
        var url = $('#send_mes').data('url');
        //获取对方ID
        var messageg = $("#send_textarea").val();
        msg = messageg.replace(/<.*?>/g,"");
        var show_msg = replace_em(msg);
        // 发送消息 
        $.ajax({
            url: "/message2/" + user_id,
            type: "POST",
            data: { message: msg }
            })
        .done(function (data) {
            if (data === 'error') {
                alert('发送失败！');
                return false;
            }
            else if(data === 'blacklist'){
                var clacklistalert ='<div class="blacklistalert">对不起，你的私信已被对方拒绝接收！</div>';
                $(".body").append(clacklistalert);
                $("#send_textarea").val("").height("auto");//""打成"
                var send_msg = $("#send_mes");
                send_msg.attr("disabled",true);
                send_msg.css("color","#8E8E93");
                setTimeout(function () {
                    myScroll.refresh();
                    locationToDownest();
                }, 200);
                return false;
            }
        });
        var content =
                "<div class='mes_me posr clear getDownest'> "+
                    "<div class='img_me'>" +
                        "<img src='"+ url +"' alt='photo' />" +
                    "</div>" +
                    " <div class='mes_content_me'>" +
                        " <p class='mes_content_time_me'>"+ CurentTime() +"</p> "+
                        "<div class='msg_right_triangle'></div>"+
                        " <div class='mes_content_word_me'> " + show_msg  +
                        "</div>" +
                    "</div>" +
                "</div >" ;
        $(".body").append(content);
        $("#send_textarea").val("").height("auto");//""打成" "，每次发送后输入框多个空格
        $("#send_mes").attr("disabled",true);
		$("#send_mes").css("color","#8E8E93");
        setTimeout(function () {
            myScroll.refresh();
            locationToDownest();
        }, 200);
    });

    $(".send_face").click(function(){
        $(".footer").css("bottom","21rem");
        $(".pub-faces").css("z-index","99");
    });
    $(".emotion").click(function(){
        $(".footer").css("bottom","21rem");
        $(".pub-faces").css("z-index","99");
   	});

    function checkTxt(msg){
        var s = msg;
        var num = 500;
        // 替换空格
        while(s.lastIndexOf(" ")>=0){
            s = s.replace(" ","");
        }
        // 替换回车
        while(s.lastIndexOf("\n")>=0){
            s = s.replace("\n","");
        }
        if (s.length == 0){
            $("#send_mes").attr("disabled",true); // 不仅仅要改变css，要禁用按钮
            $("#send_mes").css("color","#8E8E93");
            return false;
        }
        if (msg.length >= num){
            alert("最多发送500字");
            $('#send_textarea').val(msg.substr(0, num));
            return false;
        }
        $("#send_mes").attr("disabled",false);
        $("#send_mes").css("color","#32D4F4");
        //console.log(s);
        //alert(s);
    }
    $("#send_textarea").bind("input",function(){
       var msg = $("#send_textarea").val();
        checkTxt(msg);
    });

    $("#send_mes").click(function(){
        $('.pub-faces').css("z-index","-99");
        $(".footer").css("bottom","0rem");
    });
    $("#send_textarea").focus(function(){
        $('.pub-faces').css("z-index","-99");
        $(".footer").css("bottom","0rem");
    });
    $("#wrapper").click(function(){
        $('.pub-faces').css("z-index","-99");
        $(".footer").css("bottom","0rem");
    });
    $(".delete").click(function(){
        $('.pub-faces').css("z-index","-99");
        $(".footer").css("bottom","0rem");
        $(".alert").show();
    });
    $(".cancel").click(function(){
        $(".alert").hide( );
    });

    var expressionHtml = '<ul class="ui-carousel-inner face-panel-wrap">';
	for (var i = 1; i <= 5; i++) {
		expressionHtml += '<li class="ui-carousel-item face-panel face-panel-'+ i +'">';
        for(var j = 0; j < 20; j++){
            var n = 20*(i-1)+j;
            expressionHtml += '<span class="express" index="'+ n +'" alt="[em_'+ n +']"></span>';
        }
        expressionHtml += '<span class="express" index="-1" alt=""></span></li>';
	}
    expressionHtml += '</ul>';
    var bottomHtml = '<ol id="position" class="ui-carousel-indicators">' +
                        '<li class="js-active"></li>' +
                        '<li class=""></li>' +
                        '<li class=""></li>' +
                        '<li class=""></li>' +
                        '<li class=""></li>' +
                      '</ol>';
    expressionHtml += bottomHtml;
    $("#slider").append(expressionHtml);

    var slider =
        Swipe(document.getElementById('slider'), {
            continuous: true,
            callback: function (pos) {

                var i = bullets.length;
                while (i--) {
                    bullets[i].className = ' ';
                }
                bullets[pos].className = 'js-active';
            }
        });

    var bullets = document.getElementById('position').getElementsByTagName('li');

    var curFocus = {
        fid: 'send_textarea',
        start: 0,
        end: 0
    };

    $('#send_textarea').blur(function() {
        curFocus.fid = 'send_textarea';
        curFocus.start = $(this).get(0).selectionStart;
        curFocus.end = $(this).get(0).selectionEnd;
    });
    // 点击表情
    $('.express').on('click', function() {
        // 获取表情对应code
        var imgCode = $(this).attr('alt');
        // 获取编号判断是否为删除按钮
        var index = $(this).attr('index');
    //        var sendTxt = document.getElementById("send_textarea");
        /* $("#send_textarea").trigger("focus"); */
        var ta = document.querySelector('textarea');
        // 删除操作
        if(index == -1){
            if ($('#' + curFocus.fid).length) {
                var text = $('#' + curFocus.fid).val();
                // 获取光标之前的字符串
                var changedText = text.substr(0, curFocus.start);
                var len = changedText.length;
                //console.log(text);
                var reg=/\[em_([0-9]*)\]$/g;
                //var n = str.search(reg);
                // 删除表情code块或最后一个字符
                if(reg.test(changedText)){
                    changedText=changedText.replace(reg,"");
                }else{
                    changedText=changedText.substring(0,changedText.length-1);
                }
                var resText = changedText + text.substr(curFocus.end, text.length);
                //('#' + curFocus.fid).val(resText);
                ta.value = resText;
                autosize.update(ta);
                // 调整光标位置
                curFocus.start = curFocus.end = curFocus.end - (len - changedText.length);
    //                sendTxt.setSelectionRange(curFocus.start, curFocus.end);
    //                sendTxt.focus();
            }
        // 添加操作
        }else if ($('#' + curFocus.fid).length) {
            var text = $('#' + curFocus.fid).val();
            // 添加表情code块到光标位置
            var resText = text.substr(0, curFocus.start) + imgCode + text.substr(curFocus.end, text.length);
            //$('#' + curFocus.fid).val(resText);
            ta.value = resText;
            autosize.update(ta);
            $("#send_mes").attr("disabled",false);
            $("#send_mes").css("color","#32D4F4"); //改变按钮发送的颜色。
            curFocus.start = curFocus.end = curFocus.end + imgCode.length;
        }
        var msg = $("#send_textarea").val();
        // 检测空格和回车
        checkTxt(msg);
    });

    //查看结果
    function replace_em(str){
        str = str.replace(/\</g,'&lt;');
        str = str.replace(/\>/g,'&gt;');
        str = str.replace(/\n/g,'<br/>');
        // str = str.replace(/\[em_([0-9]*)\]/g,'<img src="arclist/$1.gif" border="0" />');
        str = str.replace(/\[em_([0-9]*)\]/g,'<img src="/static/img/expression/$1.png" border="0" />');
        return str;
    }
    function CurentTime(){
        var now = new Date();
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var hh = now.getHours();            //时
        
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();           //秒
        var clock = year + "-";
        if(month < 10)
            clock += "0";
        clock += month + "-";
        if(day < 10)
            clock += "0";
        clock += day + " ";
        if(hh < 10)
            clock += "0";
        clock += hh + ":";
        if (mm < 10) clock += '0';
        clock += mm + ":";
        if (ss < 10) clock += '0';
        clock += ss;
        return(clock);
    }
});
    function locationToDownest(){
            var bodyHeight = parseInt($('body').height())-90;
            var scrollTop = parseInt($("div.getDownest:nth-last-child(1)")[0].offsetTop);
            //console.log(scrollTop);
            if(bodyHeight <= scrollTop){
                setTimeout(function(){myScroll.scrollToElement("div.getDownest:nth-last-child(1)")},100);
            }else{
                return true;
            }
    }
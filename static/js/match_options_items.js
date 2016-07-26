    $(function() {
        $(".match_status label").each(function() {
            var $worked = $("#worked");
            $(this).click(function() {
                $(this).addClass('checked').siblings().removeClass('checked');
                if ($worked.is(":checked")) {
                    $(".match_status").css("height", "10.6rem");
                    $("#status_work").show();
                    $(".match_workPlace").show();
                } else {
                    $(".match_status").css("height", "7.5rem");
                    $(".match_workPlace").hide();
                }
            });
        });
        $(".match_sex label").each(function() {
            $(this).click(function() {
                $(this).addClass('checked').siblings().removeClass('checked');
            });
        });
        //触发省市的js
        //$.initProv("#hometown_pro", "#hometown_city","湖北", "武汉市");
    });

    var match = $('#match');
    var match_init = $('#match-init');
    var notify = $('#notify');
    var matched = $('#matched');
    // 点击匹配按钮
    match.click(function(){
        //发送请求
        $.ajax({
            url:"/match2",
            type:"POST",
            data:{match: 'match'}
        })
        .done(function(data) {
              if (data == 'match-none') {
                  // 显示未匹配到信息，隐藏其他
                  var msg = '啊哦，暂时没有符合所选条件的用户，\n赶紧点击右上角图标分享朋友圈邀请朋友注册吧~';
                  $("#notify-msg").text(msg);
                  matched.css('display', 'none');
                  match_init.css('display', 'none');
                  notify.css('display', 'block');
              }else {
                  var str = JSON.parse(data);
                  if (str['times']) {
                      // 显示超过次数，隐藏其他
                      var msg = '你今天已匹配' + str['times'] + '次，明天再来吧~';
                      if (str['avatar'] == 1) {
                          msg = msg + '\n上传真实头像每天可多5次匹配机会哦';
                      } else if (str['avatar'] == 2) {
                          msg = msg + '\n到个人主页上传高清头像，让别人看到更真实的你吧';
                      }
                      $("#notify-msg").text(msg);
                      matched.css('display', 'none');
                      match_init.css('display', 'none');
                      notify.css('display', 'block');
                  } else {
                      var add =
                        '<a href="'+ str['url'] +'">'+
        		        '<div class="image"><img src="'+ str['avatar']+'" /></div></a>'+
        		        '<div class="match_mes posr">'+
        			        '<ul class="one">'+
        			            '<li>'+ str['nickname'] +'</li>';
                      if(str['sex'] == "\u5973"){
                          var add2 =
        				        '<li><i class="iconfont woman">&#x5678;</i></li>';
                      }else{
                          var add2 =
        				        '<li><i class="iconfont man">&#x5679;</i></li>';
                      }
                      var add3 =
        				        '<li>'+ str['likes'] +'个<i class="iconfont">&#x5790;</i></li>'+
        			        '</ul>'+
        			        '<ul class="two">' +
                                '<li>'+ str['school'] +'　</li>|' +
                                '<li>'+ str['status'] +'</li></ul>'+
        			        '<ul class="three right">' +
                                '<li><i  class="iconfont camera">&#x5791;</i></li>' +
                                '<li>'+ str['album'] +'</li></ul>'+
        			        '<span>最近登录：'+ str['last_seen'] +'</span>'+
                        '</div>';
                      matched.empty();
                      matched.append(add+add2+add3);
                      matched.css('display', 'block');
                      notify.css('display', 'none');
                      match_init.css('display', 'none');
                  }
              }
        });
    });

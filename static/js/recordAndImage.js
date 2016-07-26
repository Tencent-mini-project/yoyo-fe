 // version:2.0

 // 微信js-sdk图片相关接口调用 start
 var upavatar = {
     localId: [],
     serverId: []
 };

 function up_onepic(type) {
     wx.chooseImage({
         success: function(res) {
             upavatar.localId = res.localIds;
             if (res.localIds.length > 1) {
                 alert('已选择 ' + res.localIds.length + ' 张图片,' + '只能选择1张,请重新选择！');
             }
             if (res.localIds.length == 1) {
                 alert('上传图片');
                 wx.uploadImage({
                     localId: upavatar.localId[0],
                     isShowProgressTips: 1,
                     success: function(res) {
                         upavatar.serverId.push(res.serverId);
                         var sI = upavatar.serverId;
                         console.log("upload sucess!");
                         $.ajax({
                                 url: "/profile/" + up_image,
                                 type: 'POST',
                                 data: {
                                     usetype: type,
                                     serverid: sI[0]
                                 }
                             })
                             .done(function(data) {
                                 if (data === 'error') {
                                     console.log("upload failed!");
                                     alert('加载失败，请稍候再试');
                                     return false;
                                 } else {
                                     if (data == "token_error") {
                                         console.log("token_error");
                                         alert('服务器异常');
                                     } else {
                                         console.log("start reload");
                                         location.reload(true);
                                     }
                                 }
                             });
                     }, //上传成功向后台发送serverId
                     fail: function(res) {
                         alert(JSON.stringify(res));
                     }
                 });
             }
         }
     });
 }
 //上传头像
 document.querySelector('#upavatar').onclick = function() {
     if (wx_support) {
         up_onepic("avatar");
     } else {
         alert('请在微信打开或升级微信版本！');
     }

 };

 //上传背景
 document.querySelector('#upback').onclick = function() {
     if (wx_support) {
         up_onepic("back");
     } else {
         alert('请在微信打开或升级微信版本！');
     }
 };

 // 头像预览
 if (document.querySelector('#avatar_view')) {
     document.querySelector('#avatar_view').onclick = function() {
         var avatar_url = $('#avatar_view').attr('src');
         if (avatar_url) {
             var index = avatar_url.indexOf('?imageView2/1/w/100/h/100');
             if (-1 != index) {
                 avatar_url = encodeURI(avatar_url.substring(0, index) + '?imageView2/1/w/400/h/400');
             }
         } else {
             return false;
         }
         var avatar = [];
         avatar.push(avatar_url);
         if (wx_support) {
             wx.previewImage({
                 current: avatar[0],
                 urls: avatar
             });
         } else {
             alert('请在微信打开或升级微信版本！');
         }
     };
 }

 // 相册预览
 document.querySelector('#preview').onclick = function() {
     if (wx_support) {
         wx.previewImage({
             current: url[0],
             urls: url
         });
     } else {
         alert('请在微信打开或升级微信版本！');
     }
 };

 wx.error(function(res) {
     alert(res.errMsg);
 });
 // 微信js-sdk图片相关接口调用 end

 // 微信js-sdk录音相关接口调用 start
 var voice = {
     localId: [],
     serverId: [],
     time: []
 };
 // wx.stopRecord();
 // 录音
 function circle_prigress(num) {
     $('.circle').each(function(index, el) {
         // var num = $(this).find('span').text() * 6;
         num = num * 6;
         if (num <= 180) {
             $(this).find('.right').css('transform', "rotate(" + num + "deg)");
             $(this).find('.left').css('transform', "rotate(0deg)");
         } else {
             $(this).find('.right').css('transform', "rotate(180deg)");
             $(this).find('.left').css('transform', "rotate(" + (num - 180) + "deg)");
         }
     });
 }
 var hideToggle = {
     recordPicStart: function() {
         $("#record_pic_start").removeClass("hide");
         $("#record_start").removeClass("hide");
         $("#recording").addClass("hide");
         $("#record_stop").addClass("hide");
         $("#record_play").addClass("hide");
         $("#record_pause").addClass("hide");
         $(".re_and_upload").addClass("hide");

     },
     recording: function() {
         $("#record_stop").removeClass("hide");
         $("#recording").removeClass("hide");
         $("#record_pic_start").addClass("hide");
         $("#record_start").addClass("hide");
         $("#record_play").addClass("hide");
         $(".re_and_upload").addClass("hide");
     },
     recordPlay: function() {
         $("#record_stop").addClass("hide");
         $("#recording").addClass("hide");
         $("#record_pic_start").addClass("hide");
         $("#record_start").addClass("hide");
         $("#record_play").removeClass("hide");
         $(".re_and_upload").removeClass("hide");
     }

 };

 function stopToPlay() {
     $("#record_play").removeClass("hide");
     $("#recording").addClass("hide");
     $("#record_stop").addClass("hide");
     $(".re_and_upload").removeClass("hide");
 }

 document.querySelector("#record_start").onclick = function() {
     $("#record_pic_start").addClass("hide");
     $("#recording").removeClass("hide");
     $("#record_start").addClass("hide");
     $("#record_stop").removeClass("hide");
     voice.time = 0;
     wx.stopRecord();
     if (wx_record) {
         wx.startRecord({
             success: function() {
                 // $("#record_start").attr("disabled",true);
                 $("#record_second").text(0);
                 var second = parseInt($("#record_second").text());
                 // alert("hzhuang");
                 add = setInterval(function() {
                     second = second + 1;
                     circle_prigress(second);
                     voice.time = parseInt(second);
                     if (voice.time == 59) {
                         clearInterval(add);
                         wx.stopRecord({
                             success: function(res) {
                                 stopToPlay();
                                 voice.localId = res.localId;
                                 vocie.time = 60;
                             },
                             fail: function(res) {
                                 alert(JSON.stringify(res));
                             }
                         });
                     }
                     $("#record_second").text(voice.time);
                 }, 1000);
             },
             fail: function(res) {
                 alert(JSON.stringify(res));
             },
             cancel: function() {
                 alert("如果要使用录音功能，请授权！");
             }
         });
     } else {
         alert("请在微信打开或升级微信版本！");
     }
 };
 document.querySelector("#record_stop").onclick = function() {
     // 点击了stop就应该清除add
     clearInterval(add);
     // console.log(voice.time);
     wx.stopRecord({
         success: function(res) {
             voice.localId = res.localId;
             stopToPlay();
         },
         fail: function(res) {
             alert("录音失败请重新录！");
         }
     });
 };
 document.querySelector(".record_play").onclick = function() {
     if (voice.localId == "" || voice.localId == null) {
         alert("请先录音！");
         return;
     }
     wx.playVoice({
         localId: voice.localId
     });
     // $(".record_play .play").html("&#x5799;");
     $(".record_pause").removeClass("hide");
     $(".record_play").addClass("hide");
     // $(this).addClass("record_pause").removeClass("record_play");

     wx.onVoicePlayEnd({
         success: function(res) {
             // var localId = res.localId; // 返回音频的本地ID
             $(".record_play .play").html("&#x5798;");
             $(".record_pause").addClass("hide");
             $(".record_play").removeClass("hide");
         }
     });
     document.querySelector(".record_pause").onclick = function() {
         wx.stopVoice({
             localId: voice.localId
         });
         $(".record_pause").addClass("hide");
         $(".record_play").removeClass("hide");
     }
 };
 // document.querySelector(".record_pause").onclick = function(){
 //     wx.stopVoice({
 //         localId: voice.localId // 需要停止的音频的本地ID，由stopRecord接口获得
 //     });
 //     $(".record_pause .play").html("&#x5798;");
 // }

 document.querySelector("#re_record").onclick = function() {
     $("#recording").removeClass("hide");
     $("#record_play").addClass("hide");
     $("#record_pause").addClass("hide");
     $("#record_start").removeClass("hide");
     $(".re_and_upload").addClass("hide");
     $("#record_start").attr("disabled", false);
     $("#record_second").text(0);
     circle_prigress(0);
     wx.pauseVoice({
         localId: voice.localId
     });

 };
 document.querySelector("#record_upload").onclick = function() {
         if (voice.localId == '') {
             alert('请先使用 startRecord 接口录制一段声音');
             return;
         }
         wx.uploadVoice({
             localId: voice.localId,
             success: function(res) {
                 console.log('上传语音成功，serverId为:' + res.serverId);
                 voice.serverId = res.serverId;
                 post_data = voice.serverId;
                 $.ajax({
                         url: up_record,
                         type: 'post',
                         data: {
                             'usetype': 'audio',
                             'serverid': post_data,
                             'time': voice.time
                         }
                     })
                     .done(function(data) {
                         if (data == "error") {
                             alert("失败！");
                             return false;
                         } else {
                             alert("上传成功！");
                             location.reload(true);
                         }
                     });
             }
         });
     };
     // <!-- 录音个人主页与录音接口的交互 -->
 $(document).ready(function() {
     // 优化苹果4s点击半天弹框才出来。
     var u = navigator.userAgent,
         app = navigator.appVersion;
     var isAndroid = u.indexOf('Android') > -1;
     var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
     if (isiOS) {
         $(".alert_record").css("background", "rgba(212,212,212,0.4)");
         $(".record_cancel").css("color", "white");
     }
     $(".I_mike").click(function() {
         if (isiOS) {
             $("body").addClass("body_blur");
         }
         $("body,html").css("overflow-y", "hidden");
         /*去掉iphone手机滑动默认行为*/
         $('body').on('touchmove', function(event) {
             event.preventDefault();
         });
         $(".alert_record").removeClass("dn");
         var audio = document.getElementById("record_sound");
         if (audio.play) {
             audio.pause();
             $(".record_play_icon .play").html("&#x5798;");
             audio.src = " ";
         }
     });
     // 别人界面的播放
     $(".play_icon").click(function() {
         if (audio_url) {
             $(".play_icon .play").html("&#x5799;");
             // $(".play_icon .play").css("font-size","2.6rem");
             // $(".record_sum").html('<i class="iconfont volume">&#x5797;</i>')
             var audio = document.getElementById("record_sound");
             if (audio.paused) {
                 $(".record_sum").html('<i class="iconfont volume">&#x5797;</i>')
                 audio.src = audio_url;
                 audio.play();
                 $(".play_icon .play").html("&#x5799;");
                 document.getElementById("record_sound").addEventListener("ended", playEnd, false);
             } else {
                 audio.pause();
                 $(".play_icon .play").html("&#x5798;");
                 audio.src = " ";
                 $(".record_sum").html('<span class="record_sum_sec">' + record_sum + '<span>"</span></span>');
             }
         } else {
             alert("ta还没有录音！");
         }
     });
     $(".record_cancel").click(function() {
         $("body").removeClass("body_blur");
         $(".alert_record").addClass("dn");
         $("body,html").css("overflow-y", "auto");
         $('body').unbind();
         wx.stopRecord();
         clearInterval(add);
         $("#record_second").text(0);
         circle_prigress(0);
         hideToggle.recordPicStart();
         if (voice.localId != "" && voice.localId != null) {
             wx.stopVoice({
                 localId: voice.localId
             });
             $(".record_play .play").html("&#x5798;");
         }
     });
 });

 // 添加播放完成的监听ended事件。
 function playEnd() {
     console.log("播放完啦！");
     $(".play_icon .play").html("&#x5798;");
     $(".record_play_icon .play").html("&#x5798;");
     $(".record_sum").html('<span class="record_sum_sec">' + record_sum + '<span>"</span></span>');
 };
 // document.getElementById("record_sound").addEventListener("ended",playEnd, false);

 document.querySelector(".record_play_icon").onclick = function() {
     var audio = document.getElementById("record_sound");
     if (audio_url) {
         if (audio.paused) {
             audio.src = audio_url;
             audio.play();
             $(".record_play_icon .play").html("&#x5799;");
             document.getElementById("record_sound").addEventListener("ended", playEnd, false);
         } else {
             audio.pause();
             $(".record_play_icon .play").html("&#x5798;");
             audio.src = " ";
         }
     } else {
         alert("请先录音！");
     }
 };

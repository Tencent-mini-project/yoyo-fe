/*============================= WeiXin Share ======================================*/
var imgUrl = 'http://whlove.vipsinaapp.com/static/img/index.jpg';  //pic
var lineLink = 'http://whlove.vipsinaapp.com/store'; //网址
var descContent = '这有声光影狂欢、美食酒吧、第一场雪、海洋馆和跨校交友，带上你的小伙伴一起来狂欢吧！'; //内容
var shareTitle = '武汉高校千人狂欢夜~报名分享送票'; //标题
var appid = 'Joey';

function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage', {
        "appid": appid,
        "img_url": imgUrl,
        "img_width": "640",
        "img_height": "640",
        "link": lineLink,
        "desc": descContent,
        "title": shareTitle
    }, function(res) {
        _report('send_msg', res.err_msg);
    })
}

function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline', {
        "img_url": imgUrl,
        "img_width": "640",
        "img_height": "640",
        "link": lineLink,
        "desc": descContent,
        "title": shareTitle
    }, function(res) {
        _report('timeline', res.err_msg);
    });
}
// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {

    // 发送给好友
    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
        shareFriend();
    });

    // 分享到朋友圈
    WeixinJSBridge.on('menu:share:timeline', function(argv) {
        shareTimeline();
    });

    // 分享到微博
    WeixinJSBridge.on('menu:share:weibo', function(argv) {
        shareWeibo();
    });
}, false);
var _share_node = $('.btn_share'),
	_cover = $('.cover');
_share_node.on('click', function() {
        _cover.hasClass('hidden') && _cover.removeClass('hidden');
 });
_cover.on('click', function(){
		_cover.addClass('hidden');
		//shareFriend();
});
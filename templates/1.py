# -*- coding:utf8 -*-
# json 测试  by lee   @14.8.20


"""
m= [{"n":"北京市","c":["北京市"]},
{"n":"天津市","c":["天津市"]},
{"n":"上海市","c":["上海市"]},
{"n":"重庆市","c":["重庆市"]},
{"n":"河北省","c":["石家庄市","唐山市","秦皇岛市","邯郸市","邢台市","保定市","张家口市","承德市","沧州市","廊坊市","衡水市"]},
{"n":"山西省","c":["太原市","大同市","阳泉市","长治市","晋城市","朔州市","晋中市","运城市","忻州市","临汾市","吕梁市"]},
{"n":"辽宁省","c":["沈阳市","大连市","鞍山市","抚顺市","本溪市","丹东市","锦州市","营口市","阜新市","辽阳市","盘锦市","铁岭市","朝阳市","葫芦岛市"]},
{"n":"吉林省","c":["长春市","吉林市","四平市","辽源市","通化市","白山市","松原市","白城市","延边朝鲜族自治州"]},
{"n":"黑龙江省","c":["哈尔滨市","齐齐哈尔市","鹤岗市","双鸭山市","鸡西市","大庆市","伊春市","牡丹江市","佳木斯市","七台河市","黑河市","绥化市","大兴安岭地区"]},
{"n":"江苏省","c":["南京市","无锡市","徐州市","常州市","苏州市","南通市","连云港市","淮安市","盐城市","扬州市","镇江市","泰州市","宿迁市"]},
{"n":"浙江省","c":["杭州市","宁波市","温州市","嘉兴市","湖州市","绍兴市","金华市","衢州市","舟山市","台州市","丽水市"]},
{"n":"安徽省","c":["合肥市","芜湖市","蚌埠市","淮南市","马鞍山市","淮北市","铜陵市","安庆市","黄山市","滁州市","阜阳市","宿州市","巢湖市","六安市","亳州市","池州市","宣城市"]},
{"n":"福建省","c":["福州市","厦门市","莆田市","三明市","泉州市","漳州市","南平市","龙岩市","宁德市"]},
{"n":"江西省","c":["南昌市","景德镇市","萍乡市","九江市","新余市","鹰潭市","赣州市","吉安市","宜春市","抚州市","上饶市"]},
{"n":"山东省","c":["济南市","青岛市","淄博市","枣庄市","东营市","烟台市","潍坊市","济宁市","泰安市","威海市","日照市","莱芜市","临沂市","德州市","聊城市","滨州市","荷泽市"]},
{"n":"河南省","c":["郑州市","开封市","洛阳市","平顶山市","安阳市","鹤壁市","新乡市","焦作市","濮阳市","许昌市","漯河市","三门峡市","南阳市","商丘市","信阳市","周口市","驻马店市"]},
{"n":"湖北省","c":["武汉市","黄石市","十堰市","宜昌市","襄樊市","鄂州市","荆门市","孝感市","荆州市","黄冈市","咸宁市","随州市","恩施土家族苗族自治州","仙桃市","潜江市","天门市","神农架林区"]},
{"n":"湖南省","c":["长沙市","株洲市","湘潭市","衡阳市","邵阳市","岳阳市","常德市","张家界市","益阳市","郴州市","永州市","怀化市","娄底市","湘西土家族苗族自治州"]},
{"n":"广东省","c":["广州市","深圳市","珠海市","汕头市","韶关市","佛山市","江门市","湛江市","茂名市","肇庆市","惠州市","梅州市","汕尾市","河源市","阳江市","清远市","东莞市","中山市","潮州市","揭阳市","云浮市"]},
{"n":"甘肃省","c":["兰州市","金昌市","白银市","天水市","嘉峪关市","武威市","张掖市","平凉市","酒泉市","庆阳市","定西市","陇南市","临夏回族自治州","甘南藏族自治州"]},
{"n":"四川省","c":["成都市","自贡市","攀枝花市","泸州市","德阳市","绵阳市","广元市","遂宁市","内江市","乐山市","南充市","眉山市","宜宾市","广安市","达州市","雅安市","巴中市","资阳市","阿坝藏族羌族自治州","甘孜藏族自治州","凉山彝族自治州"]},
{"n":"贵州省","c":["贵阳市","六盘水市","遵义市","安顺市","铜仁地区","毕节地区","黔西南布依族苗族自治州","黔东南苗族侗族自治州","黔南布依族苗族自治州"]},
{"n":"海南省","c":["海口市","三亚市","五指山市","琼海市","儋州市","文昌市","万宁市","东方市","澄迈县","定安县","屯昌县","临高县","白沙黎族自治县","昌江黎族自治县","乐东黎族自治县","陵水黎族自治县","保亭黎族苗族自治县","琼中黎族苗族自治县"]},
{"n":"云南省","c":["昆明市","曲靖市","玉溪市","保山市","昭通市","丽江市","思茅市","临沧市","楚雄彝族自治州","红河哈尼族彝族自治州","文山壮族苗族自治州","西双版纳傣族自治州","大理白族自治州","德宏傣族景颇族自治州","怒江傈僳族自治州","迪庆藏族自治州"]},
{"n":"青海省","c":["西宁市","海东地区","海北藏族自治州","黄南藏族自治州","海南藏族自治州","果洛藏族自治州","玉树藏族自治州","海西蒙古族藏族自治州"]},
{"n":"陕西省","c":["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","安康市","商洛市"]},
{"n":"广西壮族自治区","c":["南宁市","柳州市","桂林市","梧州市","北海市","防城港市","钦州市","贵港市","玉林市","百色市","贺州市","河池市","来宾市","崇左市"]},
{"n":"西藏自治区","c":["拉萨市","昌都地区","山南地区","日喀则地区","那曲地区","阿里地区","林芝地区"]},
{"n":"宁夏回族自治区","c":["银川市","石嘴山市","吴忠市","固原市","中卫市"]},
{"n":"台湾","c":["台北市","高雄市","基隆市","台中市","台南市","新竹市","嘉义市","台北县","宜兰县","桃园县","新竹县","苗栗县","台中县","彰化县","南投县","云林县","嘉义县","台南县","高雄县","屏东县","澎湖县","台东县","花莲县"]},
{"n":"香港","c":["九龙","新界","香港岛"]},
{"n":"澳门","c":["澳门"]},
{"n":"亚洲","c":["日本","韩国","新加坡","马来西亚","泰国","伊朗","以色列","沙特","阿联酋"]},
{"n":"美洲","c":["美国","加拿大","墨西哥","巴西","阿根廷"]},
{"n":"非洲","c":["埃及","埃塞俄比亚","南非","索马里","马达加斯加"]},
{"n":"欧洲","c":["德国","俄罗斯","法国","英国","意大利","芬兰","罗马尼亚","梵蒂冈"]},
{"n":"大洋洲","c":["澳大利亚","新西兰","瑙鲁","斐济","密克罗尼西亚"]},
{"n":"球外","c":["月亮","火星","太阳","三体星","M87星云","42号宇宙"]}
]

import json

#select
# or = json.loads(m)
pro = 5
city = 1
print m[pro]["n"].decode('utf8') + '-' + m[pro]["c"][city].decode('utf8')

t = []
for n in m:
    #n["n"] = unicode(n["n"])
    x = unicode(n["n"].decode('utf8'))
    y = [unicode(c.decode('utf8'))  for c in n["c"]]
    z = dict(n=x,c=y)
    t.append(z)
print t
import chardet

"""
import os
import sys
root = os.path.dirname(__file__)
sys.path.insert(0, os.path.join(root, 'site-packages'))
from datetime import datetime
import base64
from qiniu import conf, rs


def update(orgin_bucket, target_bucket, returnUrl, user_id, oops, pipeline):
    conf.ACCESS_KEY = 'ViSapOvS135vs1mb1LBQU3t6z9IrbnY7qEQFsPBo'
    conf.SECRET_KEY = 'q247yZO5m3bDAJqtBmv9D528YiEL5CG16HlkDaeH'

    key = str(datetime.now())[:23]
    policy = rs.PutPolicy("%s:%s" % (orgin_bucket, key))
    policy.returnUrl = returnUrl
    tkey = key[:19]+user_id
    policy.returnBody = '{"hash": $(etag), "key": "%s", "persistentId":"$(persistentId)"}'%tkey
    policy.mimeLimit = "image/*"
    policy.fsizeLimit = 5000000

    entry = target_bucket+':'+ tkey
    EncodeEntryURI = base64.urlsafe_b64encode(entry)
    # oops 举例：'imageView2/1/w/100/h/100/q/100|saveas/'
    Ops = oops + EncodeEntryURI
    policy.persistentOps = Ops
    policy.persistentPipeline = pipeline
    uptoken = policy.token()
    return uptoken


if __name__ == '__main__':
    print update('test-bucket-1', 'avatar-thumb', 'http://127.0.0.1:8080/upavatar', '4',
                 'imageView2/1/w/100/h/100/q/100|saveas/', 'background' )


    <!-- extend base layout -->
{% extends "base.html" %}
{% block content %}
<h1>与{{user.nickname}}的私信</h1>
{% include 'flash.html' %}

{% for message in messages %}
    <table class="table table-hover">
    <tr>
        <td width="70px"><a href="{{url_for('profile', id = message.author.id)}}"><img src="{{message.author.avatar_path}}" /></a></td>
        <td>
            <p><a href="{{url_for('profile', id = message.author.id)}}">{{message.author.nickname}}</a>发表于:{{message.timestamp}}</p>
            <p><strong>{{message.body}}</strong></p>
        </td>
    </tr>
    </table>
{% endfor %}
<div class="well">
    <form class="form-horizontal" action="" method="post" name="message">
        {{form.hidden_tag()}}
        <div class="control-group{% if form.errors.post %} error{% endif %}">
            <label class="control-label" for="message">悄悄话:</label>
            <div class="controls">
                {{ form.message(size = 30, maxlength = 500) }}
                {% for error in form.errors.message %}
                    <span class="help-inline">[{{error}}]</span><br>
                {% endfor %}
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <input class="btn btn-primary" type="submit" value="发送">
            </div>
        </div>
    </form>
</div>
{# 取消分页  by lee @ 14.8.24
<ul class="pager">
    {% if messages.has_prev %}
    <li class="previous"><a href="{{ url_for('message', id = user.id, page = messages.prev_num) }}">上一页</a></li>
    {% else %}
    <li class="previous disabled"><a href="#">上一页</a></li>
    {% endif %}
    {% if messages.has_next %}
    <li class="next"><a href="{{ url_for('message', id = user.id, page = messages.next_num) }}">下一页</a></li>
    {% else %}
    <li class="next disabled"><a href="#">下一页</a></li>
    {% endif %}
</ul>
 #}
{% endblock %}


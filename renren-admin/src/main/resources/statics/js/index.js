//生成菜单
var menuItem = Vue.extend({
    name: 'menu-item',
    props: {item: {}},
    template: [
        '<li>',
        '	<a v-if="item.type === 0" href="javascript:;">',
        '		<i v-if="item.icon != null" :class="item.icon"></i>',
        '		<span>{{item.name}}</span>',
        '		<i class="fa fa-angle-left pull-right"></i>',
        '	</a>',
        '	<ul v-if="item.type === 0" class="treeview-menu">',
        '		<menu-item :item="item" v-for="item in item.list"></menu-item>',
        '	</ul>',

        '	<a v-if="item.type === 1 && item.parentId === 0" :href="\'#\'+item.url">',
        '		<i v-if="item.icon != null" :class="item.icon"></i>',
        '		<span>{{item.name}}</span>',
        '	</a>',

        '	<a v-if="item.type === 1 && item.parentId != 0" :href="\'#\'+item.url"><i v-if="item.icon != null" :class="item.icon"></i><i v-else class="fa fa-circle-o"></i> {{item.name}}</a>',
        '</li>'
    ].join('')
});

//iframe自适应
$(window).on('resize', function () {
    var $content = $('.content');
    $content.height($(this).height() - 154);
    $content.find('iframe').each(function () {
        $(this).height($content.height());
    });
}).resize();

//注册菜单组件
Vue.component('menuItem', menuItem);

var vm = new Vue({
    el: '#rrapp',
    data: {
        user: {},
        menuList: {},
        main: "main.html",
        password: '',
        newPassword: '',
        navTitle: "控制台"
    },
    methods: {
        getMenuList: function (event) {
            $.getJSON("sys/menu/nav?_" + $.now(), function (r) {
                vm.menuList = r.menuList;
            });
        },
        getUser: function () {
            $.getJSON("sys/user/info?_" + $.now(), function (r) {
                vm.user = r.user;
            });
        },
        updatePassword: function () {
            layer.open({
                type: 1,
                skin: 'layui-layer-molv',
                title: "修改密码",
                area: ['550px', '270px'],
                shadeClose: false,
                content: jQuery("#passwordLayer"),
                btn: ['修改', '取消'],
                btn1: function (index) {
                    var data = "password=" + vm.password + "&newPassword=" + vm.newPassword;
                    $.ajax({
                        type: "POST",
                        url: "sys/user/password",
                        data: data,
                        dataType: "json",
                        success: function (result) {
                            if (result.code == 0) {
                                layer.close(index);
                                layer.alert('修改成功', function (index) {
                                    location.reload();
                                });
                            } else {
                                layer.alert(result.msg);
                            }
                        }
                    });
                }
            });
        },
        donate: function () {
            layer.open({
                type: 2,
                title: false,
                area: ['806px', '467px'],
                closeBtn: 1,
                shadeClose: false,
                content: ['http://cdn.renren.io/donate.jpg', 'no']
            });
        },
        contentSocket: function () {
            var socket;
            if (!window.WebSocket) {

                window.WebSocket = window.MozWebSocket;
            }

            if (window.WebSocket) {
                socket = new WebSocket("ws://localhost:8081/websocket");

                socket.onmessage = function (event) {
//收到消息
                    var ta = document.getElementById('responseText');
                    ta.value += event.data + "\r\n";
                };

                socket.onopen = function (event) {

                    var ta = document.getElementById('responseText');
                    ta.value = "打开WebSoket 服务正常，浏览器支持WebSoket!" + "\r\n";
                    // send("22222222222")
                    login("k","f",[1,2,3])
                };

                socket.onclose = function (event) {

                    var ta = document.getElementById('responseText');
                    ta.value = "";
                    ta.value = "WebSocket 关闭" + "\r\n";
                };
            } else {
                alert("您的浏览器不支持WebSocket协议！");
            }

            /**
             * 登录
             * @param key 申请的项目key
             * @param flag 唯一标识
             * @param labels 标签
             */
            function login(key,flag,labels) {
                var json = "{\"key\":\""+key+"\",\"flag\":\""+flag+"\",\"label\":["+labels+"]}"
                send(json);
            }

            function send(message) {
                if (!window.WebSocket) {
                    return;
                }
                if (socket.readyState == WebSocket.OPEN) {
                    socket.send(message);
                } else {
                    alert("WebSocket 连接没有建立成功！");
                }

            }
        }


    },
    created: function () {
        this.getMenuList();
        this.getUser();
        this.contentSocket();
    },
    updated: function () {
        //路由
        var router = new Router();
        routerList(router, vm.menuList);
        router.start();
    }
});


function routerList(router, menuList) {
    for (var key in menuList) {
        var menu = menuList[key];
        if (menu.type == 0) {
            routerList(router, menu.list);
        } else if (menu.type == 1) {
            router.add('#' + menu.url, function () {
                var url = window.location.hash;

                //替换iframe的url
                vm.main = url.replace('#', '');

                //导航菜单展开
                $(".treeview-menu li").removeClass("active");
                $("a[href='" + url + "']").parents("li").addClass("active");

                vm.navTitle = $("a[href='" + url + "']").text();
            });
        }
    }
}
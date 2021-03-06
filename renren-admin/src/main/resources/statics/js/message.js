$(function () {
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
            send("22222222222")
        };

        socket.onclose = function (event) {

            var ta = document.getElementById('responseText');
            ta.value = "";
            ta.value = "WebSocket 关闭" + "\r\n";
        };
    } else {
        alert("您的浏览器不支持WebSocket协议！");
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
});
var app = require('express')(); //npm install --save express@4.10.2
var http = require('http').Server(app)
var io = require('socket.io')(http); //socket.ioのnode.jsオブジェクト


//expressというパッケージを使うと、ルーティングが簡単に使える。
//ルーティングはURLの末尾によって挙動を変えられる命令みたいな。
//今回はURLの末尾が'/'なので、index.htmlをRenderする。

app.get('/',function(req,res){
	res.sendFile( __dirname + '/index.html');
});


//'connection'というセッションは予約？
io.on('connection',function(socket){
	console.log('a user connected: ' + socket.id);
	socket.broadcast.emit('room message','user:'+socket.id+' logged in' );
	//chat messageというイベントが発生した際に処理する。msgには、index.htmlのinputの値が格納される。
	socket.on('chat message',function(msg){
		//すべてのクライアントにメッセージを創出する。			
		io.emit('chat message',msg);
		console.log('chat message : '+msg);
	});
});

http.listen(3000,function(){
	console.log('listening on port 3000');
});



// Node.js Hello world script below...

/*

var http = require('http')
var server = http.createServer();
server.on('request',function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.write('hello world');
	res.end();
});

server.listen(1337,'192.168.33.10');
console.log('server listening');


*/
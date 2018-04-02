var express=require('express');
var app=express();
var http=require('http').Server(app);
var path=require('path');
var io=require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public/')));
console.log(path.join(__dirname, 'public/'));

app.get('/',function(req,res){
    res.sendFile('views/index.html', {root: __dirname});
});

io.on('connection',function(socket){
    console.log("User connected");
    // var x=prompt("enter your name?");
    socket.on('chat message', function(msg){
        // socket.broadcast.emit(msg);
        socket.broadcast.emit('server message',msg);
        console.log(msg);
    })
    socket.on('disconnect',function(){
        console.log("User Disconnected");
    })
});

http.listen(3001, function(){
    console.log("Listening on port 3001");
})
const express = require('express');
const session=require('express-session')
const app =express();
const ejs = require('ejs');
const bodyparser=require('body-parser');
const server=require('http').createServer(app)
const multer=require('multer')
// set multer for file uploading
/* const storsge=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads')
    },
    filename:function (req,file,cb) {
        cb(null,Date.now() + '-'+file.originalname)
    }
})
const upload=multer({storage:storsge})


app.post('chat',upload.single('file'),(req,res,next)=>{
    const file=req.body.file
    if (!file) {
        const error=new Error('please upload a file')
        error.httpStatusCode=400;
        return next(error)
    }
    res.send(file)
})
*/
const io = require('socket.io')(server,{
    cors:{
        origin:"*"
    }
});
//set up sessision middlewire
app.use(session({
    secret:'my-secret',
    resave:false,
    saveUninitialized:true
}))


const Message=require('./models/store')
// const User=require()
// set port
const port=process.env.PORT||3000

//geting files from public folder
app.use(express.static('public'))
//set ejs  to
app.set('view engine','ejs') 
// connect bodyparser
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
//set router to post data in page
app.post('/',(req,res)=>{
    
})

let users={}


//handeling incoming socket connection
io.on('connection',(socket)=>{
    console.log(`a user ${socket.id} has connected`);

// welcome current user
let date=new Date();
// let ampm=date.get
let t=date.getHours()
let mn=date.getMinutes()
let ampm
if(t>12){
    t=t-12
ampm="PM"
}
else{
    ampm="AM"
}
let dy= date.getDate()
let y=date.getFullYear()
let m=date.getMonth()+1
    socket.emit('message','you have joined in '+dy+'/'+m+'/'+y+ ' at '+ '('+t +' : '+ mn + ampm+')')
// broadcast when a user connect except who had entered 


    socket.on('username',(username)=>{
        users[socket.id]=username
        socket.broadcast.emit('joinmsg', ` ${username} has joined the chat`)})
    socket.on('chatmsg',(msg)=>{
      // save the message in data base
      const chat=new Message({text:msg.chat,sender:msg.user});
      chat.save()
      .then(()=>{
    socket.broadcast.emit('chats',msg);
     console.log(msg)
    }).catch((error)=>{
        console.error('Error saving message',error)
    })
    // io.emit('chats',msg)
    })
socket.on('filedata',(files)=>{
    socket.broadcast.emit('files',files)
    console.log(files)
})

    socket.on('disconnect',()=>{
        user=users[socket.id]
        io.emit('joinmsg',`${user} has left the chat`)
        delete users[socket.id]
        console.log(`user  disconnected`)
    })
})


 app.get('/',(req,res)=>{
    // const {username}=req.query.username;
    res.render('chat')
})
 
 



server.listen(port,()=>{
    console.log("app is running " + port)
})
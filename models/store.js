const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/chat-app',{
    useNewUrlParser:true,useUnifiedTopology:true
}).then(() => {
    console.log("connected to mongodb.....")
}).catch(() => {
    console.log("could not connect to mongodb...")
});

//define the user schema
// const userSchema= new mongoose.Schema({
//     username:{
//         type:String,
//         required:true
//     },
//     userpassword:{
//         type:String,
//         required:true
//     }
// })
// define the messageschema
const messageSchema =new mongoose.Schema({
text:{
    type:String,
    required:true},

sender:{
    type:String,
    required:true
     // type:mongoose.Schema.Types.ObjectId,ref:'User',
},
// receiver:{
//     type:mongoose.Schema.Types.ObjectId,ref:'User',
//     required:true
// },
createdDate:{
    type:Date,
    default:Date.now
}
})

//define the group schema

// const User=mongoose.model('User',userSchema)
const Message=mongoose.model('Message',messageSchema)


module.exports=Message
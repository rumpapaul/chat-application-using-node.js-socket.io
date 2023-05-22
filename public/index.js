const form=document.getElementById('form')
let input=document.getElementById('inputmsg')
let fileinput=document.getElementById('inputfile')


let share=document.getElementById('share')
let voice=document.getElementById('voice')
let sent=document.getElementById('sent')
let delet=document.getElementById("delete")

let button=document.querySelector('button')
const content=document.querySelector('.content')
let mymsg=document.getElementById('mymsg')
let othermsg=document.getElementById('othermsg')
 let nomsg=document.getElementById('nomsg')
let welcome=document.querySelector('.welcome')

const socket= io();
// let name=document.getElementsByClassName('name')[1].value

let name=prompt('enter name')
socket.emit('username',name)
// show message when user enter
socket.on('message',(message)=>{
    console.log(message)
    outputmsg(message)
    content.scrollTop=content.scrollHeight
   
})
socket.on('name',(user)=>{

})
socket.on('joinmsg',(message)=>{
    console.log(message)
    joiningmsg(message)
    content.scrollTop=content.scrollHeight
   
})
socket.on('chats',(message)=>{
    console.log(message)
    mychat(`${message.user}:${message.chat}`,'othermsgs')
    content.scrollTop=content.scrollHeight
   
})



form.addEventListener('submit',(e)=>{
    e.preventDefault();

let data={user:name,
    chat:input.value};

//emit chatmessage to server

   
        
    socket.emit('chatmsg',data)
        mychat(`you:${data.chat}`,'mymsgs')


content.scrollTop=content.scrollHeight
input.value=""
voice.style.display='block'
sent.style.display='none'
    



})
// Output msg to dom
  
function outputmsg(message) {
    const div =document.createElement('div')

    div.classList.add('message')
    div.innerHTML=`
    <p class=text>
    ${message}
    </p>
    `;
document.querySelector('.content').before(div)
}
ihtml=""
function joiningmsg(message) {
    
    const div =document.createElement('div')
    div.classList.add('info')

div.innerHTML=`${message}
`
 document.querySelector('.content').appendChild(div)
    ;
    
}

fhtml=''
function mychat(data,status) {
    
    
    const div =document.createElement('div')
    div.classList.add(status)

   

div.innerHTML=`<p>${data}</p>
`
 
   document.querySelector('.content').appendChild(div)
    
}
















        input.oninput=()=> {
     
 voice.style.display='none'
sent.style.display='block'

if (input.value=="") {
    voice.style.display='block'
sent.style.display='none'
}
else{
    voice.style.display='none'
sent.style.display='block'
}
    };
    
    
delet.addEventListener('click',()=>{
   alert("do you want to delete chat")
    if (alert) {
        content.innerHTML=""
    }
})    


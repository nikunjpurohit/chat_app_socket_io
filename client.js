
const socket = io('http://localhost:8000');

const form = document.getElementById('send-container')
var audio = new Audio("note.mp3")
console.log("hello")

const messageInput = document.getElementById('messageInp')
var messageContainer= document.querySelector('.container')

console.log(messageContainer);
const sppend_1 = (message,position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText=message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    if (position=='left'){
        audio.play()}
}
// ask new user for name
const name_join = prompt("Enter your name to join")

//if new user joins let other people know
socket.emit('new-user-joined', name_join)
console.log(name_join)

socket.on('user-joined',name_join=>{
    sppend_1(`${name_join} joined the Chat`,'right')})
console.log(messageContainer)


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    sppend_1(`You: ${message}`,'right')
    socket.emit('send',message)
    messageInput.value=""

})
//If server sends a message then recieve it
socket.on('recieve',data=>{
    sppend_1(`${data.name}: ${data.message}`,'left')})

// If user leaves the chat then broadcast it to others    
socket.on('left',name=>{
        sppend_1(`${name} left the chat`,'left')})
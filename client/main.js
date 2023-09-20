const socket = io('http://localhost:5000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const loginWrapper = document.querySelector('.login-wrapper');
const chatWrapper = document.querySelector('.wrapper');
const loginFrom = document.getElementById('login');
const username = document.getElementById('username');

loginFrom.addEventListener('submit', e =>{
    e.preventDefault();  
    const user = username.value;
    socket.emit('new-user', user);
    loginWrapper.classList.add('hidden');
    chatWrapper.classList.remove('hidden');
    socket.on('user-connected', user => {
        appendMessage(`${user} connected`)
    });
});


socket.on('chat-message', data => {
    appendMessage(`${data.username}: ${data.message}`)
});

socket.on('user-disconnected', username => {
    appendMessage(`${username} disconnected`)
});

messageForm.addEventListener('submit', e =>{
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});

function appendMessage(message){
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}
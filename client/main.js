const socket = io('http://localhost:5000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const loginContainer = document.getElementById('login-container');
const chatContainer = document.getElementById('chat-container');
const loginFrom = document.getElementById('login');
const username = document.getElementById('username');

loginFrom.addEventListener('submit', e =>{
    e.preventDefault();  
    const user = username.value;
    socket.emit('new-user', user);
    loginContainer.classList.add('hidden');
    chatContainer.classList.remove('hidden');
    socket.on('user-connected', user => {
        console.log(socket)
        appendMessage(`${user} connected`);   
    });
});


socket.on('chat-message', data => {
    appendMessage(data.username, data.message)
    console.log(data);
});

socket.on('user-disconnected', username => {
    appendMessage(`${username} disconnected`)
});

messageForm.addEventListener('submit', e =>{
    e.preventDefault();
    const message = messageInput.value;
    if(!message.trim()) return;
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});

function appendMessage(username,message){
    const toastContainer = document.createElement('div');
    toastContainer.classList.add('toast-container');
    toastContainer.classList.add('position-static')

    const toastElement = document.createElement('div');
    toastElement.classList.add('toast');

    const toastHeader = document.createElement('div');
    toastHeader.classList.add('toast-header');

    const strongElement = document.createElement('strong');
    strongElement.classList.add('me-auto');
    strongElement.innerText = username;

    const toastBody = document.createElement('div');
    toastBody.classList.add('toast-body');
    toastBody.innerText = message;
    if(toastBody.innerText == 'undefined'){
        toastBody.style.display = 'none';
    }
  

    toastHeader.appendChild(strongElement);
    toastElement.appendChild(toastHeader);
    toastElement.appendChild(toastBody);
    toastContainer.appendChild(toastElement);

    messageContainer.appendChild(toastContainer);
}


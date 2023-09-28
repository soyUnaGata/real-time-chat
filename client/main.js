const socket = io('http://localhost:5000');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const loginContainer = document.getElementById('login-container');
const chatContainer = document.getElementById('chat-container');
const loginFrom = document.getElementById('login');
const usernameEl = document.getElementById('username');
let msgContainer = null; 


loginFrom.addEventListener('submit', e =>{
    e.preventDefault();  
    const username =  usernameEl.value;
    msgContainer = new MessageContainer('#message-container', username);
    socket.emit('new-user', username);
    loginContainer.classList.add('hidden');
    chatContainer.classList.remove('hidden');
    socket.on('user-connected', username => msgContainer.append(new SystemNotification(`${username} connected`)));
});


socket.on('chat-message', data => msgContainer.append(new Message(data.username, data.message)));
socket.on('user-disconnected', username => msgContainer.append(new SystemNotification(`${username} disconnected`)));

messageForm.addEventListener('submit', handleSubmit);
messageInput.addEventListener('keydown', handleSubmit);

function handleSubmit(e) {
    if (e.key === 'Enter' || e.type === 'submit') {
      e.preventDefault();
      const message = messageInput.value;
      if (!message.trim()) return;
      socket.emit('send-chat-message', message);
      messageInput.value = '';
    }
}




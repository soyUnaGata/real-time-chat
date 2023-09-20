const app = document.getElementById('app');
let currentComponent = location.hash.replace('#', '');

const components = {
    login: {
        template: `
            <form id="login-form">
                <input type="text" placeholder="Enter username" id="username">
                <button type="submit" class="form-btn">Go chat</button>
            </form>
        `,
        dom: {
            form: function() { return document.getElementById('login-form') || {} },
            usernameInput: function() { return document.getElementById('username') }
        }
    },
    chat:{
        template:  `
            <div class="chat-container">
                <ul class="chat-history"></ul>
                <textarea id="chat-message" cols="30" rows="10"></textarea>
            </div>
        `,
        dom: {
            chatHistory: function() { return document.querySelector('.chat-history') },
            messageBox: function() { return document.getElementById('chat-message') }
        }
    }

}

function render(componentName) {
    if (!components[componentName]) return '<h1> Error 404</h1>'

    app.innerHTML = components[componentName].template;
}

render(currentComponent)

components.login.dom.form().addEventListener('submit', function(e){
    e.preventDefault();
    // Отправка логина
    currentComponent = 'chat';
    render(currentComponent);
});
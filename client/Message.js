class Message{
    #myMsgClass = 'message--from-me';

    constructor(author, text){
        this.author = author;
        this.text = text;
    }

    renderHtml(myusername){
        const className = this.author === myusername ? this.#myMsgClass : ''; 
        return `<li class="${className}">
            <div class="message">
                <span class="author" style="font-size: 70%;">${this.author}</span>
                <span class="message-text">${this.text}</span>
            </div>
        </li>`;
    }
}

class SystemNotification{
    #systemMsgClass = 'message--system';

    constructor (text){
        this.text = text;
    }

    renderHtml(){  
        return `<li class="${this.#systemMsgClass}">
            <div class="message">
                <span class="author" style="font-size: 70%;">SYSTEM</span>
                <span class="message-text">${this.text}</span>
            </div>
        </li>`;
    }
}

class MessageContainer{

    constructor(msgContainerSelector, myusername){
        this.msgContainer = document.querySelector(msgContainerSelector);
        this.myusername = myusername;
    }

    append(msg){
        this.msgContainer.innerHTML += msg.renderHtml(this.myusername);
        this.msgContainer.scrollTop = this.msgContainer.scrollHeight;
    }
}
/*
=====================================================
CATZA AI Widget
Versión: 1.0.0
Autor: CATZA Digital
=====================================================
*/

(function () {

class CATZAWidget {

    constructor(config = {}) {

        this.config = Object.assign({

            nombre: "CATZA AI",
            saludo: "Hola 👋",
            mensaje: "Soy tu asistente virtual.<br><br>¿En qué puedo ayudarte?",

        }, config);

        this.window = null;
        this.button = null;
        this.messages = null;
        this.input = null;

        this.init();

    }

    init() {

        this.createButton();
        this.createWindow();
        this.bindEvents();

    }

    createButton() {

        this.button = document.createElement("button");

        this.button.className = "catza-button";

        this.button.innerHTML = "💬";

        document.body.appendChild(this.button);

    }

    createWindow() {

        this.window = document.createElement("div");
        this.window.className = "catza-window catza-hidden";

        // HEADER

        const header = document.createElement("div");
        header.className = "catza-header";

        const title = document.createElement("div");
        title.className = "catza-title";
        title.innerHTML = "🤖 " + this.config.nombre;

        const close = document.createElement("div");
        close.className = "catza-close";
        close.innerHTML = "&times;";

        header.appendChild(title);
        header.appendChild(close);

        // MENSAJES

        this.messages = document.createElement("div");
        this.messages.className = "catza-messages";

        this.addMessage(
            "<strong>" +
            this.config.saludo +
            "</strong><br><br>" +
            this.config.mensaje
        );

        // FOOTER

        const footer = document.createElement("div");
        footer.className = "catza-footer";

        this.input = document.createElement("input");
        this.input.className = "catza-input";
        this.input.placeholder = "Escribe un mensaje...";

        const send = document.createElement("button");
        send.className = "catza-send";
        send.innerHTML = "➤";

        footer.appendChild(this.input);
        footer.appendChild(send);

        this.window.appendChild(header);
        this.window.appendChild(this.messages);
        this.window.appendChild(footer);

        document.body.appendChild(this.window);

        this.closeButton = close;
        this.sendButton = send;

    }

    bindEvents() {

        this.button.addEventListener("click", () => {

            this.open();

        });

        this.closeButton.addEventListener("click", () => {

            this.close();

        });

        this.sendButton.addEventListener("click", () => {

            this.send();

        });

        this.input.addEventListener("keypress", (e) => {

            if (e.key === "Enter") {

                this.send();

            }

        });

    }

    open() {

        this.window.classList.remove("catza-hidden");

    }

    close() {

        this.window.classList.add("catza-hidden");

    }

    addMessage(html, user = false) {

        const div = document.createElement("div");

        div.className = "catza-message";

        if (user) {

            div.style.background = "#2563eb";
            div.style.color = "#fff";
            div.style.marginLeft = "40px";

        } else {

            div.style.marginRight = "40px";

        }

        div.innerHTML = html;

        this.messages.appendChild(div);

        this.messages.scrollTop = this.messages.scrollHeight;

    }

    send() {

        const text = this.input.value.trim();

        if (text === "") return;

        this.addMessage(text, true);

        this.input.value = "";

        // RESPUESTA DE PRUEBA

        setTimeout(() => {

            this.addMessage(
                "Esta es una respuesta de prueba.<br><br>En la siguiente versión responderé usando IA."
            );

        }, 500);

    }

}

window.CATZA = {

    init(config = {}) {

        if (!window.__CATZA__) {

            window.__CATZA__ = new CATZAWidget(config);

        }

    }

};

})();

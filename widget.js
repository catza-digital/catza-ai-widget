window.CatzaAI = {

    config: {},

    init(config) {

        this.config = config;

        this.crearBoton();

        this.crearVentana();

    },

    crearBoton() {

        const boton = document.createElement("div");

        boton.id = "catza-ai-button";

        boton.innerHTML = "🤖";

        boton.addEventListener("click", () => {

            const ventana = document.getElementById("catza-ai-window");

            if (ventana.style.display === "flex") {

                ventana.style.display = "none";

            } else {

                ventana.style.display = "flex";

            }

        });

        document.body.appendChild(boton);

    },

    crearVentana() {

        const ventana = document.createElement("div");

        ventana.id = "catza-ai-window";

        ventana.innerHTML = `

            <div id="catza-ai-header">

                🤖 CATZA AI

            </div>

            <div id="catza-ai-messages">

                <div class="catza-message bot">

                    Hola 👋 ¿En qué puedo ayudarte?

                </div>

            </div>

            <div id="catza-ai-input">

                <input
                    id="catza-input"
                    type="text"
                    placeholder="Escribe un mensaje..."
                >

                <button id="catza-send">

                    ➤

                </button>

            </div>

        `;

        document.body.appendChild(ventana);

    }

};

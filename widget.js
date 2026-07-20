window.CatzaAI = {

    config: {},

    init(config) {

        this.config = config;

        this.crearBoton();

    },

    crearBoton() {

        const boton = document.createElement("div");

        boton.id = "catza-ai-button";

        boton.innerHTML = "🤖";

        document.body.appendChild(boton);

    }

};

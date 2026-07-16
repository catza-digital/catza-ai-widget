/*
====================================================
CATZA AI Widget
Versión: 2.0.0
Autor: CATZA Digital
====================================================
*/

class CATZAWidget {

    constructor() {

        this.config = null;

    }

    async init() {

        console.log("==================================");
        console.log("CATZA AI Widget v2.0");
        console.log("Iniciando...");
        console.log("==================================");

        await this.loadConfig();

    }

    async loadConfig() {

        try {

            const response = await fetch("catza.config.json");

            if (!response.ok) {

                throw new Error("No se encontró catza.config.json");

            }

            this.config = await response.json();

            console.log("Configuración cargada correctamente");

            console.table(this.config);

            console.log(this.config);

        }

        catch(error){

            console.error(error);

        }

    }

}

window.CATZA={

    init(){

        const widget=new CATZAWidget();

        widget.init();

    }

};

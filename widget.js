/*
=============================================
CATZA AI Widget
Versión 1.0
CATZA Digital
=============================================
*/

class CATZAWidget {

    constructor(){

        this.config=null;

    }

    async init(){

        await this.loadConfig();

    }

    async loadConfig(){

        try{

            const response=await fetch("catza.config.json");

            if(!response.ok){

                throw new Error("No existe catza.config.json");

            }

            this.config=await response.json();

            console.log("CATZA AI");
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

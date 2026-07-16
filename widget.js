/*
==================================================
CATZA AI Widget
Versión: 2.0.0
Autor: CATZA Digital
==================================================
*/

(function(){

class CATZAWidget{

    constructor(){

        this.config=null;

        this.button=null;

    }

    async init(){

        console.log("CATZA AI iniciando...");

        await this.loadConfig();

        this.createButton();

    }

    async loadConfig(){

        try{

            const response=await fetch("catza.config.json");

            if(!response.ok){

                throw new Error("No se encontró catza.config.json");

            }

            this.config=await response.json();

            console.log("Configuración cargada");

            console.log(this.config);

        }

        catch(error){

            console.error(error);

        }

    }

    createButton(){

        const color=this.config.widget.color || "#2563eb";

        this.button=document.createElement("button");

        this.button.id="catza-button";

        this.button.innerHTML="💬";

        this.button.style.position="fixed";

        this.button.style.right="20px";

        this.button.style.bottom="20px";

        this.button.style.width="65px";

        this.button.style.height="65px";

        this.button.style.borderRadius="50%";

        this.button.style.border="none";

        this.button.style.cursor="pointer";

        this.button.style.fontSize="28px";

        this.button.style.background=color;

        this.button.style.color="white";

        this.button.style.boxShadow="0 10px 25px rgba(0,0,0,.25)";

        this.button.style.zIndex="999999";

        this.button.onclick=()=>{

            alert(this.config.widget.nombre);

        };

        document.body.appendChild(this.button);

    }

}

window.CATZA={

    init(){

        const widget=new CATZAWidget();

        widget.init();

    }

};

})();

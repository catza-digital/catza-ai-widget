/*
========================================================
CATZA AI Widget
Version: 1.0
Autor: CATZA Digital
========================================================
*/

(function(){

class CATZAWidget{

    constructor(){

        this.config={};

        this.button=null;

        this.window=null;

        this.body=null;

        this.input=null;

        this.send=null;

        this.worker="";

    }

    async init(){

        await this.loadConfig();

        this.createWidget();

        this.events();

    }

    async loadConfig(){

        try{

            const response=await fetch("catza.config.json");

            this.config=await response.json();

            this.worker=this.config.worker.url;

            console.log("CATZA AI");

            console.log(this.config);

        }

        catch(e){

            console.error(e);

        }

    }

    createWidget(){

        this.createButton();

        this.createWindow();

    }

    createButton(){

        this.button=document.createElement("div");

        this.button.id="catza-button";

        this.button.innerHTML="💬";

        document.body.appendChild(this.button);

    }

    createWindow(){

        this.window=document.createElement("div");

        this.window.id="catza-window";

        this.window.innerHTML=`

<div id="catza-header">

<span>${this.config.widget.nombre}</span>

<button id="catza-close">✖</button>

</div>

<div id="catza-body">

<div class="catza-bot">

${this.config.widget.mensaje}

</div>

</div>

<div id="catza-footer">

<input

id="catza-input"

type="text"

placeholder="${this.config.widget.placeholder}"

>

<button id="catza-send">

➤

</button>

</div>

`;

        document.body.appendChild(this.window);

        this.body=document.getElementById("catza-body");

        this.input=document.getElementById("catza-input");

        this.send=document.getElementById("catza-send");

    }

    events(){

        this.button.onclick=()=>{

            this.window.classList.toggle("open");

        };

        document.getElementById("catza-close").onclick=()=>{

            this.window.classList.remove("open");

        };

    }

}

window.CATZA={

    init(){

        const app=new CATZAWidget();

        app.init();

    }

};

})();


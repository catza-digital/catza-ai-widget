(() => {

    const script = document.currentScript;

    const CLIENT_ID = script.dataset.client;

    const API_URL = "https://catza-ai.catzadigital.workers.dev/chat";

    console.log("CATZA AI Widget");
    console.log("Cliente:", CLIENT_ID);
    console.log("API:", API_URL);

    // ==========================
    // ESTILOS
    // ==========================

    const style = document.createElement("style");

    style.textContent = `

    #catza-button{
        position:fixed;
        right:20px;
        bottom:20px;
        width:60px;
        height:60px;
        border-radius:50%;
        background:#2563eb;
        color:#fff;
        display:flex;
        align-items:center;
        justify-content:center;
        cursor:pointer;
        font-size:28px;
        box-shadow:0 8px 20px rgba(0,0,0,.25);
        z-index:999999;
    }

    #catza-window{

        position:fixed;

        right:20px;

        bottom:90px;

        width:350px;

        height:500px;

        background:white;

        border-radius:16px;

        box-shadow:0 10px 30px rgba(0,0,0,.25);

        display:none;

        flex-direction:column;

        overflow:hidden;

        z-index:999998;

        font-family:Arial;

    }

    #catza-header{

        background:#2563eb;

        color:white;

        padding:15px;

        font-size:18px;

        font-weight:bold;

    }

    `;

    document.head.appendChild(style);

    // ==========================
    // BOTÓN
    // ==========================

    const boton = document.createElement("div");

    boton.id = "catza-button";

    boton.innerHTML = "🤖";

    document.body.appendChild(boton);

    // ==========================
    // VENTANA
    // ==========================

    const ventana = document.createElement("div");

    ventana.id = "catza-window";

    ventana.innerHTML = `

        <div id="catza-header">

            🤖 CATZA AI

        </div>

    `;

    document.body.appendChild(ventana);

    // ==========================
    // EVENTO
    // ==========================

    boton.onclick = () => {

        if(ventana.style.display==="flex"){

            ventana.style.display="none";

        }else{

            ventana.style.display="flex";

        }

    };

})();

(() => {

    //=================================
    // CONFIGURACIÓN
    //=================================

    const script = document.currentScript;

    const CLIENT_ID = script.dataset.client;

    const API_URL =
        "https://catza-ai.catzadigital.workers.dev/chat";

    //=================================
    // ESTILOS
    //=================================

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
        user-select:none;
    }

    #catza-window{
        position:fixed;
        right:20px;
        bottom:90px;
        width:360px;
        height:520px;
        background:#fff;
        border-radius:16px;
        box-shadow:0 10px 30px rgba(0,0,0,.25);
        display:none;
        flex-direction:column;
        overflow:hidden;
        z-index:999998;
        font-family:Arial,sans-serif;
    }

    #catza-header{
        background:#2563eb;
        color:#fff;
        padding:15px;
        font-size:18px;
        font-weight:bold;
    }

    #catza-messages{
        flex:1;
        overflow-y:auto;
        background:#f5f5f5;
        padding:15px;
    }

    .catza-message{
        padding:10px 14px;
        border-radius:12px;
        margin-bottom:10px;
        max-width:80%;
        width:fit-content;
        word-break:break-word;
    }

    .catza-bot{
        background:#ffffff;
        color:#222;
    }

    .catza-user{
        background:#2563eb;
        color:white;
        margin-left:auto;
    }

    .catza-typing{
        font-style:italic;
        opacity:.7;
    }

    #catza-footer{
        display:flex;
        border-top:1px solid #ddd;
    }

    #catza-input{
        flex:1;
        border:none;
        outline:none;
        padding:15px;
        font-size:15px;
    }

    #catza-send{
        width:60px;
        border:none;
        background:#2563eb;
        color:#fff;
        cursor:pointer;
        font-size:18px;
    }

    `;

    document.head.appendChild(style);

    //=================================
    // BOTÓN
    //=================================

    const boton = document.createElement("div");

    boton.id = "catza-button";

    boton.innerHTML = "🤖";

    document.body.appendChild(boton);

    //=================================
    // VENTANA
    //=================================

    const ventana = document.createElement("div");

    ventana.id = "catza-window";

     ventana.innerHTML = `

        <div id="catza-header">
            🤖 CATZA AI
        </div>

        <div id="catza-messages">

            <div class="catza-message catza-bot">
                Hola 👋<br><br>
                Soy CATZA AI.
            </div>

        </div>

        <div id="catza-footer">

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

    cargarHistorial();

    //=================================
    // REFERENCIAS
    //=================================

    const mensajes = document.getElementById("catza-messages");

    const input = document.getElementById("catza-input");

    const enviar = document.getElementById("catza-send");

    //=================================
    // FUNCIONES
    //=================================

    function agregarMensaje(texto,tipo){

        const div=document.createElement("div");

        div.className=`catza-message ${tipo}`;

        div.innerHTML=texto;

        mensajes.appendChild(div);

        mensajes.scrollTop=mensajes.scrollHeight;

        guardarHistorial();

    }

    function guardarHistorial() {

        localStorage.setItem(
            "catza_chat_" + CLIENT_ID,
            mensajes.innerHTML
        );

    }

    function cargarHistorial() {

        const historial = localStorage.getItem(
            "catza_chat_" + CLIENT_ID
        );

        if (historial) {

            mensajes.innerHTML = historial;

            mensajes.scrollTop = mensajes.scrollHeight;

        }

    }    

    function mostrarTyping(){

        const div=document.createElement("div");

        div.id="catza-typing";

        div.className="catza-message catza-bot catza-typing";

        div.innerHTML="Escribiendo...";

        mensajes.appendChild(div);

        mensajes.scrollTop=mensajes.scrollHeight;

    }

    function ocultarTyping(){

        const typing=document.getElementById("catza-typing");

        if(typing){

            typing.remove();

        }

    }

     //=================================
    // API
    //=================================

    async function enviarMensaje(){

        const texto=input.value.trim();

        if(texto==="") return;

        agregarMensaje(texto,"catza-user");

        input.value="";

        mostrarTyping();

        enviar.disabled=true;

        try{

            const respuesta=await fetch(API_URL,{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    clientId:CLIENT_ID,

                    message:texto

                })

            });

            const datos=await respuesta.json();

            ocultarTyping();

            agregarMensaje(

                datos.reply || "No se recibió respuesta.",

                "catza-bot"

            );

        }catch(error){

            ocultarTyping();

            agregarMensaje(

                "❌ Error al conectar con el servidor.",

                "catza-bot"

            );

            console.error(error);

        }

        enviar.disabled=false;

        input.focus();

    }

     //=================================
    // EVENTOS
    //=================================

    boton.onclick = () => {

        ventana.style.display =
            ventana.style.display === "flex"
            ? "none"
            : "flex";

        if (ventana.style.display === "flex") {

            input.focus();

        }

    };

    enviar.addEventListener("click", enviarMensaje);

    input.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {

            e.preventDefault();

            enviarMensaje();

        }

    });

})();


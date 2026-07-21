(() => {

    //=================================
    // CONFIGURACIÓN
    //=================================

    const script = document.currentScript;

    const CLIENT_ID = script.dataset.client;

    const POSITION = (script.dataset.position || "right").toLowerCase();

    const FLOAT_MESSAGE =
    script.dataset.message ||
    "👋 ¡Hola!<br>¿En qué podemos ayudarte hoy?";

    const API_URL =
        "https://catza-ai.catzadigital.workers.dev/chat";

    //=================================
    // ESTILOS
    //=================================

    const style = document.createElement("style");

    style.textContent = `

    #catza-button{
        position:fixed;
        ${POSITION === "left" ? "left:20px;" : "right:20px;"}
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
        ${POSITION === "left" ? "left:20px;" : "right:20px;"}
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

#catza-popup{

    position:fixed;

    ${POSITION === "left"
        ? "left:90px;"
        : "right:90px;"}

    bottom:30px;

    width:260px;

    background:#fff;

    border-radius:14px;

    padding:15px;

    box-shadow:0 8px 24px rgba(0,0,0,.18);

    z-index:999997;

    font-family:Arial,sans-serif;

    animation:catzaPopup .35s ease;

}

#catza-popup-message{

    color:#333;

    font-size:14px;

    line-height:1.5;

}

#catza-popup-close{

    margin-top:10px;

    color:#2563eb;

    cursor:pointer;

    font-size:13px;

    font-weight:bold;

}

#catza-popup::after{

    content:"";

    position:absolute;

    top:50%;

    transform:translateY(-50%) rotate(45deg);

    width:14px;

    height:14px;

    background:#fff;

    ${POSITION==="left"
        ? "left:-7px;"
        : "right:-7px;"}

}

@keyframes catzaPopup{

    from{

        opacity:0;

        transform:translateY(10px);

    }

    to{

        opacity:1;

        transform:translateY(0);

    }

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

    boton.innerHTML = "💬";

    document.body.appendChild(boton);

    //=================================
// MENSAJE FLOTANTE
//=================================

const popup = document.createElement("div");

popup.id = "catza-popup";

popup.innerHTML = `
    <div id="catza-popup-message">
        ${FLOAT_MESSAGE}
    </div>

    <div id="catza-popup-close">
        ✕ Cerrar
    </div>
`;

document.body.appendChild(popup);

// Cerrar mensaje
document
    .getElementById("catza-popup-close")
    .onclick = () => {

        popup.remove();

    };

    //=================================
    // VENTANA
    //=================================

    const ventana = document.createElement("div");

    ventana.id = "catza-window";

     ventana.innerHTML = `

        <div id="catza-header">
            💬 ¿En qué podemos ayudarte?
        </div>

        <div id="catza-messages">

            <div class="catza-message catza-bot">
                Hola 👋<br><br>
Bienvenido.

Estoy aquí para responder tus preguntas y brindarte la información que necesites.
¿En qué puedo ayudarte hoy?
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


    //=================================
    // REFERENCIAS
    //=================================

    const mensajes = document.getElementById("catza-messages");

    const input = document.getElementById("catza-input");

    const enviar = document.getElementById("catza-send");

    cargarHistorial();

    //=================================
    // FUNCIONES
    //=================================

function convertirEnlaces(texto){

    return texto.replace(
        /(https?:\/\/[^\s<]+)/g,
        function(url){

            let icono = "🔗";
            let titulo = url;

            if(url.includes("wa.me") || url.includes("api.whatsapp.com")){

                icono = "💬";
                titulo = "Abrir WhatsApp";

            }

            else if(
                url.includes("maps.app.goo.gl") ||
                url.includes("google.com/maps") ||
                url.includes("goo.gl/maps")
            ){

                icono = "📍";
                titulo = "Ver ubicación";

            }

            else if(url.includes("youtube.com") || url.includes("youtu.be")){

                icono = "▶";
                titulo = "Ver video";

            }

            else if(url.includes("facebook.com")){

                icono = "👍";
                titulo = "Facebook";

            }

            else if(url.includes("instagram.com")){

                icono = "📷";
                titulo = "Instagram";

            }

            else if(url.includes("tiktok.com")){

                icono = "🎵";
                titulo = "TikTok";

            }

            else if(url.endsWith(".pdf")){

                icono = "📄";
                titulo = "Descargar PDF";

            }

            return `
                <br><br>
                <a
                    href="${url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="
                        color:#2563eb;
                        font-weight:bold;
                        text-decoration:none;
                    "
                >
                    ${icono} ${titulo}
                </a>
            `;

        }
    );

}


    
    function agregarMensaje(texto,tipo){

        const div=document.createElement("div");

        div.className=`catza-message ${tipo}`;

        div.innerHTML=convertirEnlaces(texto);

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

    if (popup) {

        popup.remove();

    }

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


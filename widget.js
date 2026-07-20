(() => {

    const script = document.currentScript;

    const CLIENT_ID = script.dataset.client;

    const API_URL = "https://catza-ai.catzadigital.workers.dev/chat";

    console.log("CATZA AI Widget");
    console.log("Cliente:", CLIENT_ID);
    console.log("API:", API_URL);

    // Crear estilos
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
    `;

    document.head.appendChild(style);

    // Crear botón
    const boton = document.createElement("div");

    boton.id = "catza-button";

    boton.innerHTML = "🤖";

    document.body.appendChild(boton);

})();

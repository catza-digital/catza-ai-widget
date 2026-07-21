function convertirEnlaces(texto){

    const regex = /((https?:\/\/[^\s<]+)|(www\.[^\s<]+)|(wa\.me\/[^\s<]+)|(maps\.app\.goo\.gl\/[^\s<]+)|((?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s<]*)?))/gi;

    return texto.replace(regex, function(url){

        // Elimina caracteres que NO forman parte del enlace
        let enlace = url.replace(/[)\]}>,;:!?]+$/g,"");

        // Agrega https si hace falta
        if(
            !enlace.startsWith("http://") &&
            !enlace.startsWith("https://")
        ){
            enlace = "https://" + enlace;
        }

        const dominio = enlace.toLowerCase();

        let icono = "🔗";
        let titulo = enlace;

        if(
            dominio.includes("wa.me") ||
            dominio.includes("api.whatsapp.com")
        ){

            icono = "💬";
            titulo = "Abrir WhatsApp";

        }

        else if(

            dominio.includes("maps.app.goo.gl") ||
            dominio.includes("google.com/maps") ||
            dominio.includes("goo.gl/maps")

        ){

            icono = "📍";
            titulo = "Ver ubicación";

        }

        else if(

            dominio.includes("youtube.com") ||
            dominio.includes("youtu.be")

        ){

            icono = "▶";
            titulo = "Ver video";

        }

        else if(dominio.includes("facebook.com")){

            icono = "👍";
            titulo = "Facebook";

        }

        else if(dominio.includes("instagram.com")){

            icono = "📷";
            titulo = "Instagram";

        }

        else if(dominio.includes("tiktok.com")){

            icono = "🎵";
            titulo = "TikTok";

        }

        else if(dominio.endsWith(".pdf")){

            icono = "📄";
            titulo = "Descargar PDF";

        }

        return `
            <a
                href="${enlace}"
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

    });

}

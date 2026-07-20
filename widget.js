(() => {

    const script = document.currentScript;

    const CLIENT_ID = script.dataset.client;

    const API_URL = "https://catza-ai.catzadigital.workers.dev/chat";

    console.log("CATZA AI Widget");

    console.log("Cliente:", CLIENT_ID);

    console.log("API:", API_URL);

})();

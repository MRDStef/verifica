const btn = document.getElementById("btn");
const titolo = document.getElementById("titolo");
const paragrafo = document.getElementById("paragrafo");
const container = document.querySelector(".container");
const azzera = document.getElementById("reset")

const articoli = [];

async function fetchArticoloRandom() {
    const data = await fetch("https://it.wikipedia.org/w/api.php?action=query&list=random&rnlimit=1&rnnamespace=0&format=json&origin=*");
    const json = await data.json();

    const pageId = json.query.random[0].id; 

    return pageId;
}

async function stampaArticolo(){
    const id = await fetchArticoloRandom();
    
    const data = await fetch(`https://it.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&exintro&format=json&origin=*&pageids=${id}`);
    const json = await data.json();

    const articolo = document.createElement("article");

    articolo.innerHTML = `<h3>${json.query.pages[id].title}</h3>
    <p>${json.query.pages[id].extract}</p>`;

    container.appendChild(articolo);

}

btn.addEventListener("click", () => {
    stampaArticolo();
})

reset.addEventListener("click", () => {
    container.innerHTML = "";
})  


import { Brawlers } from "./classes/Brawlers.js";

let brawlers;

function populateCharacter(data, dat) {
    const charactersData = JSON.parse(data);
    const raritiesData = JSON.parse(dat);
    brawlers = new Brawlers(charactersData, raritiesData);
    brawlers.addBrawlersToDom();
}


async function getCharaters() {
    fetch(`/api/csv/characters`).then(response => response.json()).then(data => {
        fetch(`/api/csv/rarities`).then(res => res.json()).then(dat => {
            populateCharacter(data, dat);
        });
    });
}

//get character info
getCharaters();

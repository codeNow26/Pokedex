async function init() {
    createCard();
    await getPokemon();
}


let allPokemon = {};
let pkmStats = {};

const Base_URL = "https://pokeapi.co/api/v2/pokemon/";

let typeColor = {
    grass: "green",
    water: "blue",
    poison: "purple",
    bug: "dark-green",
    flying: "white",
    fire: "red",
}

async function fetchPokemon(i) {
    let response = await fetch(Base_URL + i);
    let data = await response.json();
    let pkmtypes = [];
    for (let t = 0; t < data.types.length; t++) {
        pkmtypes.push(data.types[t].type.name);
    }
    let name = data.name;
    let img = data.sprites.front_default

    return {
        name,
        pkmtypes,
        img
    };
}

async function fetchPokemonStats(i) {
    let response = await fetch(Base_URL + i);
    let data = await response.json();
    let pkmStats = [];
    for (let t = 0; t < data.stats.length; t++) {
        pkmStats.push(data.stats[t].stat.name);
        pkmStats.push(data.stats[t].base_stat);
    }

    return data.stats;
}



function openDialogWindow(i, event) {
    bubblingPrevention(event);
    currentIndex = i;
    let pkmData = allPokemon[i];
    let pkmStatsData = pkmStats[i];
    showPokemonOverlay(i, pkmData, pkmStatsData);
    document.getElementById('dialog').style.display = "block";
}

function pokemonTypeColor(i, pkmData) {
    let addColor = document.getElementById(`pkm-type-${i}`);
    let addColor2 = document.getElementById(`pkm-type2-${i}`);
    let firstType = pkmData.pkmtypes[0];
    let secondaryType = pkmData.pkmtypes[1];
    if (typeColor[firstType]) {
        addColor.classList.add(typeColor[firstType]);
    }
    if (typeColor[secondaryType]) {
        addColor2.classList.add(typeColor[secondaryType]);
    }
}

async function getPokemon() {
    for (let i = 1; i < 16; i++) {
        let pkmData = await fetchPokemon(i);
        let pkmStatsData = await fetchPokemonStats(i);
        pkmStats[i] = pkmStatsData;
        allPokemon[i] = pkmData;
        showPokemon(i, pkmData);

    }
}

function nextPokemon() {
    currentIndex++;
    if (currentIndex > 15) currentIndex = 1;

    let pkmStatsData = pkmStats[currentIndex]
    let pkmData = allPokemon[currentIndex];
    showPokemonOverlay(currentIndex, pkmData, pkmStatsData);
}

function previousPokemon() {
    currentIndex--;
    if (currentIndex === 0) currentIndex = 15;

    let pkmStatsData = pkmStats[currentIndex]
    let pkmData = allPokemon[currentIndex];
    showPokemonOverlay(currentIndex, pkmData, pkmStatsData);
}

function bubblingPrevention(event) {
    event.stopPropagation()
    document.getElementById('dialog').style.display = "block";
}

function closeDialog() {
    let hidden = document.getElementById('dialog');
    hidden.style.display = "none"
}

function statsBar(i, pkmStatsData) {
    let bar1 = document.getElementById(`atkBar-${i}`);
    let bar2 = document.getElementById(`dfnsBar-${i}`);
    let bar3 = document.getElementById(`spclAtkBar-${i}`);
    let bar4 = document.getElementById(`spclDfnsBar-${i}`);
    let bar5 = document.getElementById(`speedBar-${i}`);

    bar1.style.width = pkmStatsData[1].base_stat + "%";
    bar1.textContent =  + pkmStatsData[1].base_stat;

    bar2.style.width = pkmStatsData[2].base_stat + "%";
    bar2.textContent = pkmStatsData[2].base_stat;

    bar3.style.width = pkmStatsData[3].base_stat + "%";
    bar3.textContent = pkmStatsData[3].base_stat;

    bar4.style.width = pkmStatsData[4].base_stat + "%";
    bar4.textContent = pkmStatsData[4].base_stat;

    bar5.style.width = pkmStatsData[5].base_stat + "%";
    bar5.textContent = pkmStatsData[5].base_stat;
}
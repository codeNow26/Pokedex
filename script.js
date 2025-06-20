async function init() {
    createCard(1, 25);
    await getPokemon(1, currentPokemon);
}


let allPokemon = {};
let pkmStats = {};
let currentPokemon = 25;

const Base_URL = "https://pokeapi.co/api/v2/pokemon/";

let typeColor = {
    grass: "green",
    water: "blue",
    poison: "purple",
    bug: "dark-green",
    flying: "white",
    fire: "red",
    normal: "indianred",
    electric: "yellow",
    ground: "brown",
    fairy: "pink",
    fighting: "orange",
    psychic: "magenta",
    ice: "light-blue",
    rock: "light-brown",
    steel: "light-green",
    dragon: "gold",
    dark: "darkgray"
}

async function fetchPokemon(i) {
    let response = await fetch(Base_URL + i);
    let data = await response.json();
    let pkmtypes = [];
    for (let t = 0; t < data.types.length; t++) {
        pkmtypes.push(data.types[t].type.name);
    }
    let name = data.name;
    let img = data.sprites.other.dream_world.front_default

    return {
        name,
        pkmtypes,
        img
    };

}

async function fetchPokemonStats(i) {
    let response = await fetch(Base_URL + i);
    let data = await response.json();
    return data.stats;
}



function openDialogWindow(i, event) {
    bubblingPrevention(event);
    currentIndex = i;
    let pkmData = allPokemon[i];
    let pkmStatsData = pkmStats[i];
    showPokemonOverlay(i, pkmData, pkmStatsData);
    document.getElementById('dialog').style.display = "block";
    document.body.style.overflow = "hidden";
}

function pokemonTypeColor(i, pkmData) {
    let addColor = document.getElementById(`pkm-type-${i}`);
    let addColor2 = document.getElementById(`pkm-type2-${i}`);
    let addColorToBackground = document.getElementById(`card-${i}`);
    let firstType = pkmData.pkmtypes[0];
    let secondaryType = pkmData.pkmtypes[1];
    if (typeColor[firstType]) {
        addColor.classList.add(typeColor[firstType]);
    }
    if (typeColor[secondaryType]) {
        addColor2.classList.add(typeColor[secondaryType]);
    }
     if (typeColor[firstType]) {
        addColorToBackground.classList.add(typeColor[firstType]);
    }
}

async function getPokemon(start, end) {
    for (let i = start; i <= end; i++) {
        let pkmData = await fetchPokemon(i);
        let pkmStatsData = await fetchPokemonStats(i);
        pkmStats[i] = pkmStatsData;
        allPokemon[i] = pkmData;
        showPokemon(i, pkmData);
    }
}

function nextPokemon() {
    let card = document.querySelectorAll('.card');
    currentIndex++;
    if (currentIndex >= card.length) currentIndex = 1;
    console.log(currentIndex);


    let pkmStatsData = pkmStats[currentIndex]
    let pkmData = allPokemon[currentIndex];
    showPokemonOverlay(currentIndex, pkmData, pkmStatsData);
}

function previousPokemon() {
    let card = document.querySelectorAll('.card');
    currentIndex--;
    if (currentIndex === 0) currentIndex = card.length - 1;
    console.log(currentIndex);

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
    document.body.style.overflow = "scroll";
}

function statsBar(i, pkmStatsData) {
    let bar1 = document.getElementById(`atkBar-${i}`);
    let bar2 = document.getElementById(`dfnsBar-${i}`);
    let bar3 = document.getElementById(`spclAtkBar-${i}`);
    let bar4 = document.getElementById(`spclDfnsBar-${i}`);
    let bar5 = document.getElementById(`speedBar-${i}`);

    bar1.style.width = pkmStatsData[1].base_stat + "%";
    bar1.textContent = + pkmStatsData[1].base_stat;

    bar2.style.width = pkmStatsData[2].base_stat + "%";
    bar2.textContent = pkmStatsData[2].base_stat;

    bar3.style.width = pkmStatsData[3].base_stat + "%";
    bar3.textContent = pkmStatsData[3].base_stat;

    bar4.style.width = pkmStatsData[4].base_stat + "%";
    bar4.textContent = pkmStatsData[4].base_stat;

    bar5.style.width = pkmStatsData[5].base_stat + "%";
    bar5.textContent = pkmStatsData[5].base_stat;
}

async function loadNewPokemon() {
    let start = currentPokemon + 1;
    let end = currentPokemon + 20;
    currentPokemon = end + 1;

    showLoading();
    createCard(start, end);
    await getPokemon(start, end);
    hideLoading();
}

function showLoading() {
    document.getElementById('loading-overlay').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading-overlay').classList.add('hidden');
}

async function showWaterType(i, pkmData) {
    test = document.getElementById("pep")

    firstType = pkmData.pkmtypes[0];
    let secondType = pkmData.pkmtypes[1];
    console.log("Typ 1:", firstType);
    console.log("Typ 2:", secondType);

    if (firstType === "electric") {
        test.innerHTML = `hat geklappt`
    }
}


function searchPokemon() {
  let input = document.getElementById("search-bar").value.trim().toLowerCase();
  let found = false;

  
  for (let i in allPokemon) {
    if (allPokemon[i] && allPokemon[i].name.includes(input)) {
      showPokemon(i, allPokemon[i]); 
      found = true;
       alert("Pokémon gefunden");
      break;
    }
  }

  if (!found) {
    alert("Kein Pokémon gefunden");
  }
}


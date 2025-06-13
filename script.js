async function init() {
    createCard();
    await getPokemon();
}

const Base_URL = "https://pokeapi.co/api/v2/pokemon/";

let typeColor = {
    grass: "green",
    water: "blue",
    poison: "purple",
    bug: "light-blue",
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

function showPokemon(i, pkmData) {
    let pkmCard = document.getElementById(`card-${i}`)
    let secondType = "";

    if (pkmData.pkmtypes[1]) {
        secondType = `<div id="pkm-type2-${i}" class="type">${pkmData.pkmtypes[1]}</div>`
    };

    pkmCard.innerHTML = `
   <div class="pkm-name">${pkmData.name}</div>
   <img src="${pkmData.img}">
     <div class="types-wrapper">
    <div id="pkm-type-${i}" class="type">${pkmData.pkmtypes[0]}</div>
    ${secondType}`
    pokemonTypeColor(i, pkmData);
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

let allPokemon = {};

async function getPokemon() {
    for (let i = 1; i < 16; i++) {
        let pkmData = await fetchPokemon(i);
        allPokemon[i] = pkmData;
        showPokemon(i, pkmData);
    }
}

function createCard() {
    let pokemon = document.getElementById('pokemon-container');
    for (let i = 1; i < 16; i++) {
        pokemon.innerHTML += `
        <div onclick="openDialogWindow(${i})" class="card" id="card-${i}">
        </div>`
    }
}

function openDialogWindow(i) {
      let pkmData = allPokemon[i];
    showPokemonOverlay(i, pkmData);
    document.getElementById('dialog').style.display = "block";
}

function showPokemonOverlay(i, pkmData) {
    
    let secondType = "";
    let showPokemonDialog = document.getElementById('dialog');

    if (pkmData.pkmtypes[1]) {
        secondType = `<div id="pkm-type-${i}" class="type big-type ${typeColor[pkmData.pkmtypes[1]] || ''}">${pkmData.pkmtypes[1]}</div>`
    };

    showPokemonDialog.innerHTML = `
        <div class="big-pkm-wrapper" id="dialog-${i}">
           <div class="card bigCard" id="card-${i}">
           <div class="head-pkm-card">
         <img class="pokeball" src="./img/Pokeball.png">
         <img class="bigPkmImage" src="${pkmData.img}">
        <div class="big-pkm-name">${pkmData.name}</div>
        <div class="big-types-wrapper">
     <div id="pkm-type-${i}" class="type big-type ${typeColor[pkmData.pkmtypes[0]] || ''}">${pkmData.pkmtypes[0]}</div>
    ${secondType}
          </div>
          </div>
           </div>`
               + `${showArrows()}`
           pokemonTypeColor(i, pkmData);
}


function showArrows() {
    return `<div class="arrow-wrapper">
         <img id="left-arrow" class="arrow" src="./img/arrow left.png">
        <img onclick='nextPokemon()' id="right-arrow" class="arrow" src="./img/arrow right.png">
           </div>
            </div>
           `
}

function nextPokemon(i, pkmData) {
    for (let i = 0; i < 16; i++) {
        showPokemonDialog.innerHTML = 
        showPokemonOverlay(i);
    }
}

console.log(showPokemonOverlay(1));


function previousPokemon() {
    
}

function closeOverlay() {
    document.getElementById('dialog').style.display = "none"
}


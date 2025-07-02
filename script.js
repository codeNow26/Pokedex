let allPokemon = {};
let pkmStats = {};
let currentPokemon = 25;
let lastInputLength = 0;
const Base_URL = "https://pokeapi.co/api/v2/pokemon/";



async function init() {
    document.getElementById("search-bar").addEventListener("input", searchPokemon);
    createCards(1, 25);
    await getPokemon(1, currentPokemon);
}

async function fetchPokemon(i) {
    const response = await fetch(Base_URL + i);
    const data = await response.json();
    let pkmtypes = [];
    for (let t = 0; t < data.types.length; t++) {
        pkmtypes.push(data.types[t].type.name);
    }
    let name = data.name;
    let img = data.sprites.other.dream_world.front_default;
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

function openDialogWindow(i) {
    currentIndex = i;
    let pkmData = allPokemon[i];
    let pkmStatsData = pkmStats[i];
    showPokemonOverlay(i, pkmData, pkmStatsData);
    document.getElementById('dialog').style.display = "block";
    document.body.style.overflow = "hidden";
    toggleArrows();
}

function toggleArrows() {
    let arrows = document.getElementById('arrows');
    let searchInputLength = document.getElementById("search-bar").value.trim().length;
    if (arrows) {
        if (searchInputLength >= 3) {
            arrows.style.display = "none";
        } else {
            arrows.style.display = "flex";
        }
    }
}

function pokemonTypeColor(i, pkmData) {
    let addPrimaryColor = document.getElementById(`pkm-type-${i}`);
    let addSecondaryColor = document.getElementById(`pkm-type2-${i}`);
    let addColorToBackground = document.getElementById(`card-${i}`);
    let firstType = pkmData.pkmtypes[0];
    let secondaryType = pkmData.pkmtypes[1];

    if (firstType) {
       addPrimaryColor.classList.add(firstType);
       addColorToBackground.classList.add(firstType);
    }
     if (secondaryType) {
        addSecondaryColor.classList.add(secondaryType);
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

function createCards(start, end) {
    let pkmContainer = document.getElementById('pokemon-container');
    for (let i = start; i <= end; i++) {
        pkmContainer.innerHTML += createCardsTemplate(i);
    }
}

function showPokemon(i, pkmData) {
    let pkmCard = document.getElementById(`card-${i}`);
    pkmCard.innerHTML = showPokemonTemplate(i, pkmData);
    pokemonTypeColor(i, pkmData);
}

function showPokemonOverlay(i, pkmData, pkmStatsData) {
    let showPokemonDialog = document.getElementById('dialog');
    showPokemonDialog.innerHTML = showPokemonOverlayTemplate(i, pkmData, pkmStatsData);

    pokemonTypeColor(i, pkmData);
    statsBar(i, pkmStatsData);
    showArrows();
}

function nextPokemon() {
    let card = document.querySelectorAll('.card');
    currentIndex++;
    if (currentIndex >= card.length) currentIndex = 1;
    let pkmStatsData = pkmStats[currentIndex]
    let pkmData = allPokemon[currentIndex];
    showPokemonOverlay(currentIndex, pkmData, pkmStatsData);
}

function previousPokemon() {
    let card = document.querySelectorAll('.card');
    currentIndex--;
    if (currentIndex === 0) currentIndex = card.length - 1;
    let pkmStatsData = pkmStats[currentIndex]
    let pkmData = allPokemon[currentIndex];
    showPokemonOverlay(currentIndex, pkmData, pkmStatsData);
}

function closeDialog() {
    let hidden = document.getElementById('dialog');
    hidden.style.display = "none"
    document.body.style.overflow = "auto";
}

function statsBar(i, pkmStatsData) {
    let hpBar = document.getElementById(`hpBar-${i}`);
    let atkBar = document.getElementById(`atkBar-${i}`);
    let dfnsBar = document.getElementById(`dfnsBar-${i}`);
    let spclAtkBar = document.getElementById(`spclAtkBar-${i}`);
    let spclDfnsBar = document.getElementById(`spclDfnsBar-${i}`);
    let speedBar = document.getElementById(`speedBar-${i}`);

    hpBar.style.width = pkmStatsData[1].base_stat + "%";
    hpBar.textContent = + pkmStatsData[1].base_stat;
    atkBar.style.width = pkmStatsData[1].base_stat + "%";
    atkBar.textContent = + pkmStatsData[1].base_stat;
    dfnsBar.style.width = pkmStatsData[2].base_stat + "%";
    dfnsBar.textContent = pkmStatsData[2].base_stat;
    spclAtkBar.style.width = pkmStatsData[3].base_stat + "%";
    spclAtkBar.textContent = pkmStatsData[3].base_stat;
    spclDfnsBar.style.width = pkmStatsData[4].base_stat + "%";
    spclDfnsBar.textContent = pkmStatsData[4].base_stat;
    speedBar.style.width = pkmStatsData[5].base_stat + "%";
    speedBar.textContent = pkmStatsData[5].base_stat;
}

async function loadNewPokemon() {
    let start = currentPokemon + 1;
    let end = currentPokemon + 20;
    currentPokemon = end;

    showLoading();
    createCards(start, end);
    await getPokemon(start, end);
    hideLoading();
}

function showLoading() {
    document.getElementById('loading-overlay').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading-overlay').classList.add('hidden');
}

function searchPokemon() {
    let searchInput = document.getElementById("search-bar").value.trim().toLowerCase();
    let loadBtn = document.getElementById('load-new-pokemon');
    let pkmContainer = document.getElementById('pokemon-container');
    pkmContainer.classList.toggle('full-width', searchInput.length >= 3);
    if (searchInput.length >= 3) hideArrowsAndLoadButton(searchInput, pkmContainer, loadBtn);
    if (nameInput(searchInput.length, loadBtn, pkmContainer)) return;
    lastInputLength = searchInput.length;
    pkmContainer.innerHTML = "";
    filterPokemon(searchInput, pkmContainer, loadBtn);
}

function hideArrowsAndLoadButton(searchInput, pkmContainer, loadBtn) {
    let arrows = document.getElementById('arrows')
    if (searchInput.length >= 3 && pkmContainer && arrows) {
        arrows.style.display = "none";
    }
    if (searchInput.length >= 3 && pkmContainer) {
        loadBtn.style.display = "none";
        showReturnBtn();
    }

}

function nameInput(length, loadBtn, pkmContainer) {
    if (length < 3) {
        loadBtn.style.display = "block";
        hideReturnBtn();
        if (lastInputLength >= 3) {
            pkmContainer.innerHTML = "";
            createCards(1, 25);
            getPokemon(1, currentPokemon);
        }
        lastInputLength = length;
        return true;
    }
    return false;
}

function filterPokemon(input, pkmContainer, loadBtn) {
    let found = false;
    pkmContainer.innerHTML = "";
    for (let i in allPokemon) {
        let pkm = allPokemon[i];
        if (pkm && pkm.name.toLowerCase().includes(input)) {
            pkmContainer.innerHTML += createPokemonCardTemplate(i);
            showPokemon(i, pkm); found = true;
        }
    } if (!found) {
        pkmContainer.innerHTML += showNoResults(), showReturnBtn();
        loadBtn.style.display = "none";
    }
}

function showReturnBtn() {
    let btn = document.getElementById('return-btn');
    if (btn) {
        btn.style.display = "block";
    }
}

function hideReturnBtn() {
    document.getElementById('return-btn').style.display = "none";
}
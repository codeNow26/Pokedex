function createCard(start, end) {
    let pokemon = document.getElementById('pokemon-container');
    for (let i = start; i <= end; i++) {
        pokemon.innerHTML += `
        <div onclick="openDialogWindow(${i}, event)" class="card" id="card-${i}">
        </div>`
    }
}

function showPokemon(i, pkmData) {
    let pkmCard = document.getElementById(`card-${i}`);
    let secondType = "";


    if (pkmData.pkmtypes[1]) {
        secondType = `<div id="pkm-type2-${i}" class="type">${pkmData.pkmtypes[1]}</div>`
    };

    pkmCard.innerHTML = `
    <div class="pkm-card-wrapper">
       <div class="pkm-id">#${i}</div>
   <div class="pkm-name">${pkmData.name.toUpperCase()}</div>
   <div class= "pkm-img-wrapper">
   <img class="pkm-img" src="${pkmData.img}">
   </div>
     <div class="types-wrapper">
    <div id="pkm-type-${i}" class="type">${pkmData.pkmtypes[0]}</div>
    ${secondType}
        </div>
    </div>`

    pokemonTypeColor(i, pkmData);
}



function showPokemonOverlay(i, pkmData, pkmStatsData) {

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
          
<div class="progress-container">
  <div class="progress-row">
    <span class="stat-name">${pkmStatsData[1].stat.name}:</span>
    <div class="progress-bar" id="atkBar-${i}">0%</div>
  </div>
  <div class="progress-row">
    <span class="stat-name">${pkmStatsData[2].stat.name}:</span>
    <div class="progress-bar" id="dfnsBar-${i}">0%</div>
  </div>
  <div class="progress-row">
    <span class="stat-name">${pkmStatsData[3].stat.name}:</span>
    <div class="progress-bar" id="spclAtkBar-${i}">0%</div>
  </div>
  <div class="progress-row">
    <span class="stat-name">${pkmStatsData[4].stat.name}:</span>
    <div class="progress-bar" id="spclDfnsBar-${i}">0%</div>
  </div>
  <div class="progress-row">
    <span class="stat-name">${pkmStatsData[5].stat.name}:</span>
    <div class="progress-bar" id="speedBar-${i}">0%</div>
  </div>
</div>`

    pokemonTypeColor(i, pkmData);
    statsBar(i, pkmStatsData);
            showArrows();
}

function showArrows() {
    let arrows = document.getElementById('dialog');
    arrows.innerHTML +=  `<div class="arrow-wrapper">
         <img onclick ='previousPokemon()' id="left-arrow" class="arrow" src="./img/arrow left.png">
        <img onclick='nextPokemon()' id="right-arrow" class="arrow" src="./img/arrow right.png">
           </div>
            </div>
           `
}

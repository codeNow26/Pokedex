function createCardsTemplate(i) {
  return `
        <div onclick="openDialogWindow(${i}, event)" class="card" id="card-${i}">
        <div class="dialog-content"></div>
        </div>`;
}

function showPokemonTemplate(i, pkmData) {
  let secondType = "";
  if (pkmData.pkmtypes[1]) {
    secondType = `<div id="pkm-type2-${i}" class="type">${pkmData.pkmtypes[1]}</div>`
  };

  return `
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
    </div>`;
}

function showPokemonOverlayTemplate(i, pkmData, pkmStatsData) {
  let secondType = "";
  if (pkmData.pkmtypes[1]) {
    secondType = `<div id="pkm-type-${i}-2" class="type big-type ${pkmData.pkmtypes[1]}">${pkmData.pkmtypes[1]}</div>`;
  }
  return `
        <div class="big-pkm-wrapper" id="dialog-${i}">
          <img onclick="closeDialog()" class="close-window-x" src="./img/x.png.png">
          <div class="card bigCard" id="card-${i}">
            <div class="head-pkm-card">
              <img class="pokeball" src="./img/Pokeball.png">
              <img class="bigPkmImage" src="${pkmData.img}">
              <div class="big-pkm-name">${pkmData.name}</div>
              <div class="big-types-wrapper">
                <div id="pkm-type-${i}-1" class="type big-type ${pkmData.pkmtypes[0]}">${pkmData.pkmtypes[0]}</div>
                ${secondType}
              </div>
            </div>
            
            <div id="progress" class="progress-container">
              <div class="progress-row">
                <span class="stat-name">${pkmStatsData[0].stat.name}:</span>
                <div class="progress-bar" id="hpBar-${i}">0%</div>
              </div>
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
            </div>
          </div>
        </div>
  `;
}

function showArrows() {
  let arrows = document.getElementById('dialog');
  arrows.innerHTML += `<div id="arrows" class="arrow-wrapper">
         <img onclick ='previousPokemon()' id="left-arrow" class="arrow" src="./img/arrow left.png">
        <img onclick='nextPokemon()' id="right-arrow" class="arrow" src="./img/arrow right.png">
           </div>
           `;
}

function createPokemonCardTemplate(index) {
  return `
        <div onclick="openDialogWindow(${index}, event)" class="card" id="card-${index}">
            <div class="dialog-content"></div>
        </div>
    `;
}

function showNoResults() {
  return `<p class="no-results">No Pokémon found matching</p>`;
}


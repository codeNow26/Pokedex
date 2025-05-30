async function init() {
    createCard();
    await getPokemon();
}

const Base_URL = "https://pokeapi.co/api/v2/pokemon/";

async function getPokemon() {
    let response = await fetch(Base_URL);
    console.log(response);
    for (let i = 1; i < 16; i++) {
        let response = await fetch(Base_URL + i);
        let data = await response.json();
        document.getElementById(`card-${i}`).innerHTML = `<img src="(Base_URL + i)>"`

        // hier weitermachen!!!! Base URL Muss verändert werden!
    }
}

function createCard() {
    let pokemon = document.getElementById('pokemon-container');
    for (let i = 1; i < 16; i++) {
        pokemon.innerHTML += `
        <div class="card" id="card-${i}">Bild, Name, Typ
        </div>`
    }
}
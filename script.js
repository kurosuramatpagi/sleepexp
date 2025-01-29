document.addEventListener('DOMContentLoaded', function () {
    fetch('pokemon_names.txt')
        .then(response => response.text())
        .then(data => {
            window.pokemonNames = data.split('\n').map(name => name.trim()).filter(name => name !== '');
        })
        .catch(error => console.error('Error loading the pokemon names:', error));

    const registerButton = document.getElementById('registerButton');
    registerButton.addEventListener('click', registerPokemon);
});

function registerPokemon() {
    const pokemonName = document.getElementById('pokemonName').value;
    const nickname = document.getElementById('nickname').value;
    const sleepExpBonus = document.getElementById('sleepExpBonus').checked;
    const nature = document.getElementById('nature').value;
    const currentLevel = parseInt(document.getElementById('currentLevel').value, 10);
    const expToNextLevel = parseInt(document.getElementById('expToNextLevel').value, 10);

    if (!pokemonName) {
        alert('ポケモン名を入力してください！');
        return;
    }

    const pokemonData = {
        name: pokemonName,
        nickname: nickname || pokemonName,
        sleepExpBonus: sleepExpBonus,
        nature: nature,
        currentLevel: isNaN(currentLevel) ? 1 : currentLevel,
        expToNextLevel: isNaN(expToNextLevel) ? 0 : expToNextLevel
    };

    console.log("登録されたポケモン: ", pokemonData);

    addPokemonToList(pokemonData);
}

function addPokemonToList(pokemon) {
    const displayArea = document.getElementById('pokemonDisplay');
    const pokemonElement = document.createElement('div');
    pokemonElement.className = 'pokemon-box';
    pokemonElement.innerHTML = `
        <p>名前: ${pokemon.name} (${pokemon.nickname})</p>
        <p>レベル: ${pokemon.currentLevel}</p>
        <p>次のレベルまで: ${pokemon.expToNextLevel} EXP</p>
        <p>性格: ${pokemon.nature}</p>
        <p>睡眠EXPボーナス: ${pokemon.sleepExpBonus ? 'あり' : 'なし'}</p>
    `;
    displayArea.appendChild(pokemonElement);
}

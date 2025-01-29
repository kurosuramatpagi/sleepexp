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
    const pokemonNameInput = document.getElementById('pokemonName').value;
    const nickname = document.getElementById('nickname').value;
    const sleepExpBonus = document.getElementById('sleepExpBonus').checked;
    const nature = document.getElementById('nature').value;
    const currentLevel = document.getElementById('currentLevel').value;
    const expToNextLevel = document.getElementById('expToNextLevel').value;

    if (!pokemonNameInput) {
        alert('ポケモン名を入力してください！');
        return;
    }

    const pokemonData = {
        name: pokemonNameInput,
        nickname: nickname || '無し',
        sleepExpBonus: sleepExpBonus,
        nature: nature,
        currentLevel: parseInt(currentLevel, 10),
        expToNextLevel: parseInt(expToNextLevel, 10)
    };

    console.log("登録されたポケモン: ", pokemonData);

    updatePokemonList(pokemonData);
}

function updatePokemonList(pokemonData) {
    const displayArea = document.getElementById('pokemonDisplay');
    const pokemonElement = document.createElement('div');
    pokemonElement.className = 'pokemon-box';
    pokemonElement.innerHTML = `
        <p>名前: ${pokemonData.name} (${pokemonData.nickname})</p>
        <p>レベル: ${pokemonData.currentLevel}</p>
        <p>次のレベルまで: ${pokemonData.expToNextLevel} EXP</p>
        <p>性格: ${pokemonData.nature}</p>
        <p>睡眠EXPボーナス: ${pokemonData.sleepExpBonus ? 'あり' : 'なし'}</p>
    `;
    displayArea.appendChild(pokemonElement);
}

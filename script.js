document.addEventListener('DOMContentLoaded', function () {
    // ローカルストレージからポケモンデータを読み込む
    loadPokemonData();

    // ポケモン名のリストをロードする
    fetch('pokemon_names.txt')
        .then(response => response.text())
        .then(data => {
            const pokemonNames = data.split('\n').filter(name => name.trim() !== '');
            const select = document.getElementById('pokemonName');
            pokemonNames.forEach(name => {
                const option = document.createElement('option');
                option.value = name.trim();
                option.textContent = name.trim();
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error loading the pokemon names:', error));
});

function registerPokemon() {
    const pokemonName = document.getElementById('pokemonName').value;
    const nickname = document.getElementById('nickname').value || pokemonName;
    const sleepExpBonus = document.getElementById('sleepExpBonus').checked;
    const nature = document.getElementById('nature').value;
    const currentLevel = document.getElementById('currentLevel').value;
    const expToNextLevel = document.getElementById('expToNextLevel').value;

    const displayArea = document.getElementById('pokemonDisplay');

    const pokemonData = {
        name: pokemonName,
        nickname: nickname,
        sleepExpBonus: sleepExpBonus,
        nature: nature,
        currentLevel: currentLevel,
        expToNextLevel: expToNextLevel
    };

    // ポケモン情報をローカルストレージに保存
    savePokemonData(pokemonData);

    // 画面に表示
    displayPokemon(pokemonData);
}

function savePokemonData(pokemonData) {
    let pokemonList = JSON.parse(localStorage.getItem('pokemonList')) || [];
    pokemonList.push(pokemonData);
    localStorage.setItem('pokemonList', JSON.stringify(pokemonList));
}

function loadPokemonData() {
    const pokemonList = JSON.parse(localStorage.getItem('pokemonList')) || [];
    pokemonList.forEach(pokemonData => {
        displayPokemon(pokemonData);
    });
}

function displayPokemon(pokemonData) {
    const displayArea = document.getElementById('pokemonDisplay');
    const pokemonBox = document.createElement('div');
    pokemonBox.className = 'pokemon-box';
    const img = document.createElement('img');
    img.src = `images/${pokemonData.name}.png`;
    img.alt = `画像: ${pokemonData.name}`;
    const levelText = document.createElement('p');
    levelText.textContent = `Lv.${pokemonData.currentLevel}`;
    const nicknameText = document.createElement('p');
    nicknameText.textContent = pokemonData.nickname;

    pokemonBox.appendChild(img);
    pokemonBox.appendChild(levelText);
    pokemonBox.appendChild(nicknameText);
    displayArea.appendChild(pokemonBox);
}

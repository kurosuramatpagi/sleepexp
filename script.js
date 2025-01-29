document.addEventListener('DOMContentLoaded', function () {
    loadPokemonData(); // ページ読み込み時に保存データを読み込む

    // ポケモン名リストを読み込む
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

    const pokemonData = { name: pokemonName, nickname, sleepExpBonus, nature, currentLevel, expToNextLevel };

    savePokemonData(pokemonData); // ローカルストレージに保存
    displayPokemon(pokemonData); // 画面に追加表示
}

function savePokemonData(pokemonData) {
    let pokemonList = JSON.parse(localStorage.getItem('pokemonList')) || [];
    pokemonList.push(pokemonData);
    localStorage.setItem('pokemonList', JSON.stringify(pokemonList));
}

function loadPokemonData() {
    const pokemonList = JSON.parse(localStorage.getItem('pokemonList')) || [];
    pokemonList.forEach(displayPokemon);
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

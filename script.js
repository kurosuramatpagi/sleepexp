document.addEventListener('DOMContentLoaded', function () {
    loadPokemonData(); // ページ読み込み時に保存データを読み込む

    // ポケモン名リストを読み込む & オートコンプリート用データリストを作成
    fetch('pokemon_names.txt')
        .then(response => response.text())
        .then(data => {
            const pokemonNames = data.split('\n').map(name => name.trim()).filter(name => name !== '');
            const dataList = document.getElementById('pokemonList');

            pokemonNames.forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                dataList.appendChild(option);
            });

            // 入力検証のためにグローバルに保存
            window.pokemonNamesSet = new Set(pokemonNames);
        })
        .catch(error => console.error('Error loading the pokemon names:', error));
});

// 登録時にポケモン名がリスト内のものかチェック
function registerPokemon() {
    const pokemonNameInput = document.getElementById('pokemonName').value;
    
    // 入力がリスト内にあるかチェック
    if (!window.pokemonNamesSet.has(pokemonNameInput)) {
        alert('正しいポケモン名を入力してください！');
        return;
    }

    const nickname = document.getElementById('nickname').value || pokemonNameInput;
    const sleepExpBonus = document.getElementById('sleepExpBonus').checked;
    const nature = document.getElementById('nature').value;
    const currentLevel = document.getElementById('currentLevel').value;
    const expToNextLevel = document.getElementById('expToNextLevel').value;

    const pokemonData = { name: pokemonNameInput, nickname, sleepExpBonus, nature, currentLevel, expToNextLevel };

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

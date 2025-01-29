document.addEventListener('DOMContentLoaded', function () {
    fetch('pokemon_names.txt')
        .then(response => response.text())
        .then(data => {
            window.pokemonNames = data.split('\n').map(name => name.trim()).filter(name => name !== '');
        })
        .catch(error => console.error('Error loading the pokemon names:', error));

    const registerButton = document.getElementById('registerButton');
    registerButton.addEventListener('click', registerPokemon);

    // 入力フィールドのイベントリスナー
    document.getElementById('pokemonName').addEventListener('input', showSuggestions);
});

function registerPokemon() {
    const pokemonName = document.getElementById('pokemonName').value.trim();
    const nickname = document.getElementById('nickname').value.trim();
    const sleepExpBonus = document.getElementById('sleepExpBonus').checked;
    const nature = document.getElementById('nature').value;
    const currentLevel = parseInt(document.getElementById('currentLevel').value, 10);
    const expToNextLevel = parseInt(document.getElementById('expToNextLevel').value, 10);

    if (!pokemonName || !window.pokemonNames.includes(pokemonName)) {
        alert('正しいポケモン名を入力してください！');
        return;
    }

    const pokemonData = {
        name: pokemonName,
        nickname: nickname || pokemonName,
        sleepExpBonus: sleepExpBonus,
        nature: nature,
        currentLevel: isNaN(currentLevel) ? 1 : currentLevel,
        expToNextLevel: isNaN(expToNextLevel) ? 0 : expToNextLevel,
        imagePath: `images/${pokemonName}.png`
    };

    console.log("登録されたポケモン: ", pokemonData);
    addPokemonToList(pokemonData);
}

function addPokemonToList(pokemon) {
    const displayArea = document.getElementById('pokemonDisplay');
    const pokemonElement = document.createElement('div');
    pokemonElement.className = 'pokemon-box';
    pokemonElement.innerHTML = `
        <img src="${pokemon.imagePath}" alt="${pokemon.name}" class="pokemon-image">
        <p>名前: ${pokemon.name} (${pokemon.nickname})</p>
        <p>レベル: ${pokemon.currentLevel}</p>
        <p>次のレベルまで: ${pokemon.expToNextLevel} EXP</p>
        <p>性格: ${pokemon.nature}</p>
        <p>睡眠EXPボーナス: ${pokemon.sleepExpBonus ? 'あり' : 'なし'}</p>
    `;
    displayArea.appendChild(pokemonElement);
}

// ひらがなをカタカナに変換する関数
function toKatakana(str) {
    return str.replace(/[\u3041-\u3096]/g, function(ch) {
        return String.fromCharCode(ch.charCodeAt(0) + 0x60);
    });
}

// 検索サジェスチョン機能（ひらがな対応）
function showSuggestions() {
    const input = document.getElementById('pokemonName');
    const suggestionBox = document.getElementById('suggestionBox');
    let query = input.value.trim();

    if (!query) {
        suggestionBox.innerHTML = '';
        suggestionBox.style.display = 'none';
        return;
    }

    // ひらがな入力の場合はカタカナに変換
    const katakanaQuery = toKatakana(query);

    const matches = window.pokemonNames.filter(name => name.startsWith(katakanaQuery));

    if (matches.length === 0) {
        suggestionBox.innerHTML = '';
        suggestionBox.style.display = 'none';
        return;
    }

    suggestionBox.innerHTML = '';
    matches.forEach(match => {
        const suggestion = document.createElement('div');
        suggestion.textContent = match;
        suggestion.onclick = () => {
            input.value = match;
            suggestionBox.innerHTML = '';
            suggestionBox.style.display = 'none';
        };
        suggestionBox.appendChild(suggestion);
    });

    suggestionBox.style.display = 'block';
}

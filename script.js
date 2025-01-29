document.addEventListener('DOMContentLoaded', function () {
    loadPokemonData(); // ページ読み込み時に保存データを読み込む

    fetch('pokemon_names.txt')
        .then(response => response.text())
        .then(data => {
            const pokemonNames = data.split('\n').map(name => name.trim()).filter(name => name !== '');
            window.pokemonNamesList = pokemonNames;
            window.pokemonNamesSet = new Set(pokemonNames);
        })
        .catch(error => console.error('Error loading the pokemon names:', error));

    // 入力イベントリスナーを追加
    document.getElementById('pokemonName').addEventListener('input', showSuggestions);
});

function loadPokemonData() {
    console.log("Loading Pokemon data...");
    // ここにデータを読み込む具体的な処理を追加
}

function showSuggestions() {
    const input = document.getElementById('pokemonName');
    const suggestionBox = document.getElementById('suggestionBox');
    const query = input.value.trim();

    if (!query) {
        suggestionBox.innerHTML = '';
        suggestionBox.style.display = 'none';
        return;
    }

    const kanaQuery = toKatakana(query);
    const matches = window.pokemonNamesList.filter(name => name.startsWith(kanaQuery));

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

function toKatakana(str) {
    return str.replace(/[\u3041-\u3096]/g, ch => 
        String.fromCharCode(ch.charCodeAt(0) + 0x60));
}

function registerPokemon() {
    const pokemonNameInput = document.getElementById('pokemonName').value;
    if (!window.pokemonNamesSet.has(pokemonNameInput)) {
        alert('正しいポケモン名を入力してください！');
        return;
    }

    // 以下、ポケモンの登録処理を追加...
}

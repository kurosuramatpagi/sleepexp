document.addEventListener('DOMContentLoaded', function () {
    // ポケモン名リストの読み込み
    fetch('pokemon_names.txt')
        .then(response => response.text())
        .then(data => {
            window.pokemonNames = data.split('\n').map(name => name.trim()).filter(name => name !== '');
        })
        .catch(error => console.error('Error loading the pokemon names:', error));

    // 登録ボタンのイベントリスナー設定
    const registerButton = document.getElementById('registerButton');
    registerButton.addEventListener('click', registerPokemon);

    // 検索サジェスチョンのイベントリスナー設定
    document.getElementById('pokemonName').addEventListener('input', showSuggestions);
});

// ポケモンを登録する関数
function registerPokemon() {
    const pokemonName = document.getElementById('pokemonName').value.trim();
    const nickname = document.getElementById('nickname').value.trim();
    const sleepExpBonus = document.getElementById('sleepExpBonus').checked;
    const nature = document.getElementById('nature').value;
    const currentLevel = parseInt(document.getElementById('currentLevel').value, 10);
    const expToNextLevel = parseInt(document.getElementById('expToNextLevel').value, 10);

    // 入力チェック
    if (!pokemonName || !window.pokemonNames.includes(pokemonName)) {
        alert('正しいポケモン名を入力してください！');
        return;
    }

    // 性格の記号を背景付きで設定
    let natureSymbol = `<span class="nature-symbol">-</span>`;
    if (nature === "expUp") natureSymbol = `<span class="nature-symbol exp-up">↑</span>`;
    if (nature === "expDown") natureSymbol = `<span class="nature-symbol exp-down">↓</span>`;

    // 「睡ボ」アイコンの処理
    const sleepBonusIcon = sleepExpBonus ? '<span class="sleep-bonus">睡ボ</span>' : '';

    const pokemonData = {
        name: pokemonName,
        nickname: nickname || pokemonName,
        sleepBonusIcon: sleepBonusIcon,
        natureSymbol: natureSymbol,
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
        <p class="nickname">${pokemon.nickname}</p>
        <p class="level">Lv.${pokemon.currentLevel}</p>
        <p class="exp-bonus">${pokemon.sleepBonusIcon} 性格${pokemon.natureSymbol}</p>
        <p class="exp-next">次のレベルまで ${pokemon.expToNextLevel} EXP</p>
    `;
    displayArea.appendChild(pokemonElement);
}
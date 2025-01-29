document.addEventListener('DOMContentLoaded', function () {
    fetch('pokemon_names.txt')
        .then(response => response.text())
        .then(data => {
            const pokemonNames = data.split('\n').filter(name => name.trim() !== '');
            const select = document.getElementById('pokemonName');
            pokemonNames.forEach(name => {
                const option = document.createElement('option');
                option.value = name.trim();
                option.textContent = name.trim().replace(/[\(\)]/g, ''); // 括弧を削除して問題の回避
                select.appendChild(option);
            });
            console.log(pokemonNames); // プルダウンの内容をコンソールに表示して確認
        })
        .catch(error => console.error('Error loading the pokemon names:', error)); // エラーがあればコンソールに表示
});

function registerPokemon() {
    const pokemonName = document.getElementById('pokemonName').value;
    const nickname = document.getElementById('nickname').value || pokemonName;
    const sleepExpBonus = document.getElementById('sleepExpBonus').checked;
    const nature = document.getElementById('nature').value;
    const currentLevel = document.getElementById('currentLevel').value;
    const expToNextLevel = document.getElementById('expToNextLevel').value;

    const displayArea = document.getElementById('pokemonDisplay');
    displayArea.innerHTML = ''; // Clear previous entries

    const pokemonBox = document.createElement('div');
    pokemonBox.className = 'pokemon-box';
    const img = document.createElement('img');
    img.src = `images/${pokemonName}.png`;
    img.alt = `画像: ${pokemonName}`;
    const levelText = document.createElement('p');
    levelText.textContent = `Lv.${currentLevel}`;
    const nicknameText = document.createElement('p');
    nicknameText.textContent = nickname;

    pokemonBox.appendChild(img);
    pokemonBox.appendChild(levelText);
    pokemonBox.appendChild(nicknameText);
    displayArea.appendChild(pokemonBox);
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('pokemon_names.txt')
        .then(response => response.text())
        .then(data => {
            const pokemonNames = data.split('\n');
            const select = document.getElementById('pokemonName');
            pokemonNames.forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                select.appendChild(option);
                console.log(name); // コンソールに名前を出力して確認
            });
        });
});

function registerPokemon() {
    const pokemonName = document.getElementById('pokemonName').value;
    const nickname = document.getElementById('nickname').value || pokemonName;
    the const sleepExpBonus = document.getElementById('sleepExpBonus').checked;
    the const nature = document.getElementById('nature').value;
    the const currentLevel = document.getElementById('currentLevel').value;
    the const expToNextLevel = document.getElementById('expToNextLevel').value;

    the const displayArea = document.getElementById('pokemonDisplay');
    displayArea.innerHTML = ''; // Clear previous entries

    the const pokemonBox = document.createElement('div');
    pokemonBox.className = 'pokemon-box';
    the const img = document.createElement('img');
    img.src = `images/${pokemonName}.png`;
    img.alt = `画像: ${pokemonName}`;
    the const levelText = document.createElement('p');
    levelText.textContent = `Lv.${currentLevel}`;
    the const nicknameText = document.createElement('p');
    nicknameText.textContent = nickname;

    pokemonBox.appendChild(img);
    pokemonBox.appendChild(levelText);
    pokemonBox.appendChild(nicknameText);
    displayArea.appendChild(pokemonBox);
}

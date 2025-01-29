document.addEventListener('DOMContentLoaded', function () {
    fetch('pokemon_names.txt')
        .then(response => response.text())
        .then(data => {
            const pokemonArray = data.split('\n');
            const select = document.getElementById('pokemonSelect');
            pokemonArray.forEach(function (pokemon) {
                if (pokemon) { // 空の行は無視する
                    const option = document.createElement('option');
                    option.value = option.textContent = pokemon;
                    select.appendChild(option);
                }
            });
        });
});

function registerPokemon() {
    const pokemonName = document.getElementById('pokemonSelect').value;
    const nickname = document.getElementById('nickname').value || pokemonName;
    const nature = document.getElementById('natureSelect').value;
    const expBonus = document.getElementById('expBonus').checked ? 'あり' : 'なし';
    const nextLevelExp = document.getElementById('nextLevelExp').value;
    const currentLevel = document.getElementById('currentLevel').value;
    
    const container = document.getElementById('pokemonList');
    const pokemonDiv = document.createElement('div');
    pokemonDiv.className = 'pokemonProfile';
    pokemonDiv.innerHTML = `
        <img src="images/${pokemonName}.png" alt="${pokemonName}" style="width: 100px; height: 100px; border-radius: 50%;">
        <div>Lv.${currentLevel} ${nickname}</div>
        <div>性格: ${nature}</div>
        <div>EXPボーナス: ${expBonus}</div>
        <div>次のレベルまでのEXP: ${nextLevelExp}</div>
    `;
    container.appendChild(pokemonDiv);
}

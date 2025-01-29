document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pokemonRegistry');
    const registeredPokemonsContainer = document.getElementById('registeredPokemons');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // 入力されたデータを取得
        const pokemonName = document.getElementById('pokemonSelect').value;
        const nickname = document.getElementById('nickname').value.trim() || pokemonName; // ニックネーム未入力ならポケモン名
        const currentLevel = document.getElementById('currentLevel').value || "??"; // 未入力なら「??」
        const nextLevelExp = document.getElementById('nextLevelExp').value;

        // ポケモンカードを作成
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');

        // ポケモン画像（仮の四角）
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('pokemon-image');

        // レベル表示（入力されたレベルを反映）
        const levelText = document.createElement('div');
        levelText.classList.add('pokemon-level');
        levelText.textContent = `Lv.${currentLevel}`;

        // ニックネームまたはポケモン名
        const nicknameText = document.createElement('div');
        nicknameText.classList.add('pokemon-nickname');
        nicknameText.textContent = nickname;

        // カードに追加
        pokemonCard.appendChild(levelText);
        pokemonCard.appendChild(imageDiv);
        pokemonCard.appendChild(nicknameText);

        // 登録リストに追加
        registeredPokemonsContainer.appendChild(pokemonCard);
    });
});

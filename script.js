document.addEventListener('DOMContentLoaded', function() {
    const pokemonSelect = document.getElementById('pokemonSelect');
    const registeredPokemonsContainer = document.getElementById('registeredPokemons');

    // 📌 1. テキストファイルからポケモン名を読み込んでプルダウンに設定
    fetch('pokemon_names.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(text => {
            const pokemonNames = text.split('\n').map(name => name.trim()).filter(name => name !== "");
            pokemonNames.forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                pokemonSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error loading pokemon_names.txt:', error);
        });

    // 📌 2. ポケモン登録処理
    document.getElementById('pokemonRegistry').addEventListener('submit', function(event) {
        event.preventDefault();

        // 入力データの取得
        const pokemonName = pokemonSelect.value;
        const nickname = document.getElementById('nickname').value.trim() || pokemonName; // 未入力ならポケモン名
        const currentLevel = document.getElementById('currentLevel').value || "??"; // 未入力なら「??」
        const nextLevelExp = document.getElementById('nextLevelExp').value;

        // 📌 3. ポケモンカードを作成
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');

        // 📌 画像枠（仮）
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('pokemon-image');

        // 📌 レベル表示
        const levelText = document.createElement('div');
        levelText.classList.add('pokemon-level');
        levelText.textContent = `Lv.${currentLevel}`;

        // 📌 ニックネーム表示
        const nicknameText = document.createElement('div');
        nicknameText.classList.add('pokemon-nickname');
        nicknameText.textContent = nickname;

        // 📌 すべての要素をカードに追加
        pokemonCard.appendChild(levelText);
        pokemonCard.appendChild(imageDiv);
        pokemonCard.appendChild(nicknameText);

        // 📌 登録リストに追加
        registeredPokemonsContainer.appendChild(pokemonCard);
    });
fetch('pokemon_names.txt')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(text => {
        console.log("読み込んだテキスト:", text);  // ← テキストデータを出力
    })
    .catch(error => {
        console.error('Error loading pokemon_names.txt:', error);
    });

});

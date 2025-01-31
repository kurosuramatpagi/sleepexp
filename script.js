document.addEventListener('DOMContentLoaded', function () {
    // ポケモン名リストの読み込み
    fetch('pokemon_names.txt')
        .then(response => response.text())
        .then(data => {
            window.pokemonNames = data.split('\n').map(name => name.trim()).filter(name => name !== '');
        })
        .catch(error => console.error('Error loading the pokemon names:', error));

    // 登録ボタンのイベントリスナー設定
    document.getElementById('registerButton').addEventListener('click', registerPokemon);

    // 睡眠EXPボーナスボタンのON/OFF切り替え
    const sleepExpBonusBtn = document.getElementById('sleepExpBonusBtn');
    sleepExpBonusBtn.addEventListener('click', function () {
        this.classList.toggle('active'); // クリックでON/OFF切り替え
    });

    // 性格ボタンのON/OFF切り替え（どちらか一方のみONにする）
    const expUpBtn = document.getElementById('expUpBtn');
    const expDownBtn = document.getElementById('expDownBtn');

    expUpBtn.addEventListener('click', function () {
        this.classList.add('active');
        expDownBtn.classList.remove('active'); // もう片方をOFFにする
    });

    expDownBtn.addEventListener('click', function () {
        this.classList.add('active');
        expUpBtn.classList.remove('active'); // もう片方をOFFにする
    });

    // 目標レベルボタンのON/OFF切り替え（1つだけ選択可能）
    document.querySelectorAll('.target-btn').forEach(button => {
        button.addEventListener('click', function () {
            document.querySelectorAll('.target-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 検索サジェスチョンのイベントリスナー設定
    document.getElementById('pokemonName').addEventListener('input', showSuggestions);
});

// ポケモンを登録する関数
function registerPokemon() {
    const pokemonName = document.getElementById('pokemonName').value.trim();
    const nickname = document.getElementById('nickname').value.trim();
    const sleepExpBonus = document.getElementById('sleepExpBonusBtn').classList.contains('active'); // ON/OFF判定
    const expUp = document.getElementById('expUpBtn').classList.contains('active');
    const expDown = document.getElementById('expDownBtn').classList.contains('active');
    const currentLevel = parseInt(document.getElementById('currentLevel').value, 10);
    const expToNextLevel = parseInt(document.getElementById('expToNextLevel').value, 10);
    const memo = document.getElementById('memo').value.trim();

    // 目標レベルの取得
    let targetLevel = "なし";
    document.querySelectorAll('.target-btn').forEach(button => {
        if (button.classList.contains('active')) {
            targetLevel = button.getAttribute('data-level');
        }
    });

    // 入力チェック
    if (!pokemonName || !window.pokemonNames.includes(pokemonName)) {
        alert('正しいポケモン名を入力してください！');
        return;
    }

    // 性格の記号を色付きで設定（ボタンに対応）
    let natureSymbol = "";
    if (expUp) {
        natureSymbol = `<span class="nature-symbol exp-up">↑</span>`;
    } else if (expDown) {
        natureSymbol = `<span class="nature-symbol exp-down">↓</span>`;
    } else {
        natureSymbol = `<span class="nature-symbol nature-none">-</span>`; // 未登録なら "-"
    }

    // 「睡ボ」アイコンの処理（背景#ffcc00の角丸）
    const sleepBonusIcon = sleepExpBonus ? '<span class="sleep-bonus">睡ボ</span>' : '';

    // ポケモンデータのオブジェクトを作成
    const pokemonData = {
        name: pokemonName,
        nickname: nickname || pokemonName,
        sleepBonusIcon: sleepBonusIcon,
        natureSymbol: natureSymbol,
        currentLevel: isNaN(currentLevel) ? 1 : currentLevel,
        expToNextLevel: isNaN(expToNextLevel) ? 0 : expToNextLevel,
        targetLevel: targetLevel,
        memo: memo,
        imagePath: `images/${pokemonName}.png`
    };

    console.log("登録されたポケモン: ", pokemonData);
    addPokemonToList(pokemonData);
}

// ポケモンをリストに追加する関数
function addPokemonToList(pokemon) {
    const displayArea = document.getElementById('pokemonDisplay');
    const pokemonElement = document.createElement('div');
    pokemonElement.className = 'pokemon-box';
    pokemonElement.innerHTML = `
        <img src="${pokemon.imagePath}" alt="${pokemon.name}" class="pokemon-image">
        <p class="nickname">${pokemon.nickname}</p>
        <p class="level">Lv.${pokemon.currentLevel}</p>
        <p class="exp-bonus">${pokemon.sleepBonusIcon} ${pokemon.natureSymbol}</p>
        <p class="exp-next">次のレベルまで ${pokemon.expToNextLevel} EXP</p>
        <p class="target-level">目標: ${pokemon.targetLevel}</p>
        <p class="memo">${pokemon.memo ? "メモ: " + pokemon.memo : ""}</p>
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

    // ひらがなをカタカナに変換
    const katakanaQuery = toKatakana(query);

    // ひらがなとカタカナの両方で検索
    const matches = window.pokemonNames.filter(name => 
        name.startsWith(katakanaQuery) || name.startsWith(query)
    );

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
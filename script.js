document.addEventListener('DOMContentLoaded', function () {
   let specialPatterns = {};
   console.log("あああああ");

    // special_patterns.json を読み込む
    fetch('special_patterns.json')
        .then(response => response.json())
        .then(data => {
            specialPatterns = data;
            console.log("特殊パターンが読み込まれました:", specialPatterns);  // 確認用
        })
        .catch(error => console.error('Error loading special patterns:', error));
    
    // ポケモン名リストの読み込み
    fetch('pokemon_names.txt')
        .then(response => response.text())
        .then(data => {
            window.pokemonNames = data.split('\n').map(name => name.trim()).filter(name => name !== '');
        })
        .catch(error => console.error('Error loading the pokemon names:', error));

    // 登録ボタンのイベントリスナー設定
    document.getElementById('registerButton').addEventListener('click', registerPokemon);

    // 目標レベルボタンのON/OFF切り替え（1つだけ選択可能）
document.querySelectorAll('.target-btn').forEach(button => {
    button.addEventListener('click', function () {
        // 他のボタンから 'selected' クラスを外す
        document.querySelectorAll('.target-btn').forEach(btn => btn.classList.remove('selected'));
        
        // クリックしたボタンに 'selected' クラスを追加
        this.classList.add('selected');
    });
});

 function adjustButtonAlignment() {
    const targetInput = document.getElementById('targetLevelInput');
    const buttonContainer = document.querySelector('.target-level-buttons');

    if (targetInput && buttonContainer) {
        const inputRect = targetInput.getBoundingClientRect();
        const inputY = inputRect.top + window.scrollY;
        const inputX = inputRect.left + window.scrollX;

        // ✅ 画面サイズによってオフセットを変更
        let adjustOffsetY = -10; // 🔺 デフォルトのY座標調整
        let adjustOffsetX = 10;  // 🔜 デフォルトのX座標調整

        if (window.innerWidth <= 375) {  
            // 🔹 iPhone SEなどの小さい画面
            adjustOffsetY = -8;
            adjustOffsetX = 5;
        } else if (window.innerWidth <= 768) {  
            // 🔹 タブレット（iPadなど）
            adjustOffsetY = -12;
            adjustOffsetX = 15;
        } else {  
            // 🔹 PCなどの大きな画面
            adjustOffsetY = -10;
            adjustOffsetX = 10;
        }

        // ボタンコンテナのY座標 & X座標を設定
        buttonContainer.style.position = "absolute";
        buttonContainer.style.top = `${inputY + adjustOffsetY}px`;  
        buttonContainer.style.left = `${inputX + adjustOffsetX}px`;
    }
}

// ✅ ページロード時とウィンドウリサイズ時に適用
window.addEventListener('load', adjustButtonAlignment);
window.addEventListener('resize', adjustButtonAlignment);



    // 睡眠EXPボーナスボタンのON/OFF切り替え
    const sleepExpBonusBtn = document.getElementById('sleepExpBonusBtn');
    sleepExpBonusBtn.addEventListener('click', function () {
        this.classList.toggle('active'); // クリックでON/OFF切り替え
    });

    // 性格ボタンのON/OFF切り替え（どちらか一方のみONにするが、もう一度押すと無補正に戻る）
    const expUpBtn = document.getElementById('expUpBtn');
    const expDownBtn = document.getElementById('expDownBtn');

    expUpBtn.addEventListener('click', function () {
        if (this.classList.contains('active')) {
            this.classList.remove('active'); // ONの状態ならOFF（無補正）
        } else {
            this.classList.add('active'); // ONにする
            expDownBtn.classList.remove('active'); // もう片方をOFF
        }
    });

    expDownBtn.addEventListener('click', function () {
        if (this.classList.contains('active')) {
            this.classList.remove('active'); // ONの状態ならOFF（無補正）
        } else {
            this.classList.add('active'); // ONにする
            expUpBtn.classList.remove('active'); // もう片方をOFF
        }
    });

    // 目標レベルボタンのON/OFF切り替え（1つだけ選択可能）
    document.querySelectorAll('.goal-btn').forEach(button => {
        button.addEventListener('click', function () {
            document.querySelectorAll('.goal-btn').forEach(btn => btn.classList.remove('selected')); // 他のボタンをOFF
            this.classList.add('selected'); // クリックしたボタンをON（グレー背景に）
        });
    });

 // 経験値テーブルと特殊パターンの生成
const baseExpTable = {
  "1": 0, "2": 54, "3": 125, "4": 233, "5": 361, "6": 525, "7": 727, "8": 971, "9": 1245, "10": 1560,
  "11": 1905, "12": 2281, "13": 2688, "14": 3107, "15": 3536, "16": 3976, "17": 4430, "18": 4899,
  "19": 5382, "20": 5879, "21": 6394, "22": 6931, "23": 7489, "24": 8068, "25": 8668, "26": 9290,
  "27": 9933, "28": 10598, "29": 11284, "30": 11992, "31": 12721, "32": 13469, "33": 14235,
  "34": 15020, "35": 15823, "36": 16644, "37": 17483, "38": 18340, "39": 19215, "40": 20108,
  "41": 21018, "42": 21946, "43": 22891, "44": 23854, "45": 24834, "46": 25831, "47": 26846,
  "48": 27878, "49": 28927, "50": 29993, "51": 31355, "52": 32917, "53": 34664, "54": 36610,
  "55": 38805, "56": 41084, "57": 43488, "58": 46021, "59": 48687, "60": 51493
};

// 特殊パターンの生成
const specialPatternA = generateSpecialPatterns(baseExpTable, 1.5);
const specialPatternB = generateSpecialPatterns(baseExpTable, 1.8);

console.log("Special Pattern A:", specialPatternA);
console.log("Special Pattern B:", specialPatternB);

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
    const targetLevel = parseInt(document.querySelector('.goal-btn.selected')?.dataset.level || 0, 10);
    const expToNextLevel = parseInt(document.getElementById('expToNextLevel').value, 10);
    const memo = document.getElementById('memo').value.trim();
   
   // 特殊パターンの確認
    let patternType = specialPatterns[pokemonName] || "default";  // 特殊パターンがなければdefault

    // 適用する経験値テーブルを選択
    let expTable;
    if (patternType === "specialPatternA") {
        expTable = specialPatternA;
    } else if (patternType === "specialPatternB") {
        expTable = specialPatternB;
    } else {
        expTable = baseExpTable;
    }

    // 経験値計算（目標レベルに到達するまでの総EXP）
    const expToNextLevel = parseInt(document.getElementById('expToNextLevel').value, 10) || 0;

// 総経験値 = 手動入力分 + （目標レベルに到達するまでの差分）
const totalExpNeeded = expToNextLevel + (expTable[targetLevel] - expTable[currentLevel + 1]);

console.log(`${pokemonName} に必要な総経験値: ${totalExpNeeded}`);


    console.log(`${pokemonName} に必要な総経験値: ${totalExpNeeded}`);

    // 目標レベルの取得
    let targetLevel = "なし";
    document.querySelectorAll('.goal-btn').forEach(button => {
        if (button.classList.contains('selected')) {
            targetLevel = button.getAttribute('data-level');
        }
    });

    // 入力チェック
    if (!pokemonName || !window.pokemonNames.includes(pokemonName)) {
        alert('正しいポケモン名を入力してください！');
        return;
    }

    // 性格の記号を色付きで設定（ボタンに対応）
    let natureSymbol = `<span class="nature-symbol nature-none">-</span>`; // デフォルトは無補正
    if (expUp) natureSymbol = `<span class="nature-symbol exp-up">↑</span>`;
    if (expDown) natureSymbol = `<span class="nature-symbol exp-down">↓</span>`;

    // 「睡ボ」アイコンの処理
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

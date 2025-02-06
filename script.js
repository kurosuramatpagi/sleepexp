let specialPatterns = {};

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

document.addEventListener('DOMContentLoaded', function () {
    const boxButton = document.getElementById('boxButton');
    const sleepCalcButton = document.getElementById('sleepCalcButton');
    const formContainer = document.getElementById('formContainer');
    const pokemonDisplay = document.getElementById('pokemonDisplay');
    const addButton = document.getElementById('addButton');
    const popupOverlay = document.getElementById('popupOverlay');
    const closeFormBtn = document.getElementById('closeFormBtn');
    const cardPreviewArea = document.getElementById('cardPreviewArea');
const expToNextLevelInput = document.getElementById('expToNextLevel');
expToNextLevelInput.parentElement.appendChild(cardPreviewArea);
cardPreviewArea.style.position = 'absolute';
    cardPreviewArea.style.top = '-320px';  // Y座標
    cardPreviewArea.style.left = '210px'; // X座標
cardPreviewArea.style.display = 'none';
    popupOverlay.style.display = 'none';

    boxButton.addEventListener('click', function() {
        formContainer.style.display = 'none';
        pokemonDisplay.style.display = 'flex';
        addButton.style.display = 'block';
    });

    sleepCalcButton.addEventListener('click', function() {
        formContainer.style.display = 'none';
        pokemonDisplay.style.display = 'none';
        addButton.style.display = 'none';
    });

    addButton.addEventListener('click', function() {
        formContainer.style.display = 'block';
        popupOverlay.style.display = 'block';
        pokemonDisplay.style.display = 'flex';
      document.documentElement.style.overflow = 'hidden';  // ✅ `html` もスクロール禁止
    document.body.style.overflow = 'hidden';  // ✅ `body` もスクロール禁止
    document.body.style.height = '100%';  // ✅ 高さを固定
    document.body.style.touchAction = 'none';  // ✅ モバイルでのスクロール防止
    window.scrollTo(0, 0);  // ✅ **強制的にスクロール位置をトップに戻す**

    // ✅ iOSの「ホームに追加」した際もスクロール禁止にする
    document.addEventListener('touchmove', preventScroll, { passive: false });
    });

    closeFormBtn.addEventListener('click', closeForm);
    popupOverlay.addEventListener('click', closeForm);

    function closeForm() {
        formContainer.style.display = 'none';
        popupOverlay.style.display = 'none';
        cardPreviewArea.style.display = 'none';
      document.documentElement.style.overflow = '';  // ✅ `html` のスクロール復活
    document.body.style.overflow = '';  // ✅ `body` のスクロール復活
    document.body.style.height = '';  // ✅ 高さ制限解除
    document.body.style.touchAction = '';  // ✅ タッチ操作を元に戻す

    // ✅ スクロール禁止解除
    document.removeEventListener('touchmove', preventScroll);
}

// ✅ スクロールを防ぐ関数（モバイル用）
function preventScroll(event) {
    event.preventDefault();
    }

    fetch('special_patterns.json')
        .then(response => response.json())
        .then(data => {
            specialPatterns = data;
            console.log("特殊パターンが読み込まれました:", specialPatterns);
        })
        .catch(error => console.error('Error loading special patterns:', error));

    fetch('pokemon_names.txt')
        .then(response => response.text())
        .then(data => {
            window.pokemonNames = data.split('\n').map(name => name.trim()).filter(name => name !== '');
        })
        .catch(error => console.error('Error loading the pokemon names:', error));

    document.getElementById('registerButton').addEventListener('click', registerPokemon);

    document.querySelectorAll('.target-btn').forEach(button => {
        button.addEventListener('click', function () {
            document.querySelectorAll('.target-btn').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            updateCardPreview();
        });
    });

    document.getElementById('pokemonName').addEventListener('input', function() {
        showSuggestions();
        updateCardPreview();
    });

    document.getElementById('nickname').addEventListener('input', updateCardPreview);
    document.getElementById('currentLevel').addEventListener('input', updateCardPreview);
    document.getElementById('expToNextLevel').addEventListener('input', updateCardPreview);
    document.getElementById('memo').addEventListener('input', updateCardPreview);

    const sleepExpBonusBtn = document.getElementById('sleepExpBonusBtn');
    sleepExpBonusBtn.addEventListener('click', function () {
        this.classList.toggle('active');
        updateCardPreview();
    });

    const expUpBtn = document.getElementById('expUpBtn');
    const expDownBtn = document.getElementById('expDownBtn');

    expUpBtn.addEventListener('click', function () {
        this.classList.toggle('active');
        if (this.classList.contains('active')) expDownBtn.classList.remove('active');
        updateCardPreview();
    });

    expDownBtn.addEventListener('click', function () {
        this.classList.toggle('active');
        if (this.classList.contains('active')) expUpBtn.classList.remove('active');
        updateCardPreview();
    });

    function showSuggestions() {
        const input = document.getElementById('pokemonName');
        const suggestionBox = document.getElementById('suggestionBox');
        const query = input.value.trim();

        if (!query) {
            suggestionBox.innerHTML = '';
            suggestionBox.style.display = 'none';
            return;
        }

        const matches = window.pokemonNames.filter(name => name.startsWith(query));

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
                updateCardPreview();
            };
            suggestionBox.appendChild(suggestion);
        });

        suggestionBox.style.display = 'block';
    }

   function updateCardPreview() {
    const pokemonName = document.getElementById('pokemonName').value.trim() || '???';
    const nickname = document.getElementById('nickname').value.trim() || pokemonName;
    const currentLevel = parseInt(document.getElementById('currentLevel').value, 10) || 1;
    const targetLevelElement = document.querySelector('.target-btn.selected');
    const targetLevel = targetLevelElement ? parseInt(targetLevelElement.getAttribute('data-level'), 10) : currentLevel;
    const sleepExpBonus = sleepExpBonusBtn.classList.contains('active');
    const expUp = expUpBtn.classList.contains('active');
    const expDown = expDownBtn.classList.contains('active');
    const memo = document.getElementById('memo').value.trim() || '';

    // **`cardPreviewArea` の取得確認**
    if (!cardPreviewArea) {
        console.error("Error: cardPreviewArea が見つかりません。");
        return;
    }

    // **`expToNextLevelInput` の未記入チェック**
    let currentExpToNext = parseInt(expToNextLevelInput.value, 10);
    if (isNaN(currentExpToNext) || currentExpToNext <= 0) {
        if (currentLevel < 60) {
            currentExpToNext = baseExpTable[currentLevel + 1] - baseExpTable[currentLevel] || 0;
        } else {
            currentExpToNext = 0;  // Lv.60 の場合、追加経験値はなし
        }
    }

    let totalExpNeeded = 0;
    if (targetLevel > currentLevel) {
        totalExpNeeded += currentExpToNext;
        for (let lvl = currentLevel + 1; lvl < targetLevel; lvl++) {
            totalExpNeeded += (baseExpTable[lvl + 1] - baseExpTable[lvl]) || 0;
        }
    }

    // **innerHTML の更新**
    cardPreviewArea.innerHTML = `
        <div class="pokemon-box">
            <img src="images/${pokemonName}.png" alt="${pokemonName}" class="pokemon-image">
            <p class="nickname">${nickname}</p>
            <p class="level">Lv${currentLevel} ⇒ ${targetLevel}</p>
            <p class="exp-next">あと ${totalExpNeeded} exp</p>
            <div class="exp-bonus-container">
                ${sleepExpBonus ? '<span class="sleep-bonus">睡ボ</span>' : ''}
                ${expUp ? '<span class="nature-symbol exp-up">↑</span>' : ''}
                ${expDown ? '<span class="nature-symbol exp-down">↓</span>' : ''}
            </div>
            <p class="memo">${memo}</p>
        </div>
    `;

    // **innerHTML 更新後に `display = 'block'` を適用**
    cardPreviewArea.style.display = 'block';

    // **カードプレビュー内の画像と文字のサイズを変更**
    const cardPreviewBox = cardPreviewArea.querySelector('.pokemon-box');
    if (cardPreviewBox) {
        const image = cardPreviewBox.querySelector('.pokemon-image');
        const texts = cardPreviewBox.querySelectorAll('p');

        image.style.width = '70px';
        image.style.height = '70px';
        texts.forEach(text => {
            text.style.fontSize = '16px';
        });

        cardPreviewBox.style.width = '120px';
        cardPreviewBox.style.height = '240px';
    }

    console.log("カードプレビュー更新完了:", cardPreviewArea);
}

  });

// カードエリアのカードをカードプレビューのカードに合わせる
function registerPokemon() {
    const pokemonName = document.getElementById('pokemonName').value.trim();
    const nickname = document.getElementById('nickname').value.trim();
    const currentLevel = parseInt(document.getElementById('currentLevel').value, 10) || 1;
    const targetLevelElement = document.querySelector('.target-btn.selected');
    const targetLevel = targetLevelElement ? parseInt(targetLevelElement.getAttribute('data-level'), 10) : currentLevel;
    const expToNextLevel = parseInt(document.getElementById('expToNextLevel').value, 10) || (baseExpTable[currentLevel + 1] - baseExpTable[currentLevel]) || 0;
    const memo = document.getElementById('memo').value.trim();
    const sleepExpBonus = document.getElementById('sleepExpBonusBtn').classList.contains('active');
    const expUp = document.getElementById('expUpBtn').classList.contains('active');
    const expDown = document.getElementById('expDownBtn').classList.contains('active');

    if (!pokemonName) {
        alert('ポケモン名を入力してください！');
        return;
    }

    let totalExpNeeded = 0;
    if (targetLevel > currentLevel) {
        totalExpNeeded += expToNextLevel;
        for (let lvl = currentLevel + 1; lvl < targetLevel; lvl++) {
            totalExpNeeded += (baseExpTable[lvl + 1] - baseExpTable[lvl]) || 0;
        }
    }


  
    // ✅ 「睡ボアイコン」と「性格アイコン」の表示ロジック
    const sleepBonusIcon = sleepExpBonus ? `<span class="sleep-bonus">睡ボ</span>` : "";
    let natureSymbol = `<span class="nature-symbol nature-none">-</span>`;
    if (expUp) natureSymbol = `<span class="nature-symbol exp-up">↑</span>`;
    if (expDown) natureSymbol = `<span class="nature-symbol exp-down">↓</span>`;

    // ✅ **ポケモンカードのHTMLを修正**
    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon-box');
    pokemonElement.setAttribute('data-name', pokemonName);
    pokemonElement.setAttribute('data-level', currentLevel);
    pokemonElement.setAttribute('data-target-level', targetLevel);
    pokemonElement.setAttribute('data-exp-needed', totalExpNeeded);

    pokemonElement.innerHTML = `
        <img src="images/${pokemonName}.png" alt="${pokemonName}" class="pokemon-image">
        <p class="nickname">${nickname || pokemonName}</p>
        <p class="level">Lv${currentLevel} ⇒ ${targetLevel}</p>
        <p class="exp-next">あと <strong>${totalExpNeeded}</strong> exp</p>
        <div class="exp-bonus-container">
            ${sleepBonusIcon}
            ${natureSymbol}
        </div>
        <p class="memo">${memo}</p>
    `;

    pokemonElement.addEventListener('click', function() {
        console.log(`ポケモン ${pokemonName} を選択しました`);
        // ここに飴を与える、睡眠計測の処理を追加予定
    });

    document.getElementById('pokemonDisplay').appendChild(pokemonElement);

    console.log('ポケモンが登録されました:', { name: pokemonName, nickname, currentLevel, targetLevel, totalExpNeeded, memo });
}


function openForm() {
    formContainer.style.display = 'block';
    popupOverlay.style.display = 'block';
    pokemonDisplay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // ✅ 「＋」ボタンを半透明にする
    addButton.style.opacity = '0.5';
}

function closeForm() {
    formContainer.style.display = 'none';
    popupOverlay.style.display = 'none';
    cardPreviewArea.style.display = 'none';
    document.body.style.overflow = '';

    // ✅ 「＋」ボタンを元の透明度に戻す
    addButton.style.opacity = '1';
}

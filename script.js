let specialPatterns = {};

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

document.addEventListener('DOMContentLoaded', function () {
    const boxButton = document.getElementById('boxButton');
    const sleepCalcButton = document.getElementById('sleepCalcButton');
    const formContainer = document.getElementById('formContainer');
    const pokemonDisplay = document.getElementById('pokemonDisplay');
    const addButton = document.getElementById('addButton');
    const popupOverlay = document.getElementById('popupOverlay');
    const closeFormBtn = document.getElementById('closeFormBtn');

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
    });

    closeFormBtn.addEventListener('click', closeForm);
    popupOverlay.addEventListener('click', closeForm);

    function closeForm() {
        formContainer.style.display = 'none';
        popupOverlay.style.display = 'none';
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
        });
    });

    document.getElementById('pokemonName').addEventListener('input', showSuggestions);

    const sleepExpBonusBtn = document.getElementById('sleepExpBonusBtn');
    sleepExpBonusBtn.addEventListener('click', function () {
        this.classList.toggle('active');
    });

    const expUpBtn = document.getElementById('expUpBtn');
    const expDownBtn = document.getElementById('expDownBtn');

    expUpBtn.addEventListener('click', function () {
        if (this.classList.contains('active')) {
            this.classList.remove('active');
        } else {
            this.classList.add('active');
            expDownBtn.classList.remove('active');
        }
    });

    expDownBtn.addEventListener('click', function () {
        if (this.classList.contains('active')) {
            this.classList.remove('active');
        } else {
            this.classList.add('active');
            expUpBtn.classList.remove('active');
        }
    });
});

function generateSpecialPatterns(baseTable, multiplier) {
    const newTable = {};
    for (let level in baseTable) {
        newTable[level] = Math.ceil(baseTable[level] * multiplier);
    }
    return newTable;
}

const specialPatternA = generateSpecialPatterns(baseExpTable, 1.5);
const specialPatternB = generateSpecialPatterns(baseExpTable, 1.8);

console.log("Special Pattern A:", specialPatternA);
console.log("Special Pattern B:", specialPatternB);

// ひらがなをカタカナに変換する関数を追加
function toKatakana(str) {
    return str.replace(/[\u3041-\u3096]/g, ch => 
        String.fromCharCode(ch.charCodeAt(0) + 0x60)
    );
}

function showSuggestions() {
    const input = document.getElementById('pokemonName');
    const suggestionBox = document.getElementById('suggestionBox');
    let query = input.value.trim();
    let katakanaQuery = toKatakana(query);

    if (!query) {
        suggestionBox.innerHTML = '';
        suggestionBox.style.display = 'none';
        return;
    }

    const matches = window.pokemonNames.filter(name => 
        name.startsWith(query) or name.startsWith(katakanaQuery)
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

function registerPokemon() {
    const pokemonName = document.getElementById('pokemonName').value.trim();
    const nickname = document.getElementById('nickname').value.trim();
    const sleepExpBonus = document.getElementById('sleepExpBonusBtn').classList.contains('active');
    const expUp = document.getElementById('expUpBtn').classList.contains('active');
    const expDown = document.getElementById('expDownBtn').classList.contains('active');
    const currentLevel = parseInt(document.getElementById('currentLevel').value, 10);
    const expToNextLevel = parseInt(document.getElementById('expToNextLevel').value, 10);
    const memo = document.getElementById('memo').value.trim();

    let targetLevelElement = document.querySelector('.target-btn.selected');
    if (!targetLevelElement) {
        alert('目標レベルが選択されていません！');
        return;
    }
    const targetLevel = parseInt(targetLevelElement.getAttribute('data-level'), 10);

    let patternType = specialPatterns[pokemonName] || "default";
    let expTable = (patternType === "specialPatternA") ? specialPatternA 
                 : (patternType === "specialPatternB") ? specialPatternB 
                 : baseExpTable;

    let totalExpNeeded;
    if (expTable[targetLevel] !== undefined && expTable[currentLevel + 1] !== undefined) {
        totalExpNeeded = expToNextLevel + (expTable[targetLevel] - expTable[currentLevel + 1]);
    } else {
        totalExpNeeded = 'データ不足';
    }

    if (!pokemonName || !window.pokemonNames.includes(pokemonName)) {
        alert('正しいポケモン名を入力してください！');
        return;
    }

    let natureSymbol = `<span class="nature-symbol nature-none">-</span>`;
    if (expUp) natureSymbol = `<span class="nature-symbol exp-up">↑</span>`;
    if (expDown) natureSymbol = `<span class="nature-symbol exp-down">↓</span>`;

    const sleepBonusIcon = sleepExpBonus ? '<span class="sleep-bonus">睡ボ</span>' : '';

    const pokemonData = {
        name: pokemonName,
        nickname: nickname || pokemonName,
        sleepBonusIcon: sleepBonusIcon,
        natureSymbol: natureSymbol,
        currentLevel: isNaN(currentLevel) ? 1 : currentLevel,
        expToNextLevel: isNaN(expToNextLevel) ? 0 : expToNextLevel,
        totalExpNeeded: totalExpNeeded,
        targetLevel: targetLevel,
        memo: memo,
        imagePath: `images/${pokemonName}.png`
    };

    addPokemonToList(pokemonData);
}

function addPokemonToList(pokemon) {
    const displayArea = document.getElementById('pokemonDisplay');
    const pokemonElement = document.createElement('div');
    pokemonElement.className = 'pokemon-box';
    pokemonElement.innerHTML = `
        <img src="${pokemon.imagePath}" alt="${pokemon.name}" class="pokemon-image">
        <p class="nickname">${pokemon.nickname}</p>
        <p class="level">Lv.${pokemon.currentLevel} ⇒ ${pokemon.targetLevel}</p>
        <p class="exp-next">あと ${pokemon.totalExpNeeded} exp</p>
        <p class="exp-bonus">${pokemon.sleepBonusIcon} ${pokemon.natureSymbol}</p>
        <p class="memo">${pokemon.memo ? pokemon.memo : ""}</p>
    `;
    displayArea.appendChild(pokemonElement);
}

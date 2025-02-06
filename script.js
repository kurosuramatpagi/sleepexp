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
cardPreviewArea.style.right = '10px';
cardPreviewArea.style.top = '50%';
cardPreviewArea.style.transform = 'translateY(-50%)';
cardPreviewArea.style.display = 'none'
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
    });

    closeFormBtn.addEventListener('click', closeForm);
    popupOverlay.addEventListener('click', closeForm);

    function closeForm() {
        formContainer.style.display = 'none';
        popupOverlay.style.display = 'none';
        cardPreviewArea.style.display = 'none';
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
        const pokemonName = document.getElementById('pokemonName').value.trim();
        const nickname = document.getElementById('nickname').value.trim();
        const currentLevel = document.getElementById('currentLevel').value;
        const targetLevelElement = document.querySelector('.target-btn.selected');
        const targetLevel = targetLevelElement ? targetLevelElement.getAttribute('data-level') : '';
        const sleepExpBonus = sleepExpBonusBtn.classList.contains('active');
        const expUp = expUpBtn.classList.contains('active');
        const expDown = expDownBtn.classList.contains('active');
        const memo = document.getElementById('memo').value.trim();

        let natureSymbol = '<span class="nature-symbol nature-none">-</span>';
        if (expUp) natureSymbol = '<span class="nature-symbol exp-up">↑</span>';
        if (expDown) natureSymbol = '<span class="nature-symbol exp-down">↓</span>';

        const sleepBonusIcon = sleepExpBonus ? '<span class="sleep-bonus">睡ボ</span>' : '';

        cardPreviewArea.innerHTML = `
            <div class="pokemon-box" style="
                width: var(--preview-card-width, 60px);
                height: var(--preview-card-height, 140px);
                position: absolute;
                top: var(--preview-card-top, -150px);
                left: var(--preview-card-left, 10px);
                z-index: 1001;">
                <img src="images/${pokemonName || 'placeholder'}.png" alt="${pokemonName}" class="pokemon-image" style="
                    width: var(--preview-image-width, 30px);
                    height: var(--preview-image-height, 30px);">
                <p class="nickname" style="font-size: var(--preview-text-size, 0.6em);">${nickname || pokemonName}</p>
                <p class="level" style="font-size: var(--preview-text-size, 0.6em);">Lv.${currentLevel || 1}</p>
                <p class="exp-next" style="font-size: var(--preview-text-size, 0.6em);">Lv.${targetLevel || ''}</p>
                <p class="exp-bonus" style="font-size: var(--preview-text-size, 0.6em);">${sleepBonusIcon} ${natureSymbol}</p>
                <p class="memo" style="font-size: var(--preview-text-size, 0.6em);">${memo}</p>
            </div>
        `;
        cardPreviewArea.style.display = 'block';
    }

    function registerPokemon() {
        const pokemonName = document.getElementById('pokemonName').value.trim();
        const nickname = document.getElementById('nickname').value.trim();
        const currentLevel = document.getElementById('currentLevel').value;
        const memo = document.getElementById('memo').value.trim();

        if (!pokemonName) {
            alert('ポケモン名を入力してください！');
            return;
        }

        const pokemonElement = document.createElement('div');
        pokemonElement.classList.add('pokemon-box');
        pokemonElement.innerHTML = `
            <img src="images/${pokemonName || 'placeholder'}.png" alt="${pokemonName}" class="pokemon-image">
            <p class="nickname">${nickname || pokemonName}</p>
            <p class="level">Lv.${currentLevel || 1}</p>
            <p class="memo">${memo}</p>
        `;

        const displayArea = document.getElementById('pokemonDisplay');
        displayArea.appendChild(pokemonElement);

        console.log('ポケモンが登録されました:', { name: pokemonName, nickname, currentLevel, memo });
    }
});

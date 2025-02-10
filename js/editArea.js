document.addEventListener('DOMContentLoaded', function () {
    const pokemonDisplay = document.getElementById('pokemonDisplay');
    const editCardPreview = document.getElementById('editCardPreview');

    pokemonDisplay.addEventListener('click', function (event) {
        const card = event.target.closest('.pokemon-box');
        if (!card) return;

        // ポケモンのデータを取得
        const name = card.getAttribute('data-name');
        const level = card.getAttribute('data-level');
        const targetLevel = card.getAttribute('data-target-level');
        const expNeeded = card.getAttribute('data-exp-needed');

        // 編集エリアにカードを表示
        editCardPreview.innerHTML = `
            <img src="images/${name}.png" alt="${name}" style="width: 80px; height: 80px;">
            <p class="nickname">${name}</p>
            <p class="level">Lv ${level} ⇒ ${targetLevel}</p>
            <p class="exp-next">あと ${expNeeded} exp</p>
        `;
    });
});

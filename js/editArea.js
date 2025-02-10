document.addEventListener('DOMContentLoaded', function () {
    const pokemonDisplay = document.getElementById('pokemonDisplay');
    const editCardPreview = document.getElementById('editCardPreview');
    const editArea = document.querySelector('.edit-area');

    pokemonDisplay.addEventListener('click', function (event) {
        const card = event.target.closest('.pokemon-box');
        if (!card) return;

        // カードのHTMLをそのままコピー
        editCardPreview.innerHTML = card.innerHTML;

        // 編集エリアを表示
        editArea.style.display = 'flex';
    });
});

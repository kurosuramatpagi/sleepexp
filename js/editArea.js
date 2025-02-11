document.addEventListener('DOMContentLoaded', function () {
    const pokemonDisplay = document.getElementById('pokemonDisplay');
    const editCardPreview = document.getElementById('editCardPreview');
    const editArea = document.querySelector('.edit-area');

    pokemonDisplay.addEventListener('click', function (event) {
        const card = event.target.closest('.pokemon-box');
        if (!card) return;

        // カードのクローンを作成
        const clonedCard = card.cloneNode(true);
        clonedCard.style.width = "100px";  // カードエリアと同じサイズ
        clonedCard.style.height = "220px";  // 高さも統一
        clonedCard.style.transform = "none";  // 拡大を防ぐ

        // 既存の編集プレビューをクリアして、新しいカードをセット
        editCardPreview.innerHTML = "";
        editCardPreview.appendChild(clonedCard);

        // 編集エリアを表示
        editArea.style.display = 'flex';
    });
});

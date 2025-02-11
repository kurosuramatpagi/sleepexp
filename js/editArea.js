document.addEventListener('DOMContentLoaded', function () {
    const pokemonDisplay = document.getElementById('pokemonDisplay');
    const editCardPreview = document.getElementById('editCardPreview');
    const editArea = document.querySelector('.edit-area');

    pokemonDisplay.addEventListener('click', function (event) {
        const card = event.target.closest('.pokemon-box');
        if (!card) return;

        // カードのクローンを作成
        const clonedCard = card.cloneNode(true);
        clonedCard.style.width = "128.6px";  // 2倍のサイズ
        clonedCard.style.height = "300px";  
        clonedCard.style.transform = "none"; 

        // 画像のサイズを2倍にする
        const img = clonedCard.querySelector('img');
        if (img) {
            img.style.width = "80px";  // 2倍
            img.style.height = "80px"; 
        }

        // 文字サイズを2倍にする
        const textElements = clonedCard.querySelectorAll('p, span');
        textElements.forEach(element => {
            element.style.fontSize = "1.2em";  // 拡大（必要なら調整OK）
        });

        // 既存の編集プレビューをクリアして、新しいカードをセット
        editCardPreview.innerHTML = "";
        editCardPreview.appendChild(clonedCard);

        // 編集エリアを表示
        editArea.style.display = 'flex';
    });
});

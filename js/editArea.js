document.addEventListener('DOMContentLoaded', function () {
    const pokemonDisplay = document.getElementById('pokemonDisplay');
    const editCardPreview = document.getElementById('editCardPreview');
    const editArea = document.querySelector('.edit-area');

    pokemonDisplay.addEventListener('click', function (event) {
        const card = event.target.closest('.pokemon-box');
        if (!card) return;

        // カードのクローンを作成
        const clonedCard = card.cloneNode(true);
        clonedCard.style.width = "128.6px";  // 2倍サイズ
        clonedCard.style.height = "300px";  
        clonedCard.style.transform = "none"; 

        // 画像のサイズを2倍にする
        const img = clonedCard.querySelector('img');
        if (img) {
            img.style.width = "80px";  
            img.style.height = "80px"; 
        }

        // 文字サイズを2倍にする
        const textElements = clonedCard.querySelectorAll('p, span');
        textElements.forEach(element => {
            element.style.fontSize = "1.2em"; 
        });

        // **編集エリアの左側に配置**
        clonedCard.style.display = "flex";
        clonedCard.style.flexDirection = "column";
        clonedCard.style.alignItems = "center";
        clonedCard.style.justifyContent = "center";
        clonedCard.style.marginLeft = "10px";  // **左に少し余白を作る**
        clonedCard.style.position = "relative";  // **位置調整**
        clonedCard.style.top = "50%";  // **縦の真ん中**
        clonedCard.style.transform = "translateY(-50%)";  // **中央揃え**

        // **編集エリア全体の調整**
        editCardPreview.style.display = "flex";
        editCardPreview.style.alignItems = "center";
        editCardPreview.style.justifyContent = "flex-start"; // **左寄せ**
        editCardPreview.style.height = "100%";  // **編集エリア全体の高さを利用**

        // 既存の編集プレビューをクリアして、新しいカードをセット
        editCardPreview.innerHTML = "";
        editCardPreview.appendChild(clonedCard);

        // 編集エリアを表示
        editArea.style.display = 'flex';
    });
});

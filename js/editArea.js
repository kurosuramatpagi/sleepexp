document.addEventListener("DOMContentLoaded", function () {
    const pokemonDisplay = document.getElementById("pokemonDisplay");
    const editArea = document.querySelector(".edit-area");

    pokemonDisplay.addEventListener("click", function (event) {
        let card = event.target.closest(".pokemon-box");
        if (!card) return; // クリックしたのがカードでなければ処理しない

        console.log("カードがクリックされた:", card); // デバッグ用

        // 既存の編集エリアのカードを削除
        const existingPreview = document.getElementById("editCardPreview");
        if (existingPreview) {
            existingPreview.remove();
        }

        // 新しいカードのクローンを作成
        const previewCard = card.cloneNode(true);
        previewCard.id = "editCardPreview";
        previewCard.style.position = "absolute";
        previewCard.style.left = "20px";
        previewCard.style.top = "10px";
        previewCard.style.zIndex = "1100";
        previewCard.style.border = "2px solid #ccc";
        previewCard.style.borderRadius = "10px";
        previewCard.style.padding = "5px";
        previewCard.style.backgroundColor = "white";

        // 編集エリアに追加
        editArea.appendChild(previewCard);
        console.log("編集エリアにカードが追加された:", previewCard); // デバッグ用
    });
});

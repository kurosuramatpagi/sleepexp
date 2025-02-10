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
        previewCard.style.position = "relative";  // 修正: `absolute` をやめる
        previewCard.style.left = "auto";
        previewCard.style.top = "auto";
        previewCard.style.border = "2px solid #ccc";
        previewCard.style.borderRadius = "10px";
        previewCard.style.padding = "5px";
        previewCard.style.backgroundColor = "white";

        // 編集エリアを表示
        editArea.style.display = "flex";
        editArea.style.minHeight = "150px"; // 修正: 最低限の高さを確保
        editArea.style.alignItems = "center";

        // 編集エリアに追加
        editArea.appendChild(previewCard);
        console.log("編集エリアにカードが追加された:", previewCard); // デバッグ用
    });
});

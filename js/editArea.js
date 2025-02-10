document.querySelectorAll('.pokemon-box').forEach(card => {
    card.addEventListener('click', function() {
        const editArea = document.querySelector('.edit-area');
        const existingPreview = document.getElementById('editCardPreview');
        
        // すでにある場合は削除
        if (existingPreview) {
            existingPreview.remove();
        }

        // 新しいカードの要素を作成
        const previewCard = this.cloneNode(true);
        previewCard.id = 'editCardPreview';
        previewCard.style.position = 'absolute';
        previewCard.style.left = '20px';
        previewCard.style.top = '10px';
        previewCard.style.zIndex = '1100';
        previewCard.style.border = '2px solid #ccc';
        previewCard.style.borderRadius = '10px';
        previewCard.style.padding = '5px';
        previewCard.style.backgroundColor = 'white';

        // 編集エリアに追加
        editArea.appendChild(previewCard);
    });
});

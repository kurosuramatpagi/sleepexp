document.getElementById('pokemonDisplay').addEventListener('click', function(event) {
    let card = event.target.closest('.pokemon-box');
    if (!card) return;  // クリックしたのがカードでなければ処理しない

    const editArea = document.querySelector('.edit-area');
    const existingPreview = document.getElementById('editCardPreview');

    // すでにある場合は削除
    if (existingPreview) {
        existingPreview.remove();
    }

    // クローンを作成して表示
    const previewCard = card.cloneNode(true);
    previewCard.id = 'editCardPreview';
    previewCard.style.position = 'absolute';
    previewCard.style.left = '20px';
    previewCard.style.top = '10px';
    previewCard.style.zIndex = '1100';
    previewCard.style.border = '2px solid #ccc';
    previewCard.style.borderRadius = '10px';
    previewCard.style.padding = '5px';
    previewCard.style.backgroundColor = 'white';

    editArea.appendChild(previewCard);
});

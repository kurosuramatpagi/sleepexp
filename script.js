document.addEventListener('DOMContentLoaded', function() {
    fetch('pokemon_names.txt')
        .then(response => response.text())
        .then(data => {
            const pokemonArray = data.split('\n');
            const selectElement = document.getElementById('pokemonSelect');

            pokemonArray.forEach(pokemon => {
                if (pokemon.trim() !== '') {
                    const option = document.createElement('option');
                    option.value = pokemon;
                    option.textContent = pokemon;
                    selectElement.appendChild(option);
                }
            });
        })
        .catch(error => console.error('Error loading the pokemon names:', error));
});

const pokemonList = document.getElementById('pokemon-list');
const pokemonDetails = document.getElementById('pokemon-details');

// Fetch the first 151 Pokemon from the API and display their names
fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  .then(response => response.json())
  .then(data => {
    data.results.forEach(pokemon => {
      const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      const pokemonItem = document.createElement('div');
      pokemonItem.classList.add('pokemon-card');
      pokemonItem.textContent = pokemonName;
      pokemonItem.addEventListener('click', () => {
        // Fetch the detailed data for the selected Pokemon
        fetch(pokemon.url)
          .then(response => response.json())
          .then(data => {
            const pokemonNumber = data.id;
            const pokemonImage = data.sprites.front_default;
            const pokemonTypes = data.types.map(type => type.type.name).join(', ');
            const pokemonDetailsHTML = `
              <h2>${pokemonName} (#${pokemonNumber})</h2>
              <img src="${pokemonImage}" alt="${pokemonName}">
              <p><strong>Type(s):</strong> ${pokemonTypes}</p>
            `;
            pokemonDetails.innerHTML = pokemonDetailsHTML;
          })
          .catch(error => console.error(error));
      });
      pokemonList.appendChild(pokemonItem);
    });
  })
  .catch(error => console.error(error));

import React, { useState, useEffect } from 'react';
import './CharactersPage.css'; // CSS dosyası
import Episode from './Episode';

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        let apiUrl = 'https://rickandmortyapi.com/api/character';
        // Eğer bir arama terimi varsa, sorguya ekleyelim
        if (searchTerm) {
          apiUrl += `?name=${searchTerm}`;
        }
        const response = await fetch(apiUrl);
        const data = await response.json();
        setCharacters(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching characters:', error);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddToFavorites = (character) => {
    if (!favorites.find(favorite => favorite.id === character.id)) {
      setFavorites(prevFavorites => [...prevFavorites, character]);
    }
  };

  const handleRemoveFromFavorites = (id) => {
    setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.id !== id));
  };

  const handleEpisodeClick = () => {
    window.location.href = '/episodes';
  };

  return (
    <div>
      <div className="navbar">
        <button className="navbar-link" onClick={handleEpisodeClick}>Episodes</button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search characters..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <h1 className="page-title">Rick & Morty Characters</h1>
      <div className="characters-container">
        {loading && <p>Loading...</p>}
        {!loading && characters.length === 0 && searchTerm && <p>No characters found.</p>}
        {characters.map(character => (
          <div key={character.id} className="character-card">
            <img src={character.image} alt={character.name} />
            <div>
              <h3>{character.name}</h3>
              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
              {!favorites.find(favorite => favorite.id === character.id) && (
                <button onClick={() => handleAddToFavorites(character)}>Add to Favorites</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="favorites-container">
        <h2>Favorites</h2>
        {favorites.map(favorite => (
          <div key={favorite.id} className="favorite-card">
            <img src={favorite.image} alt={favorite.name} />
            <div>
              <h3>{favorite.name}</h3>
              <p>Status: {favorite.status}</p>
              <p>Species: {favorite.species}</p>
              <button onClick={() => handleRemoveFromFavorites(favorite.id)}>Remove from Favorites</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharactersPage;

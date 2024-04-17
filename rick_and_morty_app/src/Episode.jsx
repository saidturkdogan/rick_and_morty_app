import React, { useState, useEffect } from 'react';

const EpisodePage = () => {
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://rickandmortyapi.com/api/episode');
                const data = await response.json();
                setEpisodes(data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching episodes:', error);
                setLoading(false);
            }
        };

        fetchEpisodes();
    }, []);

    return (
        <div>
            <h1>Episodes</h1>
            <div className="episodes-container">
                {loading && <p>Loading...</p>}
                {!loading && episodes.length === 0 && <p>No episodes found.</p>}
                {episodes.map(episode => (
                    <div key={episode.id} className="episode-card">
                        <h3>{episode.name}</h3>
                        <p>Episode: {episode.episode}</p>
                        <p>Air Date: {episode.air_date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EpisodePage;

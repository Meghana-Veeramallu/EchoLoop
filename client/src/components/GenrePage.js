import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MusicContext } from '../Context';
import Card from '../components/Card';
import Footer from '../components/Footer';

function GenrePage() {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(MusicContext);
  const { genre } = useParams();

  // Genre seed mapping
  const genreSeeds = {
    bollywood: 'indian',
    pop: 'pop',
    indie: 'indie',
    'hip-hop': 'hip-hop',
    jazz: 'jazz',
    classical: 'classical',
    rock: 'rock',
    electronic: 'electronic',
    country: 'country'
  };

  useEffect(() => {
    if (!token || !genre) return;

    const fetchGenreTracks = async () => {
      setTracks([]);
      window.scrollTo(0, 0);
      setIsLoading(true);
      try {
        
        const response = await fetch(
          `https://api.spotify.com/v1/recommendations?limit=20&seed_genres=${genreSeeds[genre.toLowerCase()]}&min_popularity=50`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch ${genre} tracks`);
        }

        const data = await response.json();
        setTracks(data.tracks);
        console.log('Fetched tracks:', data.tracks);
      } catch (error) {
        console.error('Error fetching tracks:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenreTracks();
  }, [token, genre]);

  const formatGenreTitle = (genre) => {
    return genre
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="text-white mb-4">{formatGenreTitle(genre)} Music</h1>
      {isLoading ? (
        <div className="row">
          <div className="col-12 py-5 text-center">
            <div
              className="spinner-border text-light"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          {tracks && tracks.length > 0 ? (
            tracks.map((track) => (
              <Card key={track.id} element={track} />
            ))
          ) : (
            <div className="col-12 text-center text-white">
              No tracks found for this genre.
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default GenrePage;
import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { MusicContext } from '../Context';
import Card from '../components/Card';
import Footer from '../components/Footer';

function TrendingPage() {
  const [trendingTracks, setTrendingTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(MusicContext);

  useEffect(() => {
    if (!token) return;

    const fetchTrendingSongs = async () => {
      setTrendingTracks([]);
      window.scrollTo(0, 0);
      setIsLoading(true);
      try {
        
        const playlistResponse = await fetch(
          'https://api.spotify.com/v1/browse/featured-playlists?limit=1',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!playlistResponse.ok) {
          throw new Error("Failed to fetch playlists");
        }

        const playlistData = await playlistResponse.json();
        const playlistId = playlistData.playlists.items[0].id;

        // tracks from the first playlist
        const tracksResponse = await fetch(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=20`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!tracksResponse.ok) {
          throw new Error("Failed to fetch tracks");
        }

        const tracksData = await tracksResponse.json();
        
        const tracks = tracksData.items.map(item => item.track).filter(track => track !== null);
        setTrendingTracks(tracks);
        
      } catch (error) {
        console.error('Error fetching tracks:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingSongs();
  }, [token]);

  if (error) {
    return <div className="container py-5">Error: {error}</div>;
  }

  return (
    <div className="container py-5 text-light">
      <h1>Trending Songs</h1>
      {isLoading ? (
        <div className="row">
          <div className="col-12 py-5 text-center">
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          {trendingTracks && trendingTracks.length > 0 ? (
            trendingTracks.map((track) => (
              <Card key={track.id} element={track} />
            ))
          ) : (
            <div className="col-12">No trending tracks found.</div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default TrendingPage;
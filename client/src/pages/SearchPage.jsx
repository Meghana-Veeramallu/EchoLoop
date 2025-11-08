import React, { useState, useContext, useEffect } from "react";
import { MusicContext } from '../Context';
import Card from '../components/Card';
import Footer from '../components/Footer';

function SearchPage() {
    const [keyword, setKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { token } = useContext(MusicContext);
    const [resultOffset, setResultOffset] = useState(0);
    const [message, setMessage] = useState("");
    

    const fetchSearchResults = async () => {
        if (!keyword.trim()) {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);
        setError(null);
        setMessage("");

        try {
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${keyword}&type=track&offset=${resultOffset}&limit=20`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch search results");
            }

            const data = await response.json();
            if (data.tracks.items.length === 0) {
                setMessage("No more results to show");
            }
            setSearchResults(data.tracks.items);
            
        } catch (error) {
            console.error('Search error:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            setResultOffset(0);
            fetchSearchResults();
        }
    };

    useEffect(() => {
        if (resultOffset >= 0) {
            fetchSearchResults();
        }
    }, [resultOffset]);

    return (
        <div className="container py-5">
            <div className="row mb-4 justify-content-center">
                <div className="col-md-8">
                    <div className="input-group">
                        <input
                            value={keyword}
                            onChange={(event) => setKeyword(event.target.value)}
                            onKeyDown={handleKeyPress}
                            className="form-control"
                            type="search"
                            placeholder="Search for songs..."
                            aria-label="Search"
                        />
                        <button
                            onClick={() => {
                                setResultOffset(0);
                                fetchSearchResults();
                            }}
                            className="btn"
                            style={{ background: "#CBFF2E", color:"#070A26"}}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className=" mx-1" role="status" aria-hidden="true"></span>
                            ) : (
                                <i className="bi mx-1"></i>
                            )}
                            Search
                        </button>
                    </div>
                    {error && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {error}
                        </div>
                    )}
                </div>
            </div>

            
            <div className="row">
                {searchResults.length > 0 && (
                    <div className="col-12 mb-4">
                        <h2 className="text-white">Search Results</h2>
                    </div>
                )}
                {searchResults.map((track) => (
                    <Card key={track.id} element={track} />
                ))}
            </div>

            {searchResults.length > 0 && (
                <div className="row mt-4">
                    <div className="col">
                        <button
                            onClick={() => setResultOffset(prev => Math.max(0, prev - 20))}
                            className="btn w-100"
                            style={{ background: "#CBFF2E", color:"#070A26"}}
                            disabled={resultOffset === 0}
                        >
                            Previous Page: {resultOffset / 20}
                        </button>
                    </div>
                    <div className="col">
                        <button
                            onClick={() => setResultOffset(prev => prev + 20)}
                            className="btn w-100"
                            style={{ background: "#CBFF2E", color:"#070A26"}}
                        >
                            Next Page: {resultOffset / 20 + 2}
                        </button>
                    </div>
                </div>
            )}

            
            <div className="row">
                <div className="col">
                    <h4 className="text-center text-danger py-2">{message}</h4>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default SearchPage;
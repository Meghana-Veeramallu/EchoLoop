import { createContext, useState } from "react";

export const MusicContext = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [likedMusic, setLikedMusic] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [resultOffset, setResultOffset] = useState(0);
  const [token, setToken] = useState(null);

  return (
    <MusicContext.Provider
      value={{
        token,
        setToken,
        isLoading,
        setIsLoading,
        likedMusic,
        setLikedMusic,
        tracks,
        setTracks,
        resultOffset,
        setResultOffset,
        
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

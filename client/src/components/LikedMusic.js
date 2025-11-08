import React, { useContext, useEffect } from "react";
import Card from "./Card";
import { MusicContext } from "../Context";

function LikedMusic() {
  const musicContext = useContext(MusicContext);
  const likedMusic = musicContext.likedMusic;
  const setlikedMusic = musicContext.setLikedMusic;

  useEffect(() => {
    window.scrollTo(0, 0);
    const localLikedMusic = JSON.parse(localStorage.getItem("likedMusic"));
    setlikedMusic(localLikedMusic);
  }, [setlikedMusic]);

  return (
    <div>
      {likedMusic.length === 0 ? (
        <div className="container">
          <div className="row">
            <div className="col">
              <h3 className="py-5 text-center text-white">
                You don't have any liked music yet!
              </h3>
              
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-light text-center py-3 my-3">
            Your Liked Music <i className="bi bi-heart-fill text-danger mx-3"></i>
          </h1>
        </div>
      )}

      <div className="container">
        <div className="row">
          {likedMusic.map((element) => {
            return <Card key={element.id} element={element} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default LikedMusic;

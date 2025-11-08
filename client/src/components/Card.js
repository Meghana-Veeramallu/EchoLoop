import React, { useContext, useEffect } from "react";
import { MusicContext } from "../Context";

function Card({ element }) {
  const musicContext = useContext(MusicContext);
  const likedMusic = musicContext.likedMusic;
  const setlikedMusic = musicContext.setLikedMusic;
 

  const handleLike = () => {
    let likedMusic = localStorage.getItem("likedMusic");
    likedMusic = JSON.parse(likedMusic);
    let updatedLikedMusic = [];
    if (likedMusic.some((item) => item.id === element.id)) {
      updatedLikedMusic = likedMusic.filter((item) => item.id !== element.id);
      setlikedMusic(updatedLikedMusic);
      localStorage.setItem("likedMusic", JSON.stringify(updatedLikedMusic));
    } else {
      updatedLikedMusic = likedMusic;
      updatedLikedMusic.push(element);
      setlikedMusic(updatedLikedMusic);
      localStorage.setItem("likedMusic", JSON.stringify(updatedLikedMusic));
    }
  };

  useEffect(() => {
    const localLikedMusic = JSON.parse(localStorage.getItem("likedMusic"));
    setlikedMusic(localLikedMusic);
  }, [setlikedMusic]);

  return (
    <div key={element.id} className="col-lg-3 col-md-6 py-2">
    
      <div className="card text-light h-100" style={{ border: "0.5px solid #CBFF2E", transition: "0.3s", background: "#141523" }}>
        <div className="ratio ratio-1x1 bg-secondary bg-opacity-25">
          <img
            src={element.album.images[0].url}
            className="card-img-top"
            alt="..."
          />
        </div>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title d-flex justify-content-between">
            {element.name}
            <div className="add-options d-flex align-items-start">
              {likedMusic.some((item) => item.id === element.id) ? (
                <button onClick={handleLike} className="btn ">
                  <i className="bi bi-heart-fill text-danger"></i>
                </button>
              ) : (
                <button onClick={handleLike} className="btn text-danger">
                  <i className="bi bi-heart"></i>
                </button>
              )}
            </div>
          </h5>
          <p className="card-text">{element.album.artists[0].name}</p>

          <audio src={element.preview_url} controls className="w-100 mt-auto"></audio>
        </div>
      </div>
    </div>
  );
}

export default Card;

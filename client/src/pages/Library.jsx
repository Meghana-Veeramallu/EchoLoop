import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

import bollywoodImg from "../assets/genres/bollywood.jpg";
import popImg from "../assets/genres/pop.jpg";
import indieImg from "../assets/genres/indie.jpg";
import hiphopImg from "../assets/genres/hiphop.jpg";
import jazzImg from "../assets/genres/jazz.jpg";
import classicalImg from "../assets/genres/classical.jpg";
import rockImg from "../assets/genres/rock.jpg";
import electronicImg from "../assets/genres/electronic.jpg";
import countryImg from "../assets/genres/country.jpg";

const Library = () => {
  const navigate = useNavigate();

  const genres = [
    { name: "Bollywood", image: bollywoodImg },
    { name: "Pop", image: popImg },
    { name: "Indie", image: indieImg },
    { name: "Hip-Hop", image: hiphopImg },
    { name: "Jazz", image: jazzImg },
    { name: "Classical", image: classicalImg },
    { name: "Rock", image: rockImg },
    { name: "Electronic", image: electronicImg },
    { name: "Country", image: countryImg },
  ];

  const handleGenreClick = (genre) => {
    navigate(`/genre/${genre.name.toLowerCase()}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-white mb-4">Explore Genres</h2>
      <div className="row gy-3 justify-content-center">
        {genres.map((genre, index) => (
          <div className="col-12 col-sm-6 col-md-4" key={index}>
            <div className="text-center">
              {/* Square image styling */}
              <div
                style={{
                  width: "100%",
                  paddingTop: "100%",
                  position: "relative",
                  overflow: "hidden",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={genre.image}
                  alt="hehe yashhh"
                  className="img-fluid"
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <button
                className="btn btn-light w-100 py-3 text-uppercase fw-bold shadow"
                onClick={() => handleGenreClick(genre)}
              >
                {genre.name}
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default Library;

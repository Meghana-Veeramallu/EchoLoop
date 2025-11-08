import React from 'react';
import Footer from "../components/Footer";
import lalaImg from "../assets/trendingImg.jpg";
import hahaImg from "../assets/favouritesImg.png";
import genreImg from "../assets/genreImg.jpg";
import searchImg from "../assets/search.png";

function Landing() {
  

  return (
    <>
      <div className="container">
        {/* Bootstrap Carousel with 4 images */}
        <div id="homepageCarousel" className="carousel slide mb-4 my-2" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#homepageCarousel"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#homepageCarousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#homepageCarousel"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
            <button
              type="button"
              data-bs-target="#homepageCarousel"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={lalaImg} className="d-block w-100 " alt="trending" style={{ height: '400px', objectFit: 'cover' }} />
            </div>
            <div className="carousel-item">
              <img src={hahaImg} className="d-block w-100" alt="favs" style={{ height: '400px', objectFit: 'cover' }} />
            </div>
            <div className="carousel-item">
              <img src={genreImg} className="d-block w-100" alt="genre" style={{ height: '400px', objectFit: 'cover' }} />
            </div>
            <div className="carousel-item">
              <img src={searchImg} className="d-block w-100" alt="search" style={{ height: '400px', objectFit: 'cover' }} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#homepageCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#homepageCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        
        </div>
        <Footer />
      </div>
      
    </>
  );
}

export default Landing;

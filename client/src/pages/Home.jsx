import React from 'react'
import bgImg from "../assets/bgmain.png"
import '../styles/Home.css' 

function Home() {
  return (
    <div 
      className="home-container" 
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <h1 className="home-title">Echoloop</h1>
      <div className="home-buttons">
        <button 
          className="home-button" 
          onClick={() => window.location.href = '/login'}
        >
          Log In
        </button>
        <button 
          className="home-button" 
          onClick={() => window.location.href = '/signup'}
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default Home
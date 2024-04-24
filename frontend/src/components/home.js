// src/components/Home.js

import React from 'react';
import Header from './header';
import Footer from './footer';

const Home = () => {
  return (
    <>
    <Header/>
    <div className="home-container">
      <div className="overlay">
        <div className="content">
          <h1>Welcome to Project Dot In</h1>
          <p style={{ color: '#ffcc00' }}>Your Partner in<br />Innovative Learning Solutions</p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Home;

// src/components/contact.js

import React from 'react';
import Header from './header';
import Footer from './footer';

const Contact = () => {
  return (
    <>
    <Header/>
    <div className="contact-container">
      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>
          <strong>Address:</strong> Near kalinga stadium square, Unit 4, Nayapalli, Bhubaneswar, Odisha 751012
        </p>
        <p>
          <strong>Contact No:</strong> 9658827789, 9938833993
        </p>
        <p>
          <strong>Email:</strong> projectdotin@gmail.com
        </p>
        <div className="map-container">
          <iframe
            title="Shop Location"
            width="100%"
            height="300"
            frameBorder="0"
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.3561107706632!2d85.82527557377335!3d20.285521912893614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19095740c5951d%3A0x4e0147a172188e2f!2sproject%20dot%20in!5e0!3m2!1sen!2sin!4v1703425615328!5m2!1sen!2sin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Contact;

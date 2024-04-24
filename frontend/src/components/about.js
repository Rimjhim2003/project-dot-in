import React from 'react';
// import '../css/About.css'; // Adjust the path based on your project structure
import Header from './header';
import Footer from './footer';

const About = () => {
  return (
    <>
    <Header/>    
    <div className="about-wrapper">
      <section className="about-section" id="section1">
        <h2>Our Mission</h2>
        <p>
          Project Dot is committed to providing high-quality project solutions for school, college, and engineering students.
        </p>
      </section>

      <section className="about-section" id="section2">
        <h2>Project Ideas</h2>
        <p>
          We offer a wide range of project ideas to spark creativity and innovation among students. Our goal is to inspire and guide you in your project journey.
        </p>
      </section>

      <section className="about-section" id="section3">
        <h2>Project Instruments</h2>
        <p>
          Explore our selection of project instruments to enhance your project development experience. We provide top-quality tools and equipment to support your projects.
        </p>
      </section>

      <section className="about-section" id="section4">
        <h2>Customer Satisfaction</h2>
        <p>
          At Project Dot, we prioritize customer satisfaction. We strive to fulfill your demands and make your projects attractive and successful.
        </p>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default About;

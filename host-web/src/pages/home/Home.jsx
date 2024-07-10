import React from 'react';
import Footer from './containers/footer/Footer';
import Header from './containers/header/Header';
import Wim from './containers/wim/Wim';
import Features from './containers/features/Features';
import Blog from './containers/blog/Blog';
import CTA from './components/cta/CTA';
import NavbarLogined from './components/navbarLogined/NavbarLogined';
import Navbar from './components/navbar/Navbar';

import './home.css';

const Home = () => {
  return (
    <div className="student-container">
      <Navbar/>
      <div className="main-content">
      <Header />
      <Wim />
      <Features />
      <CTA />
      <Blog />
      <Footer />
      </div>
    </div>
  );
};

export default Home;

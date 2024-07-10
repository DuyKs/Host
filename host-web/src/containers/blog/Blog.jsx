import React from 'react';
import Article from '../../components/magazine/Magazine';
import { Space, Space1, Space2, Space3, Space4 } from './imports';
import './blog.css';

const Blog = () => (
  <div className="magazine__blog section__padding" id="blog">
    <div className="magazine__blog-heading">
      <h1 className="gradient__text">So much is in motion,
       <br /> We're documenting it through our blog.</h1>
    </div>
    <div className="magazine__blog-container">
      <div className="magazine__blog-container_groupA">
        <Article imgUrl={Space} date="Sep 26, 2021"  title="Space the final frontier:" text="To explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before." />
      </div>
      <div className="magazine__blog-container_groupB">
        <Article imgUrl={Space1} date=" November 12, 2023" title="Quantum Computer Chronicles:" text="Unlocking the Enigmatic World of Quantum Computing." />
        <Article imgUrl={Space2} date="August 7, 2022"  title="BRUSH & VERSE:" text=" A night of art and god's word." />
        <Article imgUrl={Space3} date="April 15, 2025"  title="Whispers of the Cosmos: " text="Cosmic Horoscopes Revealed." />
        <Article imgUrl={Space4} imageSize="600px" date="October 3, 2026"  title="Chronicles of the Cryptids:" text=" Tales from the Hidden Realms." />
      </div>
    </div>
  </div>
);

export default Blog;

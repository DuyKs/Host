import React from 'react';
import './magazine.css';

const Article = ({ imgUrl,imageSize, date, title, text }) => (
  <div className="magazine__blog-container_article">
    <div className="magazine__blog-container_article-image">
    <img src={imgUrl} alt="Article" style={{ width: '100%', height: imageSize }} />
    </div>
    <div className="magazine__blog-container_article-content">
      <div>
        <p>{date}</p>
        <h2>{title}</h2>
        <h3>{text}</h3>
      </div>
      <p>Read Full Article</p>
    </div>
  </div>
);

export default Article;
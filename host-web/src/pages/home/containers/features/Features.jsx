import React from 'react';
import Feature from '../../components/feature/Feature';
import './features.css';

const featuresData = [
    {
        title: 'Information dissemination',
        text: 'Magazines provide readers with a wide range of information on topics such as current events, news, entertainment, lifestyle, fashion, health, and more.',
      },
      {
        title: 'Education',
        text: 'Many magazines offer informative articles, how-to guides, tutorials, and tips that educate readers on various subjects.',
      },
      {
        title: 'Cultural reflection',
        text: 'Magazines often reflect and contribute to the cultural landscape by showcasing trends, opinions, and perspectives prevalent in society.',
      },  {
        title: 'Personal expression',
        text: 'Magazines can serve as a platform for writers, photographers, artists, and creators to express themselves and share their perspectives with a broader audience.',
      },  {
        title: 'Inspiration',
        text: 'Magazines often feature stories, interviews, and photographs that inspire readers in areas such as art, design, fashion, lifestyle, and personal development.',
      },
];

const Features = () => (
  <div className="magazine__features section__padding" id="features">
    <div className="magazine__features-heading">
      <h1 className="gradient__text">Uncover narratives that stretch the boundaries of your mind.</h1>
    </div>
    <div className="magazine__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;

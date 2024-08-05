import React from 'react';
import Feature from '../../components/feature/Feature';
import './wim.css';

const Wim = () => (
  <div className="magazine__whatmagazine section__margin" id="wmagazine">
    <div className="magazine__whatmagazine-feature">
      <Feature title="What is Magazine" text="We so opinion friends me message as delight. Whole front do of plate heard oh ought. His defective nor convinced residence own. Connection has put impossible own apartments boisterous. At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by." />
    </div>
    <div className="magazine__whatmagazine-heading">
      <h1 className="gradient__text">The possibilities are beyond your imagination</h1>
      <p>Explore the Library</p>
    </div>
    <div className="magazine__whatmagazine-container">
      <Feature title="Articles" text="We so opinion friends me message as delight. Whole front do of plate heard oh ought." />
      <Feature title="Stories" text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b" />
      <Feature title="Interviews" text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b" />
    </div>
  </div>
);

export default Wim;

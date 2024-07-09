import React from 'react';
import './header.css';
import { BackGround } from './imports';

const Header = () => (
  <div className="magazine__header section__padding" id="home" style={{ backgroundImage: `url(${BackGround})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
    <div className="magazine__header-content" style={{ padding: '13rem' }}> {/* Added padding */}
      <h1 className="gradient__text">Dive into the World of Magazines:</h1>
      <h1 className="gradient__text"> A Realm of Stories and Creativity Awaits!</h1>
      <p>Reluctant to seek aid while traveling, yet finding no comfort in refusing. Not a single thought spared for physical activity as a blessing. Every pleasure is indulged, every moment filled with excitement, and every bond strengthened. As time passes, we grow accustomed to seeking assistance.</p>
    </div>
  </div>
);

export default Header;

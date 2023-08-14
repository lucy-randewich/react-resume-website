import React from 'react';
import bigLogo from '../images/biglogo.png';

const HomePage = ({id}) => {
  const homepageContainerStyle = {
    backgroundColor: '#f7f7f7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const cardStyle = {
    textAlign: 'center',
    width: '60%',
  };

  const logoStyle = {
    maxWidth: '70%',
    marginBottom: '8px',
  };

  const descriptionStyle = {
    fontSize: '1.2rem',
  };

  return (
    <section id={id} className="home">
      <div style={homepageContainerStyle}>
        <div style={cardStyle}>
          <img src={bigLogo} alt="Logo" style={logoStyle} /> 
          <p style={descriptionStyle}>
            Hi! I'm Lucy. Have a scroll about to find out about me and what I can do for you!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;

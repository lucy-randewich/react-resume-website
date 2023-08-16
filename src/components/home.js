import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import bigLogo from '../images/biglogo3.png';
import icon from '../images/bubble2.png';
import { useParallax } from 'react-scroll-parallax';

const useStyles = makeStyles((theme) => ({
  homepageContainer: {
    backgroundColor: 'rgba(235, 235, 235, 1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '160vh',
    marginTop: '-20vh',
    overflowY: 'hidden',
  },
  card: {
    textAlign: 'center',
    width: '60%',
    backgroundColor: 'rgba(235, 235, 235, 0.55)',
    zIndex: 2,
    borderRadius: '20px',
  },
  logo: {
    maxWidth: '90%',
  },
  description: {
    fontSize: '1.2rem',
  },
  iconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '95%',
    marginTop: '-90vh',
  },
  icon: {
    width: '70px',
    height: '70px',
    position: 'absolute',
    opacity: 0.1,
    backgroundImage: `url(${icon})`,
    zIndex: 1,
    backgroundSize: 'contain',
  },

}));

const HomePage = ({ id }) => {
  const classes = useStyles();

  const parallax2 = useParallax({
    translateY: [400, 0],
  });

  useEffect(() => {
    const iconContainer = document.getElementById('icon-container');

    if (iconContainer) {
      const numIcons = 10;

      for (let i = 0; i < numIcons; i++) {
        const iconElement = document.createElement('div');
        iconElement.classList.add(classes.icon);

        const rotation = Math.random() * 360;
        const positionX = Math.random() * 100;
        const positionY = Math.random() * 100;
        const opacity = 0.2 + Math.random() * 0.8;
        const size = 20 + Math.random() * 80;

        iconElement.style.transform = `rotate(${rotation}deg)`;
        iconElement.style.left = `${positionX}%`;
        iconElement.style.top = `${positionY}%`;
        iconElement.style.opacity = `${opacity}`;
        iconElement.style.width = `${size}px`;
        iconElement.style.height = `${size}px`;

        iconContainer.appendChild(iconElement);
      }
    }
  }, [classes.icon]);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [showDescription, setShowDescription] = useState(false);
  const [hideDescription, setHideDescription] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const cardElement = document.getElementById('card');

    if (cardElement) {
      const cardOffsetTop = cardElement.offsetTop;
      const cardHeight = cardElement.clientHeight;

      if (scrollPosition >= cardOffsetTop - cardHeight && scrollPosition <= cardOffsetTop) {
        setShowDescription(true);
      } else if (scrollPosition < cardOffsetTop - cardHeight) {
        setShowDescription(false);
      }
    }
  }, [scrollPosition]);

  const logoStyle = {
    opacity: showDescription ? 0 : 1,
    transform: showDescription ? 'translateY(-60px)' : 'none',
    transition: 'opacity 0.5s, transform 0.5s',
  };

  const descriptionStyle = {
    fontSize: '1.2rem',
    opacity: showDescription ? 1 : 0,
    transform: showDescription ? 'none' : 'translateY(150px)',
    transition: 'opacity 0.5s ease, transform 0.5s',
  };

  return (
    <section id={id} className="home">
      <div className={classes.homepageContainer}>
        <div className={classes.iconContainer} id="icon-container" ref={parallax2.ref} />

        <div className={classes.card} id="card">
          <img src={bigLogo} alt="Logo" className={classes.logo} style={logoStyle}/>
          <p className={classes.description} style={descriptionStyle}>
            Hi! I'm Lucy. Have a scroll to learn about me and what I can do for you!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
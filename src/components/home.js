import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import bigLogo from '../images/biglogo3.png';
import icon from '../images/bubble2.png';
import { useParallax } from 'react-scroll-parallax';

const useStyles = makeStyles((theme) => ({
  homepageContainer: {
    backgroundColor: 'rgba(242, 242, 242, 1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '170vh',
    marginTop: '-33vh',
  },
  card: {
    textAlign: 'center',
    width: '60%',
    '&:hover .logo': {
      animation: '$bounce 0.5s infinite',
    },
    backgroundColor: 'rgba(242, 242, 242, 0.55)',
    zIndex: 2,
    borderRadius: '20px',
  },
  logo: {
    maxWidth: '70%',
    marginBottom: '8px',
    animation: '$bounce 1s',
  },
  description: {
    fontSize: '1.2rem',
  },
  '@keyframes bounce': {
    '0%, 100%': {
      transform: 'translateY(0) scale(1)',
    },
    '50%': {
      transform: 'translateY(-12px) scale(1.1)',
    },
  },

  iconContainer: {
    position: 'absolute',
    width: '69%',
    height: '52%',
    marginBottom: '250px',
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

  const parallax1 = useParallax({
    easing: "easeOutQuad",
    translateY: [70, 5],
  });

  const parallax2 = useParallax({
    easing: "easeOutQuad",
    translateY: [5, 40],
  });
  
  useEffect(() => {
    const iconContainer = document.getElementById('icon-container');

    if (iconContainer) {
      const numIcons = 14;

      for (let i = 0; i < numIcons; i++) {
        const iconElement = document.createElement('div');
        iconElement.classList.add(classes.icon);

        const rotation = Math.random() * 360;
        const positionX = Math.random() * 100;
        const positionY = Math.random() * 100;
        const opacity = 0.3 + Math.random() * 0.8;
        const size = 20 + Math.random() * 70;

        console.log(opacity);

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

  useEffect(() => {
    const iconContainer = document.getElementById('icon-container2');

    if (iconContainer) {
      const numIcons = 25;

      for (let i = 0; i < numIcons; i++) {
        const iconElement = document.createElement('div');
        iconElement.classList.add(classes.icon);

        const rotation = Math.random() * 360;
        const positionX = Math.random() * 100;
        const positionY = Math.random() * 100;
        const opacity = 0.01 + Math.random() * 0.3;
        const size = Math.random() * 70;

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

  return (
    <section id={id} className="home">
          <div className={classes.homepageContainer}>
          <div className={classes.iconContainer} id="icon-container2" ref={parallax2.ref}/>
          <div className={classes.iconContainer} id="icon-container" ref={parallax1.ref}/>
          

            <div className={classes.card} >
              <img
                src={bigLogo}
                alt="Logo"
                className={classes.logo}
              />
              <p className={classes.description}>
                Hi! I'm Lucy. Have a scroll about to find out about me and what I can do for you!
              </p>
            </div>
          </div>
    </section>
  );
};

export default HomePage;
